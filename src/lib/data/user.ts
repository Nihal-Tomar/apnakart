import { MealPlan, UserProfile } from '@/types';

export const userProfile: UserProfile = {
  name: 'Nihal',
  email: 'nihal@apnakart.in',
  avatar: '👤',
  monthlyBudget: 15000,
  preferences: ['Vegetarian', 'Organic', 'Low Sugar'],
};

export const mealPlans: MealPlan[] = [
  { day: 'Monday', breakfast: 'Poha with Chai', lunch: 'Dal Rice & Salad', dinner: 'Paneer Butter Masala + Roti', snacks: 'Samosa + Chai', estimatedCost: 280 },
  { day: 'Tuesday', breakfast: 'Idli Sambar', lunch: 'Rajma Chawal', dinner: 'Aloo Gobi + Roti', snacks: 'Fruit Bowl', estimatedCost: 250 },
  { day: 'Wednesday', breakfast: 'Paratha + Curd', lunch: 'Chole Bhature', dinner: 'Palak Paneer + Rice', snacks: 'Maggi', estimatedCost: 310 },
  { day: 'Thursday', breakfast: 'Upma + Chai', lunch: 'Mix Veg + Roti', dinner: 'Dal Makhani + Naan', snacks: 'Bhel Puri', estimatedCost: 270 },
  { day: 'Friday', breakfast: 'Dosa + Chutney', lunch: 'Biryani', dinner: 'Kadhi Pakora + Rice', snacks: 'Cookies + Milk', estimatedCost: 350 },
  { day: 'Saturday', breakfast: 'Chole Kulche', lunch: 'Thali (Dal, Sabzi, Rice, Roti)', dinner: 'Malai Kofta + Naan', snacks: 'Namkeen + Tea', estimatedCost: 380 },
  { day: 'Sunday', breakfast: 'Puri Sabzi', lunch: 'Special Thali', dinner: 'Shahi Paneer + Butter Naan', snacks: 'Ice Cream', estimatedCost: 420 },
];
