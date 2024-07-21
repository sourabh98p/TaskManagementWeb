import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailEmployeeComponent } from './task-detail-employee.component';

describe('TaskDetailEmployeeComponent', () => {
  let component: TaskDetailEmployeeComponent;
  let fixture: ComponentFixture<TaskDetailEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailEmployeeComponent]
    });
    fixture = TestBed.createComponent(TaskDetailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
