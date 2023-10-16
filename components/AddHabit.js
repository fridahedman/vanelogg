import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/colors/colors';

Feather.loadFont();

// This is a separate page for input of a new habit
// This page is not used, instead the InputModal handles new habits
export default AddHabit = ({navigation}) => {
  // Input fields data
  const [habitName, setHabitName] = React.useState('');
  const [habitColor, setHabitColor] = React.useState('');
  const [habitFrequency, setHabitFrequency] = React.useState('');
  const [habitNotes, setHabitNotes] = React.useState('');

  // one habit with all properties
  const [habitItem, setHabitItem] = React.useState([]);
  // array of all habits
  const [allHabits, setAllHabits] = React.useState([[]]);

  const addNewHabit = async () => {
    // set current habit
    setHabitItem([habitName, habitColor]);
    // update all habits
    setAllHabits(prevHabits => [...prevHabits, habitItem]);

    setHabit(allHabits);

    setHabitName('');
    setHabitColor('');
  };

  useEffect(() => {
    console.log('allHabits: ' + JSON.stringify(allHabits));
  }, [allHabits]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={styles.backArrowWrapper}>
              <Feather
                name="chevron-left"
                style={styles.backArrow}
                size={25}
                color={colors.white}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addNewHabit()}>
            <View style={styles.saveWrapper}>
              <Text style={styles.save}>SPARA</Text>
            </View>
          </TouchableOpacity>
          <Button onPress={() => addNewHabit()} title="SPARA" />
        </View>
      </SafeAreaView>
      {/* Titles */}
      <View style={styles.titlesWrapper}>
        <Text style={styles.Header}> Lägg till en ny vana </Text>
        <Text style={styles.SubHeading}> KOM IGÅNG MED DIN EGEN VANELOGG </Text>
      </View>
      {/* Bottom section */}
      <View style={styles.textInputBackground}>
        <View style={styles.textInputWrapper}>
          <View style={styles.nameColorWrapper}>
            <View style={styles.nameInputWrapper}>
              <Text style={styles.inputTitle}>Namn</Text>
              <TextInput
                style={styles.nameInput}
                onChangeText={input => setHabitName(input)}
                value={habitName}
                placeholder="Namn på vana"
              />
            </View>
            <View style={styles.colorInputWrapper}>
              <Text style={styles.inputTitle}>Färg</Text>
              <TextInput
                style={styles.colorInput}
                onChangeText={input => setHabitColor(input)}
                value={habitColor}
                placeholder="Gul"
              />
            </View>
          </View>
          <Text style={styles.inputTitle}>Frekvens</Text>
          <TextInput
            style={styles.frequencyInput}
            onChangeText={input => setHabitFrequency(input)}
            value={habitFrequency}
            placeholder="1 gång om dagen"
          />
          <Text style={styles.inputTitle}>Anteckningar</Text>
          <TextInput
            style={styles.notesInput}
            onChangeText={input => setHabitNotes(input)}
            value={habitNotes}
            placeholder="Mer information, ett mål med vanan eller så"
            multiline={true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  // Header
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backArrowWrapper: {
    marginTop: 10,
    width: 45,
    height: 45,

    justifyContent: 'center',
  },
  backArrow: {
    alignSelf: 'center',
  },
  saveWrapper: {
    height: 42,
    width: 94,
    borderRadius: 4,
    backgroundColor: colors.save,
    marginRight: 20,
    marginTop: 10,
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },
  save: {
    alignSelf: 'center',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 15,
    color: colors.black,
  },

  // Titles
  titlesWrapper: {
    flexDirection: 'column',
    paddingLeft: 30,
    marginTop: 50,
  },
  Header: {
    fontFamily: 'WorkSans-Bold', // Font funkar ej på denna sida?
    fontSize: 32,
    color: colors.white,
  },
  SubHeading: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: colors.white,
    paddingLeft: 5,
    marginTop: 15,
  },

  // Bottom section, text fields
  textInputBackground: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginTop: 50,
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  inputTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    fontColor: colors.borderGrey,
    marginTop: 30,
  },
  textInputWrapper: {
    marginTop: 20,
    flexDirection: 'column',
    marginLeft: 80,
  },
  nameColorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nameInputWrapper: {
    flexDirection: 'column',
  },
  colorInputWrapper: {
    marginLeft: 14,
    flexDirection: 'column',
  },
  nameInput: {
    height: 56,
    width: 160,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 4,
    padding: 10,
  },
  colorInput: {
    height: 56,
    width: 56,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 4,
    padding: 10,
  },
  frequencyInput: {
    height: 56,
    width: 230,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 4,
    padding: 10,
  },
  notesInput: {
    height: 56,
    width: 230,
    height: 150,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 4,
    padding: 10,
  },
});
