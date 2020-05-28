import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



import TaskList from './src/TaskList';

export default class App extends React.Component{
  constructor(){
    super();
    this.state ={
      tasks : [
        { name : 'cabbage',ID:uuidv4()}, { name : 'carrot',ID:uuidv4()}, 
        { name : 'rice',ID:uuidv4() }
      ]
      
    }
  }

  render(){
    return(
      <TaskList tasks = {this.state.tasks} />
    )
  }
}
