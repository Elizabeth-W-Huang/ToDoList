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
      todos: [],
      isDataReady: false
    }
  }

  componentDidMount(){
    this._getData()
    console.log('exit_getdata')
  }

  _getData = async () => {
    await AsyncStorage.getItem(storage_key)
    .then( (get_tasks) =>{
      if(get_tasks!==null){
        this.setState({todos:JSON.parse(get_tasks),isDataReady:true})
      } else{
        this.setState({todos:[{name:'apple',ID:uuidv4()},{name:'banana',ID:uuidv4()}],isDataReady:true})
      }
    } )
    console.log('_getData:  ',this.state)
    
  }
  
  render(){
    
      
      if(!this.state.isDataReady){
        return <View><Text>Loading...</Text></View>
      }
      return(
        <TaskList tasks = {this.state.todos} 
        />)
    
  }
}

