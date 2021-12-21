

import { FC, MouseEvent } from 'react'
import { Square } from '../../components/square/square'
import styles from './game.module.scss'

export interface Props {
    board: string[]
    handleClick: (event: MouseEvent, index: number) => void
}

export const GameScreen: FC<Props> = ({ board, handleClick }) => {
    return (
        <div className={styles.board}>
            {board.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    index={index}
                    handleClick={handleClick}
                />
            ))}
        </div>
    )
}