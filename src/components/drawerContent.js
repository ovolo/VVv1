import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Appbar,
    Colors,
    Divider,
    FAB,
    Switch,
    Paragraph,
    Title,
    Drawer,
    useTheme
} from 'react-native-paper';

import {
    DrawerContentComponentProps,
    DrawerContentOptions,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { useSelector, useDispatch } from 'react-redux'

import { 
    setMapSettingShowGrid, 
    setMapSettingShowAllRides, 
    setMapSettingShowExplorerTiles
} from '../redux'

function DrawerContent({navigation}) {
    const mapSettings = useSelector(state => state.mapSettings);

    const dispatch = useDispatch();
    const mapSettingShowGrid = data => dispatch(setMapSettingShowGrid(data));
    const mapSettingShowAllRides = data => dispatch(setMapSettingShowAllRides(data));
    const mapSettingShowExplorerTiles = data => dispatch(setMapSettingShowExplorerTiles(data));

    return (
        <DrawerContentScrollView>
            <View style={styles.drawerContent}>
                <View style={styles.header}>
                    <Title style={styles.title}>Explorer Helper</Title>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <Drawer.Item
                        icon='refresh'
                        label='Refresh Velo Viewer Data'
                        onPress={() => {navigation.navigate('VV');}}
                    />
                </Drawer.Section>

                <Drawer.Section style={styles.drawerSection}>
                    <Drawer.Item
                        icon='map'
                        label={'Map Style - ' + mapSettings.mapStyle.name}
                        onPress={() => {navigation.navigate('MapStyle');}}
                    />
                </Drawer.Section>

                <View style={styles.row}>
                    <Paragraph>Show Grid</Paragraph>
                    <Switch value={mapSettings.showGrid} onValueChange={mapSettingShowGrid} />
                </View>
                <Divider />
                <View style={styles.row}>
                    <Paragraph>Show All Rides</Paragraph>
                    <Switch value={mapSettings.showAllRides} onValueChange={mapSettingShowAllRides} />
                </View>
                <Divider />
                <View style={styles.row}>
                    <Paragraph>Show Explorer Tiles</Paragraph>
                    <Switch value={mapSettings.showExplorerTiles} onValueChange={mapSettingShowExplorerTiles} />
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    header: {
        paddingLeft: 16,
    },    
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 28,
    },
  });