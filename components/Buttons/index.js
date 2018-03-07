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

export default class Buttons extends React.Component{
  
  render(props){
    return(
      <View>
        {this.props.destinations.map((destination, index) => {
          return (
            <VrButton onClick={() =>  
              this.props.onPanoChangeClick(destination.url, destination.type)}
              key={index}>
                <Image source={asset(destination.url)}
                  style={{
                    transform: [{translate: [-100 * index * 2 , 0 , -10]}],
                    layoutOrigin: [0.5 * index, 0.5],
                    height: 200,
                    width: 200
                  }} />
            </VrButton>
          )
        })}
      </View>
    )
  }
}