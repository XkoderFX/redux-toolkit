import { configureStore } from '@reduxjs/toolkit';
import { ToDoReducer } from './todoSlice';

const store = configureStore({
    reducer: {
        todos: ToDoReducer,
    },
});

export default store;
