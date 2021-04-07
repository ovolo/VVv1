import React, { useRef } from 'react';
import { View } from 'react-native';

import { WebView } from 'react-native-webview';
import CookieManager from "@react-native-community/cookies";

import { useDispatch } from 'react-redux'
import { setVeloViewerData } from '../redux'

function VeloViewer(props) {
    const getData = `
        if (!viewMapCheckBox.classList.contains('active')) {
            viewMapCheckBox.click();
        }

        var collection = { "type": "FeatureCollection", "features": [] };
        liveData.forEach( function(d, i) { if (d.ll != null) collection.features.push(d.ll.toGeoJSON()); } );

        var body = {};
        body.ridesCount = collection.features.length;
        body.allRidesJson = collection;
        body.explorerTiles = window.explorerTiles;
        body.maxClump = window.maxClump;
        body.maxSquares = window.explorerMaxs;

        window.ReactNativeWebView.postMessage(JSON.stringify(body));     
        true;`;

    const refWebView = useRef();

    const dispatch = useDispatch();
    const veloViewerData = data => dispatch(setVeloViewerData(data));

    function handleWebViewNavigationStateChange(newNavState) {
        CookieManager.getAll(true).then((cookies) => {
            const explorerMaxSquareShown = cookies['ExplorerMaxSquareShown'];
            if (!explorerMaxSquareShown || explorerMaxSquareShown.value != '1') {
                CookieManager.set('https://veloviewer.com', {
                    name: 'ExplorerMaxSquareShown',
                    value: '1',
                    domain: '.veloviewer.com',
                    path: '/',
                    version: '1',
                    expiration: '2022-01-01T00:00:00.00-00:00'
                }, true);    
            }

            const explorerClusterShown = cookies['ExplorerClusterShown'];
            if (!explorerClusterShown || explorerClusterShown.value != '1') {
                CookieManager.set('https://veloviewer.com', {
                    name: 'ExplorerClusterShown',
                    value: '1',
                    domain: '.veloviewer.com',
                    path: '/',
                    version: '1',
                    expiration: '2022-01-01T00:00:00.00-00:00'
                }, true);
            }
        });

        const { url, loading } = newNavState;
        if (!url || loading) {
            return; 
        }

        const { current } = refWebView;
        current.injectJavaScript(getData);
    }

    function handleWebViewMessage(message) {
        const data = JSON.parse(message.nativeEvent.data);

        if (data.explorerTiles) {
            veloViewerData(data); 
            props.navigation.navigate('Map');
        }
    }       

    return (
        <View style={{ flex: 1 }}>
            <WebView ref={refWebView}
                source={{ uri: 'https://veloviewer.com/activities' }}
                onNavigationStateChange={handleWebViewNavigationStateChange}
                onMessage={handleWebViewMessage} />
        </View>
    );    
}

export default VeloViewer;