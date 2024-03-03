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

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  
  const updateBoard = (index) => {
    //no actualizamos esta posición si ya tiene algo
    if(board[index]) return

    /* los valores de las props deben ser inmutables no debemos cambiar sus valores por eso creamos una nueva constante donde almacenamos el nuevo valor */
    const newBoard = [...board] /* spread and rest operator */
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
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
    </main>
   
  )
}

export default App
