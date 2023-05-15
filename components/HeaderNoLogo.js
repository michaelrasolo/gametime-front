import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


const HeaderNoLogo = () => {
  return (
    <View style={styles.header}>
    </View>
  );
};

const styles = StyleSheet.create({
        header: {
        width: '100%',
        height: 60,
        backgroundColor :'#FB724C'
      },


});

export default HeaderNoLogo;