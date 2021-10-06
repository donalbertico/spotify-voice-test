import React from 'react'
import {View,Text} from 'react-native'

export default function Timer(props){
  const [ms, setMs] = React.useState(0)
  const [s, setS] = React.useState(0)
  const [m, setM] = React.useState(0)
  const [h, setH] = React.useState(0)

  React.useEffect(()=>{
    let that = this
    if(!props.pause){
      that.timer = setInterval(()=>{
        setMs(ms=>ms+1)
      },1)
    }else{
      console.log('stopp?');
      clearInterval(that.timer)
      props.handleOnTime({ms:ms,s:s,m:m,h:h})
    }
    console.log('quiondaa',props.pause);
  },[props.pause])

  React.useEffect(()=>{
    if(ms== 99){
      if(s !== 59){
        setMs(0)
        setS(s=>s+1)
      }else if(m !== 59){
        setS(0)
        setMs(0)
        setM(m=>m+1)
      }else{
        setMs(0)
        setS(0)
        setM(0)
        setH(h=>h+1)
      }
    }
  },[ms])

  return(
    <View>
      <Text>{h}:{m}:{s} : {ms}</Text>
    </View>
  )
}
