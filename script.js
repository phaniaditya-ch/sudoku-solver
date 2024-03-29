let grid = []
let solutionsList = new Set();
let inputGrid = [];

let selectedPos = [0, 0];
let pastSelectedPos = [0, 0];

let max = (a, b) => {
    return a > b ? a : b;
}

let min = (a, b) => {
    return a < b ? a : b;
}

let handleLeft = () => {
    selectedPos[1] = max(0, selectedPos[1] - 1);
}

let handleRight = () => {
    selectedPos[1] = min(8, selectedPos[1] + 1);
}

let handleUp = () => {
    selectedPos[0] = max(0, selectedPos[0] - 1);
}

let handleDown = () => {
    selectedPos[0] = min(8, selectedPos[0] + 1);
}

let handleNumberPress = (number) => {
    document.querySelector(`#box${selectedPos[0]}${selectedPos[1]}`).innerHTML = number;
}

let updateGrid = () => {
    document.querySelector(`#box${pastSelectedPos[0]}${pastSelectedPos[1]}`).classList.remove('box-selected');
    document.querySelector(`#box${selectedPos[0]}${selectedPos[1]}`).classList.add('box-selected');
    pastSelectedPos = [...selectedPos];
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            handleLeft();
            break;
        case "ArrowRight":
            handleRight();
            break;
        case "ArrowUp":
            handleUp();
            break;
        case "ArrowDown":
            handleDown();
            break;
        default:
            // Ignore other keys
            break;
    }
    if (/^\d$/.test(event.key)) {
        let number = parseInt(event.key);
        handleNumberPress(number);
    }
    if (event.key === "Enter") {
        handleSolve();
    }
    updateGrid();
});

let isValidSudoku = () => {

    let mp = {}

    for(let i = 0 ; i < 9 ; i ++ ) {
        mp = {}
        for(let j = 0 ; j < 9 ; j ++ ) {
            mp[grid[i][j]] ++;
        }
        for(let num in mp) {
            if(mp[num] > 1 && num != 0){
                console.log(`mp : ${mp}`)
                return false;
            }
        }
    }

    for(let i = 0 ; i < 9 ; i ++ ) {
        mp = {}
        for(let j = 0 ; j < 9 ; j ++ ) {
            mp[grid[j][i]] ++;
        }
        for(let num in mp) {
            if(mp[num] > 1 && num != 0){
                return false;
            }
        }
    }
    return true;

    


}

let isPossible = (row, col, n) => {
    // if(!isValidSudoku()){
    //     // return false;
    // }
    // console.log(`checking ${row} ${col} ${n}`)
    for(let i = 0 ; i < 9 ; i ++ ) {
        if(grid[i][col] === n){
            return false;
        }
        if(grid[row][i] === n) {
            return false;
        }
    }

    let i0 = Math.floor(row / 3) * 3;
    let j0 = Math.floor(col / 3) * 3;

    for(let i = 0 ; i < 3 ; i ++ ) {
        for(let j = 0 ; j < 3 ; j ++ ) {
            if(grid[i0 + i][j0 + j] === n) {
                return false;
            }
        }
    }
    return true;
}

let isSolutionFound = false;

let solveSudoku = () => {
    // console.log('solcing')
    for(let i = 0 ; i < 9 ; i ++ ) {
        for(let j = 0 ; j < 9 ; j ++ ) {
            if(grid[i][j] === 0) {
                for(let k = 1 ; k <= 9 ; k ++ ) {
                    if(isPossible(i, j, k)){
                        grid[i][j] = k;
                        solveSudoku();
                        if(isSolutionFound){
                            return;
                        }
                        grid[i][j] = 0;
                    }
                }
                console.log(`no solution found`)
                return;
            }
        }
    }
    // isSolutionFound = true;
    console.log(`grid after solving: ${grid} and isSolved : ${isSolutionFound}`)
    solutionsList.add(grid);
    isSolutionFound = true;
    // if(solutionsList.size >= 10) {
    //     console.log(solutionsList)
    // }
}


let getNumbers = () => {
    for(let i = 0 ; i < 9 ; i ++ ) {
        let row = []
        for(let j = 0 ; j < 9 ; j ++ ) {
            // if(Number(document.querySelector(`#box${i}${j}`).value) > 0 && Number(document.querySelector(`#box${i}${j}`)) <= 9) {
                let num = Number(document.getElementById(`box${i}${j}`).innerHTML);
                if(isNaN(num)) {
                    row.push(0);
                }
                else {
                    row.push(num);
                }
                // }
            // else(grid.push('.'))
        }
        grid.push(row);
    }
    let copyGrid = [...grid];
    inputGrid = [...grid];
    console.log(copyGrid)
}

let fillSudoku = () => {
    if(solutionsList.length)
    currGrid = solutionsList[0];
    else
    currGrid = inputGrid;
    for(let i = 0 ; i < 9 ; i ++ ) {
        for(let j = 0 ; j < 9 ; j ++ ) {
            document.querySelector(`#box${i}${j}`).innerHTML = currGrid[i][j];
        }
    }
}

let handleSolve = () => {
    grid = []
    console.log('clicked')
    getNumbers();
    console.log(`before solving : ${grid}`);
    solveSudoku();
    console.log(`after solving : ${grid}`);
    fillSudoku();
}

for(let i = 0 ; i < 9 ; i ++ ) {
    for(let j = 0 ; j < 9 ; j ++ ) {
        if((Math.floor(i / 3) + Math.floor(j / 3)) % 2 === 0){
            document.querySelector(`#box${i}${j}`).classList.add('light-blue-box');
        }
        else {
            document.querySelector(`#box${i}${j}`).classList.add('dark-blue-box');
        }
    }
}

document.getElementById('solve-btn').addEventListener("click", handleSolve);