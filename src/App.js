import 'react-native-gesture-handler';

import React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from './Screens/MapScreen'
import VeloViewerScreen from './Screens/VeloViewerScreen'

function SettingsScreen() {
    return (        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings</Text>
        </View>        
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="VV" component={VeloViewerScreen} />
            <Tab.Screen name="Settings2e" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

const App: () => React$Node = () => {
    return (
        <NavigationContainer>            
            <MyTabs />            
        </NavigationContainer>
    );
};

export default App;
