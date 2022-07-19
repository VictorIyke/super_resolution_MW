import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import App from '../App';


export type RootParamList = {
  Screen1: undefined
  Super_Resolution: { paramA: string }
}

type Screen1Props = StackScreenProps<RootParamList, 'Screen1', "0">

const Screen1 = ({ navigation, route }: Screen1Props) => {
  return ( 
    <View style={styles.container}>
        <Text style = {{marginBottom: 16, margin: 24, fontSize: 18, fontWeight: "bold", textAlign: "center"}}>
          Hello There!!! Welcome to the Super-Resolution App</Text>
        <Button 
            title='Go to Screen 2'
            onPress={() => {navigation.push('Super_Resolution', { paramA: "Yeah" })}}
        />

        <Button
            title='Go Back'
            onPress={() => {
              if (navigation.canGoBack()) navigation.pop()
              else Alert.alert("No More Screens", "There is no screen to go back to");
            }}
        />
        <Button
            title='Go to Home'
            onPress={() => {
              if (navigation.canGoBack()) navigation.popToTop()
              else Alert.alert("No More Screens", "There is no screen to go back to");
            }}
            />
    </View>
  )
}


const screens = {
    a : Screen1,
    b : App,
}

export default screens

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
