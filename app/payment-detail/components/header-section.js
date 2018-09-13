import React, { Component } from 'react';
import { Header, Left, Body, Button, Icon, Text } from 'native-base';

class HeaderSection extends Component {
	constructor() {
		super()
	}

	render() {
		const { data, navigation } = this.props;

		return (
			<Header>
				<Left>
					<Button transparent onPress={() => navigation.goBack()}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				
				<Body style={{fontSize:19, left:-30}}>
					<Text>{data}</Text>
				</Body>
			</Header>
		)
	}
}

export default HeaderSection;