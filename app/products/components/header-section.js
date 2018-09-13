import React, { Component } from 'react';
import { Header, Left, Body, Text, Button, Icon } from 'native-base';

class HeaderSection extends Component {
	constructor() {
		super()
	}

	render() {
		const { navigation, title } = this.props;

		return (
			<Header>
				<Left>
					<Button transparent onPress={()=>navigation.goBack()}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				<Body style={{left:-30, alignItems:'flex-start'}}>
					<Text style={{fontSize:19, fontWeight:'bold', textAlign:'center'}}>{title}</Text>
				</Body>
			</Header>
		)
	}
}

export default HeaderSection;