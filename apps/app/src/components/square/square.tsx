

import { FC, MouseEvent } from 'react'
import styles from './square.module.scss'


export interface Props {
    index: number
    value: string
    handleClick: (event: MouseEvent, index: number) => void
}

export const Square: FC<Props> = ({ index, value, handleClick }) => {
    return (
        <button className={styles.square} onClick={(event) => handleClick(event, index)}>
            {value}
        </button>
    )
}
