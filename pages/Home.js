import React,{useEffect, useState} from 'react'
import {Text, View, TextInput, Button, Picker} from 'react-native'

export default function Home({navigation}){
    const [name, setName] = useState('')
    const [level, setLevel] = useState('easy')
    const onInputName = (inputName) => {
        setName(inputName)
    }
    const onSelectLevel = (level) => {
        setLevel(level)
    }
    return(
        <View>
            <Text>Enter Your Nick</Text>
            <TextInput
                onChangeText={(inputName) => {onInputName(inputName)}}
            ></TextInput>
            <Text>Select Level</Text>
            <Picker
                selectedValue={level}
                onValueChange={(level) => {onSelectLevel(level)}}
            >
                <Picker.Item label="Noob Player" value="easy"/>
                <Picker.Item label="Normal Player" value="medium"/>
                <Picker.Item label="Pro Player" value="hard"/>


            </Picker>
             <Button
                title="Play Game"
                onPress={() => navigation.navigate('Game',{name, level})}
            />
        </View>
    )
}