import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
    List,
    Divider,
    useTheme
} from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux'

import { 
    setMapSettingMapStyle
} from '../redux'

function MapStyle({navigation}) {
    const mapSettings = useSelector(state => state.mapSettings);
    const mapStyles = useSelector(state => state.mapStyles);

    const dispatch = useDispatch();
    const mapSettingMapStyle = data => dispatch(setMapSettingMapStyle(data));

    const { colors } = useTheme();
    
    const renderItem = ({item}) => (
        <List.Item
            title={item.name}
            right={props => item.name === mapSettings.mapStyle.name ? <List.Icon {...props} icon="check" /> : null }
            onPress={() => { mapSettingMapStyle(item); navigation.navigate('Map');}}
        />
    );

    const keyExtractor = (item) => item.name;

    return (
        <FlatList
            contentContainerStyle={{
                backgroundColor: colors.background
            }}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            data={mapStyles}
        />
    );
}

export default MapStyle;
