import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { StyleProvider, Container, Spinner, Content, Card, Footer, FooterTab } from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import { StackActions, NavigationActions } from 'react-navigation';

// Redux
import { connect } from 'react-redux';
import { getTransactionDetail } from '../public/redux/actions/transactions';
import { paymentDone } from '../public/redux/actions/cart';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Component
import HeaderSection from './components/header-section';

class TransactionDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			statusLabels: ['Menunggu', 'Diproses', 'Selesai']
		}
	}

	componentDidMount() {
		const { transactionNow } = this.props.cart;

		if (transactionNow !== null) {
			this.props.dispatch(getTransactionDetail(transactionNow.id));
			setTimeout(() => {
				this.props.dispatch(paymentDone());
			}, 1000)
		} else {
			const { id } = this.props.navigation.state.params;

			this.props.dispatch(getTransactionDetail(id))
		}
	}

	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	_closeScreen = () => {
		const { backAvailable } = this.props.navigation.state.params;

		if (backAvailable === false) {
			const resetToTransaction = StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({
						routeName: 'Cart'
					})
				],
				key: null
			});

			this.props.navigation.dispatch(resetToTransaction);
		} else {
			this.props.navigation.goBack();
		}
	}

	render() {
		const { detail, list, isLoading } = this.props.transactions;

		if (isLoading) {
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>
					<Spinner style={{marginTop:'100%'}} color='#e64c65' />
				</View>
			)
		} else {
			const { statusLabels } = this.state;
			let progress = 0;

			switch (detail.status) {
				case 'pending':
					progress = 0;
					break;

				case 'process':
					progress = 1;
					break;

				case 'complete':
					progress = 2;
					break;
			}

			return (
				<StyleProvider style={getTheme(material)}>
					<Container>
						<HeaderSection titlePage={detail.id} closeScreen={this._closeScreen} />

						<Content style={{padding:10, paddingTop:30, backgroundColor:'#f5f5f5'}}>
							<StepIndicator
								currentPosition={progress}
								stepCount={3}
								labels={statusLabels}
								customStyles={progressStyle}
							/>

							{list.map((item, index) => {
								return (
									<Card transparent key={index} style={styles.productOuter}>
										<View style={{flex: 0.4}}>
											<Image source={{uri: 'http://192.168.100.3:3000/'+item.image}} style={{width:'100%', height:60}} />
										</View>

										<View style={{flex: 0.6, marginLeft:20}}>
											<Text style={styles.productName}>{item.name}</Text>
											<Text style={styles.productPrice}>{this.convertToRupiah(item.subtotal)}</Text>
										</View>
									</Card>
								)
							})}
						</Content>

						<Footer style={styles.footer}>
							<View style={{flex:0.3}}>
								<Text style={styles.totalLabel}>TOTAL</Text>
							</View>

							<View style={{flex:0.7}}>
								<Text style={styles.totalText}>{this.convertToRupiah(detail.total)}</Text>
							</View>
						</Footer>
					</Container>
				</StyleProvider>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart,
	transactions: state.transactions
});

export default connect(mapStateToProps)(TransactionDetail);

const styles = StyleSheet.create({
	productOuter: {
		backgroundColor: '#ffffff',
		padding:10,
		marginTop: 15,
		flexDirection: 'row',
		flex:1
	},
	productName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#212121'
	},
	productPrice: {
		fontSize: 14,
		color: '#e64c65'
	},
	totalLabel: {
		fontSize: 19,
		fontWeight: 'bold',
		color: '#fff'
	},
	totalText: {
		fontSize: 19,
		fontWeight: 'bold',
		color: '#e64c65',
		textAlign: 'right'
	},
	footer: {
		backgroundColor: '#222',
		flexDirection: 'row',
		padding: 10,
		paddingTop: 15,
		justifyContent: 'center'
	}
});

const progressStyle = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 4,
	currentStepStrokeWidth: 5,
	stepStrokeCurrentColor: '#e64c65',
	stepStrokeWidth: 5,
	stepStrokeFinishedColor: '#e64c65',
	stepStrokeUnFinishedColor: '#eee',
	separatorFinishedColor: '#e64c65',
	separatorUnFinishedColor: '#eee',
	stepIndicatorFinishedColor: '#e64c65',
	stepIndicatorUnFinishedColor: '#f5f5f5',
	stepIndicatorCurrentColor: '#eee',
	stepIndicatorLabelFontSize: 10,
	currentStepIndicatorLabelFontSize: 10,
	stepIndicatorLabelCurrentColor: '#eee',
	stepIndicatorLabelFinishedColor: '#e64c65',
	stepIndicatorLabelUnFinishedColor: '#f5f5f5',
	labelColor: '#999',
	labelSize: 14,
	currentStepLabelColor: '#e64c65'
}