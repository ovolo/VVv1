import React, { Component } from 'react';
import { View, Button } from 'react-native';

import { WebView } from 'react-native-webview';
import CookieManager from "@react-native-community/cookies";

class VeloViewerScreen extends Component {
    webview = null;

    handleMessage = (event) => {
        console.log('handleMessage', event.nativeEvent.data);
        this.props.navigation.navigate('Map', JSON.parse(event.nativeEvent.data) );
    }     

    render() {
        CookieManager.set('https://veloviewer.com', {
            name: 'ExplorerMaxSquareShown',
            value: '1',
            domain: '.veloviewer.com',
            path: '/',
            version: '1',
            expiration: '2100-01-01T12:30:00.00-05:00'
          });

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


        setTimeout(() => {
            console.log(this.webview);
            this.webview.injectJavaScript(getData);
        }, 5000);

        return (
            <View style={{ flex: 1 }}>
                <WebView ref={(ref) => {this.webview = ref}} 
                         source={{ uri: 'https://veloviewer.com/activities' }}
                         onMessage={this.handleMessage} />
            </View>
        );
    }
}

export default VeloViewerScreen;