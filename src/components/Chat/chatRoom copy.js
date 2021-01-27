import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import bgImage from '../../../assets/images/bg-image.jpg';
import bgImageLight from '../../../assets/images/bg-image-light.jpg';
import sender from '../../../assets/images/sender.jpg';
import SenderMessage from './senderMessage';
import ReceiverMessage from './receiverMessage';
import DayStamp from './dayStamp';
import {firebase, Auth} from '../../../App';
import AttachmentIcon from 'react-native-vector-icons/Entypo';
import MicIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SendIcon from 'react-native-vector-icons/MaterialIcons';

const ChatRoom = ({isDark, roomId, user}) => {
  const [messages, setmessages] = useState();
  const [input, setinput] = useState('');

  useEffect(() => {
    console.log('user : ', user);
    if (roomId) {
      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data())),
        );
      // console.log('messages-----------------: ', messages);
    }
  }, [roomId]);
  if (messages) {
    console.log('messages: ', messages);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('message sent');
    firebase
      .firestore()
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        message: input,
        name: 'galante',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setinput('');
  };

  const [sendertext, setsendertext] = useState([
    ' Hi Saad ,are you having a bad day? Tell me what you really like',
    'What Happend? is Eveything alright?',
    'and why is that? where is Abdul?',
  ]);
  const [receiverText, setreceiverText] = useState([
    ' Hi , yes i am having a really bad day , how do you know that?',
    'mt emulator was not working yesterday ',
    'i am still looking for a solution',
  ]);
  return (
    <ImageBackground
      source={isDark ? bgImage : bgImageLight}
      style={styles.image}>
      <ScrollView style={styles.container}>
        <View style={styles.Chatcontainer}>
          {/* <DayStamp /> */}
          {messages &&
            messages.map((message) => (
              <View>
                {message.user == 'galante' ? (
                  <SenderMessage
                    text={message.message}
                    name={message && message.name}
                    timestamp={
                      message &&
                      message.timestamp &&
                      new Date(message.timestamp.seconds).toLocaleTimeString()
                    }
                  />
                ) : (
                  <ReceiverMessage
                    text={message.message}
                    name={message && message.name}
                    timestamp={
                      message &&
                      message.timestamp &&
                      new Date(message.timestamp.seconds).toLocaleTimeString()
                    }
                  />
                )}
              </View>
            ))}
        </View>
      </ScrollView>
      <View>
        <View style={styles.mainContainer}>
          <View>
            <TextInput
              placeholder="Type a message"
              placeholderTextColor="white"
              value={input}
              onChangeText={(e) => setinput(e)}
              style={styles.chatTextInput}
            />
          </View>
          <View style={styles.iconsView}>
            <View style={styles.icon}>
              <AttachmentIcon name="attachment" style={styles.iconStyles} />
            </View>
            <View style={styles.icon}>
              {input == '' ? (
                <MicIcon name="microphone" style={styles.iconStyles} />
              ) : (
                <SendIcon
                  name="send"
                  style={styles.iconStyles}
                  onPress={(e) => sendMessage(e)}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 10,
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 0,
    // borderWidth: 1,
    // borderColor: 'red',

    // color: 'lightgrey',
    height: '100%',
  },
  bl: {
    color: 'black',
    fontWeight: 'bold',
  },
  white: {
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // backgroundColor:'rgba(0,0,255,0.3)'
    // paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  Chatcontainer: {
    marginBottom: 20,
  },
  mainContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#4D7CFE',
  },
  chatTextInput: {
    // borderColor: 'red',
    // borderWidth: 1,
    maxWidth: '82%',
    minWidth: 290,
    color: 'white',
    paddingLeft: 10,
    fontSize: 16,
  },
  iconsView: {
    //   borderColor: 'red',
    //   borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {padding: 10},
  iconStyles: {
    fontSize: 20,
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  isDark: state.themeReducer.theme,
  roomId: state.chatReducer.roomId,
  user: state.authReducer.user,
});
export default connect(mapStateToProps)(ChatRoom);
