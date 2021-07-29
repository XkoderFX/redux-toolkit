import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch(`http://localhost:4000/todos`);
        const todos = await response.json();
        return { todos };
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (title: string) => {
        const response = await fetch(`http://localhost:4000/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, completed: false }),
        });
        const todo = await response.json();
        return { todo };
    }
);
export const toggleToDoAsync = createAsyncThunk(
    'todos/toggleTodoAsync',
    async (payload: { todoId: number; completed: boolean }) => {
        const response = await fetch(
            `http://localhost:4000/todos/${payload.todoId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: payload.completed }),
            }
        );
        const todo = await response.json();
        return { todo };
    }
);

const initialState: {
    title: string;
    id: number;
    completed: boolean;
}[] = [];

const todoSlice = createSlice({
    name: 'Todos',
    initialState,
    reducers: {
        addToDo(state, action) {
            const newToDo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newToDo);
        },
        toggleTodo(state, action) {
            const todoIndex = state.findIndex(
                (todo) => todo.id === action.payload.id
            );

            state[todoIndex].completed = !state[todoIndex].completed;
        },

        deleteTodo(state, action) {
            return state.filter((item) => item.id !== action.payload.id);
        },
    },
    extraReducers: {
        [getTodosAsync.fulfilled as any](state, action) {
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled as any](state, action) {
            state.push(action.payload.todo);
        },
        [toggleToDoAsync.fulfilled as any](state, action) {
            const todoIndex = state.findIndex(
                (todo) => todo.id === action.payload.todo.id
            );
            state[todoIndex].completed = action.payload.todo.completed;
        },
    },
});

export const { addToDo, toggleTodo, deleteTodo } = todoSlice.actions;
export const ToDoReducer = todoSlice.reducer;
