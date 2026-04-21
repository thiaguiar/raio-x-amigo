import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import DataCaptureScreen from "@/components/DataCaptureScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultScreen from "@/components/ResultScreen";
import { questions, calculateProfile, ProfileResult } from "@/data/questions";
import { toast } from "sonner";

type Screen = "welcome" | "data-capture" | "questions" | "result";
const COURSE_URL = "https://pay.kiwify.com.br/bndI7ab";
const API_BASE_URL = (import.meta.env.VITE_API_URL || "https://raio-x-amigo-production.up.railway.app").replace(/\/$/, "");

interface UserData {
  name?: string;
  email: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [isAccessLoading, setIsAccessLoading] = useState(false);
  const [accessError, setAccessError] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentScreen("data-capture");
    setUserData(null);
    setCurrentQuestionIndex(0);
    setResponses({});
    setProfile(null);
    setAccessError(null);
  };

  const handleDataCapture = async ({ email }: { email: string }) => {
    setIsAccessLoading(true);
    setAccessError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/access/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.hasAccess) {
        const message = data?.error || "Não encontramos uma compra confirmada com este e-mail.";
        setAccessError(message);
        toast.error(message);
        return;
      }

      setUserData({
        email,
        name: data.name || undefined,
      });
      setCurrentScreen("questions");
      toast.success("Acesso liberado. Vamos ao diagnóstico.");
    } catch (error) {
      console.error("Erro ao validar acesso:", error);
      const message = "Não foi possível validar seu acesso agora. Tente novamente em instantes.";
      setAccessError(message);
      toast.error(message);
    } finally {
      setIsAccessLoading(false);
    }
  };

  const handleQuestionSelect = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const getMotivationalMessage = (questionIndex: number): string => {
    const messages = [
      "Ótimo começo! 🎯 Estamos quase lá...",
      "Muito bem! 💪 Continue assim...",
      "Perfeito! 🌟 Você está se conhecendo melhor...",
      "Excelente! 🚀 Já estamos na metade...",
      "Ótima resposta! 🎉 Falta pouco...",
      "Quase lá! 💫 Mais algumas perguntas...",
      "Última pergunta! 🏁 Seu diagnóstico está quase pronto..."
    ];
    return messages[questionIndex] || "Continuando...";
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      const result = calculateProfile(responses);
      setProfile(result);
      setCurrentScreen("result");
      toast.success("🎉 Analisando suas respostas...", {
        description: "Preparando seu diagnóstico personalizado!"
      });
    } else {
      // Show motivational message
      toast.success(getMotivationalMessage(currentQuestionIndex), {
        duration: 2000,
      });
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentScreen("welcome");
    setUserData(null);
    setCurrentQuestionIndex(0);
    setResponses({});
    setProfile(null);
    setAccessError(null);
    setIsAccessLoading(false);
  };

  if (currentScreen === "welcome") {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (currentScreen === "data-capture") {
    return (
      <DataCaptureScreen
        onNext={handleDataCapture}
        initialEmail={userData?.email}
        isLoading={isAccessLoading}
        accessError={accessError}
        courseUrl={COURSE_URL}
      />
    );
  }

  if (currentScreen === "questions") {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <QuestionScreen
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedValue={responses[currentQuestion.id]}
        onSelect={handleQuestionSelect}
        onNext={handleNext}
        onBack={handleBack}
        canGoBack={currentQuestionIndex > 0}
      />
    );
  }

  if (currentScreen === "result" && profile && userData) {
    return (
      <ResultScreen
        profile={profile}
        userName={userData.name}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;
