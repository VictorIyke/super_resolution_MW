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
            Hello There! Welcome to the Super-Resolution App</Text>
              <Button color="#118ab2"
                  title='NEXT'
                  onPress={() => {navigation.push('MainScreen')}}
              />
          <StatusBar style="auto" />
      </View>
    )
  }

