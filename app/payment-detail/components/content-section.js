import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Content, Card, CardItem, Spinner } from 'native-base';

class ContentSection extends Component {
	constructor() {
		super()
	}

	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	convertDigit = (num) => {
		return (num < 10) ? ("0" + num) : num
	}

	render() {
		const { data, payment, type } = this.props;

		let totalTransfer = {
			left: '',
			right: ''
		};

		let receiver = {
			name: '',
			address: '',
			logo: ''
		}

		if (data !== null) {
			const price = this.convertToRupiah(data.total);

			totalTransfer.left = price.slice(0, (price.length - 2));
			totalTransfer.right = this.convertDigit(Math.floor(Math.random() * 99) + 1);
		}

		if (payment !== null) {
			switch (type) {
				case 'bank':
					receiver.name = "a/n " + payment.atas_nama;
					receiver.address = payment.rek;
					receiver.logo = payment.logo;
					break;

				case 'digital':
					receiver.name = '';
					receiver.address = payment.address;
					receiver.logo = payment.img;
					break;

				default:
					receiver.name = '';
					receiver.address = '';
					receiver.logo = '';
					break;
			}
		}

		return (
			<Content style={{padding:10, backgroundColor:'#f5f5f5'}}>
				<Card transparent style={{marginTop:10, alignItems:'center', backgroundColor:'#fff'}}>
					<CardItem style={{flexDirection:'column'}}>
						<Text style={styles.topLabel}>Harap transfer sesuai nominal:</Text>
						<Text style={styles.topPrice}>{totalTransfer.left}<Text style={{color:'red'}}>{totalTransfer.right}</Text></Text>
					</CardItem>

					<CardItem style={{flexDirection:'column'}}>
						<Image source={{uri: receiver.logo}} style={{width:180, height:70, marginBottom:8}} />
						<Text style={styles.addressLabel}>{receiver.address}</Text>
						<Text style={styles.addressText}>{receiver.name}</Text>
					</CardItem>
				</Card>
			</Content>
		)
	}
}

export default ContentSection;

const styles = StyleSheet.create({
	topLabel: {
		fontSize:17,
		color:'#212121',
		textAlign: 'center'
	},
	topPrice: {
		fontSize:22,
		fontWeight:'bold',
		color:'#212121',
		textAlign: 'center'
	},
	addressLabel: {
		fontSize: 17,
		fontWeight: 'bold',
		color: '#212121'
	},
	addressText: {
		fontSize: 15,
		color: '#616161'
	}
});