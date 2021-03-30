import React, { useState } from 'react';
import { View, Button } from 'react-native';

import { CreateExplorerTiles, CreateGridLines } from '../Helpers/MapHelpers'
import MapboxGL from '@react-native-mapbox-gl/maps'

import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../redux/notesApp'

MapboxGL.setAccessToken('pk.eyJ1IjoibWFyay1saXNvbiIsImEiOiJja2tuMjkzNTUxeHFvMnVwZzM3OWh5N3JtIn0.0wy5pNCvpo1oSpwNzeBBZw');

function MapScreen(props) {

    const notes = useSelector(state => state)
    const dispatch = useDispatch()
    const addNote = note => dispatch(addnote(note))
    const deleteNote = id => dispatch(deletenote(id))

    let mapview = null;
    let grid = true;

    const [route, setRoute] = useState(null);

    function test() {
        console.log(region.properties.zoomLevel);
        console.log(region.properties.visibleBounds);
    }

    function onRegionDidChange() {
        updateGrid();
    }

    function updateGrid() {
        const region = mapview.state.region;
        if (region && region.properties.zoomLevel >= 10) {
            const bounds = region.properties.visibleBounds;
            const gridLines = CreateGridLines(bounds);

            setRoute(gridLines);
        } else {
            setRoute(null);
        }
    }

    function gridLines() {
        return grid && route && (
            <MapboxGL.ShapeSource id='gridLinesSource' shape={route}>
                <MapboxGL.LineLayer id='gridLinesLayer' style={{ lineColor: 'green', lineWidth: 2 }} />
            </MapboxGL.ShapeSource>
        )
    }

    function allRides() {
        return props.route.params && props.route.params.allRidesJson && (
            <MapboxGL.ShapeSource id='allRidesSource' shape={props.route.params.allRidesJson}>
                <MapboxGL.LineLayer id='allRidesLayer' style={{ lineColor: 'red' }} />
            </MapboxGL.ShapeSource>
        )
    }

    function tiles() {

        let result = null;
        if (props.route.params && props.route.params.explorerTiles) {
          //  console.log('explorerTiles', this.props.route.params.explorerTiles);

            const data = props.route.params.explorerTiles;

            result = CreateExplorerTiles(data);

        }

        console.log(result);

        return result && props.route.params && props.route.params.explorerTiles && (
            <MapboxGL.ShapeSource id='explorerTilesSource' shape={result}>
                <MapboxGL.FillLayer id='explorerTilesLayer' style={{ fillColor: 'yellow', fillOpacity: 0.25, fillOutlineColor: 'black' }} />
            </MapboxGL.ShapeSource>
        )
    }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50 }}>
                    <Button 
                        onPress={test}
                        title="Test" />
                </View>

                <MapboxGL.MapView 
                    ref={(ref) => { mapview = ref }}
                    style={{ flex: 1 }}
                    onRegionDidChange={onRegionDidChange}>

                    <MapboxGL.UserLocation />

                    <MapboxGL.Camera followUserLocation={true} />

                    {gridLines()}
                    {allRides()}
                    {tiles()}
                </MapboxGL.MapView>
            </View>
        );
    
}

export default MapScreen;