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

import * as THREE from 'three';

export default class Miami extends React.Component{
  render(props){
    return(
      <Animated.View style={{opacity: 200}}>
        <VrButton onClick={() =>  this.props.onPanoChangeClick('London')}
        style={{opacity: 200}}>

          <Sphere
  radius={150}
  widthSegments={500}
  heightSegments={320}
  texture={asset('Paris.jpg')}
  style={{
    transform: [
              {translate: [0, 0, 20]}]}}
>
</Sphere>
        
        </VrButton>
        
      </Animated.View>
    )
  }
}