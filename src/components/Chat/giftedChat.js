import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {
  GiftedChat,
  Actions,
  SystemMessage,
  Send,
  InputToolbar,
  Composer,
  Bubble,
} from 'react-native-gifted-chat';

import SoundPlayer from 'react-native-sound-player';

import storage from '@react-native-firebase/storage';
import {firebase, Auth} from '../../../App';
import Icon from 'react-native-vector-icons/Entypo';
import MicIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SendIcon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import AttachmentIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import Voice from './Recorder';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Example({roomId, userDb, navigation, recordingURL}) {
  const [messages, setMessages] = useState([]);
  const [fileName, setFileName] = useState({});
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [voiceUrl, setVoiceUrl] = useState(null);
  useEffect(() => {
    setVoiceUrl(recordingURL);
    console.log('-----------------');
    console.log(recordingURL);
  }, [recordingURL]);

  const renderSend = (props) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 80,
            alignItems: 'center',
          }}>
          <AttachmentIcon name="attachment" color="dodgerblue" size={25} />
          <FontAwesome
            name="camera"
            color="dodgerblue"
            size={25}
            onPress={(e) => handleChoosePhoto()}
          />
        </View>
        {props.text.trim() || fileUri ? (
          <Send {...props}>
            <View style={{padding: 8}}>
              <Ionicons name="send-sharp" color="dodgerblue" size={25} />
            </View>
          </Send>
        ) : (
          <View style={{padding: 8}}>
            <Voice audioFileURL={props.audioFileURL} />
          </View>
        )}
      </View>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Icon
            style={{fontSize: 30, marginRight: 15}}
            name={'attachment'}
            onPress={handleChoosePhoto}
          />
        </View>
      ),
    });
  }, [navigation]);

  const handleChoosePhoto = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Cool Photo App Camera Permission',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'SGI',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setFileName(response.fileName);
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });
  };

  useEffect(() => {
    if (roomId) {
      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              let data = doc.data();
              let time = data.createdAt.toDate();
              data.createdAt = time;
              return data;
            }),
          );
        });
    }
  }, [roomId]);

  const onSend = useCallback((messages, myData, userDb, voiceUrl) => {
    console.log(userDb);
    console.log(messages[0].user);

    const date = new Date();
    const imageName = fileName + date;
    var storageRef = firebase.storage().ref(imageName);

    if (myData) {
      // console.log(fileData);
      storageRef
        .putString(myData, 'base64')
        .then((snap) => {
          storageRef.getDownloadURL();
          console.log('snap :' + snap);
        })
        .then(() => {
          storageRef.getDownloadURL().then(function (url) {
            // console.log('url :' + url);

            setFileData(null);
            setFileUri(null);
            setFileName(null);

            const newMessage = {
              _id: messages[0]._id,
              createdAt: messages[0].createdAt,
              text: messages[0].text,
              image: url,
              // image: messages[0].messageType === 'image' ? url : '',
              user: {
                _id: userDb.uid,
                avatar: messages[0].user.avatar,
                name: messages[0].user.name,
              },
            };
            firebase
              .firestore()
              .collection('rooms')
              .doc(roomId)
              .collection('messages')
              .add(newMessage);

            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, newMessage),
            );
          });
        });
    } else if (voiceUrl) {
      console.log(recordingURL);
      const newMessage = {
        _id: messages[0]._id,
        createdAt: messages[0].createdAt,
        text: messages[0].text,
        audio: voiceUrl,
        user: {
          _id: userDb.uid,
          avatar: messages[0].user.avatar,
          name: messages[0].user.name,
        },
      };
      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(newMessage);

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage),
      );
    } else {
      console.log(recordingURL);
      const newMessage = {
        _id: messages[0]._id,
        createdAt: messages[0].createdAt,
        text: messages[0].text,
        audio: recordingURL,
        user: {
          _id: userDb.uid,
          avatar: messages[0].user.avatar,
          name: messages[0].user.name,
        },
      };
      firebase
        .firestore()
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(newMessage);

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage),
      );
    }
  }, []);
  // console.log(user);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    );
  };
const vfile =()=>{
  try {
    // play the file tone.mp3
   
    // or play from url
    SoundPlayer.playUrl('http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3')
} catch (e) {
    console.log(`cannot play the sound file`, e)
}
}
  return (
    <View style={{height: '100%'}}>
      <GiftedChat
        messages={messages}
        isTyping={true}
        alwaysShowSend={true}
        // text={(fileData) ?' ':text }
        // placeholder= {fileData? ' ':'Message'}
        onSend={(messages) => onSend(messages, fileData, userDb, voiceUrl)}
        renderBubble={renderBubble}
        // renderInputToolbar={props => customtInputToolbar(props)}
        // renderComposer={renderComposer}
        // renderMessageVideo={renderMessageVideo}
        // alwaysShowSend={
        //   props.text.trim() ? true : false || fileUri ? true : false
        // }
        renderSend={renderSend}
        timeFormat="LT"
        user={{
          _id: userDb.uid,
          name: 'saad',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />

      {fileData === '' || fileData === null ? null : (
        <View
          style={{
            borderWidth: 1,
            height: 200,
            position: 'absolute',
            width: '90%',
            bottom: 50,
            padding: 10,
            backgroundColor: 'white',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Image
            source={{uri: 'data:image/png;base64,' + fileData}}
            // source={{uri:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'}}
            style={{width: '80%', height: '100%', borderRadius: 20}}
          />
        </View>
      )}
     
        <View
          style={{
            borderWidth: 1,
            height: 200,
            position: 'absolute',
            width: '90%',
            bottom: 50,
            padding: 10,
            backgroundColor: 'white',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
{()=>vfile()}

       
        </View>
    
    </View>
  );
}

const mapStateToProps = (state) => ({
  isDark: state.themeReducer.theme,
  roomId: state.chatReducer.roomId,
  userDb: state.authReducer.user,
  voiceUrl: state.chatReducer.voiceUrl,
  recordingURL: state.chatReducer.recordingURL,
});
export default connect(mapStateToProps)(Example);
