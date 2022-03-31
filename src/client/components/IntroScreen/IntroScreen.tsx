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

const Footer = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    color: white;
    padding: 20px;
    font-size: 1.2rem;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: right;

    a {
        color: white;
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
        <>
            <IntroScreenContainer>
                <NameChanger handleSubmit={handleSubmit} />
            </IntroScreenContainer>

            <Footer>
                <div>
                    A passion project by{' '}
                    <a href="https://github.com/lijim" target="_blank">
                        Jimmy Li
                    </a>
                    <br />
                    source code on{' '}
                    <a
                        href="https://github.com/lijim/monks-and-mages/"
                        target="_blank"
                    >
                        Github
                    </a>
                </div>

                <div>
                    Credits:{' '}
                    <a
                        href="https://breakingcopyright.com/song/cjbeards-fire-and-thunder"
                        target="_blank"
                    >
                        Intro Music (Fire and Thunder by Cjbeards)
                    </a>
                    <a
                        href="https://www.flaticon.com/free-icons/monk"
                        title="monk icons"
                    >
                        Monk icons created by max.icons - Flaticon
                    </a>
                </div>
            </Footer>
        </>
    );
};
