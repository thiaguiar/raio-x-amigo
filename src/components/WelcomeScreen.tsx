import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary via-accent to-secondary">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="text-8xl mb-6">💙</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Descubra Sua Saúde Financeira em 5 Minutos
        </h1>
        
        <p className="text-xl text-white/90 leading-relaxed">
          Olá! Eu sou seu assistente para dar uma espiada nas suas finanças.
        </p>
        
        <p className="text-2xl font-semibold text-white mb-6">
          Vamos juntos criar seu <span className="bg-white/20 px-3 py-1 rounded-lg">Raio-X Financeiro</span> personalizado? É:
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-white text-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Rápido (apenas 6 perguntas)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>100% Confidencial</span>
          </div>
        </div>
        
        <div className="pt-8">
          <Button
            size="lg"
            onClick={onStart}
            className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-6 h-auto font-semibold shadow-2xl hover:scale-105 transition-transform"
          >
            Começar Meu Raio-X
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
