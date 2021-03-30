import React, { Component } from 'react';
import { View, Button } from 'react-native';

import { WebView } from 'react-native-webview';
import CookieManager from "@react-native-community/cookies";

class VeloViewerScreen extends Component {
    webview = null;

    state = {
        cookies    : {},
        webViewUrl : ''
    }
    
    onNavigationStateChange = (e ) => {
        console.log("e", e); 
        console.log("webview", this.webview); 
        this.setState({ loading: e.loading });


        
        CookieManager.getFromResponse('http://www.strava.com').then(res => {
            console.log("CookieManager.getFromResponse =>", res);
        });


        if (e.url.startsWith("https://www.strava.com/heatmap")) {
            CookieManager.get('http://www.strava.com', false).then(res => {
                console.log("CookieManager.getAll =>", res);
            });

            CookieManager.get('http://www.strava.com', true).then(res => {
                console.log("CookieManager.getAll =>", res);
            });


            CookieManager.getAll(false).then(res => {
                console.log("CookieManager.getAll =>", res);
            });

          CookieManager.getAll(true).then(res => {
            console.log("CookieManager.getAll =>", res);
            if (!!res) {
              console.log({res})
              //CookieManager.clearAll(true).then(res => {
               // console.log("LoginScreen CookieManager.clearAll =>", res);
              //});
            }
          });
        }


        //const { url } = webViewState;
        //console.log('onNavigationStateChange');
        //console.log('webViewState');
        //console.log(webViewState);
        //console.log('webview');
        //console.log(this.webview);
        // when WebView.onMessage called, there is not-http(s) url
        //if(url.includes('http')) {
          //this.setState({ webViewUrl: url })
        //}
      }
    
      _checkNeededCookies = () => {
        const { cookies, webViewUrl } = this.state;
    
        //if (webViewUrl === 'SUCCESS_URL') {
          if (cookies['CloudFront-Key-Pair-Id']) {
            alert(cookies['CloudFront-Key-Pair-Id']);
            // do your magic...
          }
        //}
        if (cookies['CloudFront-Policy']) {
            alert(cookies['CloudFront-Policy']);
            // do your magic...
          }

          if (cookies['CloudFront-Signature']) {
            alert(cookies['CloudFront-Signature']);
            // do your magic...
          }
      }
    
      _onMessage = (event) => {

        console.log('_onMessage');
        const { data } = event.nativeEvent;
        const cookies  = data.split(';'); // `csrftoken=...; rur=...; mid=...; somethingelse=...`
    
        cookies.forEach((cookie) => {
          const c = cookie.trim().split('=');
    
          const new_cookies = this.state.cookies;
          new_cookies[c[0]] = c[1];
    
          this.setState({ cookies: new_cookies });
        });
    
        console.log(cookies);

        this._checkNeededCookies();
      }


    handleUpdateVVData = () => {
        const redirectTo = 'window.location = "https://bbc.co.uk"';
        this.webview.injectJavaScript(redirectTo);
    }

    handleLoadEnd = (c) => {
        console.log('handleLoadEnd');
        console.log(this.webview);


        //let keyPairId = getCookie("CloudFront-Key-Pair-Id")
        //let policy = getCookie("CloudFront-Policy")
        //let signature = getCookie("CloudFront-Signature")
    } 

    

    render() {
  

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50 }}>
                    <Button onPress={this.handleUpdateVVData}
                        title="Update VV Data" />
                </View>
                <WebView ref={(ref) => {this.webview = ref}} 
                         cacheEnabled={false}
                         source={{ uri: 'https://www.strava.com/heatmap' }}
                         onNavigationStateChange={this.onNavigationStateChange}
                        
                         sharedCookiesEnabled={true}
                        
                         thirdPartyCookiesEnabled={true}/>
            </View>
        );
    }
}

export default VeloViewerScreen;