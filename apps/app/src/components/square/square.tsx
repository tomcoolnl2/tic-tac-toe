

import { FC } from 'react'
import styles from './square.module.scss'


export interface Props {
    index: number
    value: string
    handleClick: (index: number) => void
}

export const Square: FC<Props> = ({ index, value, handleClick }) => {
    return (
        <button className={styles.square} onClick={() => handleClick(index)}>
            {value}
        </button>
    )
}
