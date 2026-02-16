import { Button } from "@/components/ui/button";
import { ProfileResult } from "@/data/questions";
import { CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";

interface ResultScreenProps {
  profile: ProfileResult;
  userName: string;
  onRestart?: () => void;
}

const ResultScreen = ({ profile, userName, onRestart }: ResultScreenProps) => {
  return (
    <div className="min-h-screen bg-background p-4 py-12">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">{profile.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            SEU RAIO-X FINANCEIRO ESTÁ PRONTO! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">Olá, {userName}!</p>
          <p className="text-base text-muted-foreground mt-2">
            Obrigado por compartilhar suas informações. Confira abaixo seu diagnóstico personalizado.
          </p>
        </div>

        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart || (() => {
              localStorage.removeItem("financial-diagnosis");
              window.location.href = '/';
            })}
          >
            Reiniciar
          </Button>
        </div>

        {/* SEÇÃO 1: SEU DIAGNÓSTICO */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border mb-8">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Perfil: {profile.title}
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {profile.diagnosis}
              </p>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-1">📊 Sua Pontuação:</h3>
              <p className="text-2xl font-bold text-primary">{profile.score}</p>
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: PRÓXIMOS PASSOS RECOMENDADOS */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            💡 Próximos Passos Recomendados
          </h2>

          <div className="space-y-4">
            {profile.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5 text-secondary" />
                <p className="text-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO 3: MENSAGEM DE INCENTIVO */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl p-8 text-white">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="h-8 w-8" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Continue sua jornada financeira!
            </h2>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-lg leading-relaxed">
              Você deu o primeiro passo importante ao fazer este diagnóstico.
              Agora é hora de colocar em prática os próximos passos recomendados.
            </p>

            {/* CTA INTEGRADO */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                  Sua clareza começa agora.
                </h3>
                <div className="space-y-4 mb-6">
                  <p className="text-base opacity-95 leading-relaxed">
                    Você deu um passo importante ao concluir este diagnóstico.
                  </p>
                  <p className="text-base opacity-95 leading-relaxed">
                    Mas clareza sem direção vira intenção esquecida.
                  </p>
                  <p className="text-base opacity-95 leading-relaxed">
                    Se você quer organizar sua vida financeira com método, consciência e estrutura, o próximo passo é simples:
                  </p>
                  <p className="text-base opacity-95 leading-relaxed">
                    👉 Entrar para a lista da <strong>Mentoria Bússola Financeira</strong>.
                  </p>
                  <p className="text-base opacity-95 leading-relaxed">
                    Lá, eu acompanho pessoalmente famílias que querem sair do caos financeiro e construir prosperidade com consciência.
                  </p>
                  <p className="text-base opacity-95 leading-relaxed">
                    Sem promessas fáceis.<br />
                    Sem atalhos.<br />
                    Com direção.
                  </p>
                </div>
                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform transition-all hover:scale-105 mb-3 w-full md:w-auto"
                    onClick={() => window.open('https://forms.gle/PZ5hNUQPTcfKN1JN6', '_blank')}
                  >
                    Quero ser avisado sobre a próxima turma
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-6 mt-6">
                <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                <p className="text-base italic">
                  "A educação financeira é a chave para transformar sua relação com o dinheiro
                  e construir um futuro mais próspero e tranquilo."
                </p>
              </div>

              <p className="text-sm opacity-90 mt-6">
                Suas respostas foram salvas e nos ajudarão a criar conteúdos mais relevantes para você.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Seus dados estão 100% seguros. Não compartilhamos suas informações com terceiros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
