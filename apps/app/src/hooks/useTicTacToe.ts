
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

function createBoard<T>(fill: T, size = 9): T[] {
    return Array(size).fill(fill)
}

function insertMove<T>(board: T[], index: number, value: T): T[] {
    const clone = board.slice()
    clone.splice(index, 1, value)
    return clone
}

const toHexString = (n: number): string => `0x${n.toString(16)}`

const toBinString = (n: number): string => `0b${(n >>> 0).toString(2)}`

const log = ([ boardX, boardO ]: [number, number]): void => {
    console.table({
        dec: [boardX, boardO],
        hex: [toHexString(boardX), toHexString(boardO)],
        bin: [toBinString(boardX), toBinString(boardO)]
    })
}

export function useTicTacToe(): TicTacToe {
    // a bitboard containing two bits, representing 'X' and 'O'
    const [ bitBoard, setBitBoard] = useState<[number, number]>([0x0, 0x0])
    // the index of the cell that was selected
    const [ cellIndex, setCellIndex ] = useState<number>(-1)
    // a 3x3 grid, representing the UI of the game
    const [ playersBoard, setPlayersBoard ] = useState<string[]>(createBoard(''))
    // who's turn is it
    const [ currentPlayer, setCurrentPlayer ] = useState<Player>(0)
    // do we have a winner?
    const [ winnerName, setWinnerName ] = useState<string | null>(null)
    // keeps track of the different game status screens
    const [ gameStatus, setGameStatus ] = useState<GameState>(GameState.CREATED)
    // contestants name
    const [ playerNames, setPlayerNames ] = useState<string[]>(['', ''])

    useEffect(() => {

        if (cellIndex < 0 || gameStatus !== GameState.STARTED) {
            return
        }

        /**
         *  1 1 1   0 0 0   0 0 0   1 0 0   0 1 0   0 0 1   1 0 0   0 0 1
         *  0 0 0   1 1 1   0 0 0   1 0 0   0 1 0   0 0 1   0 1 0   0 1 0
         *  0 0 0   0 0 0   1 1 1   1 0 0   0 1 0   0 0 1   0 0 1   1 0 0
         *  0x1C0   0x038   0x007   0x124   0x092   0x049   0x111   0x054
         */
         const solutions: number[] = [0x1C0, 0x038, 0x007, 0x124, 0x092, 0x049, 0x111, 0x054]
        // const solutions = [448, 56, 7, 292, 146, 73, 273, 84]

        const bitMask = 0x100 // 256
        
        /**
         *   0   1  2  3  4  5  6  7  8
         *        >> 0x100 = 
         * 256 128 64 32 16  8  4  2  1
         */
        const mask = bitMask >> cellIndex
        
        // X and O are represented by a single (hex) number and when updated, tested against all solution masks
        let [ bitBoardX, bitBoardO ] = bitBoard

        // prevent double selecting of cells by checking if neither bitboard has changed
        if (!((bitBoardX | bitBoardO) & mask)) {
        
            // update UI board
            const cellValue = 'XO'[currentPlayer as number]
            const updatedBoard = insertMove(playersBoard, cellIndex, cellValue)
            setPlayersBoard(updatedBoard)
        
            // add bits to current players' bitboard
            bitBoard[currentPlayer] |= mask;
            ([ bitBoardX, bitBoardO ] = bitBoard) // re-destructure
        
            const weHaveAWinner = solutions.some(mask => (bitBoard[currentPlayer] & mask) === mask)
            
            if (weHaveAWinner) {
                setWinnerName(playerNames[currentPlayer])
                setGameStatus(GameState.FINISHED)
            }
            else if ((bitBoardX | bitBoardO) === 0x1ff /*511*/) {
                console.log('This is a draw!')
            }
            else {
                // switch turns
                setCurrentPlayer((currentPlayer ^ 1) as Player)
            }
        }

        log(bitBoard)

    }, [cellIndex, gameStatus])

    const handleClick = (cellIndex: number): void => {
        setCellIndex(cellIndex)
    }

    const handleStart = (players: string[], startingPlayer: Player = 0): void => {
        setPlayerNames(players)
        setPlayersBoard(createBoard(''))
        setCurrentPlayer(startingPlayer)
        setGameStatus(GameState.STARTED)
    }

    const handleRestart = () => {
        setBitBoard([0x0, 0x0])
        setCellIndex(-1)
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


 
//  const move = (cell: HTMLButtonElement): void => {
   

   
//    log(board)
//  }
 
//  newGame()