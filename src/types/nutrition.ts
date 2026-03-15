export interface NutritionData {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  iron: number;
  fiber: number;
  portionSize: string;
  vitamins: string[];
  healthRating: "healthy" | "moderate" | "unhealthy";
  explanation: string;
  advice: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
