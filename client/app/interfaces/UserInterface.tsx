// User Interface
export default interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    id_department: number; // Foreign key to Department
    admin: boolean; // 1 for admin, 0 for non-admin
}