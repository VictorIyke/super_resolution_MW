import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import screens, {RootParamList} from "./screens/screens"



const Root = createNativeStackNavigator<RootParamList>();



export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName='Screen1'
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
        }}>
        <Root.Screen name='Super_Resolution' component={screens.d}/>
        <Root.Screen name='Screen1' component={screens.a}/>
      </Root.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
