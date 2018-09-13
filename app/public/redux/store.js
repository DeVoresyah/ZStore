import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';
import middlewares from './middleware';
import SetTransform from './transform';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['menu', 'product'],
	stateReconciler: autoMergeLevel2,
	transforms: [SetTransform]
};

const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(
	pReducer,
	applyMiddleware(...middlewares)
);

const persistor = persistStore(store);

export {
	store,
	persistor
}