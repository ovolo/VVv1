import React, { Component } from 'react';
import { View, Button } from 'react-native';

import { WebView } from 'react-native-webview';

class VeloViewerScreen extends Component {
    webview = null;

    handleUpdateVVData = () => {
        const redirectTo = 'window.location = "https://bbc.co.uk"';
        this.webview.injectJavaScript(redirectTo);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50 }}>
                    <Button onPress={this.handleUpdateVVData}
                        title="Update VV Data" />
                </View>
                <WebView ref={(ref) => {this.webview = ref}} 
                         source={{ uri: 'https://strava.com' }}
                         onLoadEnd={this.handleLoadEnd} />
            </View>
        );
    }
}

export default VeloViewerScreen;