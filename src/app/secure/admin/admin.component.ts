import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/Task.service';
import { ReportAdminResponse } from 'src/app/models/user-response';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  selectedInterval: string = 'week'; // Default selection
  reports: ReportAdminResponse[] = [];
  error: boolean = false;
  errorDate : string = '';
  customStartDate!: string;
  customEndDate!: string; 

  constructor(private taskService: TaskService , private commonService :  CommonService) {

   }

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports() {
    debugger;
   this.errorDate = '';
    if (this.selectedInterval === 'custom' && this.customStartDate !== null && this.customStartDate !== undefined && this.customStartDate !== '' 
    && this.customEndDate !== null && this.customEndDate !== undefined && this.customEndDate !== '') {
      if (new Date(this.customStartDate) > new Date(this.customEndDate)) {
        this.errorDate = 'Start date cannot be later than end date.'; 
        this.reports = []; 
        return;
      }
    }
    else if(this.selectedInterval === 'custom'){
      this.errorDate = 'Dates are required';
      this.reports = [];
    }
    this.error = !this.error;
    this.commonService.showLoader();
    let request: any = {
      interval : this.selectedInterval,
      startDate : this.customStartDate,
      endDate : this.customEndDate
    }
    this.taskService.getReports(request)
      .subscribe({
        next: (response) => {
          this.commonService.hideLoader();
          if(response.isSuccess){
            this.reports = response.data;
          }
          else
          {
            this.error =!this.error;
          }
        },
        error : (error) => {
          this.commonService.hideLoader();
          this.error = !this.error;
          throw error;
      }
  });
}

  getSelectedIntervalLabel(): string {
    switch (this.selectedInterval) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'custom':
        return 'Custom Range';
      default:
        return '';
    }
  }

}
