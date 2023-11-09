
import { render } from '@testing-library/react'
import { App } from '../../app'

describe('App component snapshot test', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<App />)
        expect(asFragment()).toMatchSnapshot()
    })
})