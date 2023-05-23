import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    TouchableOpacity
  } from 'react-native';
  import { useEffect, useState} from 'react';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

  
export default ChatComponent = ({navigation}) => {
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
  
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View style={styles.banner}>
        <MaterialIcons name="keyboard-backspace" color="#ffffff" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.greetingText}>Welcome Wendy 👋</Text>
      </View>
        <ScrollView style={styles.scroller}>
        <View style={[styles.messageWrapper, styles.messageRecieved]}>
        <View style={[styles.message, styles.messageRecievedBg]}>
          <Text style={styles.messageText}>Welcome to ChatApp! Let's see how to send instant messages with Pusher.</Text>
        </View>
        <Text style={styles.timeText}>11:31</Text>
      </View>
      <View style={[styles.messageWrapper, styles.messageSent]}>
        <View style={[styles.message, styles.messageSentBg]}>
          <Text style={styles.messageText}>Your own messages should look like this.</Text>
        </View>
        <Text style={styles.timeText}>11:52</Text>
      </View>
      <View style={[styles.messageWrapper, styles.messageSent]}>
        <View style={[styles.message, styles.messageSentBg]}>
          <Text style={styles.messageText}>When you send a longer message, it looks like this. The text wraps around.</Text>
        </View>
        <Text style={styles.timeText}>11:53</Text>
      </View>
      <View style={[styles.messageWrapper, styles.messageRecieved]}>
        <View style={[styles.message, styles.messageRecievedBg]}>
          <Text style={styles.messageText}>Let's go!</Text>
        </View>
        <Text style={styles.timeText}>12:10</Text>
      </View> 
      </ScrollView>
      <View style={styles.inputContainer}>
          <TextInput  style={styles.input} />
          <TouchableOpacity  style={styles.sendButton}>
            <MaterialIcons name="send" color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
   </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: "#242424"
    },
    inset: {
      flex: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      width: '100%',
      paddingTop: 20,
      position: 'relative',
      borderTopColor: '#ffe099',
      borderLeftColor: '#ffe099',
      borderRightColor: '#ffe099',
      borderTopWidth: 4,
      borderRightWidth: 0.1,
      borderLeftWidth: 0.1,
    },
    banner: {
      width: '100%',
      height: '15%',
      paddingTop: 20,
      paddingLeft: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    greetingText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      marginLeft: 15,
    },
    message: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 20,
      paddingLeft: 20,
      borderRadius: 24,
      alignItems: 'flex-end',
      justifyContent: 'center',
      maxWidth: '65%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 6.41,
      elevation: 1.2,
    },
    messageWrapper: {
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    messageRecieved: {
      alignSelf: 'flex-end',
      alignItems: 'flex-end'
    },
    messageSent: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start'
    },
    messageSentBg: {
      backgroundColor: '#AEAEB2',
    },
    messageRecievedBg: {
      backgroundColor: '#FB724C'
    },
    messageText: {
      color: 'white',
      fontWeight: '400',
    },
    timeText: {
      color: 'white',
      opacity: 0.5,
      fontSize: 10,
      marginTop: 2,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      justifySelf: 'flex-end',
      alignContent: 'flex-start',
      marginBottom: 30,
      marginTop: 'auto',
      background: 'transparent',
      paddingLeft: 20,
      paddingRight: 20,
    },
    input: {
      backgroundColor: '#f0f0f0',
      width: '80%',
      padding: 14,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 6.41,
      elevation: 1.2,
    },
    sendButton: {
      borderRadius: 50,
      padding: 16,
      backgroundColor: '#FB724C',
      marginLeft: 12,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 6.41,
      elevation: 1.2,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: '800',
      textTransform: 'uppercase'
    },
    scroller: {
        width: "100%",
      paddingLeft: 20,
      paddingRight: 20,
    },
  });
  
  
