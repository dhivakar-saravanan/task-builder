export default interface ITask {
    taskId:string;
    company:string;
    project:string;
    task:string;
    priority:string;
    description:string;
    status?:string;
    createdOn?:string;
    completedOn?:string;
}