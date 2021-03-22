import React, { Component } from 'react';
import { View, Button } from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps'

import { CreateGridLines } from '../Helpers/MapHelpers'

MapboxGL.setAccessToken('pk.eyJ1IjoibWFyay1saXNvbiIsImEiOiJja2tuMjkzNTUxeHFvMnVwZzM3OWh5N3JtIn0.0wy5pNCvpo1oSpwNzeBBZw');

const EXPLORER_ZOOM = 14.0
const GRID_SOURCE_ID = "grid_source"
const GRID_LAYER_ID = "grid_layer"

class MapScreen extends Component {

    mapview = null;
    grid = true;

    constructor() {
        super();
        this.state = {
            route: null
        }
    }

    test = () => {
        this.updateGrid();
    }

    onRegionDidChange = () => {
        this.updateGrid();
    }

    onDidFinishLoadingMap = () => {
        console.log('onDidFinishLoadingMap');
    }

    onDidFinishRenderingFrameFully = () => {
        console.log('onDidFinishRenderingFrameFully');
        
    }

    updateGrid = () => {
        const region = this.mapview.state.region;
        if (region && region.properties.zoomLevel >= 10) {
            console.log(region.properties.zoomLevel);
            const bounds = this.mapview.state.region.properties.visibleBounds;
            const gridLines = CreateGridLines(bounds);
            this.setState({route: gridLines});
        } else {
            this.setState({route: null});
        }
    }

    line = () => {
        return this.grid && this.state.route && (
            <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
                <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'green' }} />
            </MapboxGL.ShapeSource>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50 }}>
                    <Button 
                        onPress={this.test}
                        title="Test" />
                </View>

                <MapboxGL.MapView 
                    ref={(ref) => { this.mapview = ref }}
                    style={{ flex: 1 }}
                    onRegionDidChange={this.onRegionDidChange}
                    onDidFinishLoadingMap={this.onDidFinishLoadingMap}
                    onDidFinishRenderingFrameFully={this.onDidFinishRenderingFrameFully}>

                    <MapboxGL.UserLocation />

                    <MapboxGL.Camera followUserLocation={true} />

                    {this.line()}
                </MapboxGL.MapView>
            </View>
        );
    }
}

export default MapScreen;