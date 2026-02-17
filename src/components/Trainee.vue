<!-- Debounce search -->
<!-- <script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const searchQuery = ref<string>('')
const searchResults = ref<Record<string, string>[]>([])
let searchTimeout: ReturnType<typeof setTimeout> = 0

async function search(query: string) {
  if (query.length < 3) {
    searchResults.value = []
    return
  }

  try {
    const response = await fetch(`https://api.example.com/search?q=${query}`)
    if (!response.ok) throw new Error('Search failed')
    searchResults.value = await response.json()
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = [] // очистить или показать ошибку
  }
}

watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    await search(newQuery)
  }, 300)
})

onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <div v-for="item in searchResults" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template> -->

<!--  Composables -->

<!-- <script setup lang="ts">
import { usePosts } from '@/composables/usePosts'
const {
  loading,
  page,
  error,
  posts,
  fetchPost,
  fetchComments,
  hasMore,
  currentPost,
  comments,
  newComment,
  addComment,
  totalLikes,
} = usePosts()
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <h3 @click="fetchPost(post.id)">{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <button @click="fetchComments(post.id)">Comments</button>
      </div>
      <button v-if="hasMore" @click="page++">Load More</button>
    </div>

    <div v-if="currentPost">
      <h2>{{ currentPost.title }}</h2>
      <div v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </div>
      <input v-model="newComment" @keyup.enter="addComment" />
    </div>

    <p>Total likes: {{ totalLikes }}</p>
  </div>
</template> -->

<!-- composable -->
<!-- import { ref, onMounted, computed } from 'vue'

export function usePosts() {
  interface Post {
    id: number
    title: string
    body: string
  }

  interface Comment {
    id: number
    text: string
  }

  const posts = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)
  const comments = ref<Comment[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const page = ref<number>(1)
  const hasMore = ref<boolean>(true)
  const newComment = ref<string>('')

  async function fetchPosts() {
    loading.value = true
    try {
      const res = await fetch(`/api/posts?_page=${page.value}&_limit=10`)
      const newPosts = await res.json()
      posts.value = [...posts.value, ...newPosts]
      hasMore.value = newPosts.length === 10
    } catch (err) {
      error.value = 'Failed to load posts'
    } finally {
      loading.value = false
    }
  }

  async function fetchPost(id: number) {
    try {
      const res = await fetch(`/api/posts/${id}`)
      if (!res.ok) throw new Error('Error')
      currentPost.value = await res.json()
      hasMore.value = newPosts.length === 10
    } catch (error) {
      console.error(error)
      hasMore.value = false
    }
  }

  async function fetchComments(postId: number) {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`)
      if (!res.ok) throw new Error('Error')
      comments.value = await res.json()
      newComment.value = ''
    } catch (error) {
      console.error(error)
    }
  }

  async function addComment(text: string) {
    if (!currentPost.value) return

    try {
      const res = await fetch(`/api/posts/${currentPost.value.id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error('Error')
      const newComment = await res.json()
      comments.value = [...comments.value, newComment]
    } catch (error) {
      console.error(error)
    }
  }

  const totalLikes = computed(() => {
    return posts.value.reduce((sum, p) => sum + (p.likes || 0), 0)
  })

  onMounted(() => {
    fetchPosts()
  })

  return {
    page,
    loading,
    posts,
    fetchPost,
    fetchComments,
    hasMore,
    currentPost,
    comments,
    newComment,
    addComment,
    totalLikes,
    error
  }
} -->

<!-- Работа с localStorage -->

<!-- <script setup lang="ts">
// import { watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

interface User {
  id: number
  name: string
}

const theme = useLocalStorage<string>('theme', 'light')
let user = useLocalStorage<User | null>('user', null)
const settings = useLocalStorage<Record<string, boolean>>('settings', {
  notifications: false,
})

// watch(
//   [theme, user, settings],
//   ([newTheme, newUser, newSettings], [oldTheme, oldUser, oldSettings]) => {
//     if (newTheme !== oldTheme) localStorage.setItem('theme', JSON.stringify(newTheme))
//     if (newUser !== oldUser) localStorage.setItem('user', JSON.stringify(newUser))
//     if (newSettings !== oldSettings) localStorage.setItem('settings', JSON.stringify(newSettings))
//   },
//   { deep: true },
// )

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function login(userData: User) {
  user.value = userData
}

function updateSetting(key: string, value: boolean) {
  settings.value[key] = value
}
</script>

<template>
  <button @click="toggleTheme">Toggle Theme</button>
  <button @click="login({ name: 'John', id: 1 })">Login</button>
  <button @click="updateSetting('notifications', true)">Enable Notifications</button>
</template> -->

<!-- composable useLocalStorage.ts -->
<!-- import { ref, watch, type Ref } from "vue";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | Ref<T>
): Ref<T> {
  // Получаем начальное значение
  const initialValue = (() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  })();

  const data = ref(initialValue) as Ref<T>;

  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Ошибка записи в localStorage "${key}":`, error);
      }
    },
    { deep: true }
  );

  return data;
} -->

<!-- watchers and side-effects -->

<!-- <script setup lang="ts">
import { ref, watch } from 'vue'

const search = ref<string>('')
const filters = ref<Record<string, string>>({ category: 'all', sort: 'asc' })
const results = ref<Record<string, string>[]>([])
const page = ref<number>(1)
const errorMessage = ref<string>('')
const isLoading = ref<boolean>(false)

let activeRequest: AbortController | null = null
// Debounce timer
// let searchTimeout: NodeJS.Timeout

watch(
  [search, filters],
  async () => {
    // clearTimeout(searchTimeout)
    // searchTimeout = setTimeout(async () => {
    page.value = 1
    await loadResults()
    // }, 300)
  },
  { deep: true },
)

watch(page, async () => {
  await loadResults()
})

async function loadResults() {
  // Отменяем предыдущий запрос
  if (activeRequest) {
    activeRequest.abort()
  }

  activeRequest = new AbortController()

  errorMessage.value = ''
  isLoading.value = true

  try {
    const url = new URL('/api/search', window.location.origin)
    url.searchParams.set('q', search.value)
    url.searchParams.set('page', page.value.toString())
    url.searchParams.set('category', filters.value.category)
    url.searchParams.set('sort', filters.value.sort)
    // URLSearchParams автоматически кодирует спецсимволы

    // const url = `/api/search?q=${search.value}&page=${page.value}&category=${filters.value.category}&sort=${filters.value.sort}`
    const res = await fetch(url, { signal: activeRequest.signal })
    if (!res.ok) throw new Error('Failed to load results ' + res.status)
    results.value = await res.json()
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return

    console.error('Results', error)
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load results'
    results.value = []
  } finally {
    isLoading.value = false
    activeRequest = null
  }
}
</script>

<template>
  <div>
    <input v-model="search" placeholder="Search..." type="search" />

    <select v-model="filters.category">
      <option value="all">All</option>
      <option value="books">Books</option>
      <option value="electronics">Electronics</option>
    </select>

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-else-if="errorMessage" class="error">
      {{ errorMessage }}
      <button @click="loadResults">Retry</button>
    </div>

    <div v-else-if="results.length === 0" class="no-results">No results found</div>

    <div v-else class="results">
      <div v-for="item in results" :key="item.id" class="result-item">
        {{ item.name }}
      </div>
    </div>

    <button @click="page++" :disabled="isLoading || results.length === 0" class="next-btn">
      Next Page
    </button>
  </div>
</template> -->

<!-- provide-inject vs props drilling -->
<!-- <script setup lang="ts">
import { ref, provide } from 'vue'
import Parent from './Parent.vue'

interface NotificationType {
  id: number
  text: string
}

interface SettingsType {
  theme: 'dark' | 'light'
}

interface UserType {
  name: string
  role: string
  settings: SettingsType
}

const user = ref<UserType>({
  name: 'John',
  role: 'admin',
  settings: { theme: 'dark' },
})

const notifications = ref<NotificationType[]>([])

provide('user', user)
provide('notifications', notifications)
provide('addNotification', addNotification)

function addNotification(msg: string) {
  notifications.value.push({ id: Date.now(), text: msg })
}
</script>

<template>
  <Parent />
</template> -->

<!-- Parent.vue -->
<!-- <script setup lang="ts">
import Child from './Child.vue'

// defineProps(['user', 'notifications'])
</script>

<template>
  <Child />
</template> -->

<!-- Child.vue -->
<!-- <script setup lang="ts">
import { inject, computed } from 'vue'
// defineProps(['user', 'notifications'])
interface NotificationType {
  id: number
  text: string
}

interface SettingsType {
  theme: 'dark' | 'light'
}

interface UserType {
  name: string
  role: string
  settings: SettingsType
}

const user = inject<Ref<UserType>>('user')
const notifications = inject<Ref<NotificationsType[]>>('notifications', ref([]))
const addNotification = inject<(text: string) => void>('addNotification', () => {})

const currentTheme = computed(() => user?.value.settings.theme ?? 'light')
</script>

<template>
  <div>
    <template v-if="user">
      <p>Theme: {{ currentTheme }}</p>
      <button
        @click="
          currentTheme === 'dark' ? (user.settings.theme = 'light') : (user.settings.theme = 'dark')
        "
      >
        Toggle theme
      </button>

      <p>{{ user.name }}</p>
      <p>Role: {{ user.role }}</p>
      <p>{{ user.settings.theme }}</p>
    </template>
    <template v-if="notifications?.length">
      <div v-for="n in notifications" :key="n.id">{{ n.text }}</div>
    </template>
    <button @click="addNotification('New notification from child!')">Add Test Notification</button>
  </div>
</template> -->

<!-- обработка ошибок -->

<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue'

interface DataType {
  id: number
  title: string
  // ... другие поля
}

interface UserType {
  id: number
  name: string
  email: string
}

const data = ref<DataType>(null)
const userData = ref<UserType>(null)
const isLoading = ref({
  data: false,
  user: false
})
const errorMsg = ref({
  data: '',
  user: ''
})

async function loadData() {
  isLoading.value.data = true
  errorMsg.value.data = ''

  try {
    const response = await fetch('https://api.example.com/data')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    data.value = await response.json()
  } catch (error) {
    console.error('Data:', error)
    errorMsg.value.data = error instanceof Error ? error.message : 'Load data error'
  } finally {
    isLoading.value.data = false
  }
}

async function loadUser(id) {
  isLoading.value.user = true
  errorMsg.value.user = ''

  try {
    const response = await fetch(`https://api.example.com/users/${id}`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    userData.value = await response.json()
  } catch (error) {
    console.error('Load:', error)
    errorMsg.value.user = error instanceof Error ? error.message : 'Load user error'
  } finally {
    isLoading.value.user = false
  }
}

onMounted(() => {
  loadData()
  loadUser(1)
})
</script>

<template>
  <div>
    <div v-if="isLoading.data">Loading data...</div>
    <div v-else-if="error.data" class="error">
      Error: {{ error.data }}
      <button @click="loadData">Retry</button>
    </div>
    <div v-else-if="data">{{ data }}</div>
    <div v-else>No data available</div>

    <div v-if="isLoading.user">Loading user...</div>
    <div v-else-if="error.user" class="error">
      Error: {{ error.user }}
      <button @click="loadUser(1)">Retry</button>
    </div>
    <div v-else-if="userData">{{ userData }}</div>
    <div v-else>No user data</div>
  </div>
</template> -->

<!-- for and производительность -->
<!-- <template>
  <div>
    <div v-for="item in items" :key="item.id">
      <input v-model.lazy="item.name" />
      <span>{{ item.name }} - {{ item.price }}</span>
      <button @click="removeItem(item.id)">X</button>
    </div>
    <button @click="addItem">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface CartItem {
  name: string
  price: number
  id: number
}


const items = ref<CartItem[]>([
  { id: 1, name: 'Item 1', price: 100 },
  { id: 2, name: 'Item 2', price: 200 },
  { id: 3, name: 'Item 3', price: 300 },
])

function addItem() {
  const newItem: CartItem = {
    id: Date.now(),
    name: 'New Item',
    price: 0,
  }
  items.value = [...items.value, newItem]
}

function removeItem(itemId: number) {
  items.value = items.value.filter(({id}) => id !== itemId)
}
</script> -->

<!-- computed: -->

<!-- <script setup lang="ts">
import { ref, computed } from 'vue'

interface CartItem {
  name: string
  price: number
  quantity: number
}

const items = ref<CartItem[]>([
  { name: 'Apple', price: 100, quantity: 3 },
  { name: 'Banana', price: 50, quantity: 5 },
  { name: 'Orange', price: 80, quantity: 2 },
])

const totalPrice = computed<number>(() => {
  return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const itemCount = computed<number>(() => {
  return items.value.length
})

const formattedTotal = computed<string>(() => {
  return `$${totalPrice.value.toFixed(2)}`
})
</script>

<template>
  <div v-if="items.length">
    <p>Items: {{ itemCount }}</p>
    <p>Total: {{ formattedTotal }}</p>
  </div>
</template> -->
