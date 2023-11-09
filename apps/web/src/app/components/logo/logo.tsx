import * as ArenaUI from '@tic-tac-toe/ui';
import { Avatar } from '../';
import { PlayerSymbol } from '../../core/model';

export const AppLogo: React.FC = () => {
	return (
		<ArenaUI.FlexBox className="logo" spacing="s">
			<Avatar size="m" type={PlayerSymbol.X} />
			<Avatar size="m" type={PlayerSymbol.O} />
		</ArenaUI.FlexBox>
	);
};
