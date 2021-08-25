import IRoute from "../interfaces/route";
import Home from "../pages/home";
import Login from "../pages/login";
import ToDo from "../pages/to-do";
import Done from "../pages/done";
import InProgress from "../pages/in-progress";

const routes: IRoute[] = [
    {
        name:"todo",
        path: '/to-do',
        component: ToDo,
        exact: true
    },
    {
        name:"in progress",
        path: '/in-progress',
        component: InProgress,
        exact: true
    },
    {
        name:"done",
        path: '/done',
        component: Done,
        exact: true
    },

];

export default routes;