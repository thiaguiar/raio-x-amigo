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
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl animate-fade-in">
        <ProgressBar current={questionNumber} total={totalQuestions} />

        <div className="rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-8 md:p-12">
          <h2 className="mb-6 text-xl font-bold leading-snug text-foreground sm:mb-8 sm:text-2xl md:text-3xl">
            {question}
          </h2>

          <div className="mb-8 space-y-3 sm:space-y-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all hover:scale-[1.01] sm:p-5 ${selectedValue === option.value
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                  }`}
              >
                <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                  <span className="pt-0.5 text-2xl sm:text-3xl">{option.emoji}</span>
                  <span className="flex-1 text-base leading-relaxed sm:text-lg">{option.label}</span>
                  <div
                    className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 transition-all sm:mt-0 sm:h-6 sm:w-6 ${selectedValue === option.value
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

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
            {canGoBack && (
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                className="h-12 flex-1"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar
              </Button>
            )}
            <Button
              size="lg"
              onClick={onNext}
              disabled={!selectedValue}
              className={`h-12 font-semibold ${canGoBack ? 'flex-1' : 'w-full'}`}
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
