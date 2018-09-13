import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import {
	StyleProvider,
	Container,
	Content,
	Footer,
	FooterTab,
	Item,
	Input,
	Label,
	Button,
	Icon,
	Spinner
} from 'native-base';

// Redux
import { connect } from 'react-redux';
import { updatePhone, submitOrder } from '../public/redux/actions/cart';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Component
import HeaderSection from './components/header-section';

class ConfirmOrder extends Component {
	constructor(props) {
		super(props)
	}

	_validatePhone = (phone) => {
		const checker = /^\+?[0-9]*$/;

		return checker.test(phone)
	}

	_updatePhone = (value) => {
		this.props.dispatch(updatePhone(value));
	}

	_submitOrder = () => {
		const { orders, transaction_id, phone } = this.props.cart;

		const dataToSend = {
			orders,
			transaction_id,
			phone,
		}

		this.props.dispatch(submitOrder(dataToSend));
		this.props.navigation.navigate('PaymentMethod');
	}

	_payOrder = () => {
		const { phone } = this.props.cart;

		if (phone === "") {
			alert('Harap masukkan nomor telepon!')
		} else if (this._validatePhone(phone) === false) {
			alert('Nomor telepon tidak valid!')
		} else {
			Alert.alert(
				'Konfirmasi Pesanan',
				'Apakah Anda yakin nomor telepon sudah benar?',
				[
					{text: 'Batal', style: 'cancel'},
					{text: 'Iya', onPress: () => this._submitOrder()}
				]
			)
		}
	}

	render() {
		const { orders, transaction_id, phone, isLoading } = this.props.cart;

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
						<HeaderSection navigation={this.props.navigation} />

						<Content style={{flex:1, padding:15, paddingLeft:25, paddingRight:25}}>
							<Item floatingLabel>
								<Label>No HP</Label>
								<Input value={phone} onChangeText={this._updatePhone} style={{color:'#212121'}} />
							</Item>
						</Content>

						<Footer>
							<FooterTab>
								<Button transparent style={styles.payButton} onPress={this._payOrder}>
									<Text style={{fontSize:18, color:'#fff', fontWeight:'bold', marginLeft:18}}>BAYAR</Text>
									<Icon name='arrow-forward' style={{fontSize:22, color:'#fff', fontWeight:'bold'}} />
								</Button>
							</FooterTab>
						</Footer>
					</Container>
				</StyleProvider>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart
});

export default connect(mapStateToProps)(ConfirmOrder);

const styles = StyleSheet.create({
	payButton: {
		width:'100%',
		flexDirection:'row',
		justifyContent:'center'
	}
});