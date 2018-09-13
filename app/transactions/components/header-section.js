import React, { Component } from 'react';
import { Header, Body, Text } from 'native-base';

class HeaderSection extends Component {
	render() {
		return (
			<Header>
				<Body style={{justifyContent:'center', alignItems:'center'}}>
					<Text style={{fontSize:19, fontWeight:'bold', textAlign:'center'}}>Daftar Transaksi</Text>
				</Body>
			</Header>
		)
	}
}

export default HeaderSection;