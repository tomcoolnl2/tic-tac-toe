
import { render } from '@testing-library/react'
import { PlayerSymbol } from '../../../core/model'
import { Cell } from '../../../components'

describe('Cell component snapshot test', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(<Cell type={PlayerSymbol.X} index={0} solutionCells={[0, 0, 0]} disabled={false} />);
        expect(asFragment()).toMatchSnapshot();
    });
});