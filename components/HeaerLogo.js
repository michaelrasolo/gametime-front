import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';



const HeaderLogo = () => {
  return (
    
    <View style={styles.header}>
        <SafeAreaView style={styles.logo}>
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
        header: {
        width: '100%',
        height: "35%",
        backgroundColor :'#FB724C',
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo : {
        borderColor : 'black',
        borderWidth : 1,
        width:124,
        height:35,
        justifyContent:"center",
        alignItems:"center" 
      }
});

export default HeaderLogo;