import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Root } from 'native-base';

import { persistor, store } from './app/public/redux/store';
import RootNavigator from './app/navigation';

const App = () => {
  return (
  	<Root>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RootNavigator />
			</PersistGate>
		</Provider>
	</Root>
  )
}

export default App;