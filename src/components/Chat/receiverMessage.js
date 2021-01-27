import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import sender from '../../../assets/images/sender.jpg';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

function receiverMessage({
  isDark,
  text,
  messageImage,
  messageAudio,
  createdAt,
  name,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  //ADded
  const [playState, setplayState] = useState('pause');
  const [playSeconds, setplaySeconds] = useState(0);
  const [stateSound, setStateSound] = useState(null);
  const [value, setValue] = useState(0);

  const startPlaying = async (sound) => {
    //Added
    setplayState('playing');
    //
    console.log(sound);
    setIsPlaying(true);
    sound.play((success) => {
      if (success) {
        //Added
        setStateSound(null);
        setIsPlaying(false);
        setplaySeconds(0);
        setValue(0);
        console.log('successfully finished');
      } else {
        console.log('playback failed due to audioUrl decoding errors');
      }
    });
  };
  const onSliderEditing = (sound) => {
    if (sound) {
      console.log(sound);
      console.log(sound._duration);
      sound.setCurrentTime(value);
      setplaySeconds(value);
    }
  };

  //
  useEffect(() => {
    const interval = setInterval(() => {
      if (stateSound && playState == 'playing') {
        stateSound.getCurrentTime((seconds, isPlaying) => {
          // console.log(seconds);
          setplaySeconds(seconds);
        });
      }
    }, 1);
    return (_) => clearInterval(interval);
  }, [stateSound, isPlaying]);

  const display = () => {
    if (text) {
      return (
        <View
          style={
            isDark ? styles.receiverMessageViewDark : styles.receiverMessageView
          }>
          <Text style={isDark ? styles.receiverTextDark : styles.receiverText}>
            {text}
          </Text>
        </View>
      );
    } else if (messageImage) {
      return <Image style={styles.stretch} source={{uri: messageImage}} />;
    } else if (messageAudio) {
      return (
        <View
          style={{
            position: 'relative',

            flexDirection: 'row',
            backgroundColor: '#566E9E',
            borderRadius: 10,
          }}>
          <TouchableOpacity>
            <Ionicons
              name={isPlaying ? 'pause' : 'ios-play'}
              size={35}
              color={'white'}
              style={{
                position: 'relative',
                left: 0,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.5,
                backgroundColor: 'transparent',
              }}
              onPress={(e) => {
                // console.log(messageAudio);

                var sound = new Sound(
                  messageAudio,
                  Sound.MAIN_BUNDLE,
                  (error) => {
                    if (error) {
                      console.log('failed to load the sound', error);
                      return;
                    } else if (!isPlaying) {
                      setStateSound(sound);
                      startPlaying(sound);
                      onSliderEditing(sound);
                    } else if (isPlaying) {
                      sound.stop(() => {
                        sound.release();
                        console.log('stoping');
                      });
                    }
                  },
                );
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 100,
            }}>
            <Slider
              style={{
                width: 150,
                height: 40,
                position: 'absolute',
                right: 0,

                width: 100,
              }}
              minimumValue={0}
              maximumValue={stateSound ? Math.ceil(stateSound._duration) : 0}
              onValueChange={onSliderEditing()}
              value={playSeconds}
              minimumTrackTintColor="white"
              maximumTrackTintColor="white"
            />
          </View>
        </View>
      );
    }
  };
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <View
        style={
          isDark
            ? styles.messageContainerReceiverDark
            : styles.messageContainerReceiver
        }>
        <View>
          <View
            style={
              isDark
                ? styles.receiverMessageViewDark
                : styles.receiverMessageView
            }>
            <View>{display()}</View>
          </View>
          <Text
            style={
              isDark ? styles.timeStampReceiverDark : styles.timeStampReceiver
            }>
            {moment(createdAt).format('h:m A')}
          </Text>
        </View>
        <View style={styles.senderImageView}>
          <Image source={sender} style={styles.receiverImage} />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  isDark: state.themeReducer.theme,
});
export default connect(mapStateToProps)(receiverMessage);

const styles = StyleSheet.create({
  receiverImage: {width: 55, height: 55, borderRadius: 30},
  messageContainerReceiver: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '65%',
    marginLeft: 'auto',
    marginRight: 5,
  },
  container: {
    paddingTop: 50,
  },
  stretch: {
    height: 120,
    width: 150,
    borderWidth: 3,
    borderColor: '#4D7CFE',
    borderRadius: 10,
    // resizeMode: 'contain',
  },
  messageContainerReceiverDark: {
    justifyContent: 'flex-end',
    width: '65%',
    marginLeft: 'auto',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  receiverText: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
  },
  receiverTextDark: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    letterSpacing: 1,
    fontFamily: 'sans-serif',
  },

  timeStampReceiver: {
    // marginLeft: 17,
    color: 'grey',
    textAlign: 'right',
    marginRight: 5,
  },
  timeStampReceiverDark: {
    textAlign: 'right',
    // marginLeft: 17,
    color: 'white',
    marginRight: 5,
  },

  receiverMessageView: {
    minHeight: 30,
    padding: 5,
    backgroundColor: '#516395',
    borderRadius: 15,
    borderBottomRightRadius: 0,
  },
  receiverMessageViewDark: {
    minHeight: 30,
    padding: 5,
    // backgroundColor: 'rgba(182, 181, 180, 0.8)',
    backgroundColor: 'grey',
    borderRadius: 15,
    borderBottomRightRadius: 0,
  },
});
