import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import {TaskState} from '../redux/reducer'

interface PrivareRouteProps extends RouteProps {
    name: string;
};

const PrivateRoute: React.FunctionComponent<PrivareRouteProps> = ({...props}) => {
    const user = useSelector<TaskState>((state) => state.user);
    if(!user)return <Redirect to="/" />;

    return <Route {...props} />;
} 

export default PrivateRoute;