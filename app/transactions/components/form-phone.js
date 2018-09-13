import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';

class FormPhone extends Component {
	constructor() {
		super()
	}

	render() {
		const { phone, changePhone, saveNumber } = this.props;

		return (
			<Content style={{padding: 10, paddingTop:20, backgroundColor:'#f5f5f5'}}>
				<Form>
					<View style={styles.notice}>
						<Text style={{color:'#424242'}}>Anda belum memasukkan nomor telepon, harap masukkan nomor telepon!</Text>
					</View>

					<Item floatingLabel style={{left:-10}}>
						<Label>Masukkan No. HP</Label>
						<Input value={phone} onChangeText={(value) => changePhone(value)} style={{color:'#212121'}} />
					</Item>

					<Button full primary style={{marginTop:15}} onPress={() => saveNumber()}>
						<Text style={{color:'#fff'}}>Simpan</Text>
					</Button>
				</Form>
			</Content>
		)
	}
}

export default FormPhone;

const styles = StyleSheet.create({
	notice: {
		backgroundColor: '#eee',
		padding: 7,
		marginTop: 10,
		flexWrap: 'wrap'
	}
});