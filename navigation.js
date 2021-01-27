import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  ImageBackground,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/components/Authentication/login';
import {firebase, Auth} from './App';
import Students from './src/components/students-lists/studentLists';
import MenuIcon from 'react-native-vector-icons/Feather';
import SunIcon from 'react-native-vector-icons/FontAwesome';
import MoonIcon from 'react-native-vector-icons/Entypo';
import RefreshIcon from 'react-native-vector-icons/FontAwesome';
import BackIcon from 'react-native-vector-icons/Ionicons';
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './src/components/Dashboard/Dashboard';
import FeeRecord from './src/components/FeeRecord/feeRecord';
import Performance from './src/components/Performance/performance';
import TimeTable from './src/components/Timetable/timetable';
import FirstSession from './src/components/Sessions/firstSession';
import SecondSession from './src/components/Sessions/secondSession';
import ThirdSession from './src/components/Sessions/thirdSession';
import OnlineClass from './src/components/OnlineClass/onlineClass';
import Poem from './src/components/Assignment/Poem';
import Play from './src/components/Assignment/Play';
import Game from './src/components/Assignment/Game';
import Lecture from './src/components/Assignment/Lecture';
import Comunicados from './src/components/report/Comunicados';
import ChatInbox from './src/components/Chat/chatInbox';
import CalendarScreen from './src/components/Calendar/calendar';
import Schedule from './src/components/Calendar/Schedule';
import Chat from './src/components/Chat/chatRoom';
import sender from './assets/images/sender.jpg';
import CreateGroup from './src/components/Chat/CreateGroup';
// import CalendarScreen from './src/components/Calendar/Calendar';
import {darkTheme, lightTheme} from './src/_actions/theme';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {connect} from 'react-redux';
import {viewModal} from './src/_actions/modalActions';
import Homework from './src/components/Assignment/Homework';
import Teacher from './src/components/Teachers/Teacher';
import Form from './src/components/Form/Form';
import {setUser} from './src/_actions/authActions';
// import GiftedChat from './src/components/Chat/FinalChat'
import GiftedChat from './src/components/Chat/chatRoom';

const Stack = createStackNavigator();

function App({viewModal, darkTheme, lightTheme, isDark, setUser, roomName}) {
  useEffect(() => {
    Auth().onAuthStateChanged(function (user) {
      if (user) {
        setstate(user);
        setUser(user);
        console.log('User Available');
        // User is signed in.
      } else {
        // No user is signed in.
        console.log('User NOT Available');
      }
    });
  }, user);

  const [user, setstate] = useState(null);
  const [dummy, setDummy] = useState([{}]);

  const New = ({navigation}) => {
    const Less = {
      headerRight: () => (
        <Menu>
          <MenuTrigger
            text={
              <View style={styles.optionsView}>
                <MenuIcon
                  name={'more-vertical'}
                  style={isDark ? styles.optionsDark : styles.options}
                />
              </View>
            }
          />
          <MenuOptions
            style={isDark ? styles.mainmenuViewDark : styles.mainmenuView}>
            <MenuOption
              onSelect={(e) => viewModal(e)}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <RefreshIcon
                    name={'refresh'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Trocar Senha
                  </Text>
                </View>
              }
            />
            <MenuOption
              onSelect={() => out()}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <LogoutIcon
                    name={'logout'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Sair
                  </Text>
                </View>
              }></MenuOption>
            {isDark ? (
              <MenuOption
                onSelect={(e) => lightTheme(e)}
                text={
                  <View style={isDark ? styles.menuViewDark : styles.menuView}>
                    <SunIcon
                      name={'sun-o'}
                      style={isDark ? styles.menuIconDark : styles.menuIcon}
                    />
                    <Text
                      style={isDark ? styles.menuTextDark : styles.menuText}>
                      Light
                    </Text>
                  </View>
                }></MenuOption>
            ) : (
              <MenuOption
                onSelect={(e) => darkTheme(e)}
                text={
                  <View style={isDark ? styles.menuViewDark : styles.menuView}>
                    <MoonIcon
                      name={'moon'}
                      style={isDark ? styles.menuIconDark : styles.menuIcon}
                    />
                    <Text
                      style={isDark ? styles.menuTextDark : styles.menuText}>
                      Dark
                    </Text>
                  </View>
                }></MenuOption>
            )}
          </MenuOptions>
        </Menu>
      ),
      title: '            ESCOLHA O ALUNO',
      headerTintColor: isDark ? 'white' : '',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const profes = {
      headerRight: () => (
        <Menu>
          <MenuTrigger
            text={
              <View style={styles.optionsView}>
                <MenuIcon
                  name={'more-vertical'}
                  style={isDark ? styles.optionsDark : styles.options}
                />
              </View>
            }
          />
          <MenuOptions
            style={isDark ? styles.mainmenuViewDark : styles.mainmenuView}>
            <MenuOption
              onSelect={(e) => viewModal(e)}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <RefreshIcon
                    name={'refresh'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Trocar Senha
                  </Text>
                </View>
              }
            />
            <MenuOption
              onSelect={() => out()}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <LogoutIcon
                    name={'logout'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Sair
                  </Text>
                </View>
              }></MenuOption>
            {isDark ? (
              <MenuOption
                onSelect={(e) => lightTheme(e)}
                text={
                  <View style={isDark ? styles.menuViewDark : styles.menuView}>
                    <SunIcon
                      name={'sun-o'}
                      style={isDark ? styles.menuIconDark : styles.menuIcon}
                    />
                    <Text
                      style={isDark ? styles.menuTextDark : styles.menuText}>
                      Light
                    </Text>
                  </View>
                }></MenuOption>
            ) : (
              <MenuOption
                onSelect={(e) => darkTheme(e)}
                text={
                  <View style={isDark ? styles.menuViewDark : styles.menuView}>
                    <MoonIcon
                      name={'moon'}
                      style={isDark ? styles.menuIconDark : styles.menuIcon}
                    />
                    <Text
                      style={isDark ? styles.menuTextDark : styles.menuText}>
                      Dark
                    </Text>
                  </View>
                }></MenuOption>
            )}
          </MenuOptions>
        </Menu>
      ),
      title: 'Professor',
      headerTintColor: isDark ? 'white' : '',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const MoreOptions = {
      headerRight: () => (
        <Menu>
          <MenuTrigger
            text={
              <View style={styles.optionsView}>
                <MenuIcon
                  name={'more-vertical'}
                  style={isDark ? styles.optionsDark : styles.options}
                  // style={styles.options}
                />
              </View>
            }
          />
          <MenuOptions
            style={isDark ? styles.mainmenuViewDark : styles.mainmenuView}>
            <MenuOption
              onSelect={(e) => viewModal(e)}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <RefreshIcon
                    name={'refresh'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Trocar Senha
                  </Text>
                </View>
              }
            />
            <MenuOption
              onSelect={() => out()}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <LogoutIcon
                    name={'logout'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Sair
                  </Text>
                </View>
              }></MenuOption>
            <MenuOption
              onSelect={(e) => showStudents(e)}
              text={
                <View style={isDark ? styles.menuViewDark : styles.menuView}>
                  <RefreshIcon
                    name={'refresh'}
                    style={isDark ? styles.menuIconDark : styles.menuIcon}
                  />
                  <Text style={isDark ? styles.menuTextDark : styles.menuText}>
                    Escolher aluno
                  </Text>
                </View>
              }
            />
            {isDark ? (
              <MenuOption
                onSelect={(e) => lightTheme(e)}
                text={
                  <View style={isDark ? styles.menuViewDark : styles.menuView}>
                    <SunIcon
                      name={'sun-o'}
                      style={isDark ? styles.menuIconDark : styles.menuIcon}
                    />
                    <Text
                      style={isDark ? styles.menuTextDark : styles.menuText}>
                      Light
                    </Text>
                  </View>
                }></MenuOption>
            ) : (
              <MenuOption
                onSelect={(e) => darkTheme(e)}
                text={
                  <View style={isDark ? styles.menuViewDark : styles.menuView}>
                    <MoonIcon
                      name={'moon'}
                      style={isDark ? styles.menuIconDark : styles.menuIcon}
                    />
                    <Text
                      style={isDark ? styles.menuTextDark : styles.menuText}>
                      Dark
                    </Text>
                  </View>
                }></MenuOption>
            )}
          </MenuOptions>
        </Menu>
      ),
      title: 'ANO LETIEVO 2020',
      headerTintColor: isDark ? 'white' : '',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const ChatInboxStyle = {
      headerTintColor: 'white',
      title: '',
      // headerTransparent: true,
      headerStyle: isDark ? styles.ChatInboxHeaderDark : styles.ChatInboxHeader,
    };
    const NoOption = {
      headerTintColor: isDark ? 'white' : '',
      title: '',
      headerTransparent: true,
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const boletim = {
      headerTintColor: isDark ? 'white' : '',
      title: 'BOLETIM          ',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const professor = {
      headerTintColor: isDark ? 'white' : '',
      title: '',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const SalaDe = {
      headerTintColor: isDark ? 'white' : '',
      title: 'Sala de Aula Virtual         ',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const studentPerformace = {
      headerTintColor: isDark ? 'white' : '',
      title: 'Desempenho do Aluno        ',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const MENSALIDADES = {
      headerTintColor: isDark ? 'white' : '',
      title: 'MENSALIDADES       ',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const anoLetievo = {
      headerTintColor: isDark ? 'white' : '',
      title: 'ANO LETIEVO 2020       ',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const ChatName = {
      headerTintColor: isDark ? 'white' : '',
      title: 'Francine Riley',
      headerTransparent: true,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const ScheduleOpt = {
      headerTintColor: isDark ? 'white' : '',
      title: '01 de Fevereiro 2021',
      // headerTransparent: true,
      backgroundColor: 'white',
      headerTitleStyle: {alignSelf: 'center', color: 'darkgrey'},
      headerStyle: isDark ? styles.headerTitleDark : styles.headerTitle,
    };
    const RoomName = {
      headerTitle: (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            // borderWidth: 1,
            // borderColor: 'red',
          }}>
          <View>
            <Image
              source={sender}
              style={{width: 40, height: 40, borderRadius: 60}}
            />
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{roomName}</Text>
          </View>
        </View>
      ),
      headerTintColor: isDark ? 'white' : '',
      headerTransparent: true,
      backgroundColor: 'white',
      headerTitleStyle: {},
      headerStyle: isDark ? styles.headerChatDark : styles.headerChat,
    };

    const GroupOption = {
      headerTitle: (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}>
          <View style={{paddingLeft: 70}}>
            <Text
              style={{
                alignContent: 'center',
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Create Group
            </Text>
          </View>
        </View>
      ),
      headerTintColor: 'white',
      headerTransparent: isDark ? true : false,
      backgroundColor: 'Blue',
      headerTitleStyle: {},
      headerStyle: isDark ? styles.headerChatDark : styles.headerGroup,
    };

    const showStudents = () => {
      console.log('hiiiiiii');
      navigation.navigate('Login');
    };
    const out = () => {
      navigation.navigate('Login');
      Auth()
        .signOut()
        .then(function () {
          setstate(null);
          // alert('f');
          // Sign-out successful.
          console.log(user);
          console.log('Sign-out successful.');
        })
        .catch(function (error) {
          // An error happened.
        });
    };
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Students} options={Less} />
        <Stack.Screen name="Teacher" component={Teacher} options={professor} />
        {/* <Stack.Screen name="Chat" component={Chat} options={RoomName} /> */}
        <Stack.Screen name="Chat" component={GiftedChat} options={RoomName} />
        <Stack.Screen name="Form" component={Form} options={Less} />
        {/* <Stack.Screen name="CreateGroup" component={CreateGroup} options={GroupOption} /> */}

        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={ScheduleOpt}
        />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />

        <Stack.Screen
          name="ChatInbox"
          component={ChatInbox}
          options={ChatInboxStyle}
        />
        <Stack.Screen
          name="Comunicados"
          component={Comunicados}
          options={NoOption}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={MoreOptions}
        />
        <Stack.Screen
          name="FeeRecord"
          component={FeeRecord}
          options={MENSALIDADES}
        />
        <Stack.Screen
          name="Performance"
          component={Performance}
          options={studentPerformace}
        />
        <Stack.Screen
          name="TimeTable"
          component={TimeTable}
          options={boletim}
        />
        <Stack.Screen
          name="FirstSession"
          component={FirstSession}
          options={anoLetievo}
        />
        <Stack.Screen
          name="SecondSession"
          component={SecondSession}
          options={anoLetievo}
        />
        <Stack.Screen
          name="ThirdSession"
          component={ThirdSession}
          options={anoLetievo}
        />
        <Stack.Screen
          name="OnlineClass"
          component={OnlineClass}
          options={SalaDe}
        />
        <Stack.Screen name="Poem" component={Poem} options={NoOption} />
        <Stack.Screen name="Play" component={Play} options={NoOption} />
        <Stack.Screen name="Homework" component={Homework} options={NoOption} />
        <Stack.Screen name="Game" component={Game} options={NoOption} />
        <Stack.Screen name="Lecture" component={Lecture} options={NoOption} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer style={{height: 1}}>
      {user ? (
        <Stack.Navigator headerMode="none" initialRouteName="Login">
          <Stack.Screen name="Students" component={New} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerMode="none" initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => ({
  isDark: state.themeReducer.theme,
  roomName: state.chatReducer.roomName,
});

export default connect(mapStateToProps, {
  viewModal,
  darkTheme,
  lightTheme,
  setUser,
})(App);
const styles = StyleSheet.create({
  ChatInboxHeaderDark: {
    height: 50,
    color: 'white',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: '#4D7CFE',
  },
  ChatInboxHeader: {
    height: 50,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: '#4D7CFE',
  },
  headerTitleDark: {
    height: 50,
    color: 'white',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'white',
  },
  headerTitle: {
    height: 50,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'white',
  },
  headerChatDark: {
    // height: 20,
    color: 'white',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'white',
  },
  headerGroup: {
    // height: 50,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: '#4D7CFE',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    borderWidth: 5,
  },
  headerChat: {
    // height: 50,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  mainmenuViewDark: {padding: 10, backgroundColor: '#21223E'},
  mainmenuView: {padding: 10, backgroundColor: 'white'},
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'white',
  },
  menuViewDark: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    color: 'white',
    backgroundColor: '#21223E',
  },
  menuText: {
    fontSize: 20,
    color: '#666666',
    paddingLeft: 15,
  },
  menuTextDark: {
    fontSize: 20,
    color: '#666666',
    color: 'white',
    paddingLeft: 15,
  },
  menuIcon: {
    color: '#666666',
    fontSize: 20,
  },
  menuIconDark: {
    color: 'white',
    fontSize: 20,
  },
  options: {
    fontSize: 30,
    marginLeft: '-20%',
  },
  optionsDark: {
    color: 'white',
    fontSize: 30,
    marginLeft: '-20%',
  },
  optionsView: {
    width: 30,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
