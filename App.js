import React from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './src/TaskList';
import AsyncStorage from '@react-native-community/async-storage';
import { View ,Text} from 'react-native';

const storage_key = '@tasks:key'

export default class App extends React.Component{

  constructor(){
    super();
    this.state ={
      todos: [
        //{name: 'apple',ID:uuidv4()},{name: 'banana',ID:uuidv4()}
      ],
      isDataReady: false
    }
    
    
  }

  componentDidMount(){
    this._loadData()
    this._getData()
  }

  _loadData = async () =>{
    try{
        console.log('loading data...')
        const tasks = [{name: 'apple',ID:uuidv4()},{name: 'banana',ID:uuidv4()}]
        await AsyncStorage.setItem(storage_key,JSON.stringify(tasks))
    } catch(e){
      alert(e)
    }

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
      console.log('retrieve data')
      AsyncStorage.getItem(storage_key).then( (tasks)=>{
        this.setState({todos:JSON.parse(tasks)})
      })
    } catch(e) {
      alert('fail to retrieve data')
    }
  }
  

  render(){
    return(
      <TaskList tasks = {this.state.todos} _storeData = {this._storeData}/>
    )
  }
}

