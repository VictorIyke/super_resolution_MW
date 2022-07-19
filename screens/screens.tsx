import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import App from '../App';


export type RootParamList = {
  Screen1: undefined
  Screen2: { paramA: string }
  Screen3: { paramB: string
             paramC: number }
  Super_Resolution: { paramA: string }
}

type Screen1Props = StackScreenProps<RootParamList, 'Screen1', "0">
type Screen2Props = StackScreenProps<RootParamList, 'Screen2', "1">
type Screen3Props = StackScreenProps<RootParamList, 'Screen3', "2">

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

const Screen2 = ({ navigation, route }: Screen2Props) => {
    return ( 
        <View style={styles.container}>
            <Text>Hello {route.params.paramA}</Text>
            <Button
                title='Go to Screen 3'
                onPress={() => {navigation.push('Screen3', { paramB: "Hello", paramC: 7 })}}
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
                onPress={() => {navigation.popToTop()}}
            />
        </View>
      )
}

const Screen3 = ({ navigation, route }: Screen3Props) => {
    return ( 
        <View style={styles.container}>
            <Text>Hello There!!!</Text>
            <TouchableOpacity style = {{padding: 4, backgroundColor: "lightblue"}} onPress={() => {navigation.push('Screen1')}}>
                <Text>Go to Screen 1</Text>
            </TouchableOpacity>
      
            <Button
                title='Go Back'
                onPress={() => {
                  if (navigation.canGoBack()) navigation.pop()
                  else Alert.alert("No More Screens", "There is no screen to go back to");
                }}
            />
            <Button
                title='Go to Home'
                onPress={() => {navigation.popToTop()}}
            />
        </View>
      )
}

const screens = {
    a : Screen1,
    b : Screen2,
    c : Screen3,
    d : App,
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
  