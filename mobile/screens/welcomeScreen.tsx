import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootParamList } from './apps'

  
type WelcomeScreenProps = StackScreenProps<RootParamList, 'WelcomeScreen', "0">

export default function WelcomeScreen({ navigation, route }: WelcomeScreenProps) {
    return ( 
      <View style={styles.container}>
          <Text style = {{marginBottom: 16, margin: 24, fontSize: 18, fontWeight: "bold", textAlign: "center"}}>
            Hello There!!! Welcome to the Super-Resolution App</Text>
          <Button 
              title='Go to Screen 2'
              onPress={() => {navigation.push('Super_Resolution')}}
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

  
const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
