import { combineReducers } from 'redux';

import menuReducer from './menu';
import productReducer from './product';
import cartReducer from './cart';
import paymentReducer from './payment';
import transactionReducer from './transactions';

const reducers = combineReducers({
	menu: menuReducer,
	product: productReducer,
	cart: cartReducer,
	payment: paymentReducer,
	transactions: transactionReducer
});

export default reducers;