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
        <SafeAreaView >
          {/* {this.state.tasks.map(task => (
            <Task
              key={task.ID}
              name={task.name}
              ID = {task.ID}
              deleteTask={this.deleteTask}
            />
          ))} */}
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
          />
          <Button 
              title = {'add task'} 
              onPress = {this.addItem}

          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    paddingTop: '10%',
    paddingBottom: '10%',
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'darkslateblue',
  },
  buttomPlace: {
    flex: 0.25,
    backgroundColor: 'cadetblue',
    marginBottom: '15%',
  },
  input: {
    height: 50,
    backgroundColor: 'white',
  }
});
