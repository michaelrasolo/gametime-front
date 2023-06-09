import { StyleSheet } from "react-native";

// Style to be used accross all screens/components
export const GlobalStyles = StyleSheet.create({
  h2: {
    fontSize: 24,
    color: "#F0F0F0",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginVertical: 12,
  },
  h3: {
    fontSize: 18,
    color: "#F0F0F0",
    // marginTop: 12,
    // marginBottom: 6
  },
  text: {
    fontSize: 16,
    color: "#F0F0F0",
  },
  desc: {
    color: "#AEAEB2",
    fontSize: 14,
  },
});
