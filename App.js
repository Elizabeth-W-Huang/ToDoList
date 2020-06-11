import React from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './src/TaskList';
import AsyncStorage from '@react-native-community/async-storage';
import { View ,Text,Image, StyleSheet} from 'react-native';

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
        this.setState(
          {
            todos:[
              {name:'apple',ID:uuidv4(),isComplete:true},
              {name:'banana',ID:uuidv4(),isComplete:false}
            ],
          isDataReady:true}
        )
      }
    } )
    console.log('_getData:  ',this.state)
    
  }
  
  render(){
    
      
      if(!this.state.isDataReady){
        return (
          <View style = {styles.loading_view}>
            <Image 
              style = {styles.loading_image}
              source = {require('./assets/loading_image.gif')}
            />
          </View>
        )
      }
      return(
        <TaskList tasks = {this.state.todos} 
        />)
    
  }
}

const styles = StyleSheet.create({
  loading_view:{
    justifyContent: 'center',
    alignItems:'center',
    height:'100%',
    backgroundColor: 'floralwhite',

  },
  loading_image:{
    width: 100,
    height: 100,
  }
})