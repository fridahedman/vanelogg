import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import HabitCalendar from './HabitCalendar';
import colors from '../assets/colors/colors';

const HabitModal = ({
  habitToBeViewed,
  setHabitToBeViewed,
  habitModalVisible,
  setHabitModalVisible,
  handleDeleteHabit,
  chosenDates,
  setChosenDates,
  calendarColor,
  setCalendarColor,
}) => {
  const handleCloseModal = () => {
    setHabitModalVisible(false);
    setChosenDates([]);
    setCalendarColor(colors.trackGrey);
    habitToBeViewed.donedates = chosenDates;
  };

  const showHabitTitle = () => {
    if (habitToBeViewed !== null) {
      return habitToBeViewed.title;
    } else return '';
  };

  return (
    <>
      <Modal
        visible={habitModalVisible}
        animationType="slide" //alt. 'fade' or 'none'
        transparent={true}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                }}>
                <View style={styles.modalIconWrapper}>
                  <Feather
                    name="chevron-left"
                    style={styles.plusIcon}
                    size={25}
                    color={colors.black}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDeleteHabit(habitToBeViewed)}>
                <View style={styles.modalIconWrapper}>
                  <Feather
                    name="trash-2"
                    style={styles.trashIcon}
                    size={25}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>{showHabitTitle()}</Text>
            <HabitCalendar
              chosenDates={chosenDates}
              setChosenDates={setChosenDates}
              calendarColor={calendarColor}
              setCalendarColor={setCalendarColor}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HabitModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 35,
  },
  modalView: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 35,
    marginTop: 50,
  },
  modalHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'center',
    color: colors.white,
  },
  modalIconWrapper: {
    justifyContent: 'center',
    width: 45,
    height: 45,
    marginLeft: 80,
    marginRight: 80,
  },
  trashIcon: {
    alignSelf: 'center',
    color: colors.white,
  },
});
