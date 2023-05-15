import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const OrangeButton = ({ title }) => {
  return (
    <View>
      <TouchableOpacity>
      <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrangeButton;