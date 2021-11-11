//Main Module
const gameControl = (()=>{
    const arrayNodes = document.querySelectorAll('.column')


    
    //Game Module
    const game = (()=>{

        //Game Board Module
        const gameBoard = (()=>{ 
            let arr = [1,2,3,4,5,6,7,8,9];
        
            const resetArray = ()=>{
                arr = [];

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

            return {
                resetArray,
                displayArray,
                getMove,
            }
        
        })();

        //Player Module
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
                e.target.innerText = "X"
                _disablePlayerChoice()
            }
            const _enablePlayerChoice = ()=>{
                arrayNodes.forEach((node)=>{
                    node.addEventListener("click",_onNodeClick)
                })
            }

            const getMove = ()=>{
                myChoice = -1;
                _enablePlayerChoice()
                //while player hasnt made a move, wait
                // while(myChoice = -1){}
                // return myChoice;
            }

            return {
                getMove,
            }

        })();
        
        //Computer Module
        const computer = (()=>{
            
            const randomMove = ()=>{
                return Math.floor(Math.random()*9)
            }

            //Will include logic for MIN MAX Algorithm later on
            const getMove = ()=>{
                let myMove = randomMove()
                computerMadeAMove(myMove)
            }

            return {
                randomMove,
                getMove,
            }

        })();

        const gameOver = ()=>{
            return false
        }

        let playerChoice;
        let computerChoice;

        const playerMadeAMove = (choice)=>{
            if (gameOver()){

            }else{
                //prompt computer for move
                setTimeout(() => {
                    playerChoice = choice;
                    computer.getMove()
                }, 500);
            }
            
        }

        const computerMadeAMove = (choice)=>{
            if (gameOver()){

            }else{
                //prompt player for move
                computerChoice = choice
                console.log("computer made a move: " + computerChoice)
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