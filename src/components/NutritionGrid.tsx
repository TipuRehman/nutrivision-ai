import { motion } from "framer-motion";
import { Flame, Beef, Wheat, Droplets } from "lucide-react";
import type { NutritionData } from "@/types/nutrition";

interface NutritionGridProps {
  data: NutritionData;
}

const macros = [
  { key: "calories" as const, label: "Calories", unit: "kcal", icon: Flame, color: "text-orange-500" },
  { key: "protein" as const, label: "Protein", unit: "g", icon: Beef, color: "text-red-500" },
  { key: "carbs" as const, label: "Carbs", unit: "g", icon: Wheat, color: "text-amber-500" },
  { key: "fats" as const, label: "Fats", unit: "g", icon: Droplets, color: "text-sky-500" },
];

const NutritionGrid = ({ data }: NutritionGridProps) => {
  return (
    <div className="space-y-6">
      {/* Primary: Calories */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col items-center gap-1 py-4"
      >
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Estimated Calories
        </span>
        <span className="text-5xl font-bold tabular-nums text-foreground">
          {data.calories}
        </span>
        <span className="text-sm text-muted-foreground">kcal</span>
      </motion.div>

      {/* Macro cards */}
      <div className="grid grid-cols-3 gap-3">
        {macros.slice(1).map((macro, i) => {
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
    </div>
  );
};

export default NutritionGrid;
