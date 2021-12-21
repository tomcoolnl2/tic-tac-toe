
import { FC } from 'react'
import styles from './toggle.module.scss'

export interface Props {
    onChangeHandler: () => void
    checked: boolean
}

export const Toggle: FC<Props> = ({ onChangeHandler, checked }) => {
    return (
        <div className={styles['toggle-container']}>
            <input type='checkbox' id='switch' name='theme' onChange={onChangeHandler} checked={checked || false} />
            <label htmlFor='switch'></label>
        </div>
    )
}