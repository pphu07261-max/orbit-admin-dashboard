import type { Category, Customer, Order, Product } from '../types'

export const products: Product[] = [
  { id: 'PR-1001', name: 'Minimal Ceramic Vase', category: 'Home & Living', price: 38, stock: 42, status: 'Active', sku: 'HOM-001' },
  { id: 'PR-1002', name: 'Everyday Backpack', category: 'Accessories', price: 79, stock: 18, status: 'Active', sku: 'ACC-014' },
  { id: 'PR-1003', name: 'Wireless Headphones', category: 'Electronics', price: 129, stock: 0, status: 'Out of stock', sku: 'ELE-021' },
  { id: 'PR-1004', name: 'Linen Table Runner', category: 'Home & Living', price: 45, stock: 64, status: 'Active', sku: 'HOM-009' },
  { id: 'PR-1005', name: 'Studio Desk Lamp', category: 'Home & Living', price: 92, stock: 12, status: 'Active', sku: 'HOM-017' },
  { id: 'PR-1006', name: 'Classic Leather Wallet', category: 'Accessories', price: 55, stock: 7, status: 'Draft', sku: 'ACC-031' },
  { id: 'PR-1007', name: 'Smart Water Bottle', category: 'Electronics', price: 34, stock: 28, status: 'Active', sku: 'ELE-044' },
  { id: 'PR-1008', name: 'Cotton Throw Blanket', category: 'Home & Living', price: 68, stock: 31, status: 'Active', sku: 'HOM-025' },
  { id: 'PR-1009', name: 'Canvas Tote Bag', category: 'Accessories', price: 24, stock: 53, status: 'Active', sku: 'ACC-039' },
]
export const categories: Category[] = [
  { id: 'CAT-01', name: 'Home & Living', description: 'Thoughtful essentials for your space', status: 'Active' },
  { id: 'CAT-02', name: 'Accessories', description: 'Everyday pieces and carry goods', status: 'Active' },
  { id: 'CAT-03', name: 'Electronics', description: 'Useful tech for modern life', status: 'Active' },
  { id: 'CAT-04', name: 'Apparel', description: 'Comfortable wardrobe staples', status: 'Inactive' },
]
export const orders: Order[] = [
  { id: '#ORD-7841', customer: 'Olivia Rhye', email: 'olivia@example.com', date: '2026-11-10', total: 248, status: 'Completed', items: 3 },
  { id: '#ORD-7840', customer: 'Phoenix Baker', email: 'phoenix@example.com', date: '2026-11-10', total: 129, status: 'Processing', items: 1 },
  { id: '#ORD-7839', customer: 'Lana Steiner', email: 'lana@example.com', date: '2026-11-09', total: 84, status: 'Pending', items: 2 },
  { id: '#ORD-7838', customer: 'Demi Wilkinson', email: 'demi@example.com', date: '2026-11-09', total: 312, status: 'Completed', items: 4 },
  { id: '#ORD-7837', customer: 'Candice Wu', email: 'candice@example.com', date: '2026-11-08', total: 56, status: 'Cancelled', items: 1 },
  { id: '#ORD-7836', customer: 'Natali Craig', email: 'natali@example.com', date: '2026-11-08', total: 178, status: 'Processing', items: 2 },
  { id: '#ORD-7835', customer: 'Drew Cano', email: 'drew@example.com', date: '2026-11-07', total: 96, status: 'Completed', items: 2 },
  { id: '#ORD-7834', customer: 'Orlando Diggs', email: 'orlando@example.com', date: '2026-11-06', total: 420, status: 'Pending', items: 5 },
]
export const customers: Customer[] = [
  { id: 'CUS-001', name: 'Olivia Rhye', email: 'olivia@example.com', location: 'Hà Nội, Việt Nam', orders: 12, spent: 1248, joined: '2026-05-12' },
  { id: 'CUS-002', name: 'Phoenix Baker', email: 'phoenix@example.com', location: 'TP. Hồ Chí Minh', orders: 8, spent: 890, joined: '2026-06-21' },
  { id: 'CUS-003', name: 'Lana Steiner', email: 'lana@example.com', location: 'Đà Nẵng, Việt Nam', orders: 6, spent: 642, joined: '2026-07-03' },
  { id: 'CUS-004', name: 'Demi Wilkinson', email: 'demi@example.com', location: 'Hải Phòng, Việt Nam', orders: 15, spent: 2130, joined: '2026-04-18' },
  { id: 'CUS-005', name: 'Candice Wu', email: 'candice@example.com', location: 'Cần Thơ, Việt Nam', orders: 3, spent: 214, joined: '2026-08-29' },
  { id: 'CUS-006', name: 'Natali Craig', email: 'natali@example.com', location: 'Nam Định, Việt Nam', orders: 9, spent: 1076, joined: '2026-03-11' },
]
export const revenueByPeriod = {
  '7d': [{ name: 'Mon', revenue: 3200 }, { name: 'Tue', revenue: 4100 }, { name: 'Wed', revenue: 3600 }, { name: 'Thu', revenue: 5200 }, { name: 'Fri', revenue: 4700 }, { name: 'Sat', revenue: 6100 }, { name: 'Sun', revenue: 5700 }],
  '30d': [{ name: 'Week 1', revenue: 14200 }, { name: 'Week 2', revenue: 16800 }, { name: 'Week 3', revenue: 15300 }, { name: 'Week 4', revenue: 21900 }],
  '3m': [{ name: 'Sep', revenue: 48200 }, { name: 'Oct', revenue: 56400 }, { name: 'Nov', revenue: 62100 }],
  '12m': [{ name: 'Dec', revenue: 32000 }, { name: 'Jan', revenue: 36500 }, { name: 'Feb', revenue: 38900 }, { name: 'Mar', revenue: 42100 }, { name: 'Apr', revenue: 39800 }, { name: 'May', revenue: 46500 }, { name: 'Jun', revenue: 49300 }, { name: 'Jul', revenue: 51800 }, { name: 'Aug', revenue: 47200 }, { name: 'Sep', revenue: 48200 }, { name: 'Oct', revenue: 56400 }, { name: 'Nov', revenue: 62100 }],
}
export const topProducts = [
  { name: 'Everyday Backpack', category: 'Accessories', sold: 284, revenue: 22436, initials: 'EB' },
  { name: 'Minimal Ceramic Vase', category: 'Home & Living', sold: 216, revenue: 8208, initials: 'CV' },
  { name: 'Wireless Headphones', category: 'Electronics', sold: 172, revenue: 22188, initials: 'WH' },
  { name: 'Linen Table Runner', category: 'Home & Living', sold: 148, revenue: 6660, initials: 'LT' },
]
