import * as React from 'react';
import {useEffect, useState} from 'react';

import {View, Text} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import localization from 'moment/locale/sv';
import colors from '../assets/colors/colors';

export default HabitCalendar = ({
  chosenDates,
  setChosenDates,
  calendarColor,
  setCalendarColor,
}) => {
  // Function for when a date is clicked
  const handleClickedDate = response => {
    const responseString = response.dateString;
    var newChosenDates = [];
    // If date is already chosen, remove from chosenDates
    if (isChosenDate(responseString)) {
      newChosenDates = chosenDates.filter(item => item !== responseString);
    }
    // If not chosen, add to chosenDates
    else {
      newChosenDates = [...chosenDates, responseString];
    }

    setChosenDates(newChosenDates);
  };

  // Returns true if dateString is found in chosenDates
  const isChosenDate = dateString => {
    if (chosenDates.find(element => element == dateString) == null) {
      return false;
    }
    return true;
  };

  // Marks dates in Calendar
  const getMarkedDates = chosenDates => {
    var markedDates = {};
    // Goes through the array chosenDates and marks them
    chosenDates.forEach(chosenDate => {
      // Format date to YYYY-MM-DD
      const formattedDate = moment(new Date(chosenDate)).format('YYYY-MM-DD');
      markedDates[formattedDate] = {
        selected: true,
        selectedColor: calendarColor,
      };
    });
    return markedDates;
  };

  // Swedish names for months and days in Calendar
  LocaleConfig.locales['sv'] = {
    monthNames: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Febr.',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli.',
      'Aug.',
      'Sept.',
      'Okt.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Söndag',
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lördag',
    ],
    dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'],
    today: 'Idag',
  };
  LocaleConfig.defaultLocale = 'sv';

  return (
    <Calendar
      minDate={moment(Date()).subtract(30, 'days').format('YYYY-MM-DD')} // 30 days from today
      maxDate={moment(Date()).format('YYYY-MM-DD')} //today
      markedDates={getMarkedDates(chosenDates)}
      onDayPress={response => handleClickedDate(response)}
    />
  );
};
