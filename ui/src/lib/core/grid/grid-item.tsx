import React from 'react';

interface Props {
    children?: React.ReactNode;
    columnStart?: string;
    columnEnd?: string;
    placeSelf?: string;
}

export class GridItem extends React.PureComponent<Props, never> {
    public override render() {
        return (
            <div
                style={{
                    gridColumnStart: this.props.columnStart,
                    gridColumnEnd: this.props.columnEnd,
                    placeSelf: this.props.placeSelf,
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
