
import { render } from '@testing-library/react'
import { ReloadModalScreen } from '../../../screens'

describe('ReloadModalScreen screen component snapshot test', () => {
    it('should match the snapshot', () => {
        const fn = jest.fn()
        const { asFragment } = render(
            <ReloadModalScreen 
                handleRestartGame={fn}
                closeModalScreen={fn}
            />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})