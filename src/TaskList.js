import React from 'react';
import { View, StyleSheet, TextInput,Button,AsyncStorage,FlatList, SafeAreaView } from 'react-native';
import Task from './Task';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tasks: props.tasks ,
      new_task: ''
    };
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(key) {
    // setState : reactNative
    // filter : javascript
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
        <SafeAreaView style = {styles.list_item}>
          <FlatList      
            
            data = {this.state.tasks}
            renderItem={
              ({item}) => (
              <Task
                name = {item.name}
                ID = {item.ID}
                deleteTask = {this.deleteTask} />
              )
            }
            keyExtractor = {item =>item.ID} />

        </SafeAreaView>
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
    flex:5,
    flexDirection: 'column',
    backgroundColor: 'floralwhite',
  },
  list_item:{
    flex:8,
    marginTop:80,
    padding:10,
    flexDirection: 'column'
  },
  buttomPlace: {
    flex:1,
    backgroundColor: 'darkseagreen',
    marginBottom: '15%',
  },
  input: {
    height: 1,

    backgroundColor: 'white',
  }
});
