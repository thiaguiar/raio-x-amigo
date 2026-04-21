import { Button } from "@/components/ui/button";
import { ProfileResult } from "@/data/questions";
import { CheckCircle2, Copy, Lightbulb, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface ResultScreenProps {
  profile: ProfileResult;
  userName?: string;
  onRestart?: () => void;
}

const ResultScreen = ({ profile, userName, onRestart }: ResultScreenProps) => {
  const handleProfileCta = () => {
    if (profile.cta.openInNewTab) {
      window.open(profile.cta.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = profile.cta.href;
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(profile.aiPrompt);
      toast.success("Prompt copiado.");
    } catch (error) {
      console.error("Erro ao copiar o prompt:", error);
      toast.error("Não foi possível copiar o prompt.");
    }
  };

  const greeting = userName ? `Olá, ${userName}!` : "Seu diagnóstico está pronto.";

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-10">
      <div className="relative mx-auto max-w-5xl animate-fade-in">
        <div className="mb-8 flex justify-start sm:absolute sm:left-0 sm:top-0 sm:mb-0">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-full px-4"
            onClick={onRestart || (() => {
              window.location.href = '/';
            })}
          >
            Reiniciar
          </Button>
        </div>

        <div className="mb-10 pt-0 text-center sm:mb-12 sm:pt-10">
          <div className="mb-4 text-5xl sm:text-6xl md:text-7xl">{profile.emoji}</div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            SEU RAIO-X FINANCEIRO ESTÁ PRONTO! 🎉
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">{greeting}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Confira abaixo seu diagnóstico, o ponto de travamento e o próximo movimento prático.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
                    Perfil identificado
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
                    {profile.title}
                  </h2>
                </div>
                <div className="min-w-0 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 sm:min-w-44">
                  <h3 className="font-semibold mb-1">Pontuação</h3>
                  <p className="text-lg font-bold text-primary sm:text-xl">{profile.score}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-4 sm:p-5 md:col-span-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Diagnóstico
                  </p>
                  <p className="text-base leading-relaxed text-foreground sm:text-lg">{profile.diagnosis}</p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-amber-800 mb-2">
                    Erro principal
                  </p>
                  <p className="leading-relaxed text-amber-950">{profile.mainIssue}</p>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 sm:p-5 md:col-span-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-rose-700 mb-2">
                    Verdade direta
                  </p>
                  <p className="leading-relaxed text-rose-950">{profile.hardTruth}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">Plano de Ação para as Próximas 24h</h2>
              </div>

              <div className="space-y-4">
                {profile.actionPlan.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5 text-secondary" />
                    <p className="text-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-5 text-white shadow-2xl sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-7 w-7 text-yellow-300 sm:h-8 sm:w-8" />
                <h2 className="text-xl font-bold sm:text-2xl">Prompt pronto para o agente GPT</h2>
              </div>

              <p className="text-white/85 leading-relaxed mb-6">
                Copie este prompt para transformar seu diagnóstico em um plano mais detalhado e acionável.
              </p>

              <div className="rounded-2xl border border-white/15 bg-black/20 p-4 sm:p-5">
                <p className="max-h-[22rem] overflow-auto text-sm leading-7 whitespace-pre-wrap">{profile.aiPrompt}</p>
              </div>

              <Button
                size="lg"
                variant="secondary"
                className="mt-6 h-auto w-full justify-center gap-2 bg-white px-4 py-3 text-sm text-primary hover:bg-white/90 sm:text-base"
                onClick={handleCopyPrompt}
              >
                <Copy className="h-5 w-5" />
                Copiar prompt
              </Button>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80 mb-3">
                Próximo passo
              </p>
              <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                Continue a partir do seu ponto real de diagnóstico.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{profile.nextStep}</p>

              <div className="mb-6 rounded-2xl border border-border bg-muted/50 p-4 sm:p-5">
                <p className="text-sm font-medium text-muted-foreground mb-2">Direcionamento</p>
                <p className="text-foreground leading-relaxed">
                  O objetivo agora não é consumir mais informação solta. É aplicar um método que faça sentido para o seu momento financeiro atual.
                </p>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="mb-3 h-auto w-full rounded-xl bg-yellow-500 px-6 py-4 text-base font-bold text-black shadow-lg transition-all hover:scale-[1.01] hover:bg-yellow-400 sm:text-lg"
                  onClick={handleProfileCta}
                >
                  {profile.cta.label}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Ferramenta prática para sair da análise e entrar em execução.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Leitura estratégica</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                "Clareza sem execução não muda resultado. O diagnóstico mostra o ponto onde você está. O próximo passo define para onde você vai."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
