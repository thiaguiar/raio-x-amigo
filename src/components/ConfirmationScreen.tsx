import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ConfirmationScreenProps {
  email: string;
  onClose: () => void;
}

const ConfirmationScreen = ({ email, onClose }: ConfirmationScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border text-center">
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-10 w-10 text-secondary" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">
            📧 Confirme Seu E-mail para Receber o Relatório Completo
          </h2>
          
          <p className="text-lg text-muted-foreground mb-4">
            Seu Raio-X Financeiro detalhado foi enviado para:
          </p>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-xl font-semibold text-primary">{email}</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-6 mb-8 border border-border">
            <p className="text-base text-foreground mb-4">
              <strong>Verifique sua caixa de entrada</strong> em até 5 minutos.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Dica Extra:</strong> Enviamos também um guia com "3 Primeiros Passos" baseado no seu perfil.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              size="lg"
              onClick={onClose}
              className="w-full text-lg py-6 h-auto font-semibold"
            >
              Entendido! ✓
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Não recebeu? Verifique sua pasta de spam ou{" "}
              <button className="text-primary underline hover:text-primary/80">
                reenvie o email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
