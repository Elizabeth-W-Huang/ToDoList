import React from 'react';
import {View,Text,Image,TouchableHighlight, StyleSheet} from 'react-native';
import {Button,TextInput} from 'react-native'



//import {Icon} from 'react-native-elements';



export default class Task extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.name,
            ID: props.ID,
        }
        this.taskDelete = this.props.deleteTask
        //this.taskDelete = this.taskDelete.bind(this)

    }


    render(){
      return(
        <View >

          <View >
            <Text >item: {this.state.name}</Text>
          </View>
          <View >
            <Button 
              title = {'click'} 
              onPress = {()=>this.taskDelete(this.props.ID)}

            />
          </View>
        </View>
        )
    }

}

const styles = StyleSheet.create({
  container:{flex:1,flexDirection:'row'},
  bottom:{padding:10},
  containerTop:{flex:1},
  containerMiddle:{flex:2, flexDirection: 'column' },
  containerBottom:{flex:.5},
  items :{fontSize:25,color : 'white'},
  numbers: {fontSize:15,color : 'white'}
})