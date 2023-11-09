
import { render } from '@testing-library/react'
import { Avatar } from '../../../components'
import { PlayerSymbol } from '../../../core/model'

test('Avatar component snapshot test', () => {
    const { container } = render(
        <Avatar
            type={PlayerSymbol.X}
            size='m'
            variant='dark'
            className='custom-avatar'
        />
    )
    expect(container).toMatchSnapshot()
})
