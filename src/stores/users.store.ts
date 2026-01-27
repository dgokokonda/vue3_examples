import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: number | string;
  name: string;
  email: string;
  active?: boolean;
  age?: number;
}

interface UserState {
  loading: boolean;
  users: User[];
  error: string | null;
}

export const useUsersStore = defineStore("user", {
  state: (): UserState => ({
    users: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData: User[] = [
          {
            id: uuidv4(),
            name: "John Doe",
            email: "john@example.com",
            age: 25,
          },
          {
            id: uuidv4(),
            name: "Jane Smith",
            email: "jane@example.com",
            age: 30,
          },
          {
            id: uuidv4(),
            name: "Bob Johnson",
            email: "bob@example.com",
            age: 35,
          },
        ];
        // const response = await fetch("/api/users");
        // const data = await response.json();
        if (!localStorage.getItem("users")) {
          this.users = mockData;
          this.addUsersToStorage();
        } else {
          this.loadUsersFromStorage();
        }
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.loading = false;
      }
    },

    addUser(user: User) {
      this.users.push(user);
      this.addUsersToStorage();
    },

    removeUser(id: number | string) {
      this.users = this.users.filter((user) => user.id !== id);
      this.addUsersToStorage();
    },

    loadUsersFromStorage() {
      try {
        if (localStorage.getItem("users")) {
          const data = localStorage.getItem("users");
          if (data) this.users = JSON.parse(data);
        }
      } catch (error) {
        console.error("Failed to load users from storage");
      }
    },
    addUsersToStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },

  getters: {
    userCount: (state: UserState) => state.users.length,

    activeUsers: (state: UserState) => {
      return state.users.filter((user) => user.active);
    },

    getUserById: (state: UserState) => {
      return (id: number) => state.users.find((user) => user.id === id);
    },
  },
});
