import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  Animated,
  Box,
  Sphere,
  Video
} from 'react-vr';

export default class Collection extends React.Component{
  
  constructor(props){
    super(props);
  }

  render(props){
    return(
      <View>
        {this.props.destinations.map((destination, index) => {
          return (
            <VrButton style={{position: 'absolute'}}
             onClick={() => {
              this.props.onPanoChangeClick(destination.url, 
                destination.type, destination.location)}
            } key={index}>
                <Image source={asset(destination.twoDimensionUrl)}
                  style={{
                    transform: [{translate: [destination.xAxis, 
                        destination.yAxis , destination.zAxis]},
                    {rotateY: destination.rotateY}],
                    layoutOrigin: [0,0],
                    height: 300,
                    width: 500
                  }}
                  
                  onEnter={() => {
                    console.log(index)
                    this.props.onEnterExitClick(index, destination, 'enter')
                  }}
                    
                  onExit={() => {
                    console.log(index)
                    this.props.onEnterExitClick(index, destination, 'exit')
                  }}
                   />
            </VrButton>
          )
        })}
      </View>
    )
  }
}
