import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Content, Card, CardItem } from 'native-base';

import moment from 'moment';

class ListSection extends Component {
	constructor(props) {
		super(props)
	}

	convertToRupiah = (int) => {
		let rupiah = '';
		let intrev = int.toString().split('').reverse().join('');

		for(var i = 0; i < intrev.length; i++) if(i%3 == 0) rupiah += intrev.substr(i,3)+'.';
		return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
	}

	render() {
		const { list, navigateDetail, isRefreshing, refreshData } = this.props;

		if (list.length > 0) {
			return (
				<View style={{padding:15, paddingTop:25, backgroundColor:'#f5f5f5', flex:1}}>
					<FlatList
						data={list}
						keyExtractor={this._keyExtractor}
	            		renderItem={({item}) => (
	            			<Card transparent style={{backgroundColor:'#fff'}}>
								<TouchableOpacity activeOpacity={0.8} onPress={() => navigateDetail(item.id)}>
									<CardItem style={{flexDirection:'row'}}>
										<View style={styles.colLeft}>
											<Text style={styles.transId}>#{item.transaction_id}</Text>
											<Text style={styles.transTotal}>{this.convertToRupiah(item.total)}</Text>
										</View>

										<View style={styles.colRight}>
											<Text style={styles.transStatus}>{item.status.toUpperCase()}</Text>
											<Text style={styles.transDate}>{moment(item.date).utc().format('DD/MM/YYYY')}</Text>
										</View>
									</CardItem>
								</TouchableOpacity>
							</Card>
	            		)}
	            		refreshing={isRefreshing}
	            		onRefresh={() => refreshData}
					/>
				</View>
			)
		} else {
			return (
				<Content>
					<View style={{marginTop:'60%', alignItems:'center'}}>
						<Text style={{color:'#212121', fontSize:16}}>Anda belum pernah melakukan transaksi</Text>
					</View>
				</Content>
			)
		}
	}

	_keyExtractor = (item, index) => item.id.toString();
}

export default ListSection;

const styles = StyleSheet.create({
	colLeft: {
		flex: 0.5,
		flexDirection: 'column'
	},
	colRight: {
		flex: 0.5,
		flexDirection: 'column',
		alignSelf: 'flex-end'
	},
	transId: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#212121'
	},
	transTotal: {
		fontSize: 14,
		color: '#e64c65'
	},
	transStatus: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#212121',
		textAlign: 'right'
	},
	transDate: {
		fontSize: 14,
		color: '#e64c65',
		textAlign: 'right'
	}
});