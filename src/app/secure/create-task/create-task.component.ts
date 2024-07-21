// src/app/create-task/create-task.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/Task.service';
import { Employee, Task } from 'src/app/models/Common-model';
import { CommonService } from 'src/app/services/common.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  assignees: Employee[] = [];
  errorMessage: string = '';
  TaskRequest!: Task ;
  isEditMode  = true;
  statusOptions: string[] = ['To-Do', 'Inprogress', 'Inreview', 'Closed'];
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private commonService : CommonService,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(){

    this.assignees = this.commonService.getAssigneelist();
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.loadTaskDetails(taskId);
    } else {
      this.isEditMode = false;
      this.initializeForm();
    }
   }

   loadTaskDetails(taskId: string): void {
    this.TaskRequest = this.commonService.getTaskDetails(); 
        this.taskForm.patchValue({
          title: this.TaskRequest.title,
          description: this.TaskRequest.description,
          assigneeId: this.TaskRequest.assignedTo,
          taskStatus : this.TaskRequest.status
        });
        this.isEditMode = true; // Enter edit mode
  }
   
    initializeForm(): void {
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        assigneeId: ['', Validators.required],
        attachment: [null] // Optional attachment
      });
    }
  

  onSubmit(){
    this.errorMessage = '';
    if(this.taskForm.valid){
      this.commonService.showLoader();
      this.TaskRequest = {
        title : this.taskForm.get('title')?.value,
        assignedTo : this.taskForm.get('assigneeId')?.value,
        description : this.taskForm.get('description')?.value,
        createdBy :  this.commonService.getUserid(),
        status : "To-Do"
      };
      this.taskService.createTask(this.TaskRequest , this.isEditMode).subscribe({
        next : (response) => {
            this.commonService.hideLoader();
            if(response.isSuccess){ 
              this.router.navigate(['/manager']);
            }
            else { 
              this.errorMessage = 'Task Not Created. Please try again.';
            }
        },
        error : (error) => {
            this.commonService.hideLoader();
            this.errorMessage = 'An error occurred. Please try again later.';
            throw error;
        }
     });
    } else{
      this.taskForm.markAllAsTouched();
    }
  }

  isFormDirty(): boolean {
    return JSON.stringify(this.taskForm.value) !== JSON.stringify(this.fb);
  }
  onFileChange(event: any) {
    // Handle file change event and set the attachment control value
    const file = event.target.files[0];
    // this.taskForm.patchValue({
    //     attachment: file
    // });
}
  onCancel(){
    this.router.navigate(['/manager']);
  }
}
