export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  lastActive: string;
  status?: "active" | "inactive";
  phone?: string;
  address?: string;
  [key: string]: any;
}

export interface UserFilters {
  search?: string;
  department?: string;
  role?: string;
  status?: string;
}
