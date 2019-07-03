import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task-model';

@Injectable({
  providedIn: 'root'
})
export class AddtaskService {

  private uriBase: string;
  private apiGetTask: string;
  private apiAddTask: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5151/';
    this.apiGetTask = 'get-task/';
    this.apiAddTask = 'add-task/';
  }

  addnewtask(task: Task): Observable<any> {
    const newUrl = this.uriBase + this.apiAddTask;
    return this.httpConnection.post(newUrl, task);
  }

  getallnames(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetTask;
    return this.httpConnection.get(newUrl);
  }
}
