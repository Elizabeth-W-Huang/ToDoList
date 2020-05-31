import React from 'react';
import { View, StyleSheet, ScrollView,ImageBackground,FlatList } from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {Card,ListItem,Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';





export default class TaskList extends React.Component {
  constructor(input_tasks) {
    super(input_tasks);
    this.state = { 
      tasks: input_tasks.tasks ,
      new_task: ''
    };
    this.deleteTask = this.deleteTask.bind(this);
    this._storeData = input_tasks._storeData
  }

  

  deleteTask(item) {
    // setState : reactNative
    // filter : javascript
    const key = item.ID
    this.setState({tasks: this.state.tasks.filter(task => task.ID !== key)})

  }

  addItem = () => {
    this.state.new_task &&
    this.setState(prevState =>({
        tasks: [
          ...prevState.tasks, 
          {
          name: this.state.new_task,
          ID:uuidv4()
          }
        ]
    })
    )
    this._storeData(this.state.tasks)
    this.setState(()=>({new_task:''}))
  };

  


  render() {
    return (
      <View style = {styles.container}>
        {/* <ImageBackground 
          source = {require('../img/background.png')}
          style = {styles.background}
        > */}
        <ScrollView>
        <Card 
        title = "To Do List" 
        containerStyle = {styles.card_style}>  
          {
            this.state.tasks.map((item) =>(
              <ListItem 
                key = {item.ID}
                title = {item.name}
                checkBox = {{
                  iconType : 'font-awesome',
                  uncheckedIcon: 'circle-o',
                  uncheckedColor: 'grey',
                  size: 20,
                  onPress: () => this.deleteTask(item)

                }}
              />
            ))
          }
          <Input 
            style = {styles.input_box}
            placeholder = 'Task'
            leftIcon = {{type:'font-awesome',name: 'list-ul'}}
            onChangeText = {(text)=>this.setState({new_task:text})}
            onSubmitEditing = {this.addItem}
            clearButtonMode = 'always'
          />

        </Card>   
      </ScrollView>      
      {/* /</ImageBackground> */}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  background:{
    flex:1
  },
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
  }
});
