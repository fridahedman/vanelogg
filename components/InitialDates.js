import moment from 'moment';
import localization from 'moment/locale/sv';

// Returns an array of dates, 30 days ago until today
const initialDates = () => {
  const days = [];
  const dateStart = moment().subtract(30, 'days');
  const dateEnd = moment();

  while (dateEnd.diff(dateStart, 'days') >= 0) {
    days.push(dateEnd.format('YYYY-MM-DD'));
    dateEnd.subtract(1, 'days');
  }
  return days;
};

export default initialDates;
