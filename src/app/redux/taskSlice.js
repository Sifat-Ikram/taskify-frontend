import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filteredTasks: [],
  isLoading: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.filteredTasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
        state.filteredTasks.splice(index, 1);
      }
    },
    filterTasks: (state, action) => {
      state.filteredTasks = state.tasks.filter((task) => {
        return (
          (action.payload.status === "All" ||
            task.status === action.payload.status) &&
          (action.payload.priority === "All" ||
            task.priority === action.payload.priority) &&
          (action.payload.category === "All" ||
            task.category === action.payload.category)
        );
      });
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, filterTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
