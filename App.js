import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import Voice from '@react-native-voice/voice'
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import {
	auth as SpotifyAuth,
	remote as SpotifyRemote,
	ApiScope,
	ApiConfig,
  ContentItem
} from 'react-native-spotify-remote';

import VoiceComponent from './VoiceComponent'


export default function App() {

  const spotifyConfig: ApiConfig = {
	clientID: "2e4dab11cd8c42608560c988dbf341ab",
	redirectURL: "voice-tester://spotify/redirect",
	tokenRefreshURL: "voice-tester://spotify/refresh",
	tokenSwapURL: "voice-tester://spotify/swap",
	scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope]
}

  React.useEffect(()=>{
    const redirectUrl = Linking.createURL('spotify/redirect');
    const tokenRefresh = Linking.createURL('spotify/refresh');
    const tokenSwap = Linking.createURL('spotify/swap');

    async function connectSpotify(){
      try {
        const session = await SpotifyAuth.authorize(spotifyConfig)
        await SpotifyRemote.connect(session.accessToken);
        await SpotifyRemote.playUri('spotify:track:7DYs1KJ0pQMLUqijW7X0ZO')
      } catch (e) {
        console.log(e);
      }
    }
    connectSpotify()

  },[])

  return (
    <View style={{flex:1}}>
			<View style={{flex:5}}></View>
      <Text>Open up App.js to start working on your app!</Text>
			<VoiceComponent/>
      <StatusBar style="auto" />
				<View style={{flex:2}}></View>

    </View>
  );
}
