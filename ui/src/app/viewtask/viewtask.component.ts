import { Component, OnInit } from '@angular/core';
import { ViewtaskService } from './viewtask.service';
import { Task } from '../task-model';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  allTasks: any[];
  originalTaskList: any[]
  taskName: string;
  parentTask: string;
  priorityFrom: number;
  priorityTo: number;
  startDt: Date;
  endDt: Date;
  ifAnyError: boolean;
  errorAlertMessage: string;
  task: Task;

  constructor(private viewtaskService: ViewtaskService) {
    this.task = new Task();
    this.ifAnyError = false;
    this.errorAlertMessage = '';
  }

  ngOnInit() {
    this.viewtaskService.getalltasks().subscribe((res: any) => {
      if (res) {
        this.allTasks = res;
        this.originalTaskList = this.allTasks;
        console.log(res);
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
    });
  }


  resetMsg(): void {
    this.ifAnyError = false;
    this.errorAlertMessage = '';
  }

  filterTasks(): void {
    this.taskName = this.taskName ? this.taskName.toUpperCase() : '';
    this.parentTask = this.parentTask ? this.parentTask.toUpperCase() : '';
    this.priorityTo = this.priorityTo ? this.priorityTo : 30;
    this.priorityFrom = this.priorityFrom ? this.priorityFrom : 0;
    this.endDt = this.endDt ? this.endDt : new Date('2050/12/31');
    this.startDt = this.startDt ? this.startDt : new Date('2019/01/01');
    this.allTasks = this.originalTaskList;
    this.allTasks = this.allTasks.filter(
      (i) => (
        i.taskname.toUpperCase().startsWith(this.taskName) &&
        i.parenttaskname.toUpperCase().startsWith(this.parentTask) &&
        i.priority >= this.priorityFrom &&
        i.priority <= this.priorityTo &&
        i.startdt >= this.startDt &&
        i.enddt <= this.endDt
      )
    );
  }

  searchByTaskName(pTaskName: string): void {
    this.taskName = pTaskName ? pTaskName.toUpperCase() : '';
    this.filterTasks();
  }

  searchByParentTask(pParentTask: string): void {
    this.parentTask = pParentTask ? pParentTask.toUpperCase() : '';
    this.filterTasks();
  }

  searchByPriorityFrom(pPriorityFrom: number): void {
    this.priorityFrom = pPriorityFrom ? pPriorityFrom : 0;
    this.priorityTo = this.priorityTo ? this.priorityTo : 30;
    this.filterTasks();
  }

  searchByPriorityTo(pPriorityTo: number): void {
    this.priorityTo = pPriorityTo ? pPriorityTo : 30;
    this.priorityFrom = this.priorityFrom ? this.priorityFrom : 0;
    this.filterTasks();
  }

  searchByStartDate(pStartDt: Date): void {
    this.startDt = pStartDt ? pStartDt : new Date('2019/01/01');
    this.endDt = this.endDt ? this.endDt : new Date('2050/12/31');
    this.filterTasks();
  }

  searchByEndDate(pEndDt: Date): void {
    this.endDt = pEndDt ? pEndDt : new Date('2050/12/31');
    this.startDt = this.startDt ? this.startDt : new Date('2019/01/01');
    this.filterTasks();
  }
}
