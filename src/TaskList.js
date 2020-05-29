import React from 'react';
import { View, StyleSheet, TextInput,Button,AsyncStorage,FlatList } from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {Card,ListItem} from 'react-native-elements';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tasks: props.tasks ,
      new_task: '',
      checked:[]
    };
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(item) {
    // setState : reactNative
    // filter : javascript
    const key = item.ID
    this.setState({tasks: this.state.tasks.filter(task => task.ID !== key)})

    console.log(this.state.tasks)
  }

  addItem = () => {
    
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
    console.log(this.state.tasks)
    this.setState(()=>({new_task:''}))
  };

  


  render() {
    return (
      <View style = {styles.container}>
        <Card title = "To Do List">  
          {
            this.state.tasks.map((item) =>(
              <ListItem 
                key = {item.ID}
                title = {item.name}
                checkBox = {{
                  iconType : 'font-awesome',
                  uncheckedIcon: 'check-square',
                  uncheckedColor: 'grey',
                  size: 20,
                  onPress: () => this.deleteTask(item)
                  
                }}
              />
            )
            
            
            )
          }


            {/* data = {this.state.tasks}
            renderItem={
              ({item}) => (
              <Task
                name = {item.name}
                ID = {item.ID}
                deleteTask = {this.deleteTask} />
              )
            }
            keyExtractor = {item =>item.ID} /> */}

          </Card>   
        <View  style = {styles.buttomPlace}>
          <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText = {(text)=>this.setState({new_task:text})}
            placeholder = 'Enter new task here'
            clearButtonMode = 'always'
            onSubmitEditing = {this.addItem}
          />


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    margin:10,
    flexDirection: 'column',
    backgroundColor: 'floralwhite',
  },
  list_item:{
    marginTop:80,
    padding:10,
    flexDirection: 'column'
  },
  buttomPlace: {
    backgroundColor: 'darkseagreen',
    marginBottom: '15%',
  },
  input: {
    height: 1,

    backgroundColor: 'white',
  }
});
