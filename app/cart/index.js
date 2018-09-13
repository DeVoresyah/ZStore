import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { StyleProvider, Container, Spinner } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { addQty, changeQty, cartProducts, clearCart } from '../public/redux/actions/cart';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Components
import HeaderSection from './components/header-section';
import ContentSection from './components/content-section';

class Cart extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.getData()
	}

	getData = () => {
		let { orders, transaction_id, phone } = this.props.cart;

		let id_list = orders.map(item => item.product_id);
		let dataToSend = {
			product_id: id_list
		}

		this.props.dispatch(cartProducts(dataToSend));
	}

	matchArray = (arr1, arr2) => {
		for (let i = arr1.length; i--;) {
			if (arr1[i].product_id !== arr2[i].id)
				return false
		}

		return true
	}

	cartEmpty = () => {
		Alert.alert(
			'Konfirmasi',
			'Yakin ingin mengosongkan Keranjang Belanja?',
			[
				{text: 'Batal', onPress: () => console.log('Canceled'), style:'cancel'},
				{text: 'Hapus', onPress: () => this.props.dispatch(clearCart())}
			]
		)
	}

	addQty = (id) => {
		const { orders, products, transaction_id } = this.props.cart;

		// Get price product
		let product_price = products.filter(item => (item.id === id))[0];
		console.log(transaction_id);

		// Change qty and generate new array
		let new_orders = orders.map(item => {
			if (item.product_id === id) {
				let newQty = item.qty + 1;

				return {
					transaction_id,
					product_id: item.product_id,
					qty: newQty,
					subtotal: product_price.price * newQty
				}
			} else {
				return {
					transaction_id,
					product_id: item.product_id,
					qty: item.qty,
					subtotal: item.subtotal
				}
			}
		});

		this.props.dispatch(addQty(new_orders));
	}

	removeQty = (id) => {
		const { orders, products, transaction_id } = this.props.cart;

		let products_arr = products.filter(item => (item.id === id))[0];

		let new_orders = [];

		for (i=0;i<orders.length;i++) {
			if (orders[i].product_id === id) {
				if (orders[i].qty !== 1) {
					let new_qty = orders[i].qty - 1;

					new_orders.push({
						transaction_id,
						product_id: orders[i].product_id,
						qty: new_qty,
						subtotal: products_arr.price * new_qty
					});
				}
			} else {
				new_orders.push(orders[i]);
			}
		}

		this.props.dispatch(addQty(new_orders));
	}

	changeQty = (value, data) => {
		const { orders, products, transaction_id } = this.props.cart;
		const { index, id } = data;

		// Get price product
		let product_price = products.filter(item => (item.id === id))[0];
		let fixValue = 1;

		if (value === 0 || value === '') {
			fixValue = 1
		} else {
			fixValue = value
		}

		let fixPrice = fixValue * product_price.price;

		let new_orders = orders.map((item, index) => {
			if (index === data.index) {
				return {
					transaction_id,
					product_id: item.product_id,
					qty: fixValue,
					subtotal: fixPrice
				}
			} else {
				return {
					transaction_id,
					product_id: item.product_id,
					qty: item.qty,
					subtotal: item.subtotal
				}
			}
		});

		this.props.dispatch(changeQty(new_orders))
	}

	render () {
		const { isLoading } = this.props.cart;

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
						<HeaderSection clearData={this.cartEmpty} />

						<ContentSection
							cart={this.props.cart}
							addQty={this.addQty}
							removeQty={this.removeQty}
							changeQty={this.changeQty}
							navigation={this.props.navigation}
						/>
					</Container>
				</StyleProvider>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart
});

export default connect(mapStateToProps)(Cart);