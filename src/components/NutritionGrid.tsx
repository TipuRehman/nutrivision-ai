import { motion } from "framer-motion";
import { Flame, Beef, Wheat, Droplets, Leaf, Dumbbell, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import type { NutritionData } from "@/types/nutrition";

interface NutritionGridProps {
  data: NutritionData;
}

const macros = [
  { key: "protein" as const, label: "Protein", unit: "g", icon: Beef, color: "text-red-500" },
  { key: "carbs" as const, label: "Carbs", unit: "g", icon: Wheat, color: "text-amber-500" },
  { key: "fats" as const, label: "Fats", unit: "g", icon: Droplets, color: "text-sky-500" },
];

const extras = [
  { key: "iron" as const, label: "Iron", unit: "mg", icon: Dumbbell, color: "text-rose-500" },
  { key: "fiber" as const, label: "Fiber", unit: "g", icon: Leaf, color: "text-emerald-500" },
];

const ratingConfig = {
  healthy: { icon: ShieldCheck, label: "Healthy", className: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  moderate: { icon: Shield, label: "Moderate", className: "text-amber-600 bg-amber-50 border-amber-200" },
  unhealthy: { icon: ShieldAlert, label: "Unhealthy", className: "text-red-600 bg-red-50 border-red-200" },
};

const NutritionGrid = ({ data }: NutritionGridProps) => {
  const rating = ratingConfig[data.healthRating] || ratingConfig.moderate;
  const RatingIcon = rating.icon;

  return (
    <div className="space-y-4">
      {/* Calories + Health Rating row */}
      <div className="flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col items-center gap-1 py-3 flex-1"
        >
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Estimated Calories
          </span>
          <span className="text-5xl font-bold tabular-nums text-foreground">
            {data.calories}
          </span>
          <span className="text-xs text-muted-foreground">kcal</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`flex flex-col items-center gap-1.5 rounded-md border px-5 py-3 ${rating.className}`}
        >
          <RatingIcon className="h-5 w-5" />
          <span className="text-sm font-semibold">{rating.label}</span>
        </motion.div>
      </div>

      {/* Macro cards */}
      <div className="grid grid-cols-3 gap-3">
        {macros.map((macro, i) => {
          const Icon = macro.icon;
          return (
            <motion.div
              key={macro.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * (i + 1), type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col items-center gap-2 rounded-md bg-secondary p-4 shadow-card"
            >
              <Icon className={`h-5 w-5 ${macro.color}`} />
              <span className="text-2xl font-semibold tabular-nums text-foreground">
                {data[macro.key]}
              </span>
              <span className="text-xs text-muted-foreground">
                {macro.label} ({macro.unit})
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Iron & Fiber row */}
      <div className="grid grid-cols-2 gap-3">
        {extras.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col items-center gap-2 rounded-md bg-secondary p-3 shadow-card"
            >
              <Icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-xl font-semibold tabular-nums text-foreground">
                {data[item.key]}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.label} ({item.unit})
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Portion size */}
      {data.portionSize && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="rounded-md bg-secondary px-4 py-3 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Estimated Portion
          </span>
          <p className="mt-0.5 text-sm font-medium text-foreground">{data.portionSize}</p>
        </motion.div>
      )}

      {/* Vitamins */}
      {data.vitamins && data.vitamins.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-md bg-secondary px-4 py-3"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Key Vitamins & Minerals
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.vitamins.map((v) => (
              <span
                key={v}
                className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
              >
                {v}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Explanation */}
      {data.explanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="rounded-md bg-secondary/70 px-4 py-3"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Food Quality
          </span>
          <p className="mt-1 text-sm text-foreground leading-relaxed">{data.explanation}</p>
        </motion.div>
      )}
    </div>
  );
};

export default NutritionGrid;
