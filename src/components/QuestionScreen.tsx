import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "./ProgressBar";

export interface QuestionOption {
  value: string;
  label: string;
  emoji: string;
}

interface QuestionScreenProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: QuestionOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

const QuestionScreen = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  canGoBack,
}: QuestionScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-3xl w-full animate-fade-in">
        <ProgressBar current={questionNumber} total={totalQuestions} />
        
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            {question}
          </h2>
          
          <div className="space-y-4 mb-8">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                  selectedValue === option.value
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-lg flex-1">{option.label}</span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedValue === option.value
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedValue === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            {canGoBack && (
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar
              </Button>
            )}
            <Button
              size="lg"
              onClick={onNext}
              disabled={!selectedValue}
              className={`font-semibold ${canGoBack ? 'flex-1' : 'w-full'}`}
            >
              {questionNumber === totalQuestions ? "Ver Meu Resultado" : "Próxima"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
