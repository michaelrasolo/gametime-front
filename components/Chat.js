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
  import { useLayoutEffect,useRef, useEffect, useState} from 'react';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { useNavigation } from '@react-navigation/native';
  import Config from "../config";
  import { useSelector } from 'react-redux';
  import socketIOClient from "socket.io-client";

  const IPAdresse = Config.IPAdresse;
  
  export default ChatComponent = () => {
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const navigation = useNavigation()
    const user = useSelector((state) => state.user.value)
    const game = useSelector((state) => state.game.value)

    const sessionId = game.gameId; // Récupérer le sessionId à partir de votre état ou de toute autre source

    var socket = socketIOClient(IPAdresse, {
      query: { sessionId: sessionId }
    });

    const scrollViewRef = useRef(null);

    function formatDate(date) {
      date = new Date(date)
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
    
      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
      return formattedDate;
    }


//     const refreshMessages = () => {
//       fetch(`${IPAdresse}/chat/${game.gameId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(res => res.json())
//       .then(data => {
// setMessages(data)});
//     }

const refreshMessages = () => {
  fetch(`${IPAdresse}/chat/${game.gameId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(data => {
      setMessages(data);
    });

  setTimeout(refreshMessages, 3000);
};

refreshMessages();

    // setInterval(refreshMessages, 2000);

    useEffect(() => {
      refreshMessages()
      console.log("Socket connected: ", socket.connected);
      socket.on("newMessage", (message)=> {
        console.log(message)
         setMessages(prevMessages => [...prevMessages, message])
         scrollViewRef.current.scrollToEnd({ animated: true })
      });}, []);

      useLayoutEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, []);
     

    const handleSend = () => {
      fetch(`${IPAdresse}/chat/message`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token :  user.token,
            message : newMessage,
            sessionId: game.gameId
        }
        ),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        });
      socket.emit("sendMessage", newMessage, user.nickname,user.token,new Date())
      setNewMessage('')
    }

    const conversation = messages.length>0 && messages.map((data, i) => (
      <View key ={i} style={[
        styles.messageWrapper,
        data.token === user.token ? styles.messageSent : styles.messageRecieved,
      ]}>
      <Text style={styles.nameText}>{data.nickname}</Text>
      <View style={[styles.message, data.token === user.token ? styles.messageSentBg : styles.messageRecievedBg ]}>
        <Text style={styles.messageText}>{data.message}</Text>
      </View>
      <Text style={styles.timeText}>{formatDate(data.date)}</Text>
    </View>
    ));

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View style={styles.banner}>
        <MaterialIcons name="keyboard-backspace" color="#ffffff" size={24} onPress={() => navigation.navigate('TabNavigator', {screen : "Session"})} />
        <Text style={styles.greetingText}>Welcome {user.nickname} 👋</Text>
      </View>
        <ScrollView style={styles.scroller}
           ref={scrollViewRef}
           onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}

           >
        {conversation && conversation}
      </ScrollView>
      <View style={styles.inputContainer}>
          <TextInput  style={styles.input} onChangeText={(value => setNewMessage(value))} value={newMessage}/>
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
      alignSelf: 'flex-start',
      alignItems: 'flex-start'
    },
    messageSent: {
      alignSelf: 'flex-end',
      alignItems: 'flex-end'
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
    nameText: {
      color: 'white',
      fontWeight: '400',
      fontSize:12,
      margin : 4,
      paddingLeft: 5,
      paddingRight:5
    }
  });
  
  
