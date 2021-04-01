import 'react-native-gesture-handler';

import React from 'react';
import { View, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { Provider } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import store from './redux/store'

import Map from './components/map'
import VeloViewer from './components/veloViewer'

function Settings() {
    return (        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings*</Text>
        </View>        
    );
}

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
        <Provider store={store}>
            <NavigationContainer>            
                <MyTabs />            
            </NavigationContainer>
        </Provider>
    );
};

export default App;