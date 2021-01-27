import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  CheckBox,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import {hideCreateGroupModal} from '../../_actions/modalActions';
import sender from '../../../assets/images/sender.jpg';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import navigation from '../../../navigation';

const CreateGroupModal = ({visible,navigation , hideCreateGroupModal}) => {
    console.log(navigation);
  console.log(visible);
  const [isSelected, setSelection] = useState(false);
  const [filter, setFilter] = useState();
  const [members, setMembers] = useState([
    {name: 'Professors', Category: 'Professors'},
    {name: 'Student', Category: 'Student'},
    {name: 'Parent', Category: 'Parent'},
    {name: 'Professors', Category: 'Professors'},
    {name: 'Student', Category: 'Student'},
    {name: 'Parent', Category: 'Parent'},
    {name: 'Professors', Category: 'Professors'},
  ]);
  // const [MyDB, setMyDB] = useState(props.MyDB);
  //   console.log(MyDB)
const navigateTo= () =>{
    navigation.navigate('CreateGroup');
    hideCreateGroupModal();
}
  return (
    <View style={styles.centeredView}>
      <Modal
        style={{width: 30, borderWidth: 2}}
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          hideCreateGroupModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View style={{width:'100%', backgroundColor:'lightblue', height:20, borderTopRightRadius:10, borderTopLeftRadius:10}}></View> */}
            <View
              style={{
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row-reverse',
                backgroundColor: '#4D7CFE',
                height: 60,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <TouchableHighlight
                onPress={() => {
                  hideCreateGroupModal();
                }}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    padding: 10,
                    marginTop: 18,
                    marginRight: 8,
                  }}
                  source={require('../../../assets/images/cross.png')}
                />
              </TouchableHighlight>
              <Text style={{color: 'white', alignSelf: 'center'}}>
                3 of 256
              </Text>
              <Text
                style={{
                  fontSize: 23,
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 20,
                }}>
                List of Members
              </Text>
            </View>



            <View style={{padding: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Select all members</Text>
                </View>
                <View style={{width: '50%', alignItems: 'flex-end'}}>
                  <DropDownPicker
                    style={{
                      width: '45%',
                      flexDirection: 'row-reverse',
                      position: 'relative',
                    }}
                    items={[
                      {label: 'Parent', value: 'Parent'},
                      {label: 'Teacher', value: 'Teacher'},
                      {label: 'Student', value: 'Student'},
                    ]}
                    defaultValue={filter}
                    containerStyle={{height: 40, width: 110}}
                    style={{backgroundColor: 'white', color: 'black'}}
                    labelStyle={{color: 'black'}}
                    placeholder={'Filter'}
                    arrowColor={'black'}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: 'white', color: 'black'}}
                    color={'red'}
                    onChangeItem={(item) => setFilter(item.value)}
                  />
                </View>
              </View>
            </View>

            <ScrollView>

           

            {members.map((data, index) => {
              return (
                <View key={index}
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                      style={styles.checkbox}
                    />
                    <Image
                      source={sender}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        marginLeft: 10,
                      }}
                    />
                  </View>
                  <View style={{paddingLeft: 15}}>
                    <Text style={styles.title}>Professor</Text>
                    <Text style={{fontSize: 10, color: 'grey'}}>Category</Text>
                  </View>
                </View>
              );
            })}

</ScrollView>
            <TouchableOpacity style={{ position:'absolute', bottom:20, right:20}}  onPress={(e)=>navigateTo()}>
              <AntDesign name={'checkcircle'} size={40} color={'#4D7CFE'}   />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionDrop: {padding: 10},
  sessionDropDark: {
    // borderWidth: 1,
    // borderColor: 'white',
    // margin: -5,
    color: 'white',
    backgroundColor: 'rgba(182, 181, 180, 0.32)',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginTop: 10,
  },

  centeredView: {
    flex: 1,
    // height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // alignContent:'center'
    // marginTop: 52
  },
  modalView: {
    margin: 5,
    // height: 560,
    minHeight:400,
    maxHeight:'80%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    // borderWidth: 1,
    // borderColor: 'red',

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    justifyContent: 'center',
    alignItems: 'center',
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

// export default ComplModal;
const mapStateToProps = (state) => ({
  visible: state.modalReducer.visibleCreate,
});
export default connect(mapStateToProps, {hideCreateGroupModal})(
  CreateGroupModal,
);
