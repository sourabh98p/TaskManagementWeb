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
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private commonService : CommonService 
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.errorMessage ='';
    let requestData: any = {
      Id: taskId,
      isEmployee: true
    };
    this.taskService.getTaskDetails(requestData).subscribe({
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
    if (!this.task.notes) {
      this.task.notes = [];
    }
    const newNoteObj: Note = {
      content: this.newNote,
      createdDate: new Date(),
      id : this.task.id

    };
    this.task.notes.push(newNoteObj);
    // let request:any = {
    //   notes : newNoteObj.content,
    //   createDate : newNoteObj.createdDate,
    //   taskId : this.task.id
    // }
    this.taskService.updateTask(newNoteObj).subscribe(updatedTask => {
      this.newNote = '';
    });
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument(): void {
    if (!this.selectedFile) {
      return;
    }

    let request : any = {
      fileData : this.selectedFile,
      id :  this.task.id
    }
    this.taskService.updateTask(request).subscribe({
      next: (respose) => {
        if(respose.isSuccess){
           this.task.documents = respose.data;

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
  

  updateTaskStatus(): void {
    this.task.status = this.selectStatus;
    let request : any = {
      taskStatus : this.selectedFile,
      id :  this.task.id
    }
    this.taskService.updateTask(this.task).subscribe({
      next: (updatedTask) => {
       
      },
      error: (error) => {
        console.error('Error updating task status:', error);
        // Handle error
      }
    });
  }
}
