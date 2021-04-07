import 'react-native-gesture-handler';

import React from 'react';
import { enableScreens } from 'react-native-screens';

import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import store from './redux/store'

import Map from './components/map'
import VeloViewer from './components/veloViewer'
import Settings from './components/settings'

enableScreens(true);

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="VV" component={VeloViewer} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

const App: () => React$Node = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <NavigationContainer>            
                    <MyTabs />            
                </NavigationContainer>
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;