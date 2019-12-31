import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const BaseNavi = createBottomTabNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions : {
      tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name='calendar-multiselect' size={25} style={{ color: tintColor }} />
      )
  },
  },

  DetailScreen: {
    screen: DetailScreen,
    navigationOptions : {
      tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name='book-open-page-variant' size={25} style={{ color: tintColor }} />
      )
  },
  },
  
  WriteScreen: {
    screen: WriteScreen,
    navigationOptions : {
      tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: tintColor }} />
      )
  },
  },
},
{
  tabBarOptions:{
    showLabel: false,
}
}
);
  
    
const BaseNavi2 = createStackNavigator(
  {
    Write: WriteScreen,
    Tab: BaseNavi,
    Detail: DetailScreen,
  },
  {
    initialRouteName: 'Tab',
    mode: 'modal',
    headerMode: 'none',
  }
)

const MyNavi = createAppContainer(BaseNavi2)

export default function App() {
  return (
    <View style={styles.container}>
      <MyNavi />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
