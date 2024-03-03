import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

/* const board = Array(9).fill(null) */

const Square = ({children, isSelected, updateBoard, index}) => {
  const clasName = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={clasName} onClick={handleClick}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null) //null no hay ganador, false hay empate

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para saber si alguien ganó
    for (const combo of WINNER_COMBOS){
      const[a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ){
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }
  
  const updateBoard = (index) => {
    //no actualizamos esta posición si ya tiene algo y tampoxo actializamos el board si hay un ganador
    if(board[index] || winner) return

    //Actualizar el tablero
    /* los valores de las props deben ser inmutables no debemos cambiar sus valores por eso creamos una nueva constante donde almacenamos el nuevo valor */
    const newBoard = [...board] /* spread and rest operator */
    newBoard[index] = turn
    setBoard(newBoard)
    
    //Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner) //la actualización de los estados en REACT son asíncronos
    }
  } 

  return (
    <main className='board'>
       <h1>Tic Tac Toe</h1>
       <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard} /* pasamos la función como parámetro porque queremos ejecutar la función cuando se haga click y no cuando se renderice */
              >
                {board[index]}
              </Square>
            )
          })
        }
       </section>
       
       <section className="turn">
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>
       </section>

       {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {winner === false ? 'Empate' : 'Ganó: '}
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
       }
    </main>
   
  )
}

export default App
