import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { MAX_PLAYER_NAME_LENGTH } from '@/constants/lobbyConstants';
import { PrimaryColorButton } from '../Button';

interface NameChangerProps {
    handleSubmit: (name: string) => void;
}

const NameChangerContainer = styled.div`
    width: 700px;
    margin: auto;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const NameChangerForm = styled.form`
    display: grid;
    grid-gap: 12px;

    label {
        display: block;
        margin-bottom: 4px;
    }
    input {
        height: 70px;
        font-size: 50px;
        width: 450px;
    }
`;

/**
 * The name changer component is a presentational component that takes
 * a submit handler and
 * @returns {JSX.Element} Intro screen component
 */
export const NameChanger: React.FC<NameChangerProps> = ({ handleSubmit }) => {
    const [name, setName] = useState('');

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!name) return;
        handleSubmit(name);
    };
    return (
        <NameChangerContainer>
            <NameChangerForm onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name-selector">Choose a Name</label>
                    <input
                        id="name-selector"
                        role="textbox"
                        maxLength={MAX_PLAYER_NAME_LENGTH}
                        autoFocus
                        autoComplete="off" // ignore for password managers
                        data-lpignore="true" // ignore for lastPass
                        data-form-type="other" // ignore for dashlane
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <PrimaryColorButton
                        emoji="▶️"
                        role="button"
                        type="submit"
                        disabled={!name}
                    >
                        Start
                    </PrimaryColorButton>
                </div>
            </NameChangerForm>
        </NameChangerContainer>
    );
};
