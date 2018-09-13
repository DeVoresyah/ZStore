import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleProvider, Container, Toast } from 'native-base';

// Theme
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// Component
import HeaderSection from './components/header-section';

class Home extends Component {
	render() {
		return (
			<StyleProvider style={getTheme(material)}>
				<Container>
					<HeaderSection />
					<Text style={{textAlign:'center',marginTop:'30%'}}>Welcome!</Text>
				</Container>
			</StyleProvider>
		)
	}
}

export default Home;