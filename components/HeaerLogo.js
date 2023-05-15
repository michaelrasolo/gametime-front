import React from 'react';
import { StyleSheet, Text, View} from 'react-native';



const HeaderLogo = () => {
  return (
    <View style={styles.header}>
        <View style={styles.logo}>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
        header: {
        width: '100%',
        height: 100,
        backgroundColor :'#FB724C',
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo : {
        borderColor : 'black',
        borderWidth : 1,
        width : '50%',
        height: '50%', 
      }
});

export default HeaderLogo;