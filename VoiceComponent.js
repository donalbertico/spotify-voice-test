import React, { Component } from 'react';
import {Text,TouchableOpacity} from 'react-native'
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

class VoiceComponent extends Component<Props,State>{
  constructor(props:Props){
    super(props)
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechRecognizez = this.onSpeechRecognized
    Voice.onSpeechEnd = this.onSpeechEnd
   Voice.onSpeechResults = this.onSpeechResults;
  }

  onSpeechStart = (e: any) => {
  console.log('onSpeechStart: ', e);
  };

  onSpeechEnd = (e) =>{
    console.log('ended');
  }

  onSpeechResults = (e: SpeechResultsEvent) =>{
    console.log('HABLO',e);
  }

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
     console.log('onSpeechRecognized: ', e);
   };

  startSpeech = (e) =>{
    async function start(){
      try {
          await Voice.start()
      } catch (e) {
        console.log('error',e);
      }
    }
    start()
  }

  render(){
    return (
      <TouchableOpacity onPress={this.startSpeech}>
        <Text>a ver</Text>
      </TouchableOpacity>
    )
  }

}

export default VoiceComponent
