import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface TodoState {
  list: string[]
  status: 'idle' | 'loading' | 'failure'
}
const initialState: TodoState = {
  list: [],
  status: 'idle',
}

export const fetchATodo = createAsyncThunk(
  'todos/fetchATodo',
  async (id: string) => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    ).then((res) => res.json())
    return data.title
  }
)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list = [...state.list, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchATodo.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchATodo.fulfilled, (state, action) => {
        state.status = 'idle'
        state.list = [...state.list, action.payload]
      })
      .addCase(fetchATodo.rejected, (state, action) => {
        state.status = 'failure'
      })
  },
})

export const { addTodo } = todosSlice.actions
export const selectListOfTodos = (state: RootState) => state.todos.list
export const selectStatus = (state: RootState) => state.todos.status
export default todosSlice.reducer
