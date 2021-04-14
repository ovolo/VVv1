import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Appbar,
    Colors,
    Divider,
    FAB,
    Switch,
    Paragraph,
    useTheme,
  } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'

import { setMapSettingShowGrid, setMapSettingShowAllRides, setMapSettingShowExplorerTiles } from '../redux'

function Settings() {
    const mapSettings = useSelector(state => state.mapSettings);

    const dispatch = useDispatch();
    const mapSettingShowGrid = data => dispatch(setMapSettingShowGrid(data));
    const mapSettingShowAllRides = data => dispatch(setMapSettingShowAllRides(data));
    const mapSettingShowExplorerTiles = data => dispatch(setMapSettingShowExplorerTiles(data));

    return (
        <View style={styles.container}>
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
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 8,
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