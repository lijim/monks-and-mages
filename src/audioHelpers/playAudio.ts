import { Sounds } from '@/constants/sounds';

export const playAudio = (src: string): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.volume = 0.1;
    audio.loop = false;
    audio.play();
    return audio;
};

const backgroundMusic = new Audio(Sounds.BG_MUSIC);

export const startBackgroundMusic = () => {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.02;
    backgroundMusic.play();
};
