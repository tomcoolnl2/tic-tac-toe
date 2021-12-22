
import { useState, useEffect, MouseEvent } from 'react'

export enum GameState {
    CREATED,
    STARTED,
    FINISHED
}

type Player = 0 | 1
type BitBoardCell = 0x0 | 0x1
type BitBoard = BitBoardCell[]

export interface TicTacToe {
    gameStatus: GameState
    playersBoard: string[]
    player: string
    winner: string | null
    handleClick: (event: MouseEvent, index: number) => void
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
var msk = 0x100 >> 0;
console.log(msk)

export function useTicTacToe(): TicTacToe {

    const [ bitBoards, setBitBoards] = useState<[BitBoard, BitBoard]>([createBoard(0x0), createBoard(0x0)])
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

    const handleClick = (event: MouseEvent, index: number): void => {
        const value = 'XO'[currentPlayer as number]
        const updatedBoard = insertMove(playersBoard, index, value)
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