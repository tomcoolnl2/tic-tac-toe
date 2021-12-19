
import { render } from '@testing-library/react'
import { Toggle, ToggleProps } from '../toggle/toggle'


describe('Toggle', () => {
    it('Should render correctly ', () => {
        const props: ToggleProps = {
            onChangeHandler: jest.fn(),
            checked: true
        }
        const toggle = render(<Toggle {...props} />)
        expect(toggle).toMatchSnapshot()
    })
})