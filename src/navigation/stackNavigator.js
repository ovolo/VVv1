import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CustomNavigationBar from './customNavigationBar'
import Map from '../components/map'
import VeloViewer from '../components/veloViewer'
import MapStyle from '../components/mapStyle'

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Map" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, }}>
            <Stack.Screen name="Map" component={Map} options={{ headerTitle: 'Map' }} />
            <Stack.Screen name="VV" component={VeloViewer} options={{ headerTitle: 'Velo Viewer' }}/>
            <Stack.Screen name="MapStyle" component={MapStyle} options={{ headerTitle: 'Map Style' }}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;