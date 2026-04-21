import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8 md:p-12 animate-fade-in">
          <div className="mb-5 text-6xl sm:text-7xl">💙</div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
            Diagnóstico exclusivo para alunos
          </p>

          <h1 className="mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Acesse Seu Raio-X Financeiro do Curso
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Uma leitura objetiva do seu momento financeiro, com direcionamento prático para aplicar junto com o seu curso.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-white sm:text-xl md:text-2xl">
            Este diagnóstico foi liberado para alunos com compra confirmada e entrega:
          </p>

          <div className="mt-8 grid gap-3 text-left text-white sm:gap-4 md:grid-cols-3 md:text-center">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5">
              <div className="mb-2 text-2xl sm:text-3xl">✓</div>
              <p className="text-sm font-medium leading-relaxed sm:text-base">Diagnóstico em poucos minutos</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5">
              <div className="mb-2 text-2xl sm:text-3xl">✓</div>
              <p className="text-sm font-medium leading-relaxed sm:text-base">Plano de ação imediato</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5">
              <div className="mb-2 text-2xl sm:text-3xl">✓</div>
              <p className="text-sm font-medium leading-relaxed sm:text-base">Prompt pronto para usar com IA</p>
            </div>
          </div>

          <div className="pt-8 sm:pt-10">
            <Button
              size="lg"
              onClick={onStart}
              className="h-auto w-full justify-center bg-white px-6 py-4 text-base font-semibold text-primary shadow-2xl transition-transform hover:scale-[1.01] hover:bg-white/90 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
            >
              Validar Meu Acesso
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
