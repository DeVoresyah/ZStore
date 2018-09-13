import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { Content, Card, Button, Icon } from 'native-base';

class ContentSection extends Component {
	constructor(props) {
		super(props)
	}

	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	render() {
		const { data, navigation, addproduct } = this.props;
		let strPrice = 0;

		if (data.price != undefined) {
			strPrice = this.convertToRupiah(data.price)
		}

		return (
			<Content style={{padding:20, backgroundColor:'#f5f5f5'}}>
				<Card transparent style={{backgroundColor:'#fff'}}>
					<ImageBackground
						source={{uri: 'http://192.168.100.3:3000/'+data.image}}
						style={styles.imgThumb}
					>
						<View style={styles.priceBox}>
							<Text style={styles.priceText}>{strPrice}</Text>
						</View>
					</ImageBackground>

					<View style={{padding:8}}>
						<Text style={styles.productName}>{data.name}</Text>
						<Text style={styles.descText}>{data.description}</Text>
					</View>

					<View style={{flex:1, marginTop:10, padding:8, flexDirection:'row'}}>
						<View style={{flex:0.5, marginRight:2}}>
							<Button block dark onPress={()=>navigation.goBack()}>
								<Text style={styles.btnText}>Batal</Text>
							</Button>
						</View>

						<View style={{flex:0.5, marginLeft:2}}>
							<Button block primary iconLeft onPress={addproduct}>
								<Icon name='md-cart' style={{color:'#fff', marginRight:8}} />
								<Text style={styles.btnText}>Beli</Text>
							</Button>
						</View>
					</View>
				</Card>
			</Content>
		)
	}
}

export default ContentSection;

const styles = StyleSheet.create({
	imgThumb: {
		width: '100%',
		height: 150,
		resizeMode: 'cover'
	},
	priceBox: {
		backgroundColor: '#e64c65',
		padding: 8,
		alignSelf: 'flex-start',
		justifyContent: 'center'
	},
	priceText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center'
	},
	productName: {
		fontSize: 19,
		color: '#212121',
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 10
	},
	descText: {
		fontSize: 15,
		color: '#616161',
		backgroundColor: '#f5f5f5',
		borderRadius: 3,
		padding: 8
	},
	btnText: {
		fontSize: 16,
		color: '#fff'
	}
});