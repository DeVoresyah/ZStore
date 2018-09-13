import React, { Component } from 'react';
import { Header, Left, Body, Button, Icon, Text } from 'native-base';

class HeaderSection extends Component {
	constructor() {
		super()
	}

	render() {
		const { navigation } = this.props;

		return (
			<Header>
				<Left>
					<Button transparent onPress={() => navigation.goBack()}>
						<Icon name='md-close' />
					</Button>
				</Left>
				
				<Body style={{left:-30}}>
					<Text>Pilih Metode Pembayaran</Text>
				</Body>
			</Header>
		)
	}
}

export default HeaderSection;