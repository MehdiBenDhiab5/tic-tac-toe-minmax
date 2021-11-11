//Main Module
const gameControl = (()=>{
    const arrayNodes = document.querySelectorAll('.column')

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

        const takeInMove = (ind, symbol)=>{
            arr[ind] = symbol;
            displayArray();
        }

        return {
            resetArray,
            displayArray,
            takeInMove,
        }
    
    })();

    //Player Module
    const player = (()=>{

    })();
    
    //Computer Module
    const computer = (()=>{
        
        const randomMove = ()=>{
            return Math.floor(Math.random()*10)
        }

        //Will include logic for MIN MAX Algorithm later on
        const computerChoice = ()=>{
            return randomMove()
        }

        return {
            randomMove,
            computerChoice,
        }

    })();
    
    //Game Module
    const game = (()=>{
    
    })();

    //testing
    console.log(computer.computerChoice())

})();