import { Button } from "@/components/ui/button";
import { ProfileResult } from "@/data/questions";
import { CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";

interface ResultScreenProps {
  profile: ProfileResult;
  userName: string;
}

const ResultScreen = ({ profile, userName }: ResultScreenProps) => {
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
            onClick={() => window.location.reload()}
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
            
            <div className="bg-white/10 rounded-lg p-6 mt-6">
              <Lightbulb className="h-12 w-12 mx-auto mb-4" />
              <p className="text-base italic">
                "A educação financeira é a chave para transformar sua relação com o dinheiro 
                e construir um futuro mais próspero e tranquilo."
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm opacity-90">
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
