import styled from 'styled-components';
import { Colors } from '@/constants/colors';

interface CardFrameProps {
    isHighlighted?: boolean;
    isRaised?: boolean;
    isRotated?: boolean;
    isUnitCard?: boolean;
    primaryColor?: string;
    zoomLevel?: number;
}
/**
 * Aesthetic components relating to how a card is rendered in full-card mode
 *
 * [CardFrame]
 * - [Header]
 *   - [NameCell]
 *   - [CostHeaderCell]
 * - [CardImageContainer]
 * - [RulesText]
 * - [AttackHPFooter]
 *   - [HPCell] (to right align HP)
 */

export const CardFrame = styled.div<CardFrameProps>`
    ${({ isRaised }) =>
        isRaised
            ? `
            position: relative;
            top: -6px;
            left: -6px;
            box-shadow: 8px 8px rgb(0 0 0 / 50%);
        
    `
            : ''}
    zoom: ${({ zoomLevel = 1 }) => zoomLevel * 0.75};
    cursor: pointer;
    font-size: 14px;
    display: inline-grid;
    grid-template-rows:
        auto 1fr 20px minmax(
            ${({ isUnitCard }) => (isUnitCard ? 80 : 120)}px,
            auto
        )
        auto;
    width: 220px;
    height: 320px;
    border: 10px solid
        ${({ isHighlighted }) =>
            isHighlighted ? Colors.FOCUS_BLUE : '#240503'};
    border-radius: 4%;
    padding: 10px;
    color: white;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    ${({ isRotated }) => (isRotated ? 'transform: rotate(90deg)' : '')};
    background-color: ${({ primaryColor }) => primaryColor || '#5c4d50'};
`;

export const CardHeader = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`;

export const NameCell = styled.div`
    font-style: italic;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    font-weight: 500;
    padding: 3px 6px;
`;

export const CostHeaderCell = styled.div`
    text-align: right;
`;

export const CardImageContainer = styled.div`
    display: grid;
    border: 1px solid white;
    margin-top: 7px;
    margin-bottom: 4px;
    place-content: center;
    height: auto;
    max-height: 140px;
    overflow: hidden;
`;

export const CardImage = styled.img`
    width: 100%;
`;

interface RulesTextAreaProps {
    shouldCenter?: boolean;
    shouldFade?: boolean;
}
export const RulesTextArea = styled.div<RulesTextAreaProps>`
    font-size: 13px;
    color: black;
    ${({ shouldCenter }) => (shouldCenter ? 'text-align: center' : '')};
    padding: 6px;
    background: rgba(
        255,
        255,
        255,
        ${({ shouldFade }) => (shouldFade ? 0.2 : 0.8)}
    );
`;

export const AttackHPFooter = styled.div`
    padding: 8px;
    font-weight: bold;
    display: grid;
    grid-template-columns: auto auto auto;
    background: rgba(0, 0, 0, 0.5);
    zoom: 1.2;
    font-size: 17px;
`;

interface BuffedTextProps {
    buffAmount?: number;
}

export const AttackCell = styled.div<BuffedTextProps>`
    ${({ buffAmount }) => {
        if (!buffAmount) return '';
        if (buffAmount > 0) return `color: ${Colors.BUFF_BLUE}`;
        if (buffAmount < 0) return `color: ${Colors.DEBUFF_RED}`;
        return '';
    }}
`;

export const SleepyCell = styled.div<BuffedTextProps>`
    color: transparent;
    text-shadow: 0 0 0 white;
    text-align: center;
`;

export const HPCell = styled.div<BuffedTextProps>`
    text-align: right;
    ${({ buffAmount }) => {
        if (!buffAmount) return '';
        if (buffAmount > 0) return `color: ${Colors.BUFF_BLUE}`;
        if (buffAmount < 0) return `color: ${Colors.DEBUFF_RED}`;
        return '';
    }}
`;
