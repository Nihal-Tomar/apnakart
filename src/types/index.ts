export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
  inStock: boolean;
  isOrganic?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
}

export interface Subscription {
  id: string;
  name: string;
  provider: string;
  amount: number;
  frequency: 'daily' | 'monthly' | 'quarterly';
  nextDue: string;
  icon: string;
  status: 'active' | 'paused' | 'overdue';
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  monthlyBudget: number;
  preferences: string[];
}

export interface AgentMessage {
  id: string;
  agent: 'planner' | 'budget' | 'shopping' | 'execution' | 'user';
  content: string;
  timestamp: string;
  type: 'text' | 'suggestion' | 'action' | 'insight';
}

export interface AgentStatus {
  name: string;
  role: string;
  status: 'idle' | 'thinking' | 'active';
  icon: string;
  color: string;
  lastAction?: string;
}

export interface MealPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  estimatedCost: number;
}
