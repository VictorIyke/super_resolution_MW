import { View, Text, Button, Alert } from 'react-native';
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
      </View>
    )
  }

