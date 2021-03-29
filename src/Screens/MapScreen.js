import React, { Component } from 'react';
import { View, Button } from 'react-native';

import { CreateExplorerTiles, CreateGridLines } from '../Helpers/MapHelpers'
import MapboxGL from '@react-native-mapbox-gl/maps'

MapboxGL.setAccessToken('pk.eyJ1IjoibWFyay1saXNvbiIsImEiOiJja2tuMjkzNTUxeHFvMnVwZzM3OWh5N3JtIn0.0wy5pNCvpo1oSpwNzeBBZw');

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
        console.log(region.properties.zoomLevel);
        console.log(region.properties.visibleBounds);
    }

    onRegionDidChange = async () => {
        this.updateGrid();
    }

    updateGrid = () => {
        const region = this.mapview.state.region;

        if (region && region.properties.zoomLevel >= 10) {
            const bounds = region.properties.visibleBounds;
            const gridLines = CreateGridLines(bounds);

            this.setState({route: gridLines});
        } else {
            this.setState({route: null});
        }
    }

    gridLines = () => {
        return this.grid && this.state.route && (
            <MapboxGL.ShapeSource id='gridLinesSource' shape={this.state.route}>
                <MapboxGL.LineLayer id='gridLinesLayer' style={{ lineColor: 'green', lineWidth: 2 }} />
            </MapboxGL.ShapeSource>
        )
    }

    allRides = () => {
        return this.props.route.params && this.props.route.params.allRidesJson && (
            <MapboxGL.ShapeSource id='allRidesSource' shape={this.props.route.params.allRidesJson}>
                <MapboxGL.LineLayer id='allRidesLayer' style={{ lineColor: 'red' }} />
            </MapboxGL.ShapeSource>
        )
    }

    tiles = () => {

        let result = null;
        if (this.props.route.params && this.props.route.params.explorerTiles) {
          //  console.log('explorerTiles', this.props.route.params.explorerTiles);

            const data = this.props.route.params.explorerTiles;

            result = CreateExplorerTiles(data);

        }

        console.log(result);

        return result && this.props.route.params && this.props.route.params.explorerTiles && (
            <MapboxGL.ShapeSource id='explorerTilesSource' shape={result}>
                <MapboxGL.FillLayer id='explorerTilesLayer' style={{ fillColor: 'yellow', fillOpacity: 0.25, fillOutlineColor: 'black' }} />
            </MapboxGL.ShapeSource>
        )
    }

    //8008-5381:
    //br: {x: -4.02099609375, y: 52.40241887397332}
    //clumped: false
    //count: 1
    //deleted: false
    //size: 2
    //tl: {x: -4.04296875, y: 52.415822612378776}
    //x: 8008
    //y: 5381
    //z: 14

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

                    <MapboxGL.Camera followUserLocation={true} />

                    {this.gridLines()}
                    {this.allRides()}
                    {this.tiles()}
                </MapboxGL.MapView>
            </View>
        );
    }
}

export default MapScreen;