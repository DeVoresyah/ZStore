import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../../home';

const HomeNav = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			header: null
		}
	}
}, {
	initialRouteName: 'Home'
});

export default HomeNav;