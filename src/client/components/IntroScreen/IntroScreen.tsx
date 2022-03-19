import React, { useContext } from 'react';
import styled from 'styled-components';

import { NameChanger } from '../NameChanger';
import { WebSocketContext } from '../WebSockets';

const IntroScreenContainer = styled.div`
    width: 700px;
    margin: auto;
    height: 100vh;
    display: grid;
    place-items: center;
    animation: fadein 1s;

    @keyframes fadein {
        from {
            opacity: 0.01;
        }
        to {
            opacity: 1;
        }
    }
    @-moz-keyframes fadein {
        /* Firefox */
        from {
            opacity: 0.01;
        }
        to {
            opacity: 1;
        }
    }
    @-webkit-keyframes fadein {
        /* Safari and Chrome */
        from {
            opacity: 0.01;
        }
        to {
            opacity: 1;
        }
    }
    @-o-keyframes fadein {
        /* Opera */
        from {
            opacity: 0.01;
        }
        to {
            opacity: 1;
        }
    }
`;

/**
 * The Intro Screen is where people set their names / see games in
 * lobbies that they can join.
 * @returns {JSX.Element} Intro screen component
 */
export const IntroScreen: React.FC = () => {
    const webSocket = useContext(WebSocketContext);

    const handleSubmit = (newName: string) => {
        webSocket.chooseName(newName.trim());
    };

    return (
        <IntroScreenContainer>
            <NameChanger handleSubmit={handleSubmit} />
        </IntroScreenContainer>
    );
};
