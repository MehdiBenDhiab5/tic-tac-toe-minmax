//Main Module
const gameControl = (()=>{
    const arrayNodes = document.querySelectorAll('.column')
    const playAgainBtn = document.querySelector('button')
    const messageA = document.querySelector('#message')

    
    //Game Module
    const game = (()=>{

        //Game Board Module//------------------------------------------------
        const gameBoard = (()=>{ 
            let arr = [3,3,3,3,3,3,3,3,3];
        
            const resetArray = ()=>{
                arr = [3,3,3,3,3,3,3,3,3];

                arrayNodes.forEach((node)=>{
                    node.innerText = "";
                })
            }

            const displayArray = ()=>{

                arrayNodes.forEach((node,index)=>{
                    if (arr[index]!=3){
                        node.innerText = arr[index];    
                    }
                })
            }

            const getMove = (ind, symbol)=>{
                arr[ind] = symbol;
                displayArray();
            }

            const moveIsLegal = (moveIndex)=>{
                return (arr[moveIndex] === 3)
            }

            const gameOver = ()=>{
                for (let i=0; i<3; i++){
                    if ( arr[3*i] !=3 && (arr[3*i] == arr[3*i+1]) && ( arr[3*i+1] == arr[3*i+2])){
                        return arr[3*i]
                    }
                    if ( arr[i] !=3 && (arr[i] == arr[i+3]) && (arr[i+3] == arr[i+6])){
                        return arr[i]
                    }
                }
                if ( arr[0] !=3 && (arr[0] == arr[4]) && (arr[4] == arr[8])){
                    return arr[0]
                }
                if ( arr[2] !=3 && (arr[2] == arr[4]) && (arr[4] == arr[6])){
                    return arr[2]
                }

                if ( arr.find(elem => elem === 3) == undefined ) {
                    return "tie"
                }
                return -1
            }

            const getArr = () =>{
                return arr
            }

            return {
                getArr,
                resetArray,
                displayArray,
                getMove,
                moveIsLegal,
                gameOver,
            }
        
        })();//-----------------------------------------------------------------

        //Player Module---------------------------------------------------------
        const player = (()=>{
            let myChoice;

            const _disablePlayerChoice = ()=>{
                arrayNodes.forEach((node)=>{
                    node.removeEventListener("click",_onNodeClick)
                })
                playerMadeAMove(myChoice)
            }

            const _onNodeClick = (e)=>{
                myChoice = e.target.id.valueOf()
                if(gameBoard.moveIsLegal(myChoice)){
                    gameBoard.getMove(myChoice,"X")
                    _disablePlayerChoice()
                }
            }
            
            const _enablePlayerChoice = ()=>{
                arrayNodes.forEach((node)=>{
                    node.addEventListener("click",_onNodeClick)
                })
            }

            const getMove = ()=>{
                myChoice = -1;
                _enablePlayerChoice()
            }

            return {
                getMove,
            }

        })();//----------------------------------------------------------------
        
        //Computer Module------------------------------------------------------
        const computer = (()=>{
            
            const randomMove = ()=>{
                return Math.floor(Math.random()*9)
            }

            //returns "tie" if the board is filled up
            //returns "X" if X won
            //returns "O" if O won
            // returns -1 if the game hasn't ended yet
            const gameOver = (arr)=>{
                for (let i=0; i<3; i++){
                    if ( arr[3*i] !=3 && (arr[3*i] == arr[3*i+1]) && ( arr[3*i+1] == arr[3*i+2])){
                        return arr[3*i]
                    }
                    if ( arr[i] !=3 && (arr[i] == arr[i+3]) && (arr[i+3] == arr[i+6])){
                        return arr[i]
                    }
                }
                if ( arr[0] !=3 && (arr[0] == arr[4]) && (arr[4] == arr[8])){
                    return arr[0]
                }
                if ( arr[2] !=3 && (arr[2] == arr[4]) && (arr[4] == arr[6])){
                    return arr[2]
                }

                if ( arr.find(elem => elem === 3) == undefined ) {
                    return "tie"
                }
                return -1
            }

            //MIN MAX
            const minmax =  (CurrArrayState, player)=>{
                //if game has ended return 0 or 10 or -10
                if (gameOver(CurrArrayState) == "tie") {
                    return 0
                }else if (gameOver(CurrArrayState) == "X"){
                    return -10
                }else if (gameOver(CurrArrayState) == "O"){
                    return 10
                //else if game hasnt ended yet
                }else {
                    let testArr;
                    let bestValue;
                    //initialize bestValue depending on the player, so we can compare it
                    if (player == "X") {
                        bestValue = 10
                    }else {
                        bestValue = -10
                    }
                    //for every element in the array
                    for (let i=0; i<CurrArrayState.length; i++){
                        //if the element isnt  marked / is empty
                        if(CurrArrayState[i] == 3){
                            //create a copy of the array, and add a player/computer mark at the index
                            testArr = [...CurrArrayState] 
                            testArr[i] = player

                            //call minmax with the newly created array, and compare the value returned to the best value we have
                            //if its better, then keep the value
                            //"X" wants to get the lowest possible value, "O" wants the biggest
                            if(player == "X"){
                                moveValue = minmax(testArr,"O")
                                if (moveValue < bestValue) {
                                    bestValue = moveValue
                                }
                            }else{
                                moveValue = minmax(testArr,"X")
                                if (moveValue > bestValue) {
                                    bestValue = moveValue
                                }
                            }
                            testArr[i] = 3
                        }
                    }
                    return bestValue
                }
            }

            //call MINMAX
            const getCorrectMove = ()=>{

                //clones the array from the gameBoard component
                let currArr = [...gameBoard.getArr()]

                //initialize best value and best move
                //best move being an index that we will return at the end of the function
                //best value being 0 or 10 or -10 depending on who won
                let bestValue = -20
                let bestMove;
                let minmaxResults;

                gameBoard.getArr().forEach((elem,index)=>{
                    //for each element in the array that is empty
                    if (elem == 3){
                        //call minmax function, with the currArray after adding an "O" at the current index
                        //minmax will return 0 or 10 or -10
                        currArr[index] = "O"
                        minmaxResults = minmax(currArr,"X")
                        //if minmax returned a better value, save that value for further comparison, and save the index of the move
                        if (minmaxResults>bestValue){
                            bestValue = minmaxResults
                            bestMove = index
                        }
                        //reset the currArray to prepare it for the next iteration
                        currArr[index] = 3
                    }
                })
                return bestMove
            }

            //Will include logic for MIN MAX Algorithm later on
            const getMove = ()=>{
                let myMove;
                // do {
                    myMove = getCorrectMove()
                // } while (gameBoard.moveIsLegal(myMove) == false)
                gameBoard.getMove(myMove,"O")
                computerMadeAMove(myMove)
            }

            return {
                randomMove,
                getMove,
            }

        })(); //--------------------------------------------------------------

        const playerMadeAMove = (choice)=>{
            if (gameBoard.gameOver() != -1){
                gameEnd(gameBoard.gameOver())
            }else{
                //prompt computer for move
                setTimeout(() => {
                    computer.getMove()
                }, 200);
            }
        }

        const computerMadeAMove = (choice)=>{
            if (gameBoard.gameOver() != -1){
                gameEnd(gameBoard.gameOver())
            }else{
                //prompt player for move
                player.getMove()
            }
        }

        const startAGame = ()=>{
            gameBoard.resetArray()
            player.getMove()
        }

        return {
            startAGame,
        }

    })();

    const gameEnd = (winnerSymbol)=>{
        if ( winnerSymbol == "tie") {
            messageA.innerText= ("Tie game!")
        }else if ( winnerSymbol == "X"){
            messageA.innerText= ("You won!")
        }else {
            messageA.innerText= ("You suck!")
        }
    }

    playAgainBtn.addEventListener("click", ()=>{
        messageA.innerText = ""
        game.startAGame()
    })

    game.startAGame()

})();
