import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import screens from "./screens"


export type RootParamList = {
  WelcomeScreen: undefined
  Super_Resolution: undefined
}

const Root = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName='WelcomeScreen'
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
        }}>
        <Root.Screen name='WelcomeScreen' component={screens.first}/>
        <Root.Screen name='Super_Resolution' component={screens.second}/>
      </Root.Navigator>
    </NavigationContainer>
  )
}

