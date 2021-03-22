import React, { Component } from 'react';
import { View, Button } from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps'

import { lineString, featureCollection } from '@turf/helpers'
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
        console.log('updateGrid');

        //this.updateGrid();

        console.log('updatedGrid');
    }

    setupGrid = (style) => {
        style.addSource(GeoJsonSource(GRID_SOURCE_ID))
        let gridLayer = LineLayer(GRID_LAYER_ID, GRID_SOURCE_ID)
            .withProperties(
                //PropertyFactory.visibility(if (grid) Property.VISIBLE else Property.NONE)
                PropertyFactory.visibility(Property.VISIBLE)
            )
        gridLayer.minZoom = 10
        style.addLayer(gridLayer)
        updateLayerColor(style, GRID_LAYER_ID, gridKey)
        if (this.grid) {
            updateGrid()
        }
    }

    updateGrid = () => {
        if (this.mapview.state.region) {
            console.log('updateGrid 1');
            console.log(this.mapview.state.region);
            console.log(this.mapview.state.region.properties);
            console.log(this.mapview.state.region.properties.visibleBounds);
            const bounds = this.mapview.state.region.properties.visibleBounds;
            console.log('updateGrid 2');
            const gridLines = CreateGridLines(bounds);
            console.log('updateGrid 3');
            this.setState({route: gridLines});
            console.log('updateGrid 4');
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
                    onRegionDidChange={this.onRegionDidChange}>

                    <MapboxGL.UserLocation />
                    <MapboxGL.Camera zoomLevel={9} followUserLocation={true} />

                    {this.line()}
                </MapboxGL.MapView>
            </View>
        );
    }
}

export default MapScreen;