
import { useState, useEffect } from 'react'

export enum GameState {
    CREATED,
    STARTED,
    FINISHED
}

type Player = 0 | 1

export interface TicTacToe {
    gameStatus: GameState
    playersBoard: string[]
    player: string
    winner: string | null
    handleClick: (index: number) => void
    handleStart: (playerNames: string[]) => void
    handleRestart: () => void
}

function createBoard<T>(fill: T): T[] {
    return Array(9).fill(fill)
}

function insertMove<T>(board: T[], index: number, value: T): T[] {
    const clone = board.slice()
    clone.splice(index, 1, value)
    return clone
}

export function useTicTacToe(): TicTacToe {

    const [ bitBoards, setBitBoards] = useState<[number, number]>([0x0, 0x0])
    const [ playersBoard, setPlayersBoard ] = useState<string[]>(createBoard(''))
    const [ currentPlayer, setCurrentPlayer ] = useState<Player>(0)
    const [ winnerName, setWinnerName ] = useState<string | null>(null)
    const [ gameStatus, setGameStatus ] = useState<GameState>(GameState.CREATED)
    const [ playerNames, setPlayerNames ] = useState<string[]>(['', ''])

    useEffect(() => {

        if (gameStatus !== GameState.STARTED) {
            return
        }

        /**
         *  1 1 1   0 0 0   0 0 0   1 0 0   0 1 0   0 0 1   1 0 0   0 0 1
         *  0 0 0   1 1 1   0 0 0   1 0 0   0 1 0   0 0 1   0 1 0   0 1 0
         *  0 0 0   0 0 0   1 1 1   1 0 0   0 1 0   0 0 1   0 0 1   1 0 0
         *  0x1C0   0x038   0x007   0x124   0x092   0x049   0x111   0x054
         */
        const hexMasks = [0x1C0, 0x038, 0x007, 0x124, 0x092, 0x049, 0x111, 0x054]
        // const decMasks = [448, 56, 7, 292, 146, 73, 273, 84]
        
        const winningPositions = [
            // horizontals
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // verticals
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // diagonals
            [0, 4, 8],
            [2, 4, 6]
        ]

        let winningPositionsIndex = 0
        let winningPlayer: Player | -1 = -1
        const n = winningPositions.length

        while (winningPositionsIndex < n && winningPlayer < 0) {
        
            const boardValuesToCkeck = winningPositions[winningPositionsIndex].map(index => playersBoard[index])

            const checkingValue = boardValuesToCkeck[0] as 'X' | 'O' | ''
            const isFinished = boardValuesToCkeck.every(value => checkingValue && value === checkingValue)
            
            if (isFinished) {
                winningPlayer = checkingValue === 'X' ? 0 : 1
                setWinnerName(playerNames[winningPlayer])
                setGameStatus(GameState.FINISHED)
                return
            }

            winningPositionsIndex += 1
        }

        setGameStatus(playersBoard.filter(value => !value).length ? GameState.STARTED : GameState.FINISHED)

    }, [playersBoard, gameStatus])

    const handleClick = (cellIndex: number): void => {
        const cellValue = 'XO'[currentPlayer as number]
        const updatedBoard = insertMove(playersBoard, cellIndex, cellValue)
        setPlayersBoard(updatedBoard)
        setCurrentPlayer((currentPlayer ^ 1) as Player)
    }

    const handleStart = (players: string[], startingPlayer: Player = 0): void => {
        setPlayerNames(players)
        setCurrentPlayer(startingPlayer)
        setGameStatus(GameState.STARTED)
    }

    const handleRestart = () => {
        setPlayersBoard(createBoard(''))
        setWinnerName(null)
        setGameStatus(GameState.CREATED)
    }

    return {
        playersBoard,
        gameStatus,
        player: playerNames[currentPlayer],
        winner: winnerName,
        handleClick,
        handleRestart,
        handleStart
    }
}



// /**
//  *  1 1 1   0 0 0   0 0 0   1 0 0   0 1 0   0 0 1   1 0 0   0 0 1
//  *  0 0 0   1 1 1   0 0 0   1 0 0   0 1 0   0 0 1   0 1 0   0 1 0
//  *  0 0 0   0 0 0   1 1 1   1 0 0   0 1 0   0 0 1   0 0 1   1 0 0
//  *  0x1C0   0x038   0x007   0x124   0x092   0x049   0x111   0x054
//  */
//  const solutions: number[] = [0x1C0, 0x038, 0x007, 0x124, 0x092, 0x049, 0x111, 0x054]

//  let board: [number, number] = [0x0, 0x0]
//  let player: 0 | 1 = 0
 
//  const cells: HTMLButtonElement[] = Array.from(document.querySelectorAll('.cell'))
//  cells.forEach(cell => cell.addEventListener('click', () => move(cell)))
 
//  const newGame = (): void => {
//    board = [0x0, 0x0]
//    player = 0
//    cells.forEach(cell => cell.innerHTML = '')
//  }
 
//  const toHexString = (n: number): string => `0x${n.toString(16)}`
//  const toBinString = (n: number): string => `0b${(n >>> 0).toString(2)}`
 
//  const log = ([ boardX, boardO ]: [number, number]): void => {
//    console.table({
//      dec: [boardX, boardO],
//      hex: [toHexString(boardX), toHexString(boardO)],
//      bin: [toBinString(boardX), toBinString(boardO)]
//    })
//  }
 
//  const move = (cell: HTMLButtonElement): void => {
   
//    const decToBitMask = 0x100 // 256
   
//    /**
//     *  0-8 decimal to a bitwise 256-1 grid representation
//     *
//     *  0   1   2    >>    256 128  64   
//     *  3   4   5    >>     32  16   8   
//     *  6   7   8    >>      4   2   1   
//     */
//    const mask = decToBitMask >> parseInt(cell.value, 10)
   
//    // X and O are represented by a single number and tested by every 
//    // mask that tests the binary representation of that number to the hex masks (solutions) provided
//    let [boardX, boardO] = board
   
//    // prevent double selecting of cells by checking if either board will change
//    if (!((boardX | boardO) & mask)) {
     
//      const playerSign: 'X' | 'O' = 'XO'[player]
//      cell.innerHTML = playerSign
     
//      board[player] |= mask; // add bits to current players' bitboard
//      ([boardX, boardO] = board) // re-destructure
 
//      const weHaveAWinner = solutions.some(mask => (board[player] & mask) === mask)
     
//      if (weHaveAWinner) {
//        alert(playerSign + ' has won!')
//        newGame()
//      }
//      else if((boardX | boardO) === 0x1ff /*511*/) {
//        alert('This is a draw!')
//        newGame()
//      }
//      else {
//        player ^= 1 // switch turns
//      }
//    }
   
//    log(board)
//  }
 
//  newGame()