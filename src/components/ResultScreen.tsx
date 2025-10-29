import { Button } from "@/components/ui/button";
import { ProfileResult } from "@/data/questions";
import { CheckCircle2 } from "lucide-react";

interface ResultScreenProps {
  profile: ProfileResult;
  userName: string;
  onPurchase: () => void;
}

const ResultScreen = ({ profile, userName, onPurchase }: ResultScreenProps) => {
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

        {/* SEÇÃO 3: QUER LEVAR ISSO A SÉRIO? */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl p-8 text-white">
          <div className="bg-white/20 rounded-lg px-4 py-2 inline-block mb-4">
            <p className="font-semibold">🚀 RELATÓRIO COMPLETO RAIO-X + PLANO DE AÇÃO</p>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Entenda TUDO e saiba exatamente O QUE FAZER pelos próximos meses.
          </h2>
          
          <p className="text-xl font-semibold mb-6">Por apenas R$ 17,90, você recebe:</p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">📊 Análise Detalhada:</span>
                <span className="ml-1">Uma página para cada uma das suas respostas, explicando o que cada uma revela.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">📈 Comparativo Nacional:</span>
                <span className="ml-1">Veja como sua situação se compara com a média dos brasileiros.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">🧭 Plano de Ação "O Que Fazer":</span>
                <span className="ml-1">Um guia estruturado com os passos prioritários para as próximas semanas, baseado no seu perfil exclusivo.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">💡 Conclusão Personalizada com IA:</span>
                <span className="ml-1">Um resumo final único, gerado para motivar e direcionar você especificamente.</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onPurchase}
            className="w-full bg-white text-primary hover:bg-white/90 text-xl py-8 h-auto font-bold mb-4 shadow-xl hover:scale-105 transition-transform"
          >
            Quero o Relatório Completo Agora! 🎯
          </Button>

          <p className="text-center text-sm opacity-90">
            (Processo 100% automático. Receba em segundos.)
          </p>
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
