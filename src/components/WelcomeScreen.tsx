import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-primary via-accent to-secondary px-3 py-4 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-4xl items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="animate-fade-in w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-4 text-center shadow-2xl backdrop-blur-sm sm:rounded-[2rem] sm:p-8 md:p-12">
          <div className="mb-4 text-5xl sm:text-7xl">💙</div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-sm sm:tracking-[0.28em]">
            Diagnóstico exclusivo para alunos
          </p>

          <h1 className="mx-auto mb-4 max-w-3xl text-[1.9rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Acesse Seu Raio-X Financeiro do Curso
          </h1>

          <p className="mx-auto max-w-2xl text-[0.95rem] leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Uma leitura objetiva do seu momento financeiro, com direcionamento prático para aplicar junto com o seu curso.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white sm:mt-6 sm:text-xl md:text-2xl">
            Este diagnóstico foi liberado para alunos com compra confirmada e entrega:
          </p>

          <div className="mt-6 grid gap-3 text-left text-white sm:mt-8 sm:gap-4 md:grid-cols-3 md:text-center">
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

          <div className="pt-6 sm:pt-10">
            <Button
              size="lg"
              onClick={onStart}
              className="h-auto w-full justify-center bg-white px-5 py-4 text-base font-semibold text-primary shadow-2xl transition-transform hover:scale-[1.01] hover:bg-white/90 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
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
