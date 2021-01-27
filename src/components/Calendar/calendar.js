import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  _ScrollView,
} from 'react-native';
import {Calendar, Agenda, calendarTheme} from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
let doveIcon = require('../../../assets/images/doveIcon.png');

const currentDate = new Date();
function CalendarScreen(props) {
  const [selectedDate, setSelectedDate] = useState(
    `${moment(currentDate).format('YYYY-MM-DD')}`,
  );

  initialState = {
    dummy: [
      {
        date: '2021-01-09',
        key: 'period',
        color: 'lightgreen',
        startingDay: true,
      },
      {
        date: '2021-01-11',
        key: 'period',
        color: 'lightgreen',
      },
      {
        date: '2021-01-12',
        key: 'period',
        color: 'lightgreen',
      },
      {
        date: '2021-01-13',
        key: 'period',
        color: 'lightgreen',
        endingDay: true,
      },
      {
        date: '2021-01-22',
        key: 'sports',
        color: 'pink',
      },
      {
        date: '2021-01-05',
        marked: true,
        key: 'lab',
        dotColor: 'green',
      },
      {
        date: `${moment(currentDate).format('YYYY-MM-DD')}`,
        key: 'period',
        color: '#8F80FF',
      },
    ],
    tasks: [
      {
        taskDate: '2021-01-09',
        taskName: 'period',
        icon: 'book',
        color: 'lightgreen',
      },
      {
        taskDate: '2021-01-11',
        taskName: 'period',
        icon: 'book',
        color: 'lightgreen',
      },
      {
        taskDate: '2021-01-12',
        taskName: 'period',
        icon: 'book',
        color: 'lightgreen',
      },
      {
        taskDate: '2021-01-13',
        taskName: 'period',
        icon: 'book',
        color: 'lightgreen',
      },
      {
        taskDate: '2021-01-22',
        taskName: 'sports',
        icon: 'dribbble',
        color: 'pink',
      },
      {
        taskDate: '2021-01-22',
        taskName: 'period',
        icon: 'book',
        color: 'pink',
      },
      {
        taskDate: '2021-01-05',
        taskName: 'lab',
        icon: 'drink',
        color: 'orange',
      },
    ],
  };
  const [calendarMonths, setCalendarMonths] = useState(
    currentDate.getMonth() + 1,
  );
  const [state, setState] = useState(initialState);

  const month = 2;
  let dateData = {};
  state.dummy.map((item) => {
    let properties = {
      color: item.color,
      startingDay: item.startingDay && item.startingDay,
      endingDay: item.endingDay && item.endingDay,
      marked: item.marked && item.marked,
      dotColor: item.dotColor && item.dotColor,
    };
    dateData = {
      ...dateData,
      [item.date]: properties,
      [selectedDate]: {color: 'skyblue'},
    };
  });

  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const taskData = state.tasks.filter((task) => {
    return task.taskDate === selectedDate;
  });

  const ele = taskData.map((task, i) => {
    return (
      <TouchableOpacity style={styles.publicadodiv} key={i}>
        <LinearGradient
          style={styles.radiusLeft}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[task.color, '#996DFF']}>
          <View style={styles.TaskIconCalendar}>
            <Entypo name={task.icon} size={30} color={'white'} />
          </View>
        </LinearGradient>
        <LinearGradient
          style={styles.radiusRight}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[task.color, '#8F80FF']}>
          <View style={styles.textCenter}>
            <Text style={styles.terefadiv}> {task.taskName} </Text>
            <Text style={styles.terefadiv}> Due to: {task.taskDate} </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView>
      <View style={styles.tabView}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            width: '30%',
            height: month === 1 ? 50 : 30,
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            marginBottom: 0,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: 'lightgrey',
          }}>
          <Text>
            {monthNames[calendarMonths === 1 ? 11 : calendarMonths - 2]}
          </Text>
        </View>
        <LinearGradient
          // radiusLeft={15}
          style={{
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            backgroundColor: 'white',
            justifyContent: 'center',
            width: '30%',
            height: month === 2 ? 40 : 30,
            marginBottom: 0,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: 'lightgrey',
          }}
          colors={['#8276ff', '#b1a2ff']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <Text>{monthNames[calendarMonths - 1]}</Text>
        </LinearGradient>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            width: '30%',
            height: month === 3 ? 50 : 30,
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            marginBottom: 0,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: 'lightgrey',
          }}>
          <Text>{monthNames[calendarMonths == 12 ? 0 : calendarMonths]}</Text>
        </View>
      </View>

      <Calendar
        style={{margin: 10}}
        markedDates={dateData}
        markingType={'period'}
        onMonthChange={(data) => {
          setCalendarMonths(data.month);
          // setState((prevState) => ({ calendarMonths: data.month}));
        }}
        onDayPress={(data) => {
          setSelectedDate(data.dateString);
        }}
        firstDay={1}
        enableSwipeMonths={true}
      />

      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'column', padding: 10}}>
          <View>
            <Text style={{color: 'grey'}}>
              Upcoming Task {`(${ele ? ele.length : 0})`}
            </Text>
          </View>
          {ele}
        </View>
      </View>
    </ScrollView>
  );
}

// Calendar.propTypes = {};
const styles = StyleSheet.create({
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
    paddingLeft: 10,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
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
    height: 100,
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
    // paddingBottom: 0,
    // textAlign: 'left',
    fontSize: 13,
    fontWeight: 'bold',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    // alignSelf:'center',

    // marginTop: 10,
    // paddingBottom: 0,
  },
});

export default CalendarScreen;
