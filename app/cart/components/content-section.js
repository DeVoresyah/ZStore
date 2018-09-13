import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import { Content, Card, CardItem, Item, Button, Input, Icon } from 'native-base';

class ContentSection extends Component {
	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	render() {
		let { orders, products } = this.props.cart;
		const { addQty, removeQty, changeQty, navigation } = this.props;

		if (orders.length > 0) {
			let totalPrice = 0;
			orders.forEach(item => {
				totalPrice = totalPrice + item.subtotal
			});

			return (
				<Content style={styles.wrapper}>
					{orders.map((item, index) => (
							<Card transparent key={index} style={{backgroundColor:'#fff'}}>
								<CardItem style={{paddingBottom:0}}>
									<Text style={styles.productName}>{products[index].name}</Text>
								</CardItem>

								<CardItem style={{flexDirection:'row'}}>
									<View style={{flex:0.5}}>
										<Image source={{uri: 'http://192.168.100.3:3000/'+products[index].image}} style={styles.imgThumb} />
									</View>

									<View style={{flex:0.3, flexDirection:'row', alignItems:'center'}}>
										<View style={{flex:0.25}}>
											<TouchableOpacity
												activeOpacity={0.8}
												style={styles.removeQty}
												onPress={() => removeQty(item.product_id)}
											>
												<Icon name='md-remove' style={styles.qtyIcon} />
											</TouchableOpacity>
										</View>

										<View style={{flex:0.35, marginLeft:3}}>
											<Item regular style={{height:25}}>
												<Input
													value={item.qty.toString()}
													keyboardType='numeric'
													selectTextOnFocus={true}
													style={styles.inputText}
													onChangeText={(text) => changeQty(text, {index:index, id:item.product_id})}
												/>
											</Item>
										</View>

										<View style={{flex:0.25, marginLeft:5}}>
											<TouchableOpacity
												activeOpacity={0.8}
												style={styles.addQty}
												onPress={() => addQty(item.product_id)}
											>
												<Icon name='md-add' style={styles.qtyIcon} />
											</TouchableOpacity>
										</View>
									</View>

									<View style={{flex:0.3, alignItems:'flex-end'}}>
										<Text style={styles.priceText}>{this.convertToRupiah(item.subtotal)}</Text>
									</View>
								</CardItem>
							</Card>
					))}

					<Card transparent style={styles.footer}>
						<CardItem style={{flexDirection:'column'}}>
							<View style={{flexDirection:'row'}}>
								<View style={{flex:0.5}}>
									<Text style={styles.totalLabel}>Total</Text>
								</View>

								<View style={{flex:0.5, alignItems:'flex-end'}}>
									<Text style={styles.totalText}>{this.convertToRupiah(totalPrice)}</Text>
								</View>
							</View>

							<View style={{width:'100%', marginTop:10}}>
								<Button primary full onPress={() => navigation.navigate('ConfirmOrder')}>
									<Text style={styles.checkoutText}>Checkout</Text>
								</Button>
							</View>
						</CardItem>
					</Card>
				</Content>
			)
		} else {
			return (
				<Content>
					<View style={{marginTop:'60%', alignItems:'center'}}>
						<Text style={{color:'#212121', fontSize:16}}>Keranjang Belanja Kosong!</Text>
					</View>
				</Content>
			)
		}
	}
}

export default ContentSection;

const styles = StyleSheet.create({
	wrapper: {
		padding: 8,
		backgroundColor: '#f5f5f5'
	},
	imgThumb: {
		width: 110,
		height: 50
	},
	productName: {
		fontSize: 18,
		color: '#212121',
		fontWeight: 'bold'
	},
	priceText: {
		fontSize: 14,
		color: '#e64c65',
	},
	inputText: {
		fontSize: 14,
		color: '#212121',
		textAlign: 'center',
		paddingLeft: 4,
		paddingRight: 4
	},
	removeQty: {
		backgroundColor: '#222',
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	addQty: {
		backgroundColor: '#e64c65',
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	qtyIcon: {
		fontSize: 14,
		color: '#fff',
		textAlign: 'center'
	},
	footer: {
		marginTop: 30,
		marginBottom: 20,
		backgroundColor: '#fff'
	},
	totalLabel: {
		fontSize: 20,
		color: '#222',
		fontWeight: 'bold'
	},
	totalText: {
		fontSize: 20,
		color: '#e64c65',
		fontWeight: 'bold'
	},
	checkoutText: {
		color: '#fff',
		fontSize: 16
	}
});