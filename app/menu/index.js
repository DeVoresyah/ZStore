import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image, View, Text } from 'react-native';
import { StyleProvider, Container, Card, Button, Icon, Spinner } from 'native-base';

// Redux
import { connect } from 'react-redux';
import { getMenu } from '../public/redux/actions/menu';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Components
import HeaderSection from './components/header-section';

class Menu extends Component {
	componentDidMount() {
		this.getData()
	}

	getData = () => {
		this.props.dispatch(getMenu());
	}

	render() {
		const { data, isLoading } = this.props.menu;

		if (isLoading) {
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>
					<Spinner style={{marginTop:'100%'}} color='#e64c65' />
				</View>
			)
		} else {
			return (
				<StyleProvider style={getTheme(material)}>
					<Container>
						<HeaderSection />

						<View style={{flex:1, backgroundColor:'#f5f5f5', paddingTop:10, paddingRight:8, paddingBottom:8}}>
							<FlatList
								data={data}
								keyExtractor={this._keyExtractor}
								renderItem={this._renderItem}
								refreshing={isLoading}
								onRefresh={()=>this.getData}
								numColumns={2}
							/>
						</View>
					</Container>
				</StyleProvider>
			)
		}
	}

	_keyExtractor = (item, index) => item.id.toString();

	_renderItem = ({item}) => (
		<Card transparent style={styles.productOuter}>
			<TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('Products', {id:item.id})}>
				<Image source={{uri: 'http://192.168.100.3:3000/'+item.image}} style={styles.imgThumb} />

				<Text style={styles.titleText}>{item.title}</Text>
			</TouchableOpacity>
		</Card>
	);
}

const mapStateToProps = (state) => ({
	menu: state.menu
});

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
	imgThumb: {
		width: 150,
		height: 67,
		marginBottom: 10
	},
	titleText: {
		color: '#212121',
		fontSize: 13,
		textAlign: 'center'
	},
	productOuter: {
		flexDirection: 'column',
		padding: 8,
		marginLeft: 8,
		backgroundColor: '#fff'
	}
});