import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Cart from '../../cart';
import ConfirmOrder from '../../confirm-order';
import PaymentMethod from '../../payment-method';
import PaymentDetail from '../../payment-detail';
import TransactionDetail from '../../transaction-detail';

const CartNav = createStackNavigator({
	Cart: {
		screen: Cart,
		navigationOptions: {
			header: null
		}
	},
  ConfirmOrder: {
    screen: ConfirmOrder,
    navigationOptions: {
      header: null
    }
  },
  PaymentMethod: {
    screen: PaymentMethod,
    navigationOptions: {
      header: null
    }
  },
  PaymentDetail: {
    screen: PaymentDetail,
    navigationOptions: {
      header: null
    }
  },
  TransactionDetail: {
    screen: TransactionDetail,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Cart'
});

CartNav.navigationOptions = ({navigation}) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  } else if (routeName === 'TransactionDetail') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  }
};

export default CartNav;