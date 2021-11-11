//Main Module
const gameControl = (()=>{
    const arrayNodes = document.querySelectorAll('.column')


    
    //Game Module
    const game = (()=>{

        //Game Board Module//------------------------------------------------
        const gameBoard = (()=>{ 
            let arr = ["","","","","","","","",""];
        
            const resetArray = ()=>{
                arr = ["","","","","","","","",""];

                arrayNodes.forEach((node)=>{
                    node.innerText = "";
                })
            }

            const displayArray = ()=>{

                arrayNodes.forEach((node,index)=>{
                    node.innerText = arr[index];
                })
            }

            const getMove = (ind, symbol)=>{
                arr[ind] = symbol;
                displayArray();
            }

            const moveIsLegal = (moveIndex)=>{
                return (arr[moveIndex] === "")
            }

            const gameOver = ()=>{

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
            if (gameBoard.gameOver()){

            }else{
                //prompt computer for move
                setTimeout(() => {
                    computer.getMove()
                }, 500);
            }
            
        }
        const computerMadeAMove = (choice)=>{
            if (gameBoard.gameOver()){

            }else{
                //prompt player for move
                console.log(choice)
                player.getMove()
            }
            
        }

        const playAGame = ()=>{

        }

        return {
            startAGame : player.getMove
        }

    })();

    //testing
    game.startAGame()
    
})();