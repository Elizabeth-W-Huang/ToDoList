import React from 'react';
import { View, StyleSheet,TextInput } from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {Card,ListItem,Input,CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


const storage_key = '@tasks:key'

export default class TaskList extends React.Component {
  constructor(input_tasks) {  
    super(input_tasks);
    console.log("constructor:",input_tasks)
    this.state = { 
      tasks: [...input_tasks.tasks],
      new_task: ''
    };
    this.input_control = React.createRef();
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask = async(item) => {
    const key = item.ID
    const new_tasks = this.state.tasks.filter(task => task.ID !== key)
    await AsyncStorage.setItem(storage_key, JSON.stringify(new_tasks))
    this.setState({tasks: new_tasks})
  }

  addItem = () => {

    console.log('addItem',this.state.new_task)
    this.state.new_task &&
    this.setState(prevState =>(
      {
        tasks: [
          ...prevState.tasks, 
          {name: this.state.new_task,ID:uuidv4(),isComplete:false}
        ]
      }
    ),async()=>{
      await AsyncStorage.setItem(storage_key,JSON.stringify(this.state.tasks))
      .then(()=>{
        console.log('after setSTATE   ' , this.state.tasks),
        this.setState({new_task:""})},
        this.input_control.current.clear()
      )
      }
    )

  };

  // renderLeftElement = ()=>(
  //   <CheckBox 
  //   />
  // )

  _renderList = (item) =>(
    //console.log('_renderList: ',item),
    <ListItem 
      key = {item.ID}
      title = {item.name}
      checkBox = {{
        iconType : 'font-awesome',
        uncheckedIcon: 'circle-o',
        uncheckedColor: 'grey',
        clearButtonMode : 'always',
        size: 20,
        onPress: () => this.deleteTask(item)}}
      //leftElement = {this.renderLeftElement}
    /> )



  render() {
    return (
      
      <View style = {styles.container}>
        <Card 
          title = "To Do List" 
          containerStyle = {styles.card_style}>  
          {
            //console.log('<Card/>: ',this.state),
            this.state.tasks.map( item => this._renderList(item))
          }
          <Input 
            style = {styles.input_box}
            placeholder = 'New Task'
            leftIcon = {{type:'font-awesome',name: 'list-ul',onPress : this.addItem}}
            onChangeText = {(text)=>this.setState({new_task:text})}
            clearButtonMode = 'always'
            ref = {this.input_control}
          />


        </Card>   

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    margin:'5%',
    height:'100%',
    paddingBottom:'15%',
    flexDirection: 'column',
    backgroundColor: 'floralwhite',
  },
  card_style:{
    height:'90%'
  },
  input_box:{
    paddingBottom: '10%'
  },
});
