// manager.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Task } from 'src/app/models/Common-model';
import { Employee } from 'src/app/models/Common-model'; // Assuming Employee model is defined
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from 'src/app/services/Task.service';
import { taskAndEmployeeResponse } from 'src/app/models/Common-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent  implements OnInit {
  public TaskAndEmployeeModel : taskAndEmployeeResponse = new taskAndEmployeeResponse();
  displayedColumns: string[] = ['id', 'title', 'assigneeName', 'status', 'createdDate', 'lastUpdated'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  filterAssigneeId: number | null = null;
  filterStatus: string = '';
  employees: Employee[] = [];
  errorMessage: string = '';

  statusOptions: string[] = ['To-Do', 'InProcess', 'InReview', 'Closed'];

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private commonService: CommonService , private taskService : TaskService, private router : Router) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getEmployeeTasks();
  }


  getEmployeeTasks(){
    this.errorMessage ='';
    this.taskService.getEmployeeTasks(this.commonService.getUserid).subscribe({
      next: (respose) => {
        if(respose.isSuccess){
           this.TaskAndEmployeeModel = respose.data;
           this.dataSource.data = this.TaskAndEmployeeModel.taskList
           if(this.TaskAndEmployeeModel.taskList.length <= 0){
            this.errorMessage = 'No record Found !';
           }
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



  applyFilters(): void {
    this.dataSource.filterPredicate = (data: Task, filtersJson: string) => {
      const filters = JSON.parse(filtersJson);
      return (
        (filters.filterAssigneeId ? data.assigneeId === filters.filterAssigneeId : true) &&
        (filters.filterStatus ? data.status.toLowerCase() === filters.filterStatus.toLowerCase() : true)
      );
    };

    const filters = {
      filterAssigneeId: this.filterAssigneeId,
      filterStatus: this.filterStatus.trim().toLowerCase()
    };

    this.dataSource.filter = JSON.stringify(filters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.filterAssigneeId = null;
    this.filterStatus = '';
    this.applyFilters();
  }



  onPageChange(event: PageEvent) {
    // Handle pagination logic here
    console.log(event);
    // Example: update data based on event.pageIndex, event.pageSize, etc.
  }

  onCreateTaskClick(){
    this.router.navigate(['/manager/createTask']);
  }
  onTaskClick(id: any){
     this.commonService.clearTaskDetails;
     var detail = this.TaskAndEmployeeModel.taskList.find(x => x.id === id);
     this.commonService.setTaskDetails(detail);
     this.router.navigate(['/task', id]);
  }

}
