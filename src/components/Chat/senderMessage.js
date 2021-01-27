import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import sender from '../../../assets/images/sender.jpg';
import Sound from 'react-native-sound';
import MultiPlayer from '../AudioPlayer';

function senderMessage({
  isDark,
  text,
  messageImage,
  messageAudio,
  createdAt,
  index,
  audio,
  setDataToReducer,
}) {
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [firstPlay, setFirstPlay] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const [messageIndex, setMessageIndex] = useState(null);

  const pausePlaying = (sound) => {
    setIsPlaying(false);
    setIsPaused(true);
    sound.pause();
    console.log('paused');
  };

  const stopPlaying = (sound, newSound) => {
    sound.stop(() => {
      setAudioData(null);
      setIsPlaying(false);
      console.log('stop');
      startPlaying(newSound);
    });
  };

  const resumePlaying = (sound) => {
    setIsPaused(false);
    setIsPlaying(true);
    sound.resume();
    console.log('resume');
  };
  console.log(audio);
  useEffect(() => {
    if (!firstPlay && audio.index === index ) {
      setFirstPlay(true);

      var sound = new Sound(
        audio.message.messageAudio,
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          sound.play((success) => {
            if(success){
              sound.reset();
              setIsPlaying(false);
              setAudioData(null);
              setFirstPlay(false)
            }
          });
          soundRef.current = sound;
          setIsPlaying(true);
          setActiveIndex(1);
          setAudioData(sound);
          // startPlaying(sound);
        },
      );
    } else if (isPlaying && activeIndex !== 1) {
      console.log(audio.index);
      console.log(index);
      console.log(audioData);
      audioData.reset();
      setFirstPlay(true);
      var sound = new Sound(
        audio.message.messageAudio,
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }

          sound.play((success) => {
            if(success){
              sound.reset();
              setIsPlaying(false);
              setAudioData(null);
              setFirstPlay(false)
            }
          });
          soundRef.current = sound;
          setIsPlaying(true);
          setAudioData(sound);
          // startPlaying(sound);
        },
      );
    } else {
      if (audio.index === index && activeIndex === 1 && isPlaying) {
        console.log(audioData);
        audioData.pause(() => {
          console.log('sound paused---');
          setIsPlaying(false);
        });
        // console.log(audio.index, index, 'pause');
        // pausePlaying(sound);
      } else if (audio.index === index && activeIndex === 1 && !isPlaying) {
        console.log(audioData);
        audioData.play();
        setIsPlaying(true);
        // setAudioData(sound)
        // console.log(audio.index, index, 'stop');
        // var sound = new Sound(audio.message.messageAudio, Sound.MAIN_BUNDLE, (error) => {
        //   if (error) {
        //     console.log('failed to load the sound', error);
        //     return;
        //   }
        //   stopPlaying(sound);
        // });
      }
    }
  }, [audio]);

  const startPlaying = (sound) => {
    setIsPlaying(true);
    setMessageIndex(index);
    setAudioData(sound);
    sound.play((success) => {
      if (success) {
        setIsPlaying(false);
        setAudioData(null);
        console.log('successfully finished');
      } else {
        console.log('playback failed due to audioUrl decoding errors');
      }
    });
  };

  let tempMultiAudiosData = [
    {
      id: 1,
      type: 'default',
      url:
        'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
      messageType: 1,
    },
    {
      id: 2,
      type: 'default',
      url:
        'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg',
    },
    {
      id: 3,
      type: 'default',
      url:
        'http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg',
    },
  ];
  const display = (index) => {
    if (text) {
      return (
        <View
          style={
            isDark ? styles.senderMessageViewDark : styles.senderMessageView
          }>
          <Text style={isDark ? styles.senderTextDark : styles.senderText}>
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
          }}>
          {/* <MultiPlayer data={tempMultiAudiosData} /> */}
          <Ionicons
            name={isPlaying ? 'pause' : 'ios-play'}
            size={35}
            color={'#403B4A'}
            style={{
              position: 'relative',
              left: 0,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.5,
              backgroundColor: 'transparent',
            }}
            onPress={(e) => {
              setDataToReducer();
              // if(!Object.keys(audio).length){

              // }else if(Object.keys(audio).length){
              //   console.log(soundRef)
              //   // soundRef.current.reset();
              //  setFirstPlay(false);
              //   setDataToReducer();

              // }

              // if (audioData === null) {
              //   var sound = new Sound(
              //     messageAudio,
              //     Sound.MAIN_BUNDLE,
              //     (error) => {
              //       if (error) {
              //         console.log('failed to load the sound', error);
              //         return;
              //       }
              //       startPlaying(sound);
              //     },
              //   );
              // }  else if (messageIndex && messageIndex === index && isPlaying) {
              //     console.log(messageIndex, index, 'pause');
              //     pausePlaying(audioData);
              //   }else if (messageIndex && messageIndex !== index && isPlaying){
              //     console.log(messageIndex, index, 'stop');
              //     var sound = new Sound(
              //       messageAudio,
              //       Sound.MAIN_BUNDLE,
              //       (error) => {
              //         if (error) {
              //           console.log('failed to load the sound', error);
              //           return;
              //         }
              //         stopPlaying(audioData, sound);
              //       },
              //     );
              //   }
            }}
          />
        </View>
      );
    }
  };
  return (
    <View style={{maxWidth: '65%'}}>
      <View
        style={isDark ? styles.messageContainerDark : styles.messageContainer}>
        <View style={styles.senderImageView}>
          <Image source={sender} style={styles.senderImage} />
        </View>
        <View>
          <View
            style={
              isDark ? styles.senderMessageViewDark : styles.senderMessageView
            }>
            <View>{display(index)}</View>
          </View>
          <Text
            style={
              isDark ? styles.timeStampSenderDark : styles.timeStampSender
            }>
            {moment(createdAt, 'hmm').format('HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  isDark: state.themeReducer.theme,
  audio: state.AudioReducer.data,
});
export default connect(mapStateToProps)(senderMessage);

const styles = StyleSheet.create({
  senderImage: {width: 55, height: 55, borderRadius: 30},
  messageContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    padding: 10,
  },
  messageContainerDark: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 10,
  },
  stretch: {
    height: 120,
    width: 150,
    borderWidth: 3,
    borderColor: '#4D7CFE',
    borderRadius: 10,
    // resizeMode: 'contain',
  },
  senderText: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  senderTextDark: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    letterSpacing: 1,
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  senderMessageView: {
    minHeight: 30,
    padding: 5,
    marginLeft: 5,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24C6DC',
    borderRadius: 15,
    flexDirection: 'column',
    borderBottomLeftRadius: 0,
  },
  senderMessageViewDark: {
    minHeight: 30,
    padding: 5,
    marginLeft: 5,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(182, 181, 180, 0.8)',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
  },
  timeStampSender: {
    marginLeft: 17,
    color: 'grey',
  },
  timeStampSenderDark: {
    marginLeft: 17,
    color: 'white',
  },
  bl: {
    color: 'black',
    fontWeight: 'bold',
  },
  white: {
    fontWeight: 'bold',
    color: 'white',
  },
});
