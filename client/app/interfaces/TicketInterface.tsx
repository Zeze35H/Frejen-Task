import User from "./UserInterface";
import Department from "./DepartmentInterface";
import State from "./StateInterface";

export default interface Ticket {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    created_by: number; // Foreign key to User
    updated_by: number; // Foreign key to User
    id_state: number; // Foreign key to State
    id_department: number; // Foreign key to Department
    observations?: string;
    department: Department;
    state: State;
    creator: User;
    updater: User;
}