import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Stack Navigator
import HomeNav from './stack/home';
import MenuNav from './stack/menu';
import TransactionNav from './stack/transactions';
import CartNav from './stack/cart';

const RootNavigator = createBottomTabNavigator({
	Home: {screen:HomeNav},
	Menu: {screen:MenuNav},
	Transaction: {screen:TransactionNav},
	Cart: {screen: CartNav}
}, {
  navigationOptions: ({ navigation }) => ({
  	tabBarLabel: () => {},
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'md-home';
      } else if (routeName === 'Menu') {
        iconName = 'md-menu';
      } else if (routeName === 'Transaction') {
        iconName = 'md-time';
      } else if (routeName === 'Cart') {
        iconName = 'md-basket';
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#e64c65',
    inactiveTintColor: '#c7c7c7',
    style: {
      backgroundColor: '#222'
    }
  },
  shifting: true
});

export default RootNavigator;