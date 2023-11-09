
import { render } from '@testing-library/react'
import { ScoreBoardItem } from '../../../components'
import { PlayerSymbol } from '../../../core/model'

test('ScoreBoardItem component snapshot test', () => {
    const { container } = render(
        <ScoreBoardItem index={1} score={1} playerSymbol={PlayerSymbol.O} cpuSymbol={PlayerSymbol.X} />
    )
    expect(container).toMatchSnapshot()
})
