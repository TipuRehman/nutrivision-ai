import { Salad } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Salad className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            AI Nutrition Coach
          </span>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">
          Analyze your meals instantly
        </p>
      </div>
    </header>
  );
};

export default Header;
