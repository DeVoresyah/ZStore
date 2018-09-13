import React, { Component } from 'react';
import { Header, Left, Body, Right, Text } from 'native-base';

class HeaderSection extends Component {
	render() {
		return (
			<Header>
				<Left />
				<Body style={{alignItems:'flex-end'}}>
					<Text style={{fontSize:19, fontWeight:'bold'}}>Z-Store</Text>
				</Body>
				<Right />
			</Header>
		)
	}
}

export default HeaderSection;