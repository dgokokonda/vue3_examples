import { ref, computed } from 'vue'

interface UseFetchOptions<T> {
  immediate?: boolean
  initialData?: T
  options?: Record<string, unknown> | undefined
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useFetch<T = unknown>(url: string, options?: UseFetchOptions<T>) {
  const data = ref<T | undefined>(options?.initialData)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  const loaded = ref(false)

  const hasError = computed(() => error.value !== null)
  const isEmpty = computed(() => !data.value)

  async function execute() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, options?.options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      data.value = result
      loaded.value = true

      options?.onSuccess?.(result)
    } catch (err) {
      error.value = err as Error
      options?.onError?.(err as Error)
    } finally {
      loading.value = false
    }
  }

  if (options?.immediate) {
    execute()
  }

  return {
    data,
    error,
    loading,
    loaded,
    hasError,
    isEmpty,
    execute,
    refetch: execute,
  }
}

// использование
// const { data, error, execute } = useFetch<User[]>(`${BASE_URL}/users`)
// await execute() // теперь вызываем явно
