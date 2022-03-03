import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { Board } from '@/types/board';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {} as Board,
    reducers: {
        updateBoardState(state, action: PayloadAction<Board>) {
            state.chatLog = action.payload.chatLog;
            state.gameState = action.payload.gameState;
            state.players = action.payload.players;
        },
    },
});

export const boardReducer: Reducer<Board> = boardSlice.reducer;

export const { updateBoardState } = boardSlice.actions;
