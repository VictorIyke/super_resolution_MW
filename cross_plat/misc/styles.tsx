import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffb703',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    scrollView: {
      backgroundColor: "#e9c46a",
      padding: 4,
    },
    item: {
      margin: 24,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center"
    },
    thumbnail: {
      alignSelf: "center",
      margin: 8,
      width: 400,
      height: 400,
      resizeMode: "contain"
    },
    userInput: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 16,
      alignItems: "center",
      backgroundColor: "#111111"
    },
    welcomeText: {
      marginBottom: 16, 
      margin: 24, 
      fontSize: 18, 
      fontWeight: "bold", 
      textAlign: "center"
  }
  });
