import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import TaskList from './src/TaskList';

export default class App extends React.Component{
  constructor(){
    super();
    this.state ={
      tasks : [
        { name : 'cabbage',ID:1}, { name : 'carrot',ID:2}, 
        { name : 'rice',ID:3 }
      ]
      
    }
  }

  render(){
    return(
      <TaskList tasks = {this.state.tasks} />
    )
  }
}
