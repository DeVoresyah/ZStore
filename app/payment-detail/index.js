import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleProvider, Container, Spinner, Footer, FooterTab, Button, Text } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

// Redux
import { connect } from 'react-redux';
import { getPaymentBank, getPaymentDigital } from '../public/redux/actions/payment';
import { paymentDone } from '../public/redux/actions/cart';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Component
import HeaderSection from './components/header-section';
import ContentSection from './components/content-section';

class PaymentDetail extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { type, id } = this.props.navigation.state.params;

		let dataDetail = null;

		switch (type) {
			case 'bank':
				this.props.dispatch(getPaymentBank(id));
				break;

			case 'digital':
				this.props.dispatch(getPaymentDigital(id));
				break;
		}
	}

	_paymentDone = () => {
		const { transactionNow } = this.props.cart;

		const resetToTransaction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: 'TransactionDetail',
					params:{id:transactionNow.id, backAvailable:false}
				})
			],
			key: null
		});

		this.props.navigation.dispatch(resetToTransaction);
	}

	render() {
		const { bankDetail, digitalDetail, isLoading } = this.props.payment;
		const { transactionNow } = this.props.cart;
		const { type, id } = this.props.navigation.state.params;

		let headerTitle = "",
			paymentInfo = null;

		switch (type) {
			case 'bank':
				if (bankDetail !== null) {
					headerTitle = bankDetail.bank;
					paymentInfo = bankDetail;
				}
				break;

			case 'digital':
				if (digitalDetail !== null) {
					headerTitle = digitalDetail.name;
					paymentInfo = digitalDetail;
				}
				break;

			default:
				headerTitle = "";
				paymentInfo = null;
				break;
		}

		if (isLoading || transactionNow === "") {
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>
					<Spinner style={{marginTop:'100%'}} color='#e64c65' />
				</View>
			)
		} else {
			return (
				<StyleProvider style={getTheme(material)}>
					<Container>
						<HeaderSection data={headerTitle} navigation={this.props.navigation} />

						<ContentSection data={transactionNow} payment={paymentInfo} type={type} />

						<Footer>
							<FooterTab>
								<Button transparent onPress={() => this._paymentDone(transactionNow.id)}>
									<Text style={{fontSize:16, color:'#fff'}}>Selesai</Text>
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
	payment: state.payment,
	cart: state.cart
});

export default connect(mapStateToProps)(PaymentDetail);