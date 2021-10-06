import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { encode } from 'base-64'
import Voice from '@react-native-voice/voice'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Linking from 'expo-linking';
import * as AuthSession from 'expo-auth-session'
import Timer from './timerComponent'

import {
	auth as SpotifyAuth,
	remote as SpotifyRemote,
	ApiScope,
	ApiConfig,
  ContentItem
} from 'react-native-spotify-remote';



import VoiceComponent from './VoiceComponent'


export default function App() {
	const scopes = encodeURIComponent('app-remote-control user-read-currentyl-playing')
	const [code,setCode] = React.useState()
	const [token,setToken] = React.useState()
	const [timer,setTimer] = React.useState({min:0,sec:0,msec:0})
	const [pause,setPause] = React.useState(false)

	const credentials = {
		clientId : '2e4dab11cd8c42608560c988dbf341ab',
		clientSecret : '3a1d0be0efd34d8d8c04bc1bcac49044',
		redirectUri : 'https://auth.expo.io/@donalbertico/voice-tester'
	}

  const spotifyConfig: ApiConfig = {
	clientID: "2e4dab11cd8c42608560c988dbf341ab",
	redirectURL: "https://auth.expo.io/@donalbertico/voice-tester",
	// tokenRefreshURL: "voice-tester://spotify/refresh",
	// tokenSwapURL: "voice-tester://spotify/swap",
	scopes: [ApiScope.AppRemoteControlScope]
}

	const getAuthorizationCode = async () => {
		try {
			const url = 'https://accounts.spotify.com/authorize'+
			'?response_type=code'+
			`&client_id=${credentials.clientId}`+
			`&scope${scopes}`+
			`&redirect_uri=${encodeURIComponent(credentials.redirectUri)}`
			const result = await AuthSession.startAsync({
				authUrl: url
			})
			if(result.params.code) setCode(result.params.code)

		} catch (e) {
			console.log(e);
		}
	}

	const getToken = async (code) => {
		try {
			const credsB64 = encode(`${credentials.clientId}:${credentials.clientSecret}`);

			const response = await fetch('https://accounts.spotify.com/api/token',{
				method: 'POST',
				headers: {
					Authorization: `Basic ${credsB64}`,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body : `grant_type=authorization_code&code=${code}&redirect_uri=${credentials.redirectUri}`
			})

			const json = await response.json()

			if(json.access_token) setToken(json.access_token)
			console.log(json);
		} catch (e) {
			console.log(e);
		}
	}



	React.useEffect(()=>{
		async function connectSpotify(){
			try {
				console.log(token);
				await SpotifyRemote.connect(token);
				// await SpotifyRemote.playItem('spotify:track:7DYs1KJ0pQMLUqijW7X0ZO')
			} catch (e) {
				console.log(e);
			}
		}
		if(token){
			connectSpotify()
		} else {
			if(code){
				getToken(code)
			}
		}
	},[code,token])

  React.useEffect(()=>{
    const redirectUrl = Linking.createURL('spotify/redirect');
    const tokenRefresh = Linking.createURL('spotify/refresh');
    const tokenSwap = Linking.createURL('spotify/swap');

		console.log(AuthSession.getRedirectUrl());

		// connectSpotify()
		// getAuthorizationCode()
  },[])

	React.useEffect(()=>{

	},[])

  return (
    <View style={{flex:1}}>
			<View style={{flex:5}}></View>
      <Text>Open up App.js to start working on your app!</Text>
			<Timer pause={pause} handleOnTime={(e)=>{console.log(e);}}/>
			<TouchableOpacity onPress={(e)=>{pause?setPause(false):setPause(true)}}>
				<Text h2>stoppp{pause?('sdf'):('noay')}</Text>
			</TouchableOpacity>
			<View></View>
      <StatusBar style="auto" />
				<View style={{flex:2}}></View>

    </View>
  );
}
