
import { render } from '@testing-library/react'
import { GameOver } from '../../../components'
import { PlayerSymbol } from '../../../core/model'

test('GameOver component snapshot test', () => {
    const { container } = render(
        <GameOver title='test title' subtitle='subtitle' avatar={PlayerSymbol.X} className='x' />
    )
    expect(container).toMatchSnapshot()
})
