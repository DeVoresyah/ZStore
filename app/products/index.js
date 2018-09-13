import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, TouchableOpacity, View, Text } from 'react-native';
import { StyleProvider, Container, Card, Icon, Spinner } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { getProducts } from '../public/redux/actions/menu';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Components
import HeaderSection from './components/header-section';

class Products extends Component {
	constructor(props) {
		super(props);

		this.category_id = this.props.navigation.state.params.id;
		this.navigation = this.props.navigation;
	}

	componentDidMount() {
		this.getData();
	}

	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	getData = () => {
		this.props.dispatch(getProducts(this.category_id));
	}

	render() {
		const { category_products, titlePage, isLoading } = this.props.menu;
		let productList = [];

		if (category_products.length > 0) {
			productList = category_products.map(item => ({
				id: item.id,
				name: item.name,
				image: item.image,
				price: this.convertToRupiah(item.price),
				title: item.title
			}))
		} else {
			productList = category_products
		}

		if (isLoading) {
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>
					<Spinner style={{marginTop:'100%'}} color='#e64c65' />
				</View>
			)
		} else {
			if (productList.length > 0) {
				return (
					<StyleProvider style={getTheme(material)}>
						<Container>
							<HeaderSection title={titlePage} navigation={this.props.navigation} />

							<View style={{flex:1, backgroundColor:'#f5f5f5', paddingTop:10, paddingRight:8, paddingBottom:8}}>
								<FlatList
									data={productList}
									keyExtractor={this._keyExtractor}
									renderItem={this._renderItem}
									refreshing={isLoading}
									onRefresh={()=>this.getData}
									numColumns={2}
								/>
							</View>
						</Container>
					</StyleProvider>
				)
			} else {
				return null
			}
		}
	}

	_keyExtractor = (item, index) => index.toString();

	_renderItem = ({item}) => (
		<Card transparent style={styles.productOuter}>
			<ImageBackground source={{uri: 'http://192.168.100.3:3000/'+item.image}} style={styles.imgThumb}>
				<View style={styles.priceBox}>
					<Text style={styles.priceText}>{item.price}</Text>
				</View>
			</ImageBackground>

			<View style={{padding:8}}>
				<Text style={styles.titleText}>{item.name}</Text>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.buyButton}
					onPress={()=>this.navigation.navigate('ProductDetail', {id:item.id})}
				>
					<Text style={styles.buyText}>Beli</Text>
				</TouchableOpacity>
			</View>
		</Card>
	);
}

const mapStateToProps = (state) => ({
	menu: state.menu
});

export default connect(mapStateToProps)(Products);

const styles = StyleSheet.create({
	imgThumb: {
		width: '100%',
		height: 78,
		resizeMode: 'stretch'
	},
	titleText: {
		color: '#212121',
		fontSize: 14,
		textAlign: 'center'
	},
	productOuter: {
		flexDirection: 'column',
		width: 167,
		marginLeft: 8,
		backgroundColor: '#fff'
	},
	priceBox: {
		backgroundColor:'#e64c65',
		padding: 4,
		alignSelf: 'flex-start'
	},
	priceText: {
		fontSize: 10,
		color: '#fff',
		textAlign: 'center'
	},
	buyButton: {
		backgroundColor: '#e64c65',
		padding: 5,
		justifyContent: 'center',
		marginTop: 10
	},
	buyText: {
		fontSize: 13,
		color: '#fff',
		textAlign: 'center'
	}
});