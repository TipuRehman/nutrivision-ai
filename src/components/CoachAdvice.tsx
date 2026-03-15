import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface CoachAdviceProps {
  advice: string;
  foodName: string;
}

const CoachAdvice = ({ advice, foodName }: CoachAdviceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 30 }}
      className="rounded-lg bg-coach-surface p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">
          Coach's Notes — {foodName}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
        {advice}
      </p>
    </motion.div>
  );
};

export default CoachAdvice;
