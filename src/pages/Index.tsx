import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import DataCaptureScreen from "@/components/DataCaptureScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ResultScreen from "@/components/ResultScreen";
import { questions, calculateProfile, ProfileResult } from "@/data/questions";
import { toast } from "sonner";

type Screen = "welcome" | "data-capture" | "questions" | "result";

interface UserData {
  name: string;
  email: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<ProfileResult | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("financial-diagnosis");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Se o quiz foi completado, não restaura o estado (deixa voltar ao welcome)
        if (data.isCompleted) {
          return;
        }
        if (data.userData) setUserData(data.userData);
        if (data.responses) setResponses(data.responses);
        if (data.currentQuestionIndex) setCurrentQuestionIndex(data.currentQuestionIndex);
        if (data.currentScreen && data.currentScreen !== "result") setCurrentScreen(data.currentScreen);
      } catch (e) {
        console.error("Error loading saved data:", e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (userData || Object.keys(responses).length > 0) {
      localStorage.setItem(
        "financial-diagnosis",
        JSON.stringify({
          userData,
          responses,
          currentQuestionIndex,
          currentScreen,
          isCompleted: currentScreen === "result",
        })
      );
    }
  }, [userData, responses, currentQuestionIndex, currentScreen]);

  const handleStart = () => {
    // Reset all state when starting a new quiz
    setCurrentScreen("data-capture");
    setUserData(null);
    setCurrentQuestionIndex(0);
    setResponses({});
    setProfile(null);
  };

  const handleDataCapture = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("questions");
    toast.success("Perfeito! Vamos às perguntas.");
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
      // Last question - calculate result
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

  const handlePurchase = () => {
    toast.success("Redirecionando para a página de compra...");
    // In production, redirect to payment page
    window.open("https://exemplo.com/checkout", "_blank");
  };

  const handleRestart = () => {
    // Clear localStorage and reset all state
    localStorage.removeItem("financial-diagnosis");
    setCurrentScreen("welcome");
    setUserData(null);
    setCurrentQuestionIndex(0);
    setResponses({});
    setProfile(null);
  };

  const handleSubmitQuiz = async () => {
    if (!userData || !profile) {
      console.error("Dados do usuário ou perfil ausentes.");
      return;
    }

    // Mapeia a resposta de renda para o formato esperado pelo backend
    const incomeMap: Record<string, string> = {
      a: "Até R$ 2.000",
      b: "R$ 2.000 - R$ 5.000",
      c: "R$ 5.000 - R$ 10.000",
      d: "Acima de R$ 10.000",
    };

    const payload = {
      name: userData.name,
      email: userData.email,
      income: incomeMap[responses.income] || "Não informado",
      respostas: responses,
      perfil: profile,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o backend.");
      }

      console.log("Dados enviados com sucesso para o backend.");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  if (currentScreen === "welcome") {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (currentScreen === "data-capture") {
    return (
      <DataCaptureScreen
        onNext={handleDataCapture}
        initialData={userData || undefined}
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
    handleSubmitQuiz(); // Envia os dados ao backend ao exibir a tela de resultado
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
