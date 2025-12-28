import { type Ref, type ComputedRef} from 'vue'

export interface Todo {
  id: number | string
  text: string
  completed: boolean
  createdAt: Date
}

export interface UseTodoManagerReturn {
  // Состояния
  todos: Ref<Todo[]>
  newTodoText: Ref<string>
  filter: Ref<'all' | 'active' | 'completed'>
  
  // Геттеры/вычисляемые свойства
  filteredTodos: ComputedRef<Todo[]>
  activeCount: ComputedRef<number>
  completedCount: ComputedRef<number>
  
  // Методы
  addTodo: (text?: string) => void
  removeTodo: (id: number | string) => void
  toggleTodo: (id: number | string) => void
  updateTodoText: (id: number | string, newText: string) => void
  clearCompleted: () => void
  setFilter: (filterType: 'all' | 'active' | 'completed') => void
}