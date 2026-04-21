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
    <div className="min-h-screen bg-background p-4 py-12">
      <div className="relative max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">{profile.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            SEU RAIO-X FINANCEIRO ESTÁ PRONTO! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">{greeting}</p>
          <p className="text-base text-muted-foreground mt-2">
            Confira abaixo seu diagnóstico, o ponto de travamento e o próximo movimento prático.
          </p>
        </div>

        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart || (() => {
              window.location.href = '/';
            })}
          >
            Reiniciar
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">
                    Perfil identificado
                  </p>
                  <h2 className="text-3xl font-bold text-primary mt-2">
                    {profile.title}
                  </h2>
                </div>
                <div className="bg-primary/10 px-4 py-3 rounded-xl border border-primary/20 min-w-44">
                  <h3 className="font-semibold mb-1">Pontuação</h3>
                  <p className="text-xl font-bold text-primary">{profile.score}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-5 md:col-span-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Diagnóstico
                  </p>
                  <p className="text-lg leading-relaxed text-foreground">{profile.diagnosis}</p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-amber-800 mb-2">
                    Erro principal
                  </p>
                  <p className="leading-relaxed text-amber-950">{profile.mainIssue}</p>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 md:col-span-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-rose-700 mb-2">
                    Verdade direta
                  </p>
                  <p className="leading-relaxed text-rose-950">{profile.hardTruth}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Plano de Ação para as Próximas 24h</h2>
              </div>

              <div className="space-y-4">
                {profile.actionPlan.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5 text-secondary" />
                    <p className="text-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-8 w-8 text-yellow-300" />
                <h2 className="text-2xl font-bold">Prompt pronto para o agente GPT</h2>
              </div>

              <p className="text-white/85 leading-relaxed mb-6">
                Copie este prompt para transformar seu diagnóstico em um plano mais detalhado e acionável.
              </p>

              <div className="rounded-2xl bg-black/20 border border-white/15 p-5">
                <p className="text-sm leading-7 whitespace-pre-wrap">{profile.aiPrompt}</p>
              </div>

              <Button
                size="lg"
                variant="secondary"
                className="mt-6 w-full justify-center gap-2 bg-white text-primary hover:bg-white/90"
                onClick={handleCopyPrompt}
              >
                <Copy className="h-5 w-5" />
                Copiar prompt
              </Button>
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/80 mb-3">
                Próximo passo
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Continue a partir do seu ponto real de diagnóstico.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{profile.nextStep}</p>

              <div className="rounded-2xl bg-muted/50 border border-border p-5 mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Direcionamento</p>
                <p className="text-foreground leading-relaxed">
                  O objetivo agora não é consumir mais informação solta. É aplicar um método que faça sentido para o seu momento financeiro atual.
                </p>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform transition-all hover:scale-105 mb-3 w-full"
                  onClick={handleProfileCta}
                >
                  {profile.cta.label}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Ferramenta prática para sair da análise e entrar em execução.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
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
