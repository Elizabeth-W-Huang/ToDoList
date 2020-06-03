import React from 'react';
import { StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';



export default class Task extends React.Component{
    constructor(item_props){
      super(item_props)
      this.state = {
        name : item_props.task.name,
        ID: item_props.task.ID,
        isComplete: item_props.task.isComplete,
        taskDelete : item_props.deleteTask
      }
      
      //this.taskDelete = this.taskDelete.bind(this)
    }


    render(){
      console.log('enter task')
      console.log(this.state)
      return(
        <ListItem 
          key = {this.ID}
          title = {this.name}
          checkBox = {{
            iconType : 'font-awesome',
            uncheckedIcon: 'circle-o',
            uncheckedColor: 'grey',
            clearButtonMode : 'always',
            size: 20,
            onPress: (item) => this.taskDelete(item)}}
        />
        )
    }

}

const styles = StyleSheet.create({

})