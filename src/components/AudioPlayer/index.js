import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
  STATE_PAUSED
} from 'react-native-track-player';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import {audio} from './../../_actions/audioAction'
import {connect} from 'react-redux'
import styles from './styles';

const MultiPlayer = ({ data }) => {
  console.log(data)
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(1);
  const [state, setState] = useState({
    "selectedSound": {},
    "sliderMaxValue": 0
  });
  const _timerConverter = s => {
    s = parseInt(s);
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  };
  // console.log("sliderValue", sliderValue);
  // console.log("position", position);
  // console.log("duration", duration);
  // console.log("isPlaying", isPlaying);
  // console.log("state", state);



  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      // console.log(position / duration)
      setState(pre => ({ ...pre, sliderMaxValue: Math.ceil(position / duration) }))
      setSliderValue(position / duration);
    } else {
      setSliderValue(0);
    }
  }, [position, duration]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    }
    else if (event.state === STATE_PAUSED) {
      console.log("STATE_PAUSED");
      setIsPlaying(false);
      setState(pre => ({ ...pre, soundPaused: true }))
      // setSliderValue(position/duration);
    }
    else {
      setIsPlaying(false);
      setSliderValue(0);

    }
  });

  const _onButtonPressed = async (x) => {
    // console.log(x)
    props.audio(data)
    if (state.selectedSound.id === x.id && isPlaying) {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(position / duration);
      await TrackPlayer.pause();
    }
    else if (state.soundPaused) {
      await TrackPlayer.play();
      setState(pre => ({ ...pre, soundPaused: false }));
    }
    else if (state.selectedSound.id !== x.id && isPlaying) {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(0);
      await TrackPlayer.reset();
      await TrackPlayer.add(x);
      await TrackPlayer.play();
    }
    else if (state.selectedSound.id !== x.id && !isPlaying) {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(0);
      await TrackPlayer.reset();
      await TrackPlayer.add(x);
      await TrackPlayer.play();
    }
    else {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(0);
      await TrackPlayer.add(x);
      await TrackPlayer.play();
    }
  };

  const _slidingStarted = () => {
    setIsSeeking(true);
  };

  const _slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  return data.map((x, i) => <View style={styles.mainContainer} key={i}>
    <View style={styles.controlsContainer}>
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>{"Message -> "}</Text>
        <Text>{x.text}</Text>
      </View> */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>
          {(x.id === state.selectedSound.id) ? _timerConverter(position) + " / " + _timerConverter(duration) : "0:00 / 0:00"}
        </Text>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={state.sliderMaxValue}
          value={(x.id === state.selectedSound.id) ? sliderValue : 0}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={_slidingStarted}
          onSlidingComplete={_slidingCompleted}
          thumbTintColor="#000"
        />
        <TouchableOpacity
          onPress={() => _onButtonPressed(x)}
        >

          <Image source={{ uri: (x.id === state.selectedSound.id && isPlaying) ? "https://www.seekpng.com/png/detail/179-1792518_play-stop-pause-icon-png.png" : "https://www.searchpng.com/wp-content/uploads/2019/02/Play-Black-Icon-PNG-715x673.png" }} style={{
            height: 30,
            width: 30,
            right: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,

          }} height={30} width={30} />
        </TouchableOpacity>

      </View>
    </View>
  </View>
  )
};

const SingleAudioPlayer = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(1);
  const [state, setState] = useState({
    "selectedSound": {},
    "sliderMaxValue": 0
  });
  const _timerConverter = s => {
    s = parseInt(s);
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  };
  console.log("sound", sound);
  console.log("isPlaying", isPlaying);
  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      // console.log(position / duration)
      setState(pre => ({ ...pre, sliderMaxValue: Math.ceil(position / duration) }))
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    }
    else if (event.state === STATE_PAUSED) {
      console.log("STATE_PAUSED");
      setIsPlaying(false);
      setState(pre => ({ ...pre, soundPaused: true }))
      // setSliderValue(position/duration);
    }
    else {
      console.log("STATE_CLOSED");
      setIsPlaying(false);
      setSliderValue(0);
    }
  });

  const _onButtonPressed = async () => {
    if (isPlaying) {
      setSliderValue(position / duration);
      await TrackPlayer.pause();
    }
    else if (state.soundPaused) {
      await TrackPlayer.play();
      setState(pre => ({ ...pre, soundPaused: false }));
    }
    else {
      setSliderValue(0);
      await TrackPlayer.add(sound);
      await TrackPlayer.play();
    }
  };

  const _slidingStarted = () => {
    setIsSeeking(true);
  };

  const _slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.controlsContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>
            {_timerConverter(position) + " / " + _timerConverter(duration)}
          </Text>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={state.sliderMaxValue}
            value={sliderValue}
            minimumTrackTintColor="#111000"
            maximumTrackTintColor="#000000"
            onSlidingStart={_slidingStarted}
            onSlidingComplete={_slidingCompleted}
            thumbTintColor="#000"
          />
          <TouchableOpacity
            onPress={_onButtonPressed}
          >

            <Image source={{ uri: isPlaying ? "https://www.seekpng.com/png/detail/179-1792518_play-stop-pause-icon-png.png" : "https://www.searchpng.com/wp-content/uploads/2019/02/Play-Black-Icon-PNG-715x673.png" }} style={{
              height: 30,
              width: 30,
              right: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,

            }} height={30} width={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.reset();
              setSliderValue(0)
            }}
          >
            <Text>reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};



const TextMessagesAndAudioPlayer = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(1);
  const [state, setState] = useState({
    "selectedSound": {},
    "sliderMaxValue": 0
  });
  const _timerConverter = s => {
    s = parseInt(s);
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  };
  // console.log("sliderValue", sliderValue);
  // console.log("position", position);
  // console.log("duration", duration);
  // console.log("isPlaying", isPlaying);
  // console.log("state", state);



  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      // console.log(position / duration)
      setState(pre => ({ ...pre, sliderMaxValue: Math.ceil(position / duration) }))
      setSliderValue(position / duration);
    } else {
      setSliderValue(0);
    }
  }, [position, duration]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    }
    else if (event.state === STATE_PAUSED) {
      console.log("STATE_PAUSED");
      setIsPlaying(false);
      setState(pre => ({ ...pre, soundPaused: true }))
      // setSliderValue(position/duration);
    }
    else {
      setIsPlaying(false);
      setSliderValue(0);

    }
  });

  const _onButtonPressed = async (x) => {
    // console.log(x)
    if (state.selectedSound.id === x.id && isPlaying) {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(position / duration);
      await TrackPlayer.pause();
    }
    else if (state.soundPaused) {
      await TrackPlayer.play();
      setState(pre => ({ ...pre, soundPaused: false }));
    }
    else if (state.selectedSound.id !== x.id && isPlaying) {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(0);
      await TrackPlayer.reset();
      await TrackPlayer.add(x);
      await TrackPlayer.play();
    }
    else if (state.selectedSound.id !== x.id && !isPlaying) {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(0);
      await TrackPlayer.reset();
      await TrackPlayer.add(x);
      await TrackPlayer.play();
    }
    else {
      setState(pre => ({ ...pre, selectedSound: x }));
      setSliderValue(0);
      await TrackPlayer.add(x);
      await TrackPlayer.play();
    }
  };

  const _slidingStarted = () => {
    setIsSeeking(true);
  };

  const _slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };
  const MessageUI = ({ x }) => (
    <Text>{x.text}</Text>
  )
  const SoundUI = ({ x, showMessage }) => (
    <View style={styles.controlsContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>
          {(x.id === state.selectedSound.id) ? _timerConverter(position) + " / " + _timerConverter(duration) : "0:00 / 0:00"}
        </Text>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={state.sliderMaxValue}
          value={(x.id === state.selectedSound.id) ? sliderValue : 0}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={_slidingStarted}
          onSlidingComplete={_slidingCompleted}
          thumbTintColor="#000"
        />
        <TouchableOpacity
          onPress={() => _onButtonPressed(x)}
        >

          <Image source={{ uri: (x.id === state.selectedSound.id && isPlaying) ? "https://www.seekpng.com/png/detail/179-1792518_play-stop-pause-icon-png.png" : "https://www.searchpng.com/wp-content/uploads/2019/02/Play-Black-Icon-PNG-715x673.png" }} style={{
            height: 30,
            width: 30,
            right: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,

          }} height={30} width={30} />
        </TouchableOpacity>

      </View>
      {showMessage ? <MessageUI x={x} /> : null}
    </View>
  );


  return data.map((x, i) => <View style={styles.mainContainer} key={i}>
    {
      x.messageType === 1 ? <MessageUI x={x} />
        :
        x.messageType === 2 ? <SoundUI x={x} showMessage={false} />
          :
          x.messageType === 3 ? <SoundUI x={x} showMessage={true} />
            : null
    }
  </View>
  )
};
const mapDispatchToProps = (dispatch)=>{
  return {
    audio: (data) => dispatch(data)
  }
}
export default  connect(null,mapDispatchToProps)(MultiPlayer)