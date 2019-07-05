import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtaskComponent } from './updtask.component';

describe('UpdtaskComponent', () => {
  let component: UpdtaskComponent;
  let fixture: ComponentFixture<UpdtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
