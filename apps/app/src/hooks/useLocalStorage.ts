import { useState, useEffect } from 'react'


function getStorageValue(key: string): string | null {
    const saved = localStorage.getItem(key)
    const initial = saved ? JSON.parse(saved) : null
    return initial
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  
    const [value, setValue] = useState(() => {
        return getStorageValue(key) ?? defaultValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value as T, setValue] as const
}