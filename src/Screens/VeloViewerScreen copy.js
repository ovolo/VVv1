import React from 'react';
import {View, Button} from 'react-native';

import { WebView } from 'react-native-webview';

function VeloViewerScreen() {

    const handleUpdateVVData = () => false

    return (        
        <View style={{ flex: 1 }}>
            <View style={{ height: 50 }}>
                <Button onPress = {handleUpdateVVData} 
                        title="Update VV Data"/>
            </View>
            <WebView source={{ uri: 'https://strava.com' }} />
        </View>        
    );
}

export default VeloViewerScreen;