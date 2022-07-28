import { View, Text, Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootParamList } from './NavigStack'
import { styles } from '../misc/styles';

  
type WelcomeScreenProps = StackScreenProps<RootParamList, 'WelcomeScreen', "0">

export default function WelcomeScreen({ navigation, route }: WelcomeScreenProps) {
    return ( 
      <View style={styles.container}>
          <Text style = { styles.welcomeText }>
            Hello There!!! Welcome to the Super-Resolution App</Text>
          <View style= {styles.userInput}>
              <Button color="#219ebc"
                  title='Go to Main Screen'
                  onPress={() => {navigation.push('MainScreen')}}
              />
      
              <Button color="#219ebc"
                  title='Go Back'
                  onPress={() => {
                    if (navigation.canGoBack()) navigation.pop()
                    else Alert.alert("No More Screens", "There is no screen to go back to");
                  }}
              />
              <Button color="#219ebc"
                  title='Go to Home'
                  onPress={() => {
                    if (navigation.canGoBack()) navigation.popToTop()
                    else Alert.alert("No More Screens", "There is no screen to go back to");
                  }}
                  />
          </View>
          <StatusBar style="auto" />
      </View>
    )
  }

