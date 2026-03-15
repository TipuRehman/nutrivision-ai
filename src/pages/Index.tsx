import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadZone from "@/components/UploadZone";
import AnalysisLoader from "@/components/AnalysisLoader";
import NutritionGrid from "@/components/NutritionGrid";
import CoachAdvice from "@/components/CoachAdvice";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import type { NutritionData } from "@/types/nutrition";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((f: File, url: string) => {
    setFile(f);
    setPreview(url);
    setResult(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }, []);

  const analyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data, error: fnError } = await supabase.functions.invoke("analyze-food", {
        body: { image: base64, mimeType: file.type },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setResult(data as NutritionData);
    } catch (err: any) {
      const msg = err?.message || "Failed to analyze image. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto max-w-xl px-4 py-8 md:py-12 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Analyze Your Meal
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload a food photo and get an instant nutritional breakdown.
            </p>
          </div>

          <UploadZone
            onImageSelect={handleImageSelect}
            imagePreview={preview}
            onClear={handleClear}
            isAnalyzing={isAnalyzing}
          />

          {preview && !isAnalyzing && !result && (
            <Button onClick={analyze} className="w-full gap-2" size="lg">
              <Sparkles className="h-4 w-4" />
              Analyze
            </Button>
          )}

          {isAnalyzing && <AnalysisLoader />}

          {error && <ErrorMessage message={error} />}

          {result && (
            <div className="space-y-5">
              <NutritionGrid data={result} />
              <CoachAdvice advice={result.advice} foodName={result.foodName} />
              <Button variant="outline" onClick={handleClear} className="w-full">
                Analyze Another Meal
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
