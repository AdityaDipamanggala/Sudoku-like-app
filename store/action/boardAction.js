export const fetchDataBoard = (url) => {
    return async(dispatch) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('generate table');
            dispatch({
                type: 'FETCH_DATA_BOARD',
                payload: {
                    data: data.board,
                    inputBoard: JSON.parse(JSON.stringify(data.board))
                }
            })
        })
    }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
{ Object.keys(params)
.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
.join('&')}

export const solveBoard = (url,board) => {
    return async(dispatch) => {
        fetch(url, {
            method: 'POST',
            body: encodeParams( {board} ),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => response.json())
        .then(data => {
            console.log('generate solve');
            // console.log(data.solution,'<<<solution');
            dispatch({
                type: 'SOLVE_DATA_BOARD',
                payload: {
                    data: data.solution,
                    inputBoard: JSON.parse(JSON.stringify(data.solution))
                }
            })
        // alert(response.status)})
        })
    }
}

export const inputDataBoard = (row,col,value) => {
    return(dispatch) => {
        dispatch({
            type: 'INPUT_DATA_BOARD',
            payload: {
                row,col,value
            }
        })
    }
}