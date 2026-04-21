import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DataCaptureScreenProps {
  onNext: (data: { email: string }) => void | Promise<void>;
  initialEmail?: string;
  isLoading?: boolean;
  accessError?: string | null;
  courseUrl?: string;
}

const DataCaptureScreen = ({
  onNext,
  initialEmail,
  isLoading = false,
  accessError,
  courseUrl,
}: DataCaptureScreenProps) => {
  const [email, setEmail] = useState(initialEmail || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Por favor, informe o e-mail da compra.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    void onNext({ email: email.trim() });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Validar Meu Acesso
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Esta ferramenta está disponível apenas para alunos com compra confirmada. Informe o e-mail usado na Kiwify para liberar o diagnóstico.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {accessError && (
              <div className="rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive">
                {accessError}
              </div>
            )}

            {courseUrl && (
              <div className="rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                Ainda não comprou ou usou outro e-mail? Use o botão abaixo para acessar a página do curso.
                <div className="mt-3">
                  <Button type="button" variant="outline" onClick={() => window.open(courseUrl, "_blank", "noopener,noreferrer")}>
                    Ir para a página do curso
                  </Button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full text-lg py-6 h-auto font-semibold"
            >
              {isLoading ? "Validando acesso..." : "Validar e continuar"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataCaptureScreen;
