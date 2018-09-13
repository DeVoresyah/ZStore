import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleProvider, Container, Spinner, Toast } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { getProduct } from '../public/redux/actions/product';
import { addOrder, addQty, addProductDetail } from '../public/redux/actions/cart';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Components
import HeaderSection from './components/header-section';
import ContentSection from './components/content-section';

class ProductDetail extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.getData(this.props.navigation.state.params.id);
	}

	generateId = (length, chars) => {
		var mask = '';
	    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
	    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    if (chars.indexOf('#') > -1) mask += '0123456789';
	    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
	    var result = '';
	    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
	    return result;
	}

	getData = (id) => {
		this.props.dispatch(getProduct(id));
	}

	addProduct = () => {
		const { orders, transaction_id } = this.props.cart;
		const { data } = this.props.product;

		// Check if product already in cart
		if (orders.filter(orders => (orders.product_id === data.id)).length > 0) {

			// if product already in cart, add quantity
			let new_orders = orders.map(item => {
				if (item.product_id == data.id) {
					let newQty = item.qty + 1;

					return {
						transaction_id: item.transaction_id,
						product_id: item.product_id,
						qty: newQty,
						subtotal: data.price * newQty
					}
				} else {
					return {
						transaction_id: item.transaction_id,
						product_id: item.product_id,
						qty: item.qty,
						subtotal: item.subtotal
					}
				}
			});

			this.props.dispatch(addQty(new_orders));
		} else {

			//if not, add new to cart
			let product = {
				transaction_id,
				product_id: data.id,
				qty: 1,
				subtotal: data.price
			}

			if (product.transaction_id == '') {
				product.transaction_id = this.generateId(7, '#A')
			}

			this.props.dispatch(addOrder(product));
		}

		this.addProductDetail();
	}

	addProductDetail = () => {
		const { orders, products } = this.props.cart;
		const { data } = this.props.product;
		const { id } = this.props.navigation.state.params;

		// Check if product detail already saved
		if(products.filter(product => (product.id === data.id)).length > 0) {
			// don't need to update anything
		} else {
			const dataToSend = {
				id,
				name: data.name,
				image: data.image,
				price: data.price
			}

			this.props.dispatch(addProductDetail(dataToSend));
		}

		// give notification to user
		Toast.show({
			text: 'Ditambahkan ke keranjang!',
			duration: 2000
		})
	}

	render() {
		const { data, isLoading } = this.props.product;

		if (isLoading) {
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>
					<Spinner style={{marginTop:'100%'}} color='#e64c65' />
				</View>
			)
		} else {
			return (
				<StyleProvider style={getTheme(material)}>
					<Container>
						<HeaderSection title={data.name} navigation={this.props.navigation} />

						<ContentSection data={data} navigation={this.props.navigation} addproduct={this.addProduct} />
					</Container>
				</StyleProvider>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	product: state.product,
	cart: state.cart
});

export default connect(mapStateToProps)(ProductDetail);