import 'react-native-gesture-handler';

import React from 'react';
import { enableScreens } from 'react-native-screens';

import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';

import store from './redux/store'

import RootNavigator from './navigation/rootNavigator'

enableScreens(true);

const App: () => React$Node = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <RootNavigator/>
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;