
import { render } from '@testing-library/react'
import { Button } from '../../../components'

describe('Button component snapshot test', () => {
    it('should match the snapshot', () => {

        const { asFragment } = render(
            <Button variant="primary" onClick={() => []} disabled={false}>
                Click Me
            </Button>
        );
    
        expect(asFragment()).toMatchSnapshot()
    })
})