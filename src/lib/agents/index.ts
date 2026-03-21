import { AgentMessage, AgentStatus } from '@/types';
import { products } from '@/lib/data/products';
import { mealPlans } from '@/lib/data/user';

export const agentStatuses: AgentStatus[] = [
  { name: 'Planner Agent', role: 'Analyzes habits & suggests daily needs', status: 'active', icon: '🧠', color: '#6366f1' },
  { name: 'Budget Agent', role: 'Tracks & optimizes spending', status: 'idle', icon: '💰', color: '#22c55e' },
  { name: 'Shopping Agent', role: 'Auto-builds smart carts', status: 'idle', icon: '🛒', color: '#3b82f6' },
  { name: 'Execution Agent', role: 'Finalizes actions & workflow', status: 'idle', icon: '⚡', color: '#f59e0b' },
];

const plannerResponses = [
  "Based on your weekly pattern, you usually buy milk and vegetables on Mondays. I've prepared a suggested list for you.",
  "I notice you haven't ordered fruits this week. Adding seasonal fruits to your recommendations — mangoes and oranges are in season!",
  `Here's your suggested meal plan for today:\n\n🌅 **Breakfast**: ${mealPlans[new Date().getDay()  === 0 ? 6 : new Date().getDay() - 1]?.breakfast || 'Poha with Chai'}\n🍛 **Lunch**: ${mealPlans[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.lunch || 'Dal Rice'}\n🌙 **Dinner**: ${mealPlans[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.dinner || 'Roti Sabzi'}`,
  "Your pantry essentials are running low. I recommend restocking: Atta, Rice, Dal, and cooking oil this weekend.",
];

const budgetResponses = [
  "📊 **This month's spending**: ₹9,581 of ₹15,000 budget (63.9%)\n\nYou're on track! At this rate, you'll finish the month with ₹2,200 in savings.",
  "💡 **Savings Tip**: Buying vegetables from the weekly market instead of daily could save you ₹400-600/month. I've identified your top 3 spending areas.",
  "⚠️ Your electricity bill is higher than usual. Consider switching to LED bulbs — potential savings of ₹200/month.",
  "🎉 Great news! You saved ₹1,200 last month compared to your average. Your grocery spending optimization is working well.",
];

const shoppingResponses = [
  `🛒 I've built a smart cart based on your usual weekly needs:\n\n• Amul Milk × 7 — ₹476\n• Tomatoes 1kg — ₹70\n• Onions 1kg — ₹32\n• Potatoes 1kg — ₹28\n• Atta 5kg — ₹260\n\n**Total: ₹866** (₹94 less than last week!)`,
  "Based on your meal plan, you'll need paneer, spinach, and spices for tonight's Palak Paneer. Want me to add them to your cart?",
  "🔄 Auto-reorder alert: You usually buy these items every 2 weeks and it's been 13 days — Dal, Rice, and Cooking Oil.",
];

const executionResponses = [
  "✅ All agents have completed their analysis. Here's the summary:\n\n• 📋 Meal plan: Generated for the week\n• 🛒 Smart cart: 12 items ready\n• 💰 Budget: Within limits\n• ⏰ Reminders: 2 bills due this week",
  "I've processed your order and applied the best available discount. Your delivery is scheduled for tomorrow between 9-11 AM.",
  "🔔 Reminder roundup:\n• Electricity bill due in 4 days\n• Gas cylinder booking available\n• Milk subscription renewed",
];

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getAgentResponse(query: string): AgentMessage {
  const lower = query.toLowerCase();
  let agent: AgentMessage['agent'] = 'planner';
  let content = '';

  if (lower.includes('budget') || lower.includes('spend') || lower.includes('save') || lower.includes('money') || lower.includes('expense')) {
    agent = 'budget';
    content = getRandomResponse(budgetResponses);
  } else if (lower.includes('cart') || lower.includes('buy') || lower.includes('order') || lower.includes('shop') || lower.includes('reorder')) {
    agent = 'shopping';
    content = getRandomResponse(shoppingResponses);
  } else if (lower.includes('status') || lower.includes('summary') || lower.includes('remind') || lower.includes('execute') || lower.includes('all')) {
    agent = 'execution';
    content = getRandomResponse(executionResponses);
  } else if (lower.includes('meal') || lower.includes('food') || lower.includes('plan') || lower.includes('suggest') || lower.includes('recommend')) {
    agent = 'planner';
    content = getRandomResponse(plannerResponses);
  } else {
    agent = 'planner';
    content = getRandomResponse(plannerResponses);
  }

  return {
    id: Date.now().toString(),
    agent,
    content,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    type: 'text',
  };
}

export function getRecommendedProducts() {
  // Use a deterministic selection to avoid SSR hydration mismatch
  // Rotate recommendations based on product index offsets
  const picks = [0, 5, 3, 9, 11, 7]; // curated product indices
  return picks.map(i => products[i % products.length]);
}

export function getSuggestionChips(): string[] {
  return [
    "📋 Plan my meals for today",
    "💰 How's my budget looking?",
    "🛒 Build a weekly cart",
    "📊 Show spending summary",
    "🔔 What's due this week?",
    "🥗 Suggest healthy snacks",
  ];
}
