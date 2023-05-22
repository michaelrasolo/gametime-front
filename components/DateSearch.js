import React, { useState } from 'react';
import { Text, Modal, View, TouchableOpacity, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr';

const DateSearch = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);


  LocaleConfig.locales['fr'] = {
    monthNames: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    monthNamesShort: [
      'janv.',
      'févr.',
      'mars',
      'avr.',
      'mai',
      'juin',
      'juil.',
      'août',
      'sept.',
      'oct.',
      'nov.',
      'déc.',
    ],
    dayNames: [
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ],
    dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  };

  LocaleConfig.defaultLocale = 'fr';

  const handleDateSelect = (date) => {
    moment.locale('fr');
    const formattedDate = moment(date.timestamp).format('DD MMMM YYYY');
    setSelectedDate(formattedDate);
    setIsCalendarVisible(false);
    props.selectDate(date.dateString)
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };


  const handleCloseCalendar = () => {
    setIsCalendarVisible(false);
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de zéro
  const year = currentDate.getFullYear();
  const formattedcurrentDate = `${day}/${month}/${year}`

  return (
      <View style={[styles.container, { width: props.width }]}>
        <TouchableOpacity style={styles.calendar} onPress={toggleCalendar}>
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate : formattedcurrentDate}
          </Text>
        </TouchableOpacity>
        {isCalendarVisible && (
          <Modal
            visible={isCalendarVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsCalendarVisible(false)}
          >
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={handleDateSelect}
                  markedDates={
                    selectedDate ? { [selectedDate]: { selected: true } } : {}
                  }
                  theme={{
                    backgroundColor: 'white',
                    calendarBackground: 'white',
                    textSectionTitleColor: '#000000',
                    selectedDayBackgroundColor: '#fb724c',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#fb724c',
                    dayTextColor: '#000000',
                    textDisabledColor: '#999999',
                    dotColor: '#00ff00',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#fb724c',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                  }}
                />
          
              <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseCalendar}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    paddingLeft: 10,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#B0B0B0',
    width: '60%',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    color: 'white',
  },
  closeButton: {
    color: '#fb724c',
  },
  icon: {
    marginRight: 10,
  },
  calendar: {
    justifyContent: 'center',
    flex: 1,
  },
  dateText: {
    color: 'white',
    fontSize: 20,
  },
  calendarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  closeButtonText: {
    color: "#FB724C",
    fontSize:20,
    textAlign:"center",
height:50,  }
});

export default DateSearch;
