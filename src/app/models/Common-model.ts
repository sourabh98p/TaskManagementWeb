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
    assignedTo: number; // Assuming assigneeId is used to reference employees
    createdBy : number;
    assigneeName?: string; // Optional field for employee name (if available)
    status: string;
    createdAt?: Date;
    UpdatedAt?: Date;
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
  
