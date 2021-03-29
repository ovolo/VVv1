import React, { Component } from 'react';
import { View, Button } from 'react-native';

import { WebView } from 'react-native-webview';
import CookieManager from "@react-native-community/cookies";

class VeloViewerScreen extends Component {
    webview = null;

    handleMessage = (event) => {
        this.props.navigation.navigate('Map', JSON.parse(event.nativeEvent.data) );
    }     

    render() {
        //CookieManager.set(".veloviewer.com", "ExplorerMaxSquareShown=1")

        const getAll = `
            document.getElementById('viewMapCheckBox').click();
            document.getElementById('viewMapCheckBox').click();

            var collection = { "type": "FeatureCollection", "features": [] };
            liveData.forEach( function(d, i) { if (d.ll != null) collection.features.push(d.ll.toGeoJSON()); } );

            var all = {};
            all.ridesCount = collection.features.length;
            all.allRidesJson = collection;
            all.explorerTiles = window.explorerTiles;
            all.maxClump = window.maxClump;
            all.maxSquares = window.explorerMaxs;

            window.ReactNativeWebView.postMessage(JSON.stringify(all));     
            true;`    


        setTimeout(() => {
            this.webview.injectJavaScript(getAll);
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