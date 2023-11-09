import React from 'react';
import { Button } from '../button/button';
import './reload-button.scss';

export interface Props {
    disabled?: boolean;
    handleReloadDialog: () => void;
}

export const ReloadButton: React.FC<Props> = ({ disabled = false, handleReloadDialog }) => {
    return (
        <Button
            variant='light'
            onClick={handleReloadDialog}
            className='icon-reload'
            disabled={disabled}
        >
            <i className='icon-repeat'></i>
        </Button>
    );
};
