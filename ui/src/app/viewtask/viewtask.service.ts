import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task-model';

@Injectable({
  providedIn: 'root'
})
export class ViewtaskService {

  private uriBase: string;
  private apiGetTask: string;
  private apiUpdTask: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5151/';
    this.apiGetTask = 'get-task/';
    this.apiUpdTask = 'upd-task/';
  }

  getalltasks(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetTask;
    return this.httpConnection.get(newUrl);
  }
}
