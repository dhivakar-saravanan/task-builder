import ITask from "../interfaces/task";

export interface TaskState {
  user: string;
  task: [ITask];
}
const initialState = {
  user: "",
  task: [{}],
};
type Action = { type: string; payload: string };

const updatingTask = (state: any, id: any, status: string) => {
  const taskId = status === 'done' ? id.taskId: id;
  const index = state.task.findIndex(
    (task: { taskId: string }) => task.taskId === taskId
  );
  const newArray = [...state.task];
  newArray[index].status = status;
  return newArray;
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, user: action.payload };
    }
    case "USER_LOGOUT": {
      return { ...state, user: "" };
    }
    case "CREATE_TASK": {
      return {
        ...state,
        task: [action.payload, ...state.task],
      };
    }
    case "START_TASK": {
      return {
        ...state,
        task: updatingTask(state, action.payload, "in progress"),
      };
    }
    case "FINISH_TASK": {
      return {
        ...state,
        task: updatingTask(state, action.payload, "done"),
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        task: state.task.filter((item: any) => item.taskId !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};
