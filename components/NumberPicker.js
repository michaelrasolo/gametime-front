import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const NumberPicker = () => {
    const [selectedNumber, setSelectedNumber] = useState(1);
  
    return (
      <View>
        <Picker
          selectedValue={selectedNumber}
          onValueChange={(itemValue) => setSelectedNumber(itemValue)}
        >
          {Array.from({ length: 20 }, (_, index) => index + 1).map((number) => (
            <Picker.Item key={number} label={number.toString()} value={number} />
          ))}
        </Picker>
      </View>
    );
  };
  
  export default NumberPicker;
  