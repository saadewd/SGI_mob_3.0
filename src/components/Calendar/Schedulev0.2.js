import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
let doveIcon = require('../../../assets/images/doveIcon.png');
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'java',
      Etapa: 'Today',
      name: '',
      image: '',
      TaskData: [ { time: '07:30', day: 'seg', taskInfo: [
            {Title: '1,Parent Meeting', Time: '07:30'},
            {Title: '2,Parent Meeting', Time: '07:30'},
          ],
        },
        {time:'09:30', day:'seg2', taskInfo:[{Title:'1,Parent Meeting', Time:'07:30', },{Title:'2,Parent Meeting', Time:'07:30', }] }
      ],
    };
  }
  handleInput = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };
  render() {
    return (
      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row-reverse',
            zIndex: 10,
            padding: 10,
            width: '100%',
          }}>
          <View style={{width: '45%', flexDirection: 'row-reverse'}}>
            <DropDownPicker
              style={{
                width: '45%',
                flexDirection: 'row-reverse',
                position: 'relative',
              }}
              items={[
                {label: 'Today', value: 'Today', hidden: true},
                {label: 'Tomorrow', value: 'Tomorrow'},
              ]}
              defaultValue={this.state.Etapa}
              containerStyle={{height: 40, width: 110}}
              style={{backgroundColor: '#8074fe', color: 'white'}}
              labelStyle={{color: 'white'}}
              arrowColor={'white'}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#8074fe', color: 'black'}}
              color={'red'}
              onChangeItem={(item) =>
                this.setState({
                  Etapa: item.value,
                })
              }
            />
          </View>
          <View style={{width: '60%', flexDirection: 'row-reverse'}}>
            <Text
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                color: 'lightgrey',
                fontSize: 22,
              }}>
              Hoje
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            marginTop: 20,
            backgroundColor: 'white',
            height: 600,
          }}>



{/* <View style={{ borderWidth:1}}> */}



          <View
            style={{
              borderColor: 'red',
              width: '100%',
              // height: 'auto',
              borderWidth: 1,
              flexDirection: 'row',
              marginTop: 20,
              // flexWrap: "wrap",
              flex:1
            }}>
            <View
              style={{
                borderColor: 'green',
                // borderWidth: 1,
                width: '30%',
                // height: 80,
                flexWrap: "wrap"
              }}>
              <View
                style={styles.publicadodiv}>
                <View style={styles.timeLine}>
                  <View style={styles.textLeftCont}>
                    <Text style={styles.textLeft}> 07:00 </Text>
                    <Text>Seg</Text>
                  </View>
                  <View style={styles.lineCont}>
                    <View style={styles.lineGrey}>
                      <View style={styles.lineCircle}></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderColor: 'green',
                // borderWidth: 1,
                width: '70%',
                height: 80,
                // flexWrap: "wrap",
                alignSelf:'baseline',
                flexDirection: 'column'

              }}>
              <View >
                <LinearGradient
                  style={styles.radius}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#6c89d5', '#6c89d5']}>
                  <View style={styles.textCenter}>
                    <Text style={styles.taskText}> Task 1 </Text>
                    <Image source={doveIcon} style={styles.doveIcon} />
                  </View>
                </LinearGradient>
              </View>

              <View style={{marginTop: 10,}}>
                <LinearGradient
                  style={styles.radius}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#6c89d5', '#6c89d5']}>
                  <View style={styles.textCenter}>
                    <Text style={styles.taskText}> Task 2 </Text>
                    <Image source={doveIcon} style={styles.doveIcon} />
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>



         














          {/* <View style={{marginTop: 10, flexDirection:'column', height:'100%'}}>
            <View
              style={styles.publicadodiv}>
              <View style={styles.timeLine}>
                <View style={styles.textLeftCont}>
                  <Text style={styles.textLeft}> 07:00 </Text>
                  <Text>Seg</Text>
                </View>
                <View style={styles.lineCont}>
                  <View style={styles.lineGrey}>
                    <View style={styles.lineCircle}></View>
                  </View>
                </View>
              </View>
            </View>
              <LinearGradient
                style={styles.radius}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#6c89d5', '#6c89d5']}>
                <View style={styles.textCenter}>
                  <Text style={styles.taskText}> Task </Text>
                  <Image source={doveIcon} style={styles.doveIcon} />
                  
                </View>
              </LinearGradient>

          </View> */}

          {/* {this.state.TaskData.map((data, index)=>{
                      return(
                        <View style={{marginTop: 10, height:'100%'}}>            
                  </View>
                      )
                    })} */}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  sessionDrop: {
    width: 100,
    backgroundColor: '#8074fe',
    alignSelf: 'flex-end',
    borderRadius: 20,
    height: 40,
    // marginRight: 20,
  },
  sessionDropDark: {
    alignSelf: 'flex-end',
    width: 100,
    // borderColor: 'red',
    // borderWidth: 1,
    // width:100,
    // borderColor: 'white',
    // margin: -5,
    color: 'white',
    backgroundColor: 'rgba(182, 181, 180, 0.32)',
  },
  doveIcon: {
    width: 30,
    height: 30,
  },
  lineCircle: {
    width: 15,
    height: 15,
    marginLeft: -7.5,
    borderRadius: 25,
    backgroundColor: '#fd78b4',
    alignItems: 'center',
  },
  lineGrey: {
    borderWidth: 2,
    height: '300%',
    width: 2,
    borderColor: 'grey',
    borderRadius: 25,
  },
  lineCont: {
    width: '30%',
    // borderWidth: 1
  },
  timeLine: {width: '100%', flexDirection: 'row'},
  textLeft: {
    fontWeight: '900',
    fontSize: 20,
  },
  textLeftCont: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    // borderWidth: 1,

    // alignContent:'center'
  },
  radius: {
    borderRadius: 5,
    width: '100%',
  },
  tabView: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textCenter: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiusLeft: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    width: '25%',
  },
  radiusRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    width: '75%',
  },
  w25: {
    width: '25%',
  },
  w75: {
    width: '75%',
  },
  publicadodiv: {
    flexDirection: 'row',
    marginTop: 15,
    // borderRadius: 16,
    width: '100%',
    height: 70,
  },

  TaskIconCalendar: {
    // alignContent:'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 15,
    // borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 8,
    height: 100,
  },

  publicadodivm: {
    paddingBottom: 0,
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  publicadodivd: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  publicadodivname: {color: 'white', textAlign: 'center', fontSize: 14},
  terefadiv: {
    color: 'white',
    fontSize: 13,
  },
  taskText: {
    color: 'white',
    fontSize: 18,
  },
});
