
import { render } from '@testing-library/react'
import { IntelligenceLevel } from '../../../core/model'
import { ChooseDifficulty } from '../../../components'

describe('ChooseDifficulty component snapshot test', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(
            <ChooseDifficulty
                selectedDifficultySetting={IntelligenceLevel.BIEBER}
                handleDifficultySettingsChange={jest.fn()}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});