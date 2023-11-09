
import { render } from '@testing-library/react'
import { SettingsScreen } from '../../../screens'
import { PlayerSymbol } from '../../../core/model'

describe('SettingsScreen screen component snapshot test', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<SettingsScreen 
            playerSymbol={PlayerSymbol.X} 
            handleStartGame={jest.fn()}
            handleSymbolChoiceChange={jest.fn()}
        />)
        expect(asFragment()).toMatchSnapshot()
    })
})