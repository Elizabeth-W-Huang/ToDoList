import React from 'react';
import { View, StyleSheet, TextInput,Button } from 'react-native';
import Task from './Task';


export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: props.tasks };
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
          name: 'Apple',
          ID:5
          }
        ]
        // const newState = {
        //     ...prevState,
        //     tasks: {...prevState.tasks,...newToDoObject}
        // }
        // return {...newState}
                  })
      )
    console.log(this.state.tasks)


    // this.setState({
    //   tasks: this.state.tasks.push({name:put_name,number:put_number,idx:(this.state.tasks[this.state.tasks.])})
    // })
  };

  render() {
    return (
      <View style = {styles.container}>
        <View >
          {this.state.tasks.map(task => (
            <Task
              key={task.ID}
              name={task.name}
              idx = {task.ID}
              deleteTask={this.deleteTask}
            />
          ))}
        </View>
        <View  style = {styles.buttomPlace}>
          <TextInput />
          <Button 
              title = {'click'} 
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
