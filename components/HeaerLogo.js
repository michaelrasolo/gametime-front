import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';



const HeaderLogo = () => {
  // SHADOW FUNCTION
  
  return (
    
    <View style={styles.header}>
        <SafeAreaView style={styles.container}>
        <Image
          style={[styles.logo]}
          source={require("../assets/images/logo.png")}
        />
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
        header: {
        width: '100%',
        height: 100,
        backgroundColor :'#FB724C',
        justifyContent: "flex-end",
        alignItems: 'center',
      },
      container : {
        // borderColor : 'black',
        // borderWidth : 1,
        width:"50%",
        height:"65%",
        justifyContent:"center",
        alignItems:"center" 
      },logo: {
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain'  },
});

export default HeaderLogo;