import styled from 'styled-components';
import { Colors } from '@/constants/colors';

interface CardFrameProps {
    isRaised?: boolean;
    isRotated?: boolean;
    primaryColor?: string;
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
    zoom: 0.75;
    cursor: pointer;
    font-size: 14px;
    display: inline-grid;
    grid-template-rows: 20px 1fr 20px 120px auto;
    width: 220px;
    height: 320px;
    border: 10px solid #240503;
    border-radius: 4%;
    padding: 10px;
    color: white;
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
    padding-top: 4px;
    font-weight: bold;
    display: grid;
    grid-template-columns: auto auto;
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

export const HPCell = styled.div<BuffedTextProps>`
    text-align: right;
    ${({ buffAmount }) => {
        if (!buffAmount) return '';
        if (buffAmount > 0) return `color: ${Colors.BUFF_BLUE}`;
        if (buffAmount < 0) return `color: ${Colors.DEBUFF_RED}`;
        return '';
    }}
`;
