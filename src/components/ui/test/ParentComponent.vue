<template>
  <div>
    <h1>{{ pageTitle }}</h1>

    <button @click="fetchData">Load Data</button>

    <div v-if="userStore.loading">Loading...</div>

    <div v-else-if="userStore.error">Error: {{ userStore.error }}</div>

    <div v-if="userStore.users.length">
      <ul>
        <li v-for="user in userStore.users" :key="user.id">
          {{ user.name }} - {{ user.email }}
          <div style="cursor: pointer; color: red" @click="removeUser(user.id)">
            Remove user
          </div>
        </li>
      </ul>
    </div>

    <input
      v-model="newUserName"
      placeholder="Enter name"
      @keyup.enter="addUser"
    />

    <ChildComponent :message="parentMessage" @increment="incrementCounter" />

    <p>Computed value: {{ reversedTitle }}</p>
    <p>Count: {{ counter }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import ChildComponent from "./ChildComponent.vue";
import { v4 as uuidv4 } from "uuid";
import { useUsersStore } from "@/stores/users.store";
const userStore = useUsersStore();

interface User {
  id: number | string;
  name: string;
  email: string;
  age?: number;
}

interface Props {
  initialCount: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0,
});
// State
const pageTitle = ref<string>("User Management");
// const users = ref<User[]>([]);
// const loading = ref<boolean>(false);
// const error = ref<string | null>(null);
const newUserName = ref<string>("");
const parentMessage = "Hello from parent";
const counter = ref<number>(props.initialCount);

// Computed
const reversedTitle = computed(() => {
  return pageTitle.value.split("").reverse().join("");
});

// Methods
const fetchData = async () => {
  await userStore.fetchUsers();
};

const addUser = () => {
  if (!newUserName.value.trim()) return;

  const newUser: User = {
    id: uuidv4(),
    name: newUserName.value,
    email: `${newUserName.value.toLowerCase()}@example.com`,
  };

  userStore.addUser(newUser);
  newUserName.value = "";
};

const incrementCounter = () => {
  counter.value += 1;
};

const removeUser = (userId: string | number) => {
  userStore.removeUser(userId);
};

// Watchers
// watch(
//   users,
//   (newVal: User[]) => {
//     localStorage.setItem("users", JSON.stringify(newVal));
//   },
//   { deep: true },
// );

// watchEffect(() => {
//   if (!newUserName.value.trim()) return;

//   const newUser: User = {
//     id: users.value.length + 1,
//     name: newUserName.value,
//     email: `${newUserName.value.toLowerCase()}@example.com`,
//   };

//   users.value.push(newUser);
//   newUserName.value = "";
// })

// Lifecycle
onMounted(() => {
  if (!userStore.userCount) fetchData();
});

// Expose to template
// return {
//   pageTitle,
//   users,
//   loading,
//   error,
//   newUserName,
//   parentMessage,
//   counter,
//   reversedTitle,
//   fetchData,
//   addUser,
// };
</script>

<style scoped>
div {
  font-family: Arial, sans-serif;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #33a06f;
}

input {
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 5px 0;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
