import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DataCaptureScreenProps {
  onNext: (data: { name: string; email: string }) => void;
  initialData?: { name: string; email: string };
}

const DataCaptureScreen = ({ onNext, initialData }: DataCaptureScreenProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    onNext({ name, email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Antes de Começar...
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Vamos criar seu perfil personalizado! Precisamos de apenas 2 informações:
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
              <Label htmlFor="email" className="text-base">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-12 text-lg"
              />
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
