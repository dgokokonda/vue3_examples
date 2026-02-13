<template>
  <div class="cart">
    <h2>Корзина ({{ cartItems.length }} товаров)</h2>

    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <img :src="item.image" width="50" />
      <span>{{ item.name }}</span>
      <span>{{ formattedPrice(item.price) }} ₽</span>
      <input
        type="number"
        :value="item.quantity"
        @input="updateQuantity(item.id, ($event.target as HTMLInputElement).value)"
        min="1"
      />
      <button @click="removeFromCart(item)">Удалить</button>
    </div>

    <div class="total">
      <strong>Итого: {{ formattedPrice(calculateTotal) }} ₽</strong>
    </div>

    <button @click="checkout" :disabled="cartItems.length === 0">Оформить заказ</button>

    <div v-if="messageState.showSuccessMessage" style="color: green">
      {{ messageState.successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, onMounted } from 'vue'

interface CartItem {
  name: string
  id: number
  price: number
  quantity?: number
  image: string
}
const props = defineProps<{
  initialCart?: CartItem[]
  userId: string
}>()

const cartItems = ref<CartItem[]>([])
// const totalPrice = ref<number>(0)
const messageState = reactive({
  showSuccessMessage: false,
  successMessage: '',
})

const calculateTotal = computed(() => {
  let total = 0
  cartItems.value.forEach((item) => {
    total += item.price * (item?.quantity || 1)
  })
  return total
})
const INITIAL_LOAD_DELAY = 2000
const MESSAGE_DISPLAY_TIME = 3000

const formattedPrice = computed(() => (price: number) => Intl.NumberFormat().format(price))

watch(
  () => props.initialCart,
  (newCart) => {
    if (newCart) {
      cartItems.value = [...newCart]
    }
  },
  { immediate: true },
)

const addToCart = (product: CartItem) => {
  const existingItemIndex = cartItems.value.findIndex((item) => item.id === product.id)
  const existingItem = cartItems.value[existingItemIndex]

  if (existingItemIndex > -1) {
    cartItems.value.splice(existingItemIndex, 1, {
      ...existingItem,
      quantity: (existingItem?.quantity || 1) + 1,
    })
  } else {
    cartItems.value = [
      ...cartItems.value,
      {
        ...product,
        quantity: 1,
      },
    ]
  }
}

const updateQuantity = (id: number, value: string) => {
  const newQuantity = parseInt(value) || 1
  cartItems.value = cartItems.value.map((item) =>
    item.id === id ? { ...item, quantity: newQuantity } : item,
  )
  // const itemIndex = cartItems.value.findIndex((item) => item.id === id)
  // if (itemIndex > -1) {
  // cartItems.value[itemIndex].quantity = parseInt(value) || 1
  // cartItems.value = [...cartItems.value] // триггер для реактивности при мутации данных (выше)
  // }
}

const removeFromCart = (itemToRemove: CartItem) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== itemToRemove.id)
}

const checkout = async () => {
  try {
    // имитация отправки формы
    const response = await new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            userId: props.userId,
            items: cartItems.value.slice().map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
            total: calculateTotal.value,
          }),
        INITIAL_LOAD_DELAY,
      ),
    )

    if (!response) throw 'Save error'

    cartItems.value = []
    messageState.showSuccessMessage = true
    messageState.successMessage = 'Заказ успешно оформлен!'

    setTimeout(() => {
      messageState.showSuccessMessage = false
    }, MESSAGE_DISPLAY_TIME)
  } catch (error) {
    console.error(error)
    throw error
  }
}

onMounted(() => {
  // имитация подгрузки данных
  setTimeout(() => {
    addToCart({ id: 1, name: 'Товар 1', price: 1000, image: '/img1.jpg' })
    addToCart({ id: 2, name: 'Товар 2', price: 2000, image: '/img2.jpg' })
  }, INITIAL_LOAD_DELAY)
})
</script>

<style scoped>
.cart {
  /* max-width: 1000px;
  margin: 0 auto; */
}
.cart-item {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
  white-space: nowrap;
}
.total {
  margin: 20px 0;
  font-size: 1.2em;
}

.cart-item img {
  min-width: 50px;
}
</style>
