import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform, TextInput, Button, TouchableWithoutFeedback, Keyboard, Modal} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { selectTime,selectDate} from '../reducers/playground';

const SessionBar = (props) => {
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleCloseCalendar = () => {
        setIsCalendarVisible(false);
      };
    
    
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
        console.log(date.dateString)
        dispatch(selectDate(date.dateString))
    };

    const toggleCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        const selectedHours = time.getHours();
        const selectedMinutes = time.getMinutes();
        const formattedTime = `${selectedHours.toString().padStart(2, '0')}:${selectedMinutes.toString().padStart(2, '0')}`;
        setSelectedTime(formattedTime);
        dispatch(selectTime(time))
        hideTimePicker();
  };

    return (
        <View style={styles.container}>
                <TouchableOpacity  style={styles.topContainer} onPress={props.onPress} >
                <FontAwesome style={styles.icon} name="search" size={30} color="white" />
                <Text style={styles.input}>{props.name}</Text>
                {/* <TextInput style={styles.input} placeholder={props.name}  placeholderTextColor="#242424"></TextInput> */}
                </TouchableOpacity>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomLeftContainer}>
                    <FontAwesome style={styles.icon} name="calendar" size={30} color="white" />
                    <TouchableOpacity style={styles.calendar} onPress={toggleCalendar}>
                        <Text style={styles.dateText}>
                            {selectedDate ? selectedDate : 'Sélectionner une date'}
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
                                markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
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
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop:10,
        height: 100,
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between",
        
        
    },
    topContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: "50%",
        backgroundColor: 'rgba(56, 56, 56, 0.8)',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        width: "100%",
        paddingLeft: 15
    },
    input: {
        flex: 1,
        fontSize: 20,
        color: "white"
    },
    timeInput: {
        fontSize: 20,
        color: "white"
    },
    icon: {
        marginRight: 10
    },
    bottomContainer: {
        width: "100%",
        flexDirection: "row",
        height: "50%"
    },
    bottomLeftContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        backgroundColor: 'rgba(56, 56, 56, 0.8)',
        height: "100%",
        width: "100%",
        marginRight: 3,
        paddingLeft: 15
    },
    bottomRightContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: 30,
        backgroundColor: 'rgba(56, 56, 56, 0.8)',
        flex: 1,
    },
    calendar: {
        flex: 1
    },
    dateText: {
        color: "white",
        fontSize: 20
    },
    calendarContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0)' 
    }, timePicker: {
        color: "white",
        backgroundColor: 'rgba(56, 56, 56, 0.8)',

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


export default SessionBar;
