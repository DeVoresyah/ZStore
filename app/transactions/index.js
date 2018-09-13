import React, { Component } from 'react';
import { View } from 'react-native';
import { StyleProvider, Container, Spinner } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { updatePhone } from '../public/redux/actions/cart';
import { getTrsansactions } from '../public/redux/actions/transactions';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Component
import HeaderSection from './components/header-section';
import FormPhone from './components/form-phone';
import ListSection from './components/list-section';

class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phoneTemp: ''
		}
	}

	componentDidMount() {
		const { phone } = this.props.cart;
		const { isLoading } = this.props.transactions;

		if (phone !== '' && !isLoading) {
			this.props.dispatch(getTrsansactions(phone));
		}

		this.setState({ phoneTemp: phone });	
	}

	_getData = () => {
		const { phone } = this.props.cart;

		this.props.dispatch(getTrsansactions(phone));
	}

	_updateNumber = (value) => {
		this.setState({
			phoneTemp: value
		})
	}

	_validatePhone = (phone) => {
		const checker = /^\+?[0-9]*$/;

		return checker.test(phone)
	}

	_savePhone = () => {
		const { phoneTemp } = this.state;

		if (phoneTemp === "") {
			alert('Harap masukkan nomor telepon!')
		} else if (this._validatePhone(phoneTemp) === false) {
			alert('Nomor telepon tidak valid!')
		} else {
			this.props.dispatch(getTrsansactions(phoneTemp));
			this.props.dispatch(updatePhone(phoneTemp));
		}
	}

	_navigateDetail = (id) => {
		this.props.navigation.navigate('TransactionDetail', {id, backAvailable:true})
	}

	render() {
		const { history, isLoading } = this.props.transactions;
		const { phone } = this.props.cart;
		const { phoneTemp } = this.state;

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
						{phone !== '' ? <HeaderSection /> : <View />}

						{phone === '' ? <FormPhone phone={phoneTemp} changePhone={this._updateNumber} saveNumber={this._savePhone} /> : <ListSection list={history} navigateDetail={this._navigateDetail} isRefreshing={isLoading} refreshData={this._getData} />}
					</Container>
				</StyleProvider>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	transactions: state.transactions,
	cart: state.cart
});

export default connect(mapStateToProps)(Transactions);