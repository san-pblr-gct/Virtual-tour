import React from 'react'

import {
  View,
  VrButton,
  Text,
  VideoPano,
  asset
} from 'react-vr'

export default class London extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View>
        <VrButton onClick={() =>  this.props.onPanoChangeClick('Miami')}>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 10,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, 0]}],
          }}>
          hello Paris
        </Text>
        
        </VrButton>
      </View>
    )
  }
}