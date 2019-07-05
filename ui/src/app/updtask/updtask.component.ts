import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UpdtaskService } from './updtask.service';
import { Task } from '../task-model';

@Component({
  selector: 'app-updtask',
  templateUrl: './updtask.component.html',
  styleUrls: ['./updtask.component.css']
})
export class UpdtaskComponent implements OnInit {

  allTasks: any[];
  taskId: string;
  task: Task;
  ifAnyError: boolean;
  ifPostedSuccessfully: boolean;
  errorAlertMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private updtaskService: UpdtaskService) {
    this.taskId = '';
    this.task = new Task();
    this.ifAnyError = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
  }

  ngOnInit() {
    const params: any = this.activatedRoute.snapshot.params;
    this.taskId = params.id;

    this.updtaskService.getsingletask(this.taskId).subscribe((res: any) => {
      if (res) {
        this.task.taskname = res.taskname;
        this.task.priority = res.priority;
        this.task.parenttaskname = res.parenttaskname;
        this.task.startdt = res.startdt.toString().split('T')[0];
        this.task.enddt = res.enddt.toString().split('T')[0];
        this.task.status = res.status;

        this.ifAnyError = false;
        this.errorAlertMessage = '';
        this.ifPostedSuccessfully = false;
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
    });
  }

  saveTask(): void {
    this.updtaskService.updatetask(this.taskId, this.task).subscribe((res: any) => {
      if (res) {
        this.ifPostedSuccessfully = true;
      }
    }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  cancelEdit(): void {
    this.router.navigateByUrl('/viewtask');
  }
}
