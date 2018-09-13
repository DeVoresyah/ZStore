import React, { Component } from 'react';
import { Header, Left, Body, Button, Icon, Text } from 'native-base';

class HeaderSection extends Component {
	constructor() {
		super()
	}

	render() {
		const { titlePage, closeScreen } = this.props;

		return (
			<Header>
				<Left>
					<Button transparent onPress={() => closeScreen()}>
						<Icon name='md-close' />
					</Button>
				</Left>
				<Body style={{left:-40}}>
					<Text>Transaksi #{titlePage}</Text>
				</Body>
			</Header>
		)
	}
}

export default HeaderSection;