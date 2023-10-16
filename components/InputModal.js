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
import ModalDropdown from 'react-native-modal-dropdown';
import colors from '../assets/colors/colors';

const InputModal = ({
  modalVisible,
  setModalVisible,
  habitInputValue,
  setHabitInputValue,
  colorInputValue,
  setColorInputValue,
  handleAddHabit,
  habits,
  chosenDates,
  setChosenDates,
}) => {
  const handleCloseModal = () => {
    setModalVisible(false);
    setHabitInputValue('');
  };

  const handleSubmit = () => {
    setChosenDates([]);
    handleAddHabit({
      title: habitInputValue.toUpperCase(),
      color: colorConverter(colorInputValue),
      donetoday: true,
      donedates: chosenDates,
      // Check if array if empty
      // if not: id should be the id of the last value + 1
      // if empty: id should be 1
      id: `${
        (habits[habits.length - 1] &&
          parseInt(habits[habits.length - 1].id) + 1) ||
        1
      }`,
    });
    setHabitInputValue('');
  };

  // Converts row index of ModalDropdown to corresponding color
  const colorConverter = colorInput => {
    if (colorInput == 0) return colors.trackDarkGreen;
    else if (colorInput == 1) return colors.trackLightGreen;
    else if (colorInput == 2) return colors.trackOrange;
    else if (colorInput == 3) return colors.trackPink;
    else if (colorInput == 4) return colors.trackYellow;
    else return colors.trackYellow;
  };

  const colorArray = ['Mörkgrön', 'Ljusgrön', 'Orange', 'Rosa', 'Gul'];

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <View style={styles.plusIconWrapper}>
          <Feather
            name="plus"
            style={styles.plusIcon}
            size={25}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide" //alt. 'fade' or 'none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                }}>
                <Feather
                  name="chevron-left"
                  style={styles.backIcon}
                  size={25}
                  color={colors.white}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}> NY VANA </Text>
              <View style={styles.fillSpace}></View>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Lägg till en ny vana"
                onChangeText={text => setHabitInputValue(text)}
                value={habitInputValue}
                onSubmitEditing={handleSubmit}
              />
              <ModalDropdown
                style={styles.modalColorInput}
                textStyle={styles.modalColorText}
                dropdownTextStyle={styles.modalColorDropdown}
                isFullWidth={true}
                options={colorArray}
                defaultValue="Välj en färg"
                onSelect={color => setColorInputValue(color)}
                value={colorInputValue}
              />
            </View>
            <View style={styles.modalActionGroup}>
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}>
                <View style={styles.modalIconWrapper}>
                  <Feather
                    name="check"
                    style={styles.plusIcon}
                    size={25}
                    color={colors.black}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default InputModal;

const styles = StyleSheet.create({
  plusIconWrapper: {
    backgroundColor: colors.trackGrey,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },
  plusIcon: {
    alignSelf: 'center',
  },
  modalContainer: {
    padding: 35,
  },
  modalView: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    marginHorizontal: 40,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 18,
    color: colors.white,
  },
  backIcon: {
    float: 'left',
  },
  fillSpace: {
    width: 25,
    height: 25,
  },
  inputWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalTextInput: {
    alignSelf: 'center',
    margin: 10,
    width: 200,
    height: 50,
    backgroundColor: colors.white,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    letterSpacing: 1,
  },
  modalColorInput: {
    alignSelf: 'center',
    margin: 10,
    width: 200,
    height: 50,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    letterSpacing: 1,
  },
  modalColorText: {
    fontSize: 16,
  },
  modalColorDropdown: {
    fontSize: 16,
  },
  modalActionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  modalIconWrapper: {
    backgroundColor: colors.trackLightGreen,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },
});
