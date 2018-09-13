import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Content, Card, CardItem } from 'native-base';
import StepIndicator from 'react-native-step-indicator';

class ContentSection extends Component {
	constructor() {
		super()
	}

	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	render() {
		const { list, detail, progress, statusLabels, isLoading } = this.props;

		if (list.length > 0) {
			return (
				<Content style={{padding:10, paddingBottom:25}}>
					<StepIndicator
						currentPosition={progress}
						stepCount={3}
						labels={statusLabels}
						customStyles={progressStyle}
					/>

					{list.map((item, index) => {
						return (
							<Card>
								<View style={{flex: 0.3}}>
									<Image source={{uri: item.image}} style={{width:'100%'}} />
								</View>

								<View style={{flex: 0.7}}>
									<Text style={styles.productName}>{item.name}</Text>
									<Text style={styles.productPrice}>{this.convertToRupiah(item.subtotal)}</Text>
								</View>
							</Card>
						)
					})}
				</Content>
			)
		} else {
			return <View />
		}
	}
}

export default ContentSection;

const styles = StyleSheet.create({
	productName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#212121'
	},
	productPrice: {
		fontSize: 15,
		color: '#e64c65'
	}
});

const progressStyle = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 4,
	currentStepStrokeWidth: 5,
	stepStrokeCurrentColor: '#e64c65',
	stepStrokeWidth: 5,
	stepStrokeFinishedColor: '#e64c65',
	stepStrokeUnFinishedColor: '#eee',
	separatorFinishedColor: '#e64c65',
	separatorUnFinishedColor: '#eee',
	stepIndicatorFinishedColor: '#e64c65',
	stepIndicatorUnFinishedColor: '#fefefe',
	stepIndicatorCurrentColor: '#eee',
	stepIndicatorLabelFontSize: 10,
	currentStepIndicatorLabelFontSize: 10,
	stepIndicatorLabelCurrentColor: '#eee',
	stepIndicatorLabelFinishedColor: '#e64c65',
	stepIndicatorLabelUnFinishedColor: '#fefefe',
	labelColor: '#999',
	labelSize: 14,
	currentStepLabelColor: '#e64c65'
}