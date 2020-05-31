import React from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './src/TaskList';
import AsyncStorage from '@react-native-community/async-storage';

const storage_key = '@tasks:key'

export default class App extends React.Component{

  constructor(){
    super();
    this.state ={
      todos: {},
      isDataReady: false,
      filter: 'Todo'
    }
    
    
  }

  componentDidMount(){

    this._storeData([{name:'apple',ID:uuidv4()},{name:'banana',ID:uuidv4()}])
    this._getData()
  }


  _storeData = async (new_tasks) => {
    
    try {
      const tasks = JSON.stringify(new_tasks)
      await AsyncStorage.setItem(storage_key, tasks)
      {tasks&&this.setState({tasks})}
      //{console.log(this.state.tasks)}
    } catch (e) {
      alert(e)
    }
  }

  
  _getData = async () => {
    try {
      const response = await AsyncStorage.getItem(storage_key)
      const tasks = JSON.parse(response)
      
      
      {tasks && this.setState({tasks})}
    } catch(e) {
      alert('fail to retrieve data')
    }
  }
  

  render(){
    return(
      this._storeData([{name:'apple',ID:uuidv4()},{name:'banana',ID:uuidv4()}]),
      this._getData(),
      <TaskList tasks = {this.state.tasks} _storeData = {this._storeData}/>

    )
  }
}

