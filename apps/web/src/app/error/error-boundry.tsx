import React from 'react';

interface Props {
    fallback?: React.ReactNode;
    children?: React.ReactNode;
}

interface State {
    error: Error | null;
}

export class ErrorBoundary extends React.PureComponent<Props, State> {
   
    public override state: State = {
        error: null
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }
    
    public override render() {
        if (this.state.error) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}