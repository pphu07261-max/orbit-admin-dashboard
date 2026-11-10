export type OrderStatus = 'Completed' | 'Processing' | 'Pending' | 'Cancelled'
export type ProductStatus = 'Active' | 'Draft' | 'Out of stock'
export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  sku: string
}
export interface Category {
  id: string
  name: string
  description: string
  status: 'Active' | 'Inactive'
}
export interface Order {
  id: string
  customer: string
  email: string
  date: string
  total: number
  status: OrderStatus
  items: number
}
export interface Customer {
  id: string
  name: string
  email: string
  location: string
  orders: number
  spent: number
  joined: string
}
export interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}
