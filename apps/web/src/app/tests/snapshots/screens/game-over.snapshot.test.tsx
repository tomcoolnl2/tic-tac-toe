
import { render } from '@testing-library/react'
import { GameState, PlayerSymbol } from '../../../core/model'
import { GameOverModalScreen } from '../../../screens'

describe('GameOverModalScreen screen component snapshot test', () => {
    it('should match the snapshot', () => {
        const fn = jest.fn()
        const { asFragment } = render(
            <GameOverModalScreen 
                gameState={GameState.WIN} 
                playerSymbol={PlayerSymbol.X} 
                cpuSymbol={PlayerSymbol.O}
                handleRestartGame={fn} 
                handleNextRound={fn}
            />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})