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

            return {
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

            //Will include logic for MIN MAX Algorithm later on
            const getMove = ()=>{
                let myMove;
                do {
                    myMove = randomMove()
                } while (gameBoard.moveIsLegal(myMove) == false)
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
                }, 500);
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
