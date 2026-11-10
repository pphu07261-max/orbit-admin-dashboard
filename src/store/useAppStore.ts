import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Category, Product, ToastMessage } from '../types'
import { categories as initialCategories, products as initialProducts } from '../data/mockData'

interface AppState {
  darkMode: boolean
  sidebarCollapsed: boolean
  products: Product[]
  categories: Category[]
  toasts: ToastMessage[]
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebarCollapsed: (value: boolean) => void
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  toast: (message: string, type?: ToastMessage['type']) => void
  removeToast: (id: number) => void
}
export const useAppStore = create<AppState>()(persist((set) => ({
  darkMode: false,
  sidebarCollapsed: false,
  products: initialProducts,
  categories: initialCategories,
  toasts: [],
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (product) => set((state) => ({ products: state.products.map((item) => item.id === product.id ? product : item) })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((item) => item.id !== id) })),
  addCategory: (category) => set((state) => ({ categories: [category, ...state.categories] })),
  updateCategory: (category) => set((state) => ({ categories: state.categories.map((item) => item.id === category.id ? category : item) })),
  deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((item) => item.id !== id) })),
  toast: (message, type = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
    window.setTimeout(() => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })), 3200)
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })),
}), { name: 'orbit-admin-state', partialize: (state) => ({ darkMode: state.darkMode, products: state.products, categories: state.categories }) }))
