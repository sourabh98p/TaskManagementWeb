export class ServiceResponseModel {
    isSuccess!: string;
    message!: string;
    data: any;
}

export class taskAndEmployeeResponse{
    taskList : Task[] = [];
    employeeList : Employee[] = [];
}
export interface Task{
    id?: number;
    title:string
    description: string;
    assigneeId: number; // Assuming assigneeId is used to reference employees
    assigneeName?: string; // Optional field for employee name (if available)
    status: string;
    createdDate?: Date;
    lastUpdated?: Date;
    notes?: Note[];
    documents?: Document[];
  }

export interface Employee{
    id : number;
    fullName: string;
}
export interface Note {
    id?: number;
    content: string;
    createdDate?: Date; // Optional, as it might be set on the server side
  }

  export interface Document {
    id?: number;
    filename: string;
    filepath: string;
    size: number;
    contentType: string;
  }
  
