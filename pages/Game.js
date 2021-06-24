import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import {fetchDataBoard, solveBoard, inputDataBoard} from '../store/action/boardAction'
import {useDispatch, useSelector} from 'react-redux'

export default function Game({route,navigation}) {
  // const [board,setBoard] = useState([])
  // console.log('tes<<<<<',useSelector(state => {console.log(state);} ));
  const dispatch = useDispatch()
  const {board, inputBoard} = useSelector((state) => state.boardReducer)
  const [isSolved, setIsSolved] = useState(false)
  // console.log('tes1<<<<<');

  // const [input,setInput] = useState([])
  
  // const fetchData = () => {
  //   fetch(`https://sugoku.herokuapp.com/board?difficulty=${route.params.level}`)
  //   .then((res) => res.json())
  //   .then((data)=> {
  //     setBoard(data.board)
  //     const dataInput = JSON.parse(JSON.stringify(data.board))
  //     setInput(dataInput)
  //   })
  // }
  
  const onInput = (row, col, number) => {
    console.log(number,'<<<oninput');
    if(number){
      dispatch(inputDataBoard(row, col, number))
    }
    // console.log(input[row][col]);
    // input[row][col] = Number(number)
    // setInput(input)
    // console.log(input[row][col]);
  }
  
  const encodeBoard = (inputBoard) => inputBoard.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === inputBoard.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
  { Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&')}
  
  const submit = () => {
    fetch('https://sugoku.herokuapp.com/validate', {
    method: 'POST',
    body: encodeParams(inputBoard),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  .then(response => response.json())
  .then(response => {
    console.log(board.toString())
    console.log(inputBoard.toString())
    })
  }
  
  const onSolve = () => {
    console.log(board,'<<<board onsolve')
    dispatch(solveBoard('https://sugoku.herokuapp.com/solve',board))
    setIsSolved(true)
    // console.log(board,'<<solve');
  }

  useEffect(() => {
    dispatch(fetchDataBoard(`https://sugoku.herokuapp.com/board?difficulty=${route.params.level}`))
    // if(board){
    //   const dataInput = JSON.parse(JSON.stringify(board))
    //   setInput(dataInput)
    // }
  },[])
  return (
    <View style={styles.main}>
        <Text>Nick: {route.params.name}</Text>
        <Text>level {route.params.level}</Text>

      {/* <Text>{JSON.stringify(board)}Hello world</Text> */}
      {board && board.map((el, rowIdx) => { 
        return <View key={rowIdx}
        style={
          [ styles.board,
            rowIdx === 2 || rowIdx === 5
            ? styles.rowBorder
            : rowIdx === 8
          ]
        }>
          {el.map((num, colIdx) =>{
            return <View key={colIdx}
            style={
              colIdx === 2 || colIdx === 5
              ? styles.columnBorder
              : colIdx === 8
          }>
              <TextInput
                style={styles.inputNum}
                editable={num !== 0 ? false : true}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(num) => onInput(rowIdx, colIdx, num)}
              >
                {num}
              </TextInput>
            </View>
          })}
        </View>
      }) }
      <View  style={styles.button}>
        <Button onPress={() => navigation.navigate('Finish',{isSolved, name: route.params.name})}  title='Submit'/>
      </View>
      <View  style={styles.button}>
        <Button onPress={onSolve}  title='Solve'/>
      </View>
    </View> 
  )
}


const styles = StyleSheet.create({
  main: {
    marginTop: 40,
    backgroundColor: "aliceblue",
  },
  board : {
    flexDirection : 'row',
  },
  inputNum : {
    height : 40,
    width : 40,
    borderWidth : 1,
    fontSize : 20,
    color : 'black',
    textAlign : 'center',
  },
  rowBorder: {
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  columnBorder: {
    borderRightWidth: 2,
    borderColor: 'black'
  },
  button: {
    marginTop: 40,
    width:200,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});
