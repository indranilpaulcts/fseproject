import { Component, OnInit } from '@angular/core';
import { AddtaskService } from './addtask.service';
import { Task } from '../task-model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  private task = new Task();
  ifAnyError: boolean;
  errorAlertMessage: string;
  ifPostedSuccessfully: boolean;

  constructor(private addtaskService: AddtaskService) {
    this.task.taskname = '';
    this.task.priority = 5;
    this.task.parenttaskname = '';
    this.task.startdt = new Date();
    this.task.enddt = new Date();
    this.task.status = false;

    this.ifAnyError = false;
    this.errorAlertMessage = '';
    this.ifPostedSuccessfully = false;
  }

  ngOnInit() {
    this.addtaskService.getallnames();
  }

  addTask(): void {
    this.resetMsg();
    this.addtaskService.addnewtask(this.task).subscribe((res: any) => {
        if (res) {
          this.ifPostedSuccessfully = true;
          // this.resetValue();
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  resetMsg(): void {
    this.ifAnyError = false;
    this.errorAlertMessage = '';
    this.ifPostedSuccessfully = false;
  }

  resetValue(): void {
    this.task.taskname = '';
    this.task.priority = 5;
    this.task.parenttaskname = '';
    this.task.startdt = new Date();
    this.task.enddt = new Date();
    this.task.status = false;
  }

}
