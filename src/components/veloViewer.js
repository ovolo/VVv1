import React, { useEffect, useRef } from 'react';
import { View, Button } from 'react-native';

import { WebView } from 'react-native-webview';
import CookieManager from "@react-native-community/cookies";

import { useDispatch } from 'react-redux'
import { applyveloviewerdata } from '../redux/notesApp'

function VeloViewer(props) {
    const getData = `
        document.getElementById('viewMapCheckBox').click();
        document.getElementById('viewMapCheckBox').click();

        var collection = { "type": "FeatureCollection", "features": [] };
        liveData.forEach( function(d, i) { if (d.ll != null) collection.features.push(d.ll.toGeoJSON()); } );

        var body = {};
        body.ridesCount = collection.features.length;
        body.allRidesJson = collection;
        body.explorerTiles = window.explorerTiles;
        body.maxClump = window.maxClump;
        body.maxSquares = window.explorerMaxs;

        window.ReactNativeWebView.postMessage(JSON.stringify(body));     
        true;` 


    const refWebView = useRef();

    const dispatch = useDispatch()
    const applyVeloViewerData = id => dispatch(applyveloviewerdata(id))

    handleLoadEnd = (event) => {
    }

    handleMessage = (event) => {
        applyVeloViewerData(JSON.parse(event.nativeEvent.data));
        
        props.navigation.navigate('Map');
    }     

    CookieManager.set('https://veloviewer.com', {
        name: 'ExplorerMaxSquareShown',
        value: '1',
        domain: '.veloviewer.com',
        path: '/',
        version: '1',
        expiration: '2100-01-01T12:30:00.00-05:00'
    });

    setTimeout(() => {
        const { current } = refWebView;
        console.log(current);
        current.injectJavaScript(getData);
    }, 5000);

    return (
        <View style={{ flex: 1 }}>
            <WebView ref={refWebView}
                source={{ uri: 'https://veloviewer.com/activities' }}
                onLoadEnd={handleLoadEnd}
                onMessage={handleMessage} />
        </View>
    );    
}

export default VeloViewer;