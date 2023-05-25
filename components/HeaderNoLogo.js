import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';

const HeaderNoLogo = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
          <FontAwesome5 name={"arrow-left"} size={20} color={"#F0F0F0"} onPress={() => navigation.navigate('TabNavigator', { screen: 'Search' })}/>
        </TouchableOpacity>
        <Text style={styles.text}>{props.text}</Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 72,
    backgroundColor: "#FB724C",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: "#F0F0F0",
    fontWeight: "600",
    fontSize: 20,
    // borderWidth:4,
    // bottom:8,
    // right:24,
    // position:"absolute"
  },
});

export default HeaderNoLogo;
