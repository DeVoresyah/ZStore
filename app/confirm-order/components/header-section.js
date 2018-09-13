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
					<Button transparent onPress={()=>navigation.goBack()}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				<Body style={{left:-30}}>
					<Text style={{fontSize:18}}>Lanjutkan Pemesanan</Text>
				</Body>
			</Header>
		)
	}
}

export default HeaderSection;