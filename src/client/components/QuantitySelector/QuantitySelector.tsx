import React from 'react';
import styled from 'styled-components';

interface QuantitySelectorProps {
    hasNoBorder?: boolean;
    isEditable?: boolean;
    onDecrease?: () => void;
    onIncrease?: () => void;
    onSetQuantity?: () => void;
    quantity: number;
}

const Grid = styled.div`
    height: 27px;
    width: 81px;
    display: inline-grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    margin-right: 4px;
`;

type SquareProps = {
    hasNoBorder: boolean;
};

const Square = styled.div<SquareProps>`
    :not(:last-of-type) {
        border-right: none;
    }
    display: inline-grid;
    ${({ hasNoBorder }) => !hasNoBorder && 'border: 1px solid black'};
    height: 27px;
    width: 27px;
    place-content: center;
`;

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    isEditable = false,
    hasNoBorder = false,
    quantity,
}) => {
    const quantityToDisplay =
        quantity === Number.MAX_SAFE_INTEGER ? '∞' : quantity;
    if (!isEditable)
        return (
            <span>
                <Square hasNoBorder={hasNoBorder}>{quantityToDisplay}</Square>
            </span>
        );
    return (
        <Grid>
            <Square hasNoBorder={hasNoBorder}>-</Square>
            <Square hasNoBorder={hasNoBorder}>{quantityToDisplay}</Square>
            <Square hasNoBorder={hasNoBorder}>+</Square>
        </Grid>
    );
};
