import { Button } from "@/components/ui/button";
import { ProfileResult } from "@/data/questions";
import { CheckCircle2, Download, Sparkles } from "lucide-react";

interface ResultScreenProps {
  profile: ProfileResult;
  userName: string;
  onDownload: () => void;
  onPurchase: () => void;
}

const ResultScreen = ({ profile, userName, onDownload, onPurchase }: ResultScreenProps) => {
  return (
    <div className="min-h-screen bg-background p-4 py-12">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">{profile.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            SEU RAIO-X FINANCEIRO ESTÁ PRONTO! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">Olá, {userName}!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Diagnosis */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Perfil: {profile.title}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    Diagnóstico:
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    "{profile.diagnosis}"
                  </p>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold mb-1">📊 Sua Pontuação:</h3>
                  <p className="text-2xl font-bold text-primary">{profile.score}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    💡 Sua Maior Oportunidade:
                  </h3>
                  <p className="text-muted-foreground">
                    {profile.opportunity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Offer */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl p-8 text-white">
              <div className="bg-white/20 rounded-lg px-4 py-2 inline-block mb-4">
                <p className="font-semibold">🚀 PRÓXIMO PASSO RECOMENDADO</p>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                {profile.productName}
              </h2>
              
              <div className="space-y-3 mb-6">
                {profile.productBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
                <p className="text-sm mb-2">🎁 OFERTA ESPECIAL:</p>
                <div className="flex items-center gap-4">
                  <span className="text-xl line-through opacity-75">
                    {profile.originalPrice}
                  </span>
                  <span className="text-4xl font-bold">
                    {profile.currentPrice}
                  </span>
                </div>
                <p className="text-sm mt-2 opacity-90">(após o diagnóstico)</p>
              </div>

              <Button
                size="lg"
                onClick={onPurchase}
                className="w-full bg-white text-primary hover:bg-white/90 text-xl py-6 h-auto font-bold mb-4 shadow-xl hover:scale-105 transition-transform"
              >
                Quero Este Produto Agora! 🎯
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={onDownload}
                className="w-full bg-white/10 text-white border-2 border-white hover:bg-white/20 text-lg py-5 h-auto"
              >
                <Download className="mr-2 h-5 w-5" />
                Apenas Baixar Meu Relatório Gratuito
              </Button>
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
