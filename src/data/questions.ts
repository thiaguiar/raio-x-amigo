import { QuestionOption } from "@/components/QuestionScreen";

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: "q1",
    question: "Como você descreve sua relação com o dinheiro no momento?",
    options: [
      { value: "a", emoji: "😊", label: "Tudo sob controle, consigo guardar um dinheiro." },
      { value: "b", emoji: "🙂", label: "Consigo pagar as contas, mas sobra pouco no final do mês." },
      { value: "c", emoji: "😐", label: "Estou 'empatando', sem sobra nem dívida." },
      { value: "d", emoji: "😟", label: "Estou me virando, mas as dívidas me preocupam." },
      { value: "e", emoji: "😰", label: "Passo aperto todo mês, é uma grande fonte de estresse." },
    ],
  },
  {
    id: "q2",
    question: "No final do mês, o que acontece com sua renda?",
    options: [
      { value: "a", emoji: "💰", label: "Sobra dinheiro e eu consigo investir." },
      { value: "b", emoji: "💵", label: "Sobra um pouquinho, que fica na conta para emergências." },
      { value: "c", emoji: "⚖️", label: "Zero a zero. Tudo que entra, sai." },
      { value: "d", emoji: "💳", label: "Gasto um pouco mais do que ganho, usando crédito." },
      { value: "e", emoji: "😓", label: "Minhas dívidas são maiores que minha renda." },
    ],
  },
  {
    id: "q3",
    question: "Você tem dívidas no momento?",
    options: [
      { value: "a", emoji: "✅", label: "Não tenho nenhuma dívida." },
      { value: "b", emoji: "🏠", label: "Sim, mas apenas financiamento de casa/carro." },
      { value: "c", emoji: "💳", label: "Sim, algumas no cartão de crédito, mas consigo pagar." },
      { value: "d", emoji: "📊", label: "Sim, várias dívidas e estou negociando." },
      { value: "e", emoji: "😰", label: "Sim, muitas dívidas e não sei por onde começar." },
    ],
  },
  {
    id: "q4",
    question: "Como você se sente em relação ao seu futuro financeiro?",
    options: [
      { value: "a", emoji: "🌟", label: "Confiante! Tenho planos e estou seguindo eles." },
      { value: "b", emoji: "🤔", label: "Com esperança, mas preciso de mais direção." },
      { value: "c", emoji: "😕", label: "Preocupado, não sei se vou conseguir melhorar." },
      { value: "d", emoji: "😰", label: "Muito ansioso, sinto que não há saída." },
    ],
  },
  {
    id: "q5",
    question: "Qual é o seu maior desafio financeiro hoje?",
    options: [
      { value: "a", emoji: "📈", label: "Fazer meu dinheiro render mais e investir melhor." },
      { value: "b", emoji: "📝", label: "Organizar minhas finanças e criar um planejamento." },
      { value: "c", emoji: "💸", label: "Conseguir guardar dinheiro no final do mês." },
      { value: "d", emoji: "🎯", label: "Sair das dívidas de uma vez por todas." },
    ],
  },
  {
    id: "q6",
    question: "O que você mais deseja alcançar financeiramente?",
    options: [
      { value: "a", emoji: "🏖️", label: "Realizar sonhos (viagens, casa própria, etc)." },
      { value: "b", emoji: "😌", label: "Ter tranquilidade e segurança financeira." },
      { value: "c", emoji: "💪", label: "Eliminar todas as minhas dívidas." },
      { value: "d", emoji: "📊", label: "Entender melhor como o dinheiro funciona." },
    ],
  },
];

export const scoreMatrix: Record<string, Record<string, number>> = {
  q1: { a: 1, b: 2, c: 3, d: 4, e: 5 },
  q2: { a: 1, b: 2, c: 3, d: 4, e: 5 },
  q3: { a: 1, b: 2, c: 3, d: 4, e: 5 },
  q4: { a: 1, b: 2, c: 3, d: 4 },
  q5: { a: 1, b: 2, c: 3, d: 4 },
  q6: { a: 1, b: 2, c: 3, d: 4 },
};

export interface ProfileResult {
  name: string;
  emoji: string;
  title: string;
  diagnosis: string;
  score: string;
  opportunity: string;
  productName: string;
  productBenefits: string[];
  originalPrice: string;
  currentPrice: string;
}

export function calculateProfile(responses: Record<string, string>): ProfileResult {
  let totalScore = 0;
  
  Object.entries(responses).forEach(([questionId, answer]) => {
    if (scoreMatrix[questionId] && scoreMatrix[questionId][answer]) {
      totalScore += scoreMatrix[questionId][answer];
    }
  });

  if (totalScore <= 9) {
    return {
      name: "navegante",
      emoji: "⛵",
      title: "Navegante Confiante",
      diagnosis: "Parabéns! Você já está no caminho certo e demonstra uma ótima gestão financeira. Sua organização é inspiradora, e agora é hora de fazer seu dinheiro trabalhar ainda mais para você!",
      score: `${totalScore}/29 (Zona Verde)`,
      opportunity: "Potencializar seus investimentos e acelerar a conquista dos seus sonhos financeiros.",
      productName: "Guia Completo de Investimentos Inteligentes",
      productBenefits: [
        "Estratégias para multiplicar seu patrimônio",
        "Como escolher os melhores investimentos",
        "Planejamento para realização de sonhos",
        "Planilha de acompanhamento de investimentos",
      ],
      originalPrice: "R$ 147,00",
      currentPrice: "R$ 67,00",
    };
  } else if (totalScore <= 14) {
    return {
      name: "sonhador",
      emoji: "🌱",
      title: "Sonhador Organizado",
      diagnosis: "Você tem consciência financeira e está dando passos importantes! Com um pouco mais de estrutura e organização, você pode transformar completamente sua relação com o dinheiro.",
      score: `${totalScore}/29 (Zona Amarela-Verde)`,
      opportunity: "Implementar um sistema de organização financeira que funcione no piloto automático.",
      productName: "Sistema de Organização Financeira Pessoal",
      productBenefits: [
        "Método completo de organização financeira",
        "Planilha automatizada de controle",
        "Guia para criar reserva de emergência",
        "Acesso a comunidade de apoio",
      ],
      originalPrice: "R$ 97,00",
      currentPrice: "R$ 47,00",
    };
  } else if (totalScore <= 19) {
    return {
      name: "buscador",
      emoji: "🎯",
      title: "Buscador de Alívio",
      diagnosis: "Você está fazendo o melhor que pode com o que tem. Reconhecer que precisa de ajuda já é um passo gigante! Com as estratégias certas, você pode recuperar o controle e ter mais tranquilidade.",
      score: `${totalScore}/29 (Zona Amarela)`,
      opportunity: "Aprender técnicas práticas para reduzir gastos e aumentar sua margem de segurança financeira.",
      productName: "Desafio 30 Dias de Transformação Financeira",
      productBenefits: [
        "Ações diárias práticas e simples",
        "Estratégias para cortar gastos sem sofrer",
        "Como criar uma reserva emergencial rápido",
        "Grupo de apoio e motivação diária",
      ],
      originalPrice: "R$ 67,00",
      currentPrice: "R$ 27,00",
    };
  } else {
    return {
      name: "explorador",
      emoji: "💪",
      title: "Explorador Determinado",
      diagnosis: "Você está passando por um terreno acidentado, mas sua determinação em sair das dívidas é clara e inspiradora! Reconhecer que precisa de uma mudança é o primeiro e mais corajoso passo.",
      score: `${totalScore}/29 (Alerta Vermelho)`,
      opportunity: "Implementar um método comprovado para eliminar as dívidas de uma vez por todas e recuperar sua paz.",
      productName: "Método AntiDívida - Guia Prático",
      productBenefits: [
        "Plano passo a passo para quitar suas dívidas",
        "Estratégias para negociar com bancos",
        "Planilha de controle exclusiva",
        "Acesso a comunidade de suporte",
      ],
      originalPrice: "R$ 97,00",
      currentPrice: "R$ 47,00",
    };
  }
}
