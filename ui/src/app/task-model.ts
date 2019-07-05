export class Task {
    taskname: string;
    priority: number;
    priorityTo: number;
    parenttaskname: string;
    startdt: Date;
    enddt: Date;
    status: boolean;
    finished: boolean;
    running: boolean;
}

export class Parent {
    parentname: string;
}

