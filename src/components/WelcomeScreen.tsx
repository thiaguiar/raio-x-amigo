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
          Acesse Seu Raio-X Financeiro do Curso
        </h1>

        <p className="text-xl text-white/90 leading-relaxed">
          Uma leitura objetiva do seu momento financeiro, com direcionamento prático para aplicar junto com o seu curso.
        </p>

        <p className="text-2xl font-semibold text-white mb-6">
          Este diagnóstico foi liberado para alunos com compra confirmada e entrega:
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-white text-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Diagnóstico em poucos minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Plano de ação imediato</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Prompt pronto para usar com IA</span>
          </div>
        </div>

        <div className="pt-8">
          <Button
            size="lg"
            onClick={onStart}
            className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-6 h-auto font-semibold shadow-2xl hover:scale-105 transition-transform"
          >
            Validar Meu Acesso
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
