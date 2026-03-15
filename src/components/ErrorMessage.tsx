import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3"
    >
      <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
      <p className="text-sm text-destructive">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage;
