import { Component, OnInit } from '@angular/core';
import { ViewtaskService } from './viewtask.service';
import { Router } from '@angular/router';
import { Task } from '../task-model';
import { DatePipe } from '@angular/common'

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
  startDt: any;
  endDt: any;
  ifAnyError: boolean;
  ifPostedSuccessfully: boolean;
  errorAlertMessage: string;
  successAlertMessage: string;
  task: Task;
  datepipe: DatePipe = new DatePipe('en-US');
  defaultStartDt: any;
  defaultEndDt: any;

  constructor(private viewtaskService: ViewtaskService, private router: Router) {
    this.task = new Task();
    this.ifAnyError = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
    this.successAlertMessage = '';
    this.defaultStartDt = this.datepipe.transform(new Date('2019/01/01'), 'yyyy-MM-dd');
    this.defaultEndDt = this.datepipe.transform(new Date('2050/12/31'), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.viewtaskService.getalltasks().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.allTasks = res;
        this.originalTaskList = this.allTasks;
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
    });
  }

  resetMsg(): void {
    this.ifAnyError = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
    this.successAlertMessage = '';
  }

  filterTasks(): void {
    this.allTasks = this.originalTaskList;
    this.resetMsg();

    this.taskName = this.taskName ? this.taskName.toUpperCase() : '';
    this.parentTask = this.parentTask ? this.parentTask.toUpperCase() : '';
    this.priorityTo = this.priorityTo ? this.priorityTo : 30;
    this.priorityFrom = this.priorityFrom ? this.priorityFrom : 0;
    this.startDt = this.startDt ? this.startDt : this.defaultStartDt;
    this.endDt = this.endDt ? this.endDt : this.defaultEndDt;
    this.allTasks = this.allTasks.filter(
      (i) => (
        i.taskname.toUpperCase().startsWith(this.taskName.toUpperCase()) &&
        i.parenttaskname.toUpperCase().startsWith(this.parentTask.toUpperCase()) &&
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
    this.startDt = pStartDt ? pStartDt : this.defaultStartDt;
    this.endDt = this.endDt ? this.endDt : this.defaultEndDt;
    this.filterTasks();
  }

  searchByEndDate(pEndDt: Date): void {
    this.endDt = pEndDt ? pEndDt : this.defaultEndDt;
    this.startDt = this.startDt ? this.startDt : this.defaultStartDt;
    this.filterTasks();
  }

  editTask(taskId: string): void {
    this.router.navigateByUrl('/updtask/' + taskId);
  }

  endTask(taskId: string): void {
    this.task.status = false;
    this.task.finished = true;
    this.task.running = false;
    this.viewtaskService.updatetask(taskId, this.task).subscribe((res: any) => {
      if (res) {
        this.allTasks = res;
        this.originalTaskList = this.allTasks;
        this.ifPostedSuccessfully = true;
        this.successAlertMessage = 'You have successfully ended one task';
      }
    }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }
}
