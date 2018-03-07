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

export default class Base extends React.Component{
  render(props){
    return(
      <View>
        <VrButton onClick={() =>  this.props.onPanoChangeClick('London')}
        style={{transform: [{translate: [-300, 0, 20]}]}}>

          <Sphere
            radius={150}
            widthSegments={500}
            heightSegments={320}
            texture={asset('images/LondonBG.jpg')}
            style={{
              transform: [
                        {translate: [0, 0, 20]}]}}
          />
        </VrButton>
        <VrButton onClick={() =>  this.props.onPanoChangeClick('Miami')}
        style={{transform: [{translate: [300, 0, 20]}]}}>

          <Sphere
            radius={150}
            widthSegments={500}
            heightSegments={320}
            texture={asset('images/MiamiBG.jpg')}
            style={{
              transform: [
                        {translate: [0, 0, 20]}]}}
          />
        </VrButton>
      </View>
    )
  }
}