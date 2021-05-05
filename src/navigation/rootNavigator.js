import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigator from './stackNavigator'
import Settings from '../components/settings'

const Drawer = createDrawerNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <Settings {...props} />}>
                <Drawer.Screen name="Home" component={StackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;