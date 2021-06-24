import React,{useEffect, useState} from 'react'
import {StyleSheet,Text, View, TextInput, Button, Picker, Image} from 'react-native'

export default function Finish ({route}){
    const isSolved = route.params.isSolved
    const name = route.params.name

    if(isSolved){
        return(
            <View>
               <Text style={styles.success} > Good Job {name} </Text>
            </View>
        )
    }
    else{
        return(
            <View>
                <Text style={styles.fail}> Try Harder {name} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   success:{
       fontWeight: "bold",
       fontSize:100,
       justifyContent:'center',
       textAlign:"center",
       marginTop: 30 ,
       color:'green'      
   },
   fail:{
        fontWeight: "bold",
        fontSize:100,
        justifyContent:'center',
        textAlign:"center",
        marginTop: 30 ,
        color:'red' 

   }
   
  });