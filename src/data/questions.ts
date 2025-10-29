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
  nextSteps: string[];
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
      diagnosis: "Parabéns! Você está no comando do seu barco e navegando em águas tranquilas. Sua consciência financeira é sua maior aliada. O desafio agora é transformar essa estabilidade em crescimento para alcançar seus objetivos mais ousados.",
      score: `${totalScore}/29 (Zona Verde)`,
      nextSteps: [
        "Automatize Seus Investimentos: Configure uma transferência automática para sua corretora no mesmo dia que seu salário cair. Assim, você investe sem nem perceber.",
        "Diversifique um Degrau: Pesquise UM novo tipo de investimento (ex: Tesouro IPCA, FIIs) para dar o próximo passo na sua jornada de investidor."
      ],
    };
  } else if (totalScore <= 14) {
    return {
      name: "sonhador",
      emoji: "🌱",
      title: "Sonhador Organizado",
      diagnosis: "Você tem consciência financeira e está dando passos importantes! Com um pouco mais de estrutura e organização, você pode transformar completamente sua relação com o dinheiro.",
      score: `${totalScore}/29 (Zona Amarela-Verde)`,
      nextSteps: [
        "Crie um \"Pote dos Sonhos\": Separe uma quantia simbólica (mesmo que R$ 50) todo mês em uma conta/carteira separada, dedicada EXCLUSIVAMENTE ao seu objetivo principal.",
        "Revise Assinaturas: Cancele pelo menos UMA assinatura ou serviço recorrente que você não usa tanto assim. Redirecione esse valor para o seu \"Pote dos Sonhos\"."
      ],
    };
  } else if (totalScore <= 19) {
    return {
      name: "buscador",
      emoji: "🎯",
      title: "Buscador de Alívio",
      diagnosis: "Você está fazendo o melhor que pode com o que tem. Reconhecer que precisa de ajuda já é um passo gigante! Com as estratégias certas, você pode recuperar o controle e ter mais tranquilidade.",
      score: `${totalScore}/29 (Zona Amarela)`,
      nextSteps: [
        "Respire e Anote: Por uma semana, apenas ANOTE todos os seus gastos, sem julgamento. O simples ato de registrar tira o peso da mente e traz clareza.",
        "A Regra do \"1 Não\": Comprometa-se a recusar UM gasto impulsivo por semana (aquele cafezinho, a compra por impulso). Celebre essa pequena vitória."
      ],
    };
  } else {
    return {
      name: "explorador",
      emoji: "💪",
      title: "Explorador Determinado",
      diagnosis: "Você está passando por um terreno acidentado, mas sua determinação em sair das dívidas é clara e inspiradora! Reconhecer que precisa de uma mudança é o primeiro e mais corajoso passo. A boa notícia é que existe um caminho claro para sair dessa situação.",
      score: `${totalScore}/29 (Alerta Vermelho)`,
      nextSteps: [
        "Faça um Raio-X das Dívidas: Liste TODAS as suas dívidas, com valor, taxa de juros e credor. Só enxergando o monstro de frente você pode combatê-lo.",
        "Pare o Sangramento Imediato: Identifique UM gasto recorrente não essencial que pode ser cortado ou reduzido para liberar dinheiro para abater as dívidas mais caras."
      ],
    };
  }
}
