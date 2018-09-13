import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Content, List, ListItem, Body, Right, Icon } from 'native-base';

class PaymentList extends Component {
	constructor() {
		super()
	}

	render() {
		const { bank, digital, navigation } = this.props;

		return (
			<Content>
				<List>
					<ListItem itemDivider>
						<Text>Bank Transfer</Text>
					</ListItem>
					{bank.map((item, index) => (
						<ListItem icon onPress={() => navigation.navigate('PaymentDetail', {type:'bank', id:item.id})} key={index}>
							<Body>
								<Text style={{color:'#212121'}}>{item.bank}</Text>
							</Body>
							<Right>
								<Icon active name='arrow-forward' style={{color:'#212121'}} />
							</Right>
						</ListItem>
					))}

					<ListItem itemDivider style={{marginTop:20}}>
						<Text>Digital Payment</Text>
					</ListItem>
					{digital.map((item, index) => (
						<ListItem icon onPress={() => navigation.navigate('PaymentDetail', {type:'digital', id:item.id})} key={index}>
							<Body>
								<Text style={{color:'#212121'}}>{item.name}</Text>
							</Body>
							<Right>
								<Icon active name='arrow-forward' style={{color:'#212121'}} />
							</Right>
						</ListItem>
					))}
				</List>
			</Content>
		)
	}
}

export default PaymentList;