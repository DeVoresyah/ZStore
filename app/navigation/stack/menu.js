import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Menu from '../../menu';
import Products from '../../products';
import ProductDetail from '../../product-detail';

const MenuNav = createStackNavigator({
	Menu: {
		screen: Menu,
		navigationOptions: {
			header: null
		}
	},
	Products: {
		screen: Products,
		navigationOptions: {
			header: null
		}
	},
	ProductDetail: {
		screen: ProductDetail,
		navigationOptions: {
			header: null
		}
	}
});

MenuNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  }
};

export default MenuNav;