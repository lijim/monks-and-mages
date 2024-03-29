import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { Board } from '@/types/board';
import { ChatMessage } from '@/types/chat';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {} as Board,
    reducers: {
        addChatLog(state, action: PayloadAction<ChatMessage>) {
            if (!state.chatLog) {
                state.chatLog = [action.payload];
            } else {
                state.chatLog.push(action.payload);
            }
        },
        clearChat(state) {
            state.chatLog = [];
        },
        updateBoardState(state, action: PayloadAction<Board>) {
            state.gameState = action.payload.gameState;
            state.players = action.payload.players;
            state.draftPiles = action.payload.draftPiles;
            state.draftPoolSize = action.payload.draftPoolSize;
            state.format = action.payload.format;
        },
    },
});

export const boardReducer: Reducer<Board> = boardSlice.reducer;

export const { addChatLog, clearChat, updateBoardState } = boardSlice.actions;
