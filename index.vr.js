import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
  VideoPano,
  Image,
  Scene,
  Video,
  Sphere,
  Animated
} from 'react-vr';

import Miami from './components/Miami'
import London from './components/London'
import InfoButton from './components/Common/InfoButton'
import Base from './components/Base'
import Collection from './components/Collection'
import destinations from './data/destinations'
import cities from './data/cities'
import feedback from './data/feedback'
import axios from 'axios'


export default class vrhack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: 'Base',
      panoSource: 'Soccer.jpg',
      panoVideoSource: '',
      panoVideoStatus: '',
      zoomAxis: 0,
      second: 0,
      destinationCollection: [],
      destinationText: 'Welcome to EF Virtual Tour \n Click here to start',
      fbLocation: '',
      showReview: false,
      feedbackIndex: 0,
      yes: '#777879',
      no: '#777879',
      one: '#777879',
      two: '#777879',
      three: '#777879',
      four: '#777879',
      five: '#777879'
    };

  }

  onFBPostClicked(location, url) {
    debugger;
    axios({
      method: 'post',
      url: 'https://graph.facebook.com/v2.8/me/photos?access_token=EAACEdEose0cBAFg08G2ecf3GLRsYh4R0bxrOVFpMcjZCAGO1OUq825GJW3U6XEK1TJbAGZC0QgX7i7G81ZC8YKBOcnIC8fN8WaohgZBfaCSj6oiNAd2YlQPM4gLQOJitIV1ZCkmjc2n2TpxWZAwIXcQpoBtOGaaD8a6G4IfkwSlNzQ7R3yddoj',
      data: {
        "url": "http://ef26.azurewebsites.net/static_assets/" + url,
        "allow_spherical_photo": true,
        "place": location,
        "message": "Test",
        "tags": [{ "tag_uid": '1326091865' },
        { "tag_uid": '669389906' },
        { "tag_uid": '1834411625' },
        { "tag_uid": '601158044' },
        { "tag_uid": '580745850' },
        { "tag_uid": '721121693' }
        ]
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  onPanoChangeClick(url, type, location) {
    debugger;
    let backClicked = false
    if (location == 'back') {
      backClicked = true
    }
    if (type == 'image') {
      this.setState({
        panoVideoSource: '',
        panoSource: url,
        screenName: 'cities',
        panoVideoStatus: '',
        destinationCollection: ((this.state.screenName == 'Base' || backClicked) ?
          cities : []),
        destinationText: ((this.state.screenName == 'Base' || backClicked) ?
          'Hide Cities' : 'Show Cities'),
        fbLocation: location,
        panoVideoStatus: 'pause'
      })
    }
    if (type == 'video') {
      this.setState({
        panoVideoStatus: '',
        panoVideoSource: url,
        panoSource: '',
        screenName: cities,
        destinationCollection: ((this.state.screenName == 'Base') ?
          cities : []),
        destinationText: ((this.state.screenName == 'Base') ?
          'Hide Cities' : 'Show Cities'),
        fbLocation: location,
        panoVideoStatus: 'play'
      })
    }
  }

  onEnterExitClick(index, destination, type) {
    let destinations = this.state.destinationCollection;
    if (destination.zoomAxis == 'x') {
      destinations[index].xAxis = (type == 'enter') ?
        (destination.xAxis + destination.zoomValue) :
        (destination.xAxis - destination.zoomValue);
    } else if (destination.zoomAxis == 'z') {
      destinations[index].zAxis = (type == 'enter') ?
        (destination.zAxis + destination.zoomValue) :
        (destination.zAxis - destination.zoomValue);
    }
    this.setState({ destinationCollection: destinations });
  }

  onShowDestinations() {
    debugger;
    if (this.state.destinationText == 'Hide Destination') {
      this.setState({
        destinationCollection: [],
        destinationText: 'Show Destination'
      })
    } else if (this.state.destinationText == 'Show Cities') {
      this.setState({
        destinationCollection: cities,
        destinationText: 'Hide Cities'
      })
    } else if (this.state.destinationText == 'Hide Cities') {
      this.setState({
        destinationCollection: [],
        destinationText: 'Show Cities'
      })
    } else {
      this.setState({
        destinationCollection: destinations,
        destinationText: 'Hide Destination'
      })
    }
  }

  onExitClick() {

    this.setState({
      destinationCollection: [],
      showReview: true
    });

  }

  onFeedbackSubmit(selectedOption) {
    if (selectedOption == 'no') {
      this.setState({ showReview: false, 'no': '#696969' })
    } else {
      this.setState({ 'feedbackIndex': this.state.feedbackIndex + 1 })
    }
  }

  onBackButtonClick() {
    this.setState({ 'screenName': 'base' })
    this.onPanoChangeClick(destinations[0].url, destinations[0].type, 'back')
  }

  render() {
    let fbCheckIn = null;
    if (this.state.panoSource) {
      backgroudPano = <Pano source={asset(this.state.panoSource)}
        style={{
          position: 'absolute'
        }} />
    }
    else if (this.state.panoVideoSource) {
      backgroudPano = <VideoPano source={asset(this.state.panoVideoSource)}
        playStatus={this.state.panoVideoStatus} muted={true}
      />
    }

    let destinationButton = null;
    if (this.state.destinationText.startsWith('Welcome')) {
      destinationButton =
        <VrButton style={{ position: 'absolute' }} onClick={() =>
          this.onShowDestinations()
        }>
          <Text
            style={{
              backgroundColor: '#777879',
              layoutOrigin: [0, 0],
              fontSize: 30,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: 100,
              width: 400,
              transform: [{ translate: [-200, 100, -700] }],
            }}>
            {this.state.destinationText}
          </Text>
        </VrButton>

    } else {
      destinationButton = null;
    }

    if (this.state.fbLocation && this.state.panoSource) {
      fbCheckIn =
        <VrButton style={{ position: 'absolute' }} onClick={() => {
          this.onFBPostClicked(this.state.fbLocation, this.state.panoSource)
        }}>
          <Text
            style={{
              backgroundColor: '#777879',
              layoutOrigin: [0, 0],
              fontSize: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: 50,
              width: 200,
              transform: [{ translate: [-100, 370, -700] }],
            }}>
            FB Post
            </Text>
        </VrButton>
    }
    let exitButton = null
    if (!this.state.showReview && this.state.fbLocation && this.state.panoSource) {
      exitButton = <VrButton style={{ position: 'absolute' }} onClick={() =>
        this.onExitClick()
      }>
        <Text
          style={{
            backgroundColor: '#777879',
            layoutOrigin: [0, 0],
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 50,
            width: 200,
            transform: [{ translate: [350, 370, -700] }],
          }}>
          Exit
              </Text>
      </VrButton>
    }



    let feedbackCmp = null;
    if (this.state.showReview) {
      let answerOption = null
      switch (feedback[this.state.feedbackIndex].optionType) {
        case 'YesOrNo':
          answerOption = <View style={{ position: 'absolute' }}>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('yes')
            }
              onEnter={() => {
                this.setState({ 'yes': '#008000' })
              }}
              onExit={() => {
                this.setState({ 'yes': '#777879' })
              }}
            >
              <Text
                style={{
                  backgroundColor: this.state.yes,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 100,
                  transform: [{ translate: [-200, 50, -700] }],
                }}>
                Yes
                </Text>
            </VrButton>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('no')
            }
              onEnter={() => {
                this.setState({ 'no': '#ff0000' })
              }}
              onExit={() => {
                this.setState({ 'no': '#777879' })
              }}>
              <Text
                style={{
                  backgroundColor: this.state.no,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 100,
                  transform: [{ translate: [100, 50, -700] }],
                }}>
                No
                  </Text>
            </VrButton>
          </View>
          break;
        case 'Scale':
          answerOption = <View style={{ position: 'absolute' }}>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('1')
            }
              onEnter={() => {
                this.setState({ 'one': '#ff0000' })
              }}
              onExit={() => {
                this.setState({ 'one': '#777879' })
              }}>
              <Text
                style={{
                  backgroundColor: this.state.one,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 50,
                  transform: [{ translate: [-225, 0, -700] }],
                }}>
                1
                </Text>
            </VrButton>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('2')
            } onEnter={() => {
              this.setState({ 'two': '#ff8c00' })
            }}
              onExit={() => {
                this.setState({ 'two': '#777879' })
              }}>
              <Text
                style={{
                  backgroundColor: this.state.two,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 50,
                  transform: [{ translate: [-125, 0, -700] }],
                }}>
                2
                  </Text>
            </VrButton>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('3')
            }
              onEnter={() => {
                this.setState({ 'three': '#ffff00' })
              }}
              onExit={() => {
                this.setState({ 'three': '#777879' })
              }}>
              <Text
                style={{
                  backgroundColor: this.state.three,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 50,
                  transform: [{ translate: [-25, 0, -700] }],
                }}>
                3
                  </Text>
            </VrButton>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('4')
            } onEnter={() => {
              this.setState({ 'four': '#adff2f' })
            }}
              onExit={() => {
                this.setState({ 'four': '#777879' })
              }}>
              <Text
                style={{
                  backgroundColor: this.state.four,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 50,
                  transform: [{ translate: [75, 0, -700] }],
                }}>
                4
                  </Text>
            </VrButton>
            <VrButton style={{ position: 'absolute' }} onClick={() =>
              this.onFeedbackSubmit('5')
            } onEnter={() => {
              this.setState({ 'five': '#006400' })
            }}
              onExit={() => {
                this.setState({ 'five': '#777879' })
              }}>
              <Text
                style={{
                  backgroundColor: this.state.five,
                  layoutOrigin: [0, 0],
                  fontSize: 20,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 50,
                  width: 50,
                  transform: [{ translate: [175, 0, -700] }],
                }}>
                5
                  </Text>
            </VrButton>
          </View>
          break;
        case 'Greet':
          answerOption = null
          break;

        default:
          answerOption = null
          break;
      }
      feedbackCmp = <View style={{ position: 'absolute' }}>
        <Text style={{
          backgroundColor: '#777879',
          layoutOrigin: [0, 0],
          fontSize: 20,
          textAlign: 'center',
          textAlignVertical: 'center',
          height: 100,
          width: 400,
          transform: [{ translate: [-200, 200, -700] }],
        }}>
          {feedback[this.state.feedbackIndex].question}</Text>
        {answerOption}
      </View>
    }

    let backButton = null
    if (this.state.screenName != 'Base') {
      backButton = <VrButton style={{ position: 'absolute' }} onClick={() =>
        this.onBackButtonClick()
      }>
        <Text
          style={{
            backgroundColor: '#777879',
            layoutOrigin: [0, 0],
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 50,
            width: 200,
            transform: [{ translate: [-550, 370, -700] }],
          }}>
          Back
                  </Text>
      </VrButton>
    } else {
      backButton = null
    }

    return (
      <View>
        {backgroudPano}
        {destinationButton}
        {fbCheckIn}
        <Collection destinations={this.state.destinationCollection}
          onPanoChangeClick={this.onPanoChangeClick.bind(this)}
          onEnterExitClick={this.onEnterExitClick.bind(this)} />
        {exitButton}
        {backButton}
        {feedbackCmp}
      </View>
    );
  }
};

AppRegistry.registerComponent('vrhack', () => vrhack);
