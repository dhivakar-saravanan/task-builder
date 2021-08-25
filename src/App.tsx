import React from "react";
import { useSelector } from 'react-redux';
import Home from "./pages/home";
import Login from "./pages/login";
import {
  BrowserRouter,
} from "react-router-dom";
import {TaskState} from './redux/reducer'

const App:React.FunctionComponent = () => {

  const user = useSelector<TaskState>((state) => state.user);

  if(!user)return <Login />;
  return (
    <BrowserRouter>
      <Home name="home"/>
    </BrowserRouter>
  );
}

export default App;