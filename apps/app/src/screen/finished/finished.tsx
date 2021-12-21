import { FC } from 'react'

export interface Props {
    winner: string | null
    handleRestart: () => void
}

export const FinishedScreen: FC<Props> = ({ winner, handleRestart }) => {    
    return (
        <>
            <h1>
                {winner && `Player ${winner} won the game`}
                {!winner && 'It\'s a tie '}
            </h1>
            <button onClick={handleRestart}>Restart</button>
        </>
    )
}