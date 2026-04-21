import { AgentMessage, AgentStatus } from '@/types';
import { products } from '@/lib/data/products';
import { mealPlans } from '@/lib/data/user';

export const agentStatuses: AgentStatus[] = [
  { name: 'Planner Agent', role: 'Analyzes habits & suggests daily needs', status: 'active', icon: '🧠', color: '#6366f1' },
  { name: 'Budget Agent', role: 'Tracks & optimizes spending', status: 'idle', icon: '💰', color: '#22c55e' },
  { name: 'Shopping Agent', role: 'Auto-builds smart carts', status: 'idle', icon: '🛒', color: '#3b82f6' },
  { name: 'Execution Agent', role: 'Finalizes actions & workflow', status: 'idle', icon: '⚡', color: '#f59e0b' },
];

const zeptoResponses: Record<string, string> = {
  "where is my order?": "🚀 **10-minute Delivery Update**: Your order is currently with our delivery partner, Rahul, and is just 2.4km away. Estimated arrival: **3 minutes**!",
  "how to return an item?": "🍎 **Easy Returns**: For fresh produce (Fruits/Veg), you can return them directly to the delivery partner at the doorstep. For other items, raise a request in the 'Orders' section within 24 hours.",
  "what are the delivery charges?": "🚚 **Delivery Info**: Delivery is **FREE** for all orders above ₹499! For orders below that, a nominal convenience fee of ₹25 is applied to ensure lightning-fast service.",
  "missing an item in my order?": "⚠️ **Missing Item**: We sincerely apologize! Please select the missing item from your order history and click 'Get Refund'. The amount will be credited to your ApnaWallet instantly.",
  "can i cancel my order?": "🛑 **Cancellation**: Since we pick items in under 60 seconds, orders can only be cancelled within **30 seconds** of placement. After that, our partners are already on their way!",
  "is everything fresh?": "🥦 **Quality Guarantee**: Absolutely! Our 'Farm-to-Fork' initiative ensures all vegetables are sourced within 24 hours of delivery. If you're not satisfied, we offer 100% money back.",
};

// Returns responses lazily — called only from handleSend() on the client,
// so new Date() never executes during SSR.
function getPlannerResponses(): string[] {
  const dayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const plan = mealPlans[dayIndex];
  return [
    "Based on your weekly pattern, you usually buy milk and vegetables on Mondays. I've prepared a suggested list for you.",
    "I notice you haven't ordered fruits this week. Adding seasonal fruits to your recommendations — mangoes and oranges are in season!",
    `Here's your suggested meal plan for today:\n\n🌅 **Breakfast**: ${plan?.breakfast || 'Poha with Chai'}\n🍛 **Lunch**: ${plan?.lunch || 'Dal Rice'}\n🌙 **Dinner**: ${plan?.dinner || 'Roti Sabzi'}`,
    "Your pantry essentials are running low. I recommend restocking: Atta, Rice, Dal, and cooking oil this weekend.",
  ];
}

const budgetResponses = [
  "📊 **This month's spending**: ₹9,581 of ₹15,000 budget (63.9%)\n\nYou're on track! At this rate, you'll finish the month with ₹2,200 in savings.",
  "💡 **Savings Tip**: Buying vegetables from the weekly market instead of daily could save you ₹400-600/month. I've identified your top 3 spending areas.",
  "⚠️ Your electricity bill is higher than usual. Consider switching to LED bulbs — potential savings of ₹200/month.",
];

const shoppingResponses = [
  `🛒 I've built a smart cart based on your usual weekly needs:\n\n• Amul Milk × 7 — ₹476\n• Tomatoes 1kg — ₹70\n• Onions 1kg — ₹32\n• Potatoes 1kg — ₹28\n• Atta 5kg — ₹260\n\n**Total: ₹866** (₹94 less than last week!)`,
  "Based on your meal plan, you'll need paneer, spinach, and spices for tonight's Palak Paneer. Want me to add them to your cart?",
];

const executionResponses = [
  "✅ All agents have completed their analysis. Here's the summary:\n\n• 📋 Meal plan: Generated for the week\n• 🛒 Smart cart: 12 items ready\n• 💰 Budget: Within limits\n• ⏰ Reminders: 2 bills due this week",
  "🔔 Reminder roundup:\n• Electricity bill due in 4 days\n• Gas cylinder booking available\n• Milk subscription renewed",
];

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * @param query   The user's message text.
 * @param ts      A numeric timestamp captured on the client (Date.now()).
 *                Passing it as a parameter prevents any date calls inside
 *                this function from running during SSR.
 */
export function getAgentResponse(query: string, ts: number): AgentMessage {
  const lower = query.toLowerCase().trim();
  let agent: AgentMessage['agent'] = 'planner';
  let content = '';

  if (zeptoResponses[lower]) {
    agent = 'execution';
    content = zeptoResponses[lower];
  } else if (lower.includes('budget') || lower.includes('spend') || lower.includes('save') || lower.includes('money') || lower.includes('expense')) {
    agent = 'budget';
    content = getRandomResponse(budgetResponses);
  } else if (lower.includes('cart') || lower.includes('buy') || lower.includes('order') || lower.includes('shop') || lower.includes('reorder')) {
    agent = 'shopping';
    content = getRandomResponse(shoppingResponses);
  } else if (lower.includes('status') || lower.includes('summary') || lower.includes('remind') || lower.includes('execute') || lower.includes('all')) {
    agent = 'execution';
    content = getRandomResponse(executionResponses);
  } else {
    agent = 'planner';
    // getPlannerResponses() calls new Date() — safe here because
    // getAgentResponse is only ever called inside handleSend (client event handler).
    content = getRandomResponse(getPlannerResponses());
  }

  return {
    id: ts.toString(),
    agent,
    content,
    // Format the timestamp from the stable ts value the caller already captured.
    timestamp: new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    type: 'text',
  };
}

export function getRecommendedProducts() {
  const picks = [0, 5, 3, 9, 11, 7]; 
  return picks.map(i => products[i % products.length]);
}

export function getSuggestionChips(): string[] {
  return [
    "Where is my order?",
    "How to return an item?",
    "What are the delivery charges?",
    "Missing an item in my order?",
    "Can I cancel my order?",
    "Is everything fresh?",
    "💰 How's my budget looking?",
    "📋 Plan my meals",
  ];
}
