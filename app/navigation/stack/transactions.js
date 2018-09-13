import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Transactions from '../../transactions';
import TransactionDetail from '../../transaction-detail';

const TransactionNav = createStackNavigator({
  Transactions: {
    screen: Transactions,
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
});

TransactionNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  }
};

export default TransactionNav;