import { Component, OnInit } from '@angular/core';
import { AddtaskService } from './addtask.service';
import { Task, Parent } from '../task-model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  private task = new Task();
  allParent: Parent[];
  ifAnyError: boolean;
  errorAlertMessage: string;
  ifPostedSuccessfully: boolean;
  selectparenttaskname: string;

  constructor(private addtaskService: AddtaskService) {
    this.task.taskname = '';
    this.task.priority = 5;
    this.task.parenttaskname = '';
    this.task.status = false;
    this.ifAnyError = false;
    this.errorAlertMessage = '';
    this.ifPostedSuccessfully = false;
    this.selectparenttaskname = '';
  }

  ngOnInit() {
    this.addtaskService.getallparent().subscribe((res: any) => {
        if (res) {
          this.allParent = res;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  validationOfForm(): boolean {
    if (this.task.taskname.trim().length === 0) {
      return false;
    }
    if (this.task.parenttaskname.trim().length === 0 && this.selectparenttaskname === 'New' ) {
      return false;
    }
    if (!this.task.startdt) {
      return false;
    }
    if (!this.task.enddt) {
      return false;
    }
    return true;
  }

  addTask(): void {
    this.resetMsg();
    const formOk = this.validationOfForm();
    if (formOk === false) {
      this.ifAnyError = true;
      this.errorAlertMessage = 'Empty field!';
      return;
    }
    if (this.selectparenttaskname !== 'New') {
      this.task.parenttaskname = this.selectparenttaskname;
    }
    this.addtaskService.addnewtask(this.task).subscribe((res: any) => {
        if (res) {
          this.ifPostedSuccessfully = true;
          this.resetValue();
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
