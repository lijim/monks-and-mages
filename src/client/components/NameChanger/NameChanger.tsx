import React, { FormEvent, useState } from 'react';

interface NameChangerProps {
    handleSubmit: (name: string) => void;
}

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
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name-selector">Select a Name</label>
                <input
                    id="name-selector"
                    role="textbox"
                    autoComplete="off" // ignore for password managers
                    data-lpignore="true" // ignore for lastPass
                    data-form-type="other" // ignore for dashlane
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button role="button" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};
