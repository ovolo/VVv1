import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux'

import { CreateExplorerTiles, CreateGridLines } from '../helpers/mapHelpers'
import MapboxGL from '@react-native-mapbox-gl/maps'

MapboxGL.setAccessToken('pk.eyJ1IjoibWFyay1saXNvbiIsImEiOiJja2tuMjkzNTUxeHFvMnVwZzM3OWh5N3JtIn0.0wy5pNCvpo1oSpwNzeBBZw');

function Map(props) {
    const veloViewerData = useSelector(state => state.veloViewerData);    
    const mapSettings = useSelector(state => state.mapSettings);

    const refMapView = useRef();

    const [gridLines, setGridLines] = useState(null);

    function handleRegionDidChange() {
        const { current } = refMapView;

        const region = current.state.region;
        if (region && region.properties.zoomLevel >= 10) {
            const bounds = region.properties.visibleBounds;
            const newGridLines = CreateGridLines(bounds);
            setGridLines(newGridLines);
        } else {
            setGridLines(null);
        }
    }

    function gridLinesShapeSource() {
        return mapSettings.showGrid && gridLines && (
            <MapboxGL.ShapeSource id='gridLinesSource' shape={gridLines}>
                <MapboxGL.LineLayer id='gridLinesLayer' style={{ lineColor: 'green', lineWidth: 2 }} />
            </MapboxGL.ShapeSource>
        )
    }

    function allRidesShapeSource() {
        return mapSettings.showAllRides && veloViewerData.allRidesJson && (
            <MapboxGL.ShapeSource id='allRidesSource' shape={veloViewerData.allRidesJson}>
                <MapboxGL.LineLayer id='allRidesLayer' style={{ lineColor: 'red' }} />
            </MapboxGL.ShapeSource>
        )
    }

    function explorerTilesShapeSource() {
        return mapSettings.showExplorerTiles && veloViewerData.explorerTiles && (
            <MapboxGL.ShapeSource id='explorerTilesSource' shape={CreateExplorerTiles(veloViewerData.explorerTiles)}>
                <MapboxGL.FillLayer id='explorerTilesLayer' style={{ fillColor: 'yellow', fillOpacity: 0.25, fillOutlineColor: 'black' }} />
            </MapboxGL.ShapeSource>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <MapboxGL.MapView 
                ref={refMapView}
                style={{ flex: 1 }}
                onRegionDidChange={handleRegionDidChange}>

                <MapboxGL.UserLocation />

                <MapboxGL.Camera followUserLocation={true} />

                {explorerTilesShapeSource()}
                {gridLinesShapeSource()}
                {allRidesShapeSource()}
            </MapboxGL.MapView>
        </View>
    );
}

export default Map;