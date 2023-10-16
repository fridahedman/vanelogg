import * as React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import localization from 'moment/locale/sv';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../assets/colors/colors';
import InputModal from './InputModal.js';
import HabitModal from './HabitModal.js';
import NoHabitsModal from './NoHabitsModal.js';
import AboutPage from './AboutPage.js';
import InitialHabits from './InitialHabits.js';
import InitialDates from './InitialDates.js';

Feather.loadFont();

export default Home = () => {
  // State variable for all habits
  const [habits, setHabits] = useState(InitialHabits);

  // State variables for InputModal
  const [modalVisible, setModalVisible] = useState(false);
  const [habitInputValue, setHabitInputValue] = useState();
  const [colorInputValue, setColorInputValue] = useState();

  // State variables for HabitModal
  const [habitToBeViewed, setHabitToBeViewed] = useState(null);
  const [habitModalVisible, setHabitModalVisible] = useState(false);

  // Calendar variables
  const [chosenDates, setChosenDates] = useState([]);
  const [calendarColor, setCalendarColor] = useState(colors.trackGrey);

  // State variables for NoHabitModal
  const [noHabitsModalVisible, setNoHabitsModalVisible] = useState(false);
  const [aboutPageVisible, setAboutPageVisible] = useState(false);
  const renderHabitItem = ({item}) => {
    return (
      <View>
        <View style={styles.habitsTitleWrapper}>
          <TouchableOpacity
            onPress={() => {
              handleTriggerHabitModal(item);
            }}>
            <Text style={styles.habitsItemTitle}>{item.title}</Text>
          </TouchableOpacity>
        </View>
        {/* Mappa alla datum med true or false om de finns med i donedates eller inte */}
        {/* <FlatList
          data={InitialDates}
          renderItem={({item}) => (
            <View style={styles.checkboxItem}>
              <Text> {moment(item).format('D')} </Text>
            </View>
          )}
          keyExtractor={item => item}
          horizontal={false}
          extraData={InitialDates} // denn ahde varit bra att använda för dynamisk uppdatering
        /> */}

        {InitialDates().map(date => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleClickedCheckbox(date, item);
              }}
              key={date}
              style={[
                styles.checkboxItem,
                {
                  backgroundColor: isTrackedDate(date, item.donedates)
                    ? item.color
                    : colors.trackGrey,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  // Function to check if date is found in an array of dates
  const isTrackedDate = (date, donedates) => {
    if (donedates == null) {
      return false;
    } else if (donedates.find(element => element == date) == null) {
      return false;
    }
    return true;
  };

  // Function to check if day is the last in its month
  // if the day is the last in the month, or if the day is today, return the name of the month
  // if not, return nothing
  const isLastDay = date => {
    if (date == moment(date).endOf('month').format('YYYY-MM-DD')) {
      return moment(date).format('MMMM');
    } else if (date == moment().format('YYYY-MM-DD')) {
      return moment(date).format('MMMM');
    } else return null;
  };

  // Function to handle a clicked checkbox
  // if found, remove from item.donedates
  // if not found, add to item.donedates
  const handleClickedCheckbox = (date, item) => {
    const donedates = item.donedates;
    if (isTrackedDate(date, donedates)) {
      donedates.splice(donedates.indexOf(date), 1);
    } else {
      donedates.push(date);
    }

    return [...donedates]; // behövs return? vad betyder det egentligen?
  };

  // Function to delete a habit
  const handleDeleteHabit = item => {
    const habitIndex = item.id;
    const newHabits = habits.filter(habit => habit.id !== habitIndex);
    setHabits(newHabits);
    setHabitModalVisible(false);
    checkNoHabits();
  };

  // Function to add a new habit
  const handleAddHabit = habit => {
    const newHabits = [...habits, habit];
    setHabits(newHabits);
    setModalVisible(false);
    checkNoHabits();
  };

  // Function to open habit modal
  // passes the corresponding values to the habit calendar
  const handleTriggerHabitModal = item => {
    setHabitToBeViewed(item);
    item.donedates.forEach(date => {
      const formattedDate = moment(new Date(date)).format('YYYY-MM-DD');
      setChosenDates(prevDates => [...prevDates, formattedDate]);
    });
    setCalendarColor(item.color);
    setHabitModalVisible(true);
  };

  // Checks if there are no habits, then show NoHabisModal
  const checkNoHabits = () => {
    if (Array.isArray(habits) && habits.length === 0) {
      setNoHabitsModalVisible(true);
    } else {
      setNoHabitsModalVisible(false);
    }
  };

  // Checks if there are habits to show every page refresh
  useEffect(() => {
    checkNoHabits();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => setAboutPageVisible(true)}>
            <Image
              source={require('../assets/images/Logga1.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <AboutPage
            aboutPageVisible={aboutPageVisible}
            setAboutPageVisible={setAboutPageVisible}
          />
          <NoHabitsModal
            noHabitsModalVisible={noHabitsModalVisible}
            setNoHabitsModalVisible={setNoHabitsModalVisible}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <InputModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            habitInputValue={habitInputValue}
            setHabitInputValue={setHabitInputValue}
            handleAddHabit={handleAddHabit}
            habits={habits}
            colorInputValue={colorInputValue}
            setColorInputValue={setColorInputValue}
            chosenDates={chosenDates}
            setChosenDates={setChosenDates}
          />
          <HabitModal
            habitToBeViewed={habitToBeViewed}
            setHabitToBeViewed={setHabitToBeViewed}
            habitModalVisible={habitModalVisible}
            setHabitModalVisible={setHabitModalVisible}
            handleDeleteHabit={handleDeleteHabit}
            chosenDates={chosenDates}
            setChosenDates={setChosenDates}
            calendarColor={calendarColor}
            setCalendarColor={setCalendarColor}
          />
        </View>
        {/* Habits */}
        <ScrollView>
          <View style={styles.screenWrapper}>
            {/* Titles of the months*/}
            <View style={styles.habitsListWrapper}>
              <View style={styles.dateWrapper}>
                {InitialDates().map(date => {
                  return (
                    <Text style={styles.dateText} key={date}>
                      {isLastDay(date)} {moment(date).format('DD')}
                    </Text>
                  );
                })}
              </View>
              <FlatList
                data={habits}
                renderItem={renderHabitItem}
                keyExtractor={item => item.id}
                horizontal={true}
                extraData={habits} // force rerender when habits are changed
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    marginTop: 10,
    width: 100,
    height: 25,
  },
  // Screen
  screenWrapper: {
    flexDirection: 'row',
  },
  // Dates
  dateWrapper: {
    flexDirection: 'column',
    marginTop: 87,
    marginRight: 15,
    marginLeft: 7,
  },
  dateText: {
    marginTop: 30.7,
    textAlign: 'right',
    color: colors.black,
  },
  // Habits
  habitsListWrapper: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  habitsTitleWrapper: {},
  habitsItemTitle: {
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'raleway_bold',
    fontSize: 16,
    color: colors.black,
    transform: [{rotate: '270deg'}],
  },
  checkboxItem: {
    height: 30,
    width: 30,
    borderRadius: 8,
    marginRight: 15,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: colors.trackGrey,
  },
});
