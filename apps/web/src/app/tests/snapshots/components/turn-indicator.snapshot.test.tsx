
import { render } from '@testing-library/react'
import { PlayerSymbol } from '../../../core/model'
import { TurnIndicator } from '../../../components'

describe('TurnIndicator component snapshot test', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<TurnIndicator type={PlayerSymbol.X} />)
        expect(asFragment()).toMatchSnapshot()
    })
})