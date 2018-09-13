import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleProvider, Container, Spinner } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { getPaymentList } from '../public/redux/actions/payment';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Component
import HeaderSection from './components/header-section';
import PaymentList from './components/payment-list';

class PaymentMethod extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.dispatch(getPaymentList())
	}

	render() {
		const { bank_transfer, digital_payment, isLoading } = this.props.payment;

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

						<PaymentList bank={bank_transfer} digital={digital_payment} navigation={this.props.navigation} />
					</Container>
				</StyleProvider>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	payment: state.payment
});

export default connect(mapStateToProps)(PaymentMethod);