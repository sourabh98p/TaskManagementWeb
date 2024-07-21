import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Common-model';
import { Note } from 'src/app/models/Common-model';
import { Document } from 'src/app/models/Common-model';
import { TaskService } from 'src/app/services/Task.service';
import { CommonService } from 'src/app/services/common.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-detail-employee',
  templateUrl: './task-detail-employee.component.html',
  styleUrls: ['./task-detail-employee.component.scss']
})
export class TaskDetailEmployeeComponent implements OnInit {
  statusOptions: string[] = ['To-Do', 'Inprogress', 'Inreview', 'Closed'];
  task!: Task;
  newNote!: string;
  selectedFile!: File;
  errorMessage ='';
  selectStatus = '';
  taskid = 0;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private commonService : CommonService 
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.errorMessage ='';
    this.taskService.getTaskDetails(taskId).subscribe({
      next: (respose) => {
        if(respose.isSuccess){
           this.task = respose.data;
           this.selectStatus = this.task.status;
        }
        else{
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      },
      error : (error) => {
        this.commonService.hideLoader();
        this.errorMessage = 'An error occurred. Please try again later.';
        throw error;
    }
    });
  }

  addNote(): void {
    this.commonService.showLoader();
    if (!this.task.notes) {
      this.task.notes = [];
    }
    
    const newNoteObj: any = {
      content: this.newNote,
      taskId : this.task.id,
      createdBy : this.commonService.getUserid()
    };
    //this.task.notes.push(newNoteObj);
    this.taskService.updateTask(newNoteObj , true).subscribe(
    {
      next: (respose) => {
        this.commonService.hideLoader();
        if(respose.isSuccess){
          
          this.task.notes?.push(respose.data);
          this.newNote = '';
        }
        else{
          this.errorMessage = 'Add Note Un-successfull.';
        }
      },
      error : (error) => {
        this.commonService.hideLoader();
        this.errorMessage = 'An error occurred. Please try again later.';
        throw error;
    }
    });
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument(): void {
    if (!this.selectedFile) {
      return;
    }
    this.commonService.showLoader();
    let request : any = {
      fileData : this.selectedFile,
      taskId :  this.task.id,
      createdBy : this.commonService.getUserid()
    }
    this.taskService.updateTask(request , false).subscribe({
      next: (respose) => {
        this.commonService.hideLoader();
        if(respose.isSuccess){
          
           this.task.documents?.push(respose.data);

        }
        else{
          this.errorMessage = 'Upload Document Un-successfull.';
        }
      },
      error : (error) => {
        this.commonService.hideLoader();
        this.errorMessage = 'An error occurred. Please try again later.';
        throw error;
    }
    });
  }
  

  updateTaskStatus(): void {
    this.commonService.showLoader();
    this.task.status = this.selectStatus;
    this.taskService.createTask(this.task, true).subscribe({
      next: (updatedTask) => {
        
        this.commonService.hideLoader();
        if(!updatedTask.isSuccess){
          this.errorMessage = 'Status Update Un-SuccessFul';
        }
             
      },
      error: (error) => {
        this.commonService.hideLoader();
        this.errorMessage = 'An error occurred. Please try again later.';
        throw error;
      }
    });
  }
}
