import 'react-native-gesture-handler';

import React from 'react';
import { enableScreens } from 'react-native-screens';

import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';

import store from './redux/store'

import AppNavigator from './navigation/appNavigator'

enableScreens(true);

const App: () => React$Node = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <AppNavigator/>
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;