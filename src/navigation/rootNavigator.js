import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigator from './stackNavigator'
import DrawerContent from '../components/drawerContent'

const Drawer = createDrawerNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={StackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;