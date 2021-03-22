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
        console.log('onRegionDidChange');
    }

    onDidFinishLoadingMap = () => {
        console.log('onDidFinishLoadingMap');
    }

    onDidFinishRenderingFrame = () => {
        console.log('onDidFinishRenderingFrame');
    }

    onDidFinishRenderingFrameFully = () => {
        console.log('onDidFinishRenderingFrameFully');
    }

    onDidFinishRenderingMap = () => {
        console.log('onDidFinishRenderingMap');
    }

    onDidFinishRenderingMapFully = () => {
        console.log('onDidFinishRenderingMapFully');
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
        const bounds = this.mapview.state.region.properties.visibleBounds;
        const gridLines = CreateGridLines(bounds);
        this.setState({route: gridLines});
    }

    line = () => {



        return this.grid && this.state.route && (
            <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
                <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'green' }} minZoomLevel='12' />
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
                    onDidFinishRenderingFrame={this.onDidFinishRenderingFrame}
                    onDidFinishRenderingFrameFully={this.onDidFinishRenderingFrameFully}
                    onDidFinishRenderingMap={this.onDidFinishRenderingMap}
                    onDidFinishRenderingMapFully={this.onDidFinishRenderingMapFully}>

                    <MapboxGL.UserLocation />
                    <MapboxGL.Camera zoomLevel={9} followUserLocation={true} />

                    {this.line()}
                </MapboxGL.MapView>
            </View>
        );
    }
}

export default MapScreen;