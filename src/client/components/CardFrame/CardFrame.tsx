import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS_FOR_RARITY, Colors } from '@/constants/colors';
import { CardRarity } from '@/types/cards';

interface CardFrameProps {
    isHighlighted?: boolean;
    isRaised?: boolean;
    isRotated?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    shouldShowTallImage?: boolean;
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
            ${({ shouldShowTallImage }) => (shouldShowTallImage ? 70 : 120)}px,
            auto
        )
        auto;
    width: 260px;
    height: 360px;
    border: 10px solid
        ${({ isHighlighted }) =>
            isHighlighted ? Colors.FOCUS_BLUE : '#240503'};
    border-radius: 4%;
    padding: 10px;
    color: white;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    ${({ isRotated }) => (isRotated ? 'transform: rotate(90deg)' : '')};
    ${({ primaryColor, secondaryColor }) => {
        if (!primaryColor) {
            return `background-color: ${Colors.NO_COLOR_BROWN};`;
        }
        if (!secondaryColor) {
            return `background-color: ${primaryColor};`;
        }
        return `background-image: linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor});`;
    }};
`;

export const CardHeader = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`;

export const NameCell = styled.div`
    font-style: italic;
    font-family: 'Quattrocento', serif;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    font-weight: 500;
    padding: 3px 6px;
`;

export const CostHeaderCell = styled.div`
    text-align: right;
`;

export const CardImageContainer = styled.div`
    border: 1px solid white;
    margin-top: 7px;
    margin-bottom: 4px;
    place-content: center;
    height: auto;
    overflow: hidden;
`;

const StretchedImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

type CardImageProps = {
    src: string;
};

export const CardImage: React.FC<CardImageProps> = ({ src }) => {
    const webPSource = src.replace('avif', 'webp');
    return (
        <picture>
            <source srcSet={src} type="image/avif"></source>
            <source srcSet={webPSource} type="image/avif"></source>
            <StretchedImage src={webPSource} />
        </picture>
    );
};

type TypesAndRarityLineProps = {
    children: ReactNode;
    rarity: CardRarity;
};

export const TypesAndRarityLine = ({
    rarity,
    children,
}: TypesAndRarityLineProps) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <span>{children}</span>
            <span style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                <svg width="14" height="14">
                    <polygon
                        points="7,1 13,7 7,13 1,7"
                        fill={COLORS_FOR_RARITY[rarity]}
                        stroke="white"
                        strokeWidth="1"
                    />
                </svg>
                {rarity}
            </span>
        </div>
    );
};

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
