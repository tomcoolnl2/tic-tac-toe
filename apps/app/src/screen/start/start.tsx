
import { useState, useMemo, FormEvent, FC } from 'react'


export interface Props {
    handleStart: (players: string[]) => void
}

export const StartScreen: FC<Props> = ({ handleStart }) => {
    
    const [ players, setPlayers ] = useState(['', ''])
    
    const handleInput = ({ currentTarget: { value }}: FormEvent<HTMLInputElement>, index: number): void => {
        const newPlayers = [...players]
        newPlayers.splice(index, 1, value)
        setPlayers(newPlayers)
    }
    
    const canStart = useMemo(() => {
        return players.every(player => player && player.length > 0)
    }, [players])
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (!canStart) return
        handleStart(players)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='player1'>Player 1</label>
                <input type='text' value={players[0]} onInput={e => handleInput(e, 0)} />
            </div>
            <div>
                <label htmlFor='player2'>Player 2</label>
                <input type='text' value={players[1]} onInput={e => handleInput(e, 1)} />
            </div>
            <div>
                <button type='submit' disabled={!canStart}>Start</button>
            </div>
        </form>
    )
}