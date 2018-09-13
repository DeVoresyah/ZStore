import React, { Component } from 'react';
import { Header, Left, Body, Right, Text, Button, Icon } from 'native-base';

class HeaderSection extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<Header>
				<Left />
				<Body style={{alignItems:'flex-end'}}>
					<Text style={{fontSize:19, fontWeight:'bold', marginRight:8}}>Cart</Text>
				</Body>
				<Right>
					<Button transparent onPress={this.props.clearData}>
						<Icon name='md-trash' />
					</Button>
				</Right>
			</Header>
		)
	}
}

export default HeaderSection;