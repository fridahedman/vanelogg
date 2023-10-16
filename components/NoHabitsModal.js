import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from '../assets/colors/colors';
import InputModal from './InputModal.js';

const NoHabitsModal = ({
  noHabitsModalVisible,
  setNoHabitsModalVisible,
  modalVisible,
  setModalVisible,
}) => {
  const handleCloseModal = () => {
    setNoHabitsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={noHabitsModalVisible}
        animation="none"
        transparent={false}
        onRequestClose={handleCloseModal}>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                {' '}
                Det finns inga vanor att visa just nu :({' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <View style={styles.newHabitWrapper}>
                <Text style={styles.newHabitTitle}>Lägg till en ny vana!</Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
};

export default NoHabitsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {alignSelf: 'center', marginTop: 300},
  title: {fontFamily: 'Raleway-Regular', fontSize: 16},
  newHabitWrapper: {
    alignSelf: 'center',
    marginTop: 50,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.trackLightGreen,
  },
  newHabitTitle: {},
});
