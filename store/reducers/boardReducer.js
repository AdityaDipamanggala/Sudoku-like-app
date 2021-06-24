const initialState ={
    board: [],
    inputBoard:[]
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_DATA_BOARD': 
            // const inputBoard = JSON.parse(JSON.stringify(action.payload.data))
            return{...state, board: action.payload.data, inputBoard: action.payload.inputBoard}
        case 'SOLVE_DATA_BOARD': 
            return{...state, board: action.payload.data, inputBoard: action.payload.inputBoard}
        case 'INPUT_DATA_BOARD': 
            const {row,col,value} = action.payload
            console.log(row,col,value);
            const updatedBoard = JSON.parse(JSON.stringify(state.inputBoard))
            updatedBoard[row][col] = Number(value)
            console.log('updated',JSON.stringify(updatedBoard),'\n');
            console.log('updated',JSON.stringify(state.board),'\n');

            return{...state, inputBoard: updatedBoard}

        default: return state
    }
}