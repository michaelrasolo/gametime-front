import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform, TextInput,Button,TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar,LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr'


const SearchBar = (props) => {

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
      };
    
      const toggleCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);
      };


      const onChange = (event, selectedDate) => {
        setSelectedTime(selectedDate);

      };

      const showPicker = () => {
        setPickerVisibility(true);
      };
    
      const hidePicker = () => {
        setPickerVisibility(false);
      };

      const handleConfirm = (time) => {
        setSelectedTime(time.toLocaleTimeString());
        hidePicker();
      };

    return (
<View style={styles.container}>       
<View style={styles.topContainer}>
<FontAwesome style={styles.icon} name="search" size={30} color="white" />
<TextInput style={styles.input} placeholder={props.name} placeholderTextColor="white"></TextInput>
</View>
<View style={styles.bottomContainer}>
<View style={styles.bottomLeftContainer}>
<FontAwesome style={styles.icon} name="calendar" size={30} color="white" />
<TouchableOpacity style={styles.calendar} onPress={toggleCalendar}>
        <Text style={styles.dateText}>
          {selectedDate ? selectedDate : 'Sélectionner une date'}
        </Text>
      </TouchableOpacity>
      {isCalendarVisible && (
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
        </View>
      )}
</View>
<View style={styles.bottomRightContainer}>
</View>
</View>
</View>       
    )}


    const styles = StyleSheet.create({
        container: {
            height: 100,
            width:"90%",
            alignItems:"center",
            justifyContent:"space-between"
        },
        topContainer: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: "50%",
            backgroundColor:'rgba(56, 56, 56, 0.8)',
            justifyContent:'center',
            flexDirection:'row',
            alignItems:'center',
            marginBottom:3,
            width:"100%",
            paddingLeft:15
        }, 
        input:{
            flex:1,
            fontSize: 20}, 
        icon:{
            marginRight: 10},
        bottomContainer:{
            width:"100%",
            flexDirection:"row",
            height:"50%"
            },
        bottomLeftContainer:{
            flexDirection:"row",
            alignItems: "center",
            justifyContent :"center",
            borderBottomLeftRadius: 30,
            backgroundColor:'rgba(56, 56, 56, 0.8)',
            height: "100%",
            width:"69%",
            marginRight:3,
            paddingLeft:15
        },
        bottomRightContainer:{
            borderBottomRightRadius: 30,
            backgroundColor:'rgba(56, 56, 56, 0.8)',
            flex:1,
            height: "100%",
            width:"29%",
            justifyContent:"center",
            alignItems:"center"
        },
        calendar:{backgroundColor:'rgba(56, 56, 56, 0.8)',
            flex:1},
        dateText:{
            color:"white", 
            fontSize: 20
        },
        calendarContainer: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: '#fff',
          },timePicker:{
            color: "white",
            backgroundColor:'rgba(56, 56, 56, 0.8)',
            
          }});


export default SearchBar;
