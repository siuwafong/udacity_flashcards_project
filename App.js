import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CreateDeckScreen from './src/screens/CreateDeckScreen';
import QuizScreen from './src/screens/QuizScreen';
import CreateQuestionScreen from './src/screens/CreateQuestionScreen';
import DeckListScreen from './src/screens/DeckListScreen';
import DeckScreen from './src/screens/DeckScreen'
import EditDeckScreen from './src/screens/EditDeckScreen'
import EditQuestionScreen from './src/screens/EditQuestionScreen'
import StatsScreen from './src/screens/StatsScreen'
import OptionsScreen from './src/screens/OptionsScreen'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { CardProvider } from './src/context/CardContext'
import { DeckProvider } from './src/context/DeckContext'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

import { Notifications } from 'expo-notifications';

const mainStack = createStackNavigator({
  CreateDeck: CreateDeckScreen,
  Quiz: QuizScreen,
  DeckList: DeckListScreen,
  Deck: DeckScreen,
  CreateQuestion: CreateQuestionScreen,
  EditDeck: EditDeckScreen,
  EditQuestion: EditQuestionScreen,
}, {
  initialRouteName: 'DeckList',
  defaultNavigationOptions: {
    title: 'Flashcard App'
  }
})

const statsStack = createStackNavigator({
  Stats: StatsScreen
}, {
  initialRouteName: 'Stats',
  defaultNavigationOptions: {
    title: 'Your Stats'
  }
})

const optionsStack = createStackNavigator({
  Options: OptionsScreen
}, {
  initialRouteName: 'Options',
  defaultNavigationOptions: {
    title: 'Options'
  }
})

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Decks: {
      screen: mainStack, 
      navigationOptions: {tabBarIcon: () => ( <MaterialCommunityIcons name="cards" size={24} color="black" /> )} },
    Stats: {
      screen: statsStack, 
      navigationOptions: {tabBarIcon: () => ( <Ionicons name="md-stats" size={24} color="black" /> )} },
    Options: {
      screen: optionsStack,
      navigationOptions: {tabBarIcon: () => ( <Ionicons name="md-options" size={24} color="black" /> )} },
    },
  {
    initialRouteName: "Decks",
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
)


const App = createAppContainer(tabNavigator)

export default () => {
  return (
    <DeckProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </DeckProvider>
  )
}