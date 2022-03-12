import styled from 'styled-components';

import { Colors } from '@/constants/colors';

interface ButtonProps {
    backgroundColor: string;
    borderColor?: string;
    emoji?: string;
    hoverBackgroundColor: string;
}

export const Button = styled.button.attrs(
    ({
        backgroundColor,
        borderColor = Colors.DARK_BROWN,
        emoji = '',
        hoverBackgroundColor,
    }: ButtonProps) => ({
        backgroundColor,
        borderColor,
        emoji,
        hoverBackgroundColor,
    })
)`
    ::before {
        content: '${({ emoji }) => emoji}';
        position: absolute;
        left: 8px;
    }
    :not(:disabled):hover {
        background: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    }
    :not(:disabled) {
        box-shadow: 0 1px 2px rgb(0 0 0 / 50%);
    }
    :active {
        top: 2px;
        left: 2px;
        box-shadow: none;
    }
    :disabled {
        opacity: 0.4;
    }
    position: relative;
    cursor: pointer;
    padding-left: ${({ emoji }) => (emoji ? '50' : '20')}px;
    padding-right: ${({ emoji }) => (emoji ? '50' : '20')}px;
    color: white;
    font-size: 22px;
    border: 1px solid ${({ borderColor }) => borderColor};
    border-radius: 4px;
    background: ${({ backgroundColor }) => backgroundColor};
    height: 40px;
`;

export const PrimaryColorButton = styled(Button).attrs({
    backgroundColor: Colors.FIRE_ORANGE,
    hoverBackgroundColor: Colors.FIRE_ORANGE_EMPHASIZED,
})``;

export const SecondaryColorButton = styled(Button).attrs({
    backgroundColor: Colors.SECONDARY_GREEN,
    hoverBackgroundColor: Colors.SECONDARY_GREEN_EMPHASIZED,
})``;
