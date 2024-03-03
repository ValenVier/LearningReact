import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null) //null no hay ganador, false hay empate

  //Reiniciamos el juego una vez se ha terminado
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
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
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner) //la actualización de los estados en REACT son asíncronos
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  } 

  return (
    <main className='board'>
       <h1>Tic Tac Toe</h1>
       <button onClick={resetGame}>Reset the Game</button>
       <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard} /* pasamos la función como parámetro porque queremos ejecutar la función cuando se haga click y no cuando se renderice */
              >
                {square}
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

       <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
   
  )
}

export default App
