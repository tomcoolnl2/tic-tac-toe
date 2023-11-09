
import { render } from '@testing-library/react'
import { SymbolChoice } from '../../../components'

describe('SymbolChoice component snapshot test', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<SymbolChoice />)
        expect(asFragment()).toMatchSnapshot()
    })
})