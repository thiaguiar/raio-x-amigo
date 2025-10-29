import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DataCaptureScreenProps {
  onNext: (data: { name: string; email: string; income: string }) => void;
  initialData?: { name: string; email: string; income: string };
}

const DataCaptureScreen = ({ onNext, initialData }: DataCaptureScreenProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [income, setIncome] = useState(initialData?.income || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !income) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    onNext({ name, email, income });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Antes de Começar...
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Vamos criar seu perfil personalizado! Precisamos de apenas 3 informações:
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Nome completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="h-12 text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">E-mail (onde enviaremos seu relatório)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-12 text-lg"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-base">Faixa de Renda Familiar Mensal</Label>
              <div className="space-y-3">
                {[
                  { value: "ate2k", label: "Até R$ 2.000" },
                  { value: "2k-5k", label: "R$ 2.001 - R$ 5.000" },
                  { value: "5k-10k", label: "R$ 5.001 - R$ 10.000" },
                  { value: "acima10k", label: "Acima de R$ 10.000" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      income === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="income"
                      value={option.value}
                      checked={income === option.value}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-5 h-5 text-primary"
                    />
                    <span className="text-lg">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Por que pedimos isso?</strong> Para que seu diagnóstico seja o mais preciso possível para sua realidade.
              </p>
            </div>
            
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg py-6 h-auto font-semibold"
            >
              Continuar para as Perguntas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataCaptureScreen;
