import { FlexBox } from '@tic-tac-toe/ui';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Avatar } from '../';

export const AppLogo: React.FC = () => {
	return (
		<FlexBox className="logo" spacing="s">
			<Avatar size="m" type={PlayerSymbol.X} />
			<Avatar size="m" type={PlayerSymbol.O} />
		</FlexBox>
	);
};
