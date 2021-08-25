import React from "react";
import IPage from "./page";

export default interface IRoute {
    name:string
    path: string;
    exact: boolean;
    component: React.FunctionComponent<IPage>;
    props?: any;
}