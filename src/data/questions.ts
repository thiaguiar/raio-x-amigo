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
  {
    id: "income",
    question: "Qual é a sua faixa de renda mensal?",
    options: [
      { value: "a", emoji: "💵", label: "Até R$ 2.000" },
      { value: "b", emoji: "💰", label: "R$ 2.000 - R$ 5.000" },
      { value: "c", emoji: "💳", label: "R$ 5.000 - R$ 10.000" },
      { value: "d", emoji: "💎", label: "Acima de R$ 10.000" },
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
  // income não conta para pontuação, é apenas coleta de dados
};

export interface ProfileResult {
  name: string;
  emoji: string;
  title: string;
  diagnosis: string;
  mainIssue: string;
  hardTruth: string;
  score: string;
  actionPlan: string[];
  aiPrompt: string;
  nextStep: string;
  cta: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  };
}

const courseCta = {
  label: "Quero ter controle total do meu dinheiro",
  href: "https://pay.kiwify.com.br/bndI7ab",
  openInNewTab: true,
};

type ProfileConfig = Omit<ProfileResult, "score"> & {
  minScore: number;
  maxScore: number;
  scoreLabel: string;
};

const profileConfigs: ProfileConfig[] = [
  {
    minScore: 6,
    maxScore: 9,
    scoreLabel: "Nível 5 de 5",
    name: "navegante-em-evolucao",
    emoji: "🧭",
    title: "Navegante em Evolução",
    diagnosis: "Você já está no caminho certo. Existe controle, consciência e início de crescimento.",
    mainIssue: "Você pode estar confortável demais e deixando oportunidades maiores passarem.",
    hardTruth: "Sem estratégia clara de expansão, você cresce mais devagar do que poderia.",
    actionPlan: [
      "Revise seus investimentos atuais.",
      "Identifique uma forma de diversificar.",
      "Defina uma meta de crescimento financeira."
    ],
    aiPrompt: "Eu fiz um diagnóstico financeiro e estou no nível NAVEGANTE EM EVOLUÇÃO. Já tenho controle e estou evoluindo, mas quero acelerar meu crescimento financeiro. Me dê um plano simples e estratégico para as próximas 24 horas e 48 horas para evoluir mais rápido e aproveitar melhor meu dinheiro.",
    nextStep: "Você precisa acelerar sua evolução com estratégia.",
    cta: courseCta,
  },
  {
    minScore: 10,
    maxScore: 13,
    scoreLabel: "Nível 4 de 5",
    name: "organizado-sem-crescimento",
    emoji: "📊",
    title: "Organizado sem Crescimento",
    diagnosis: "Você tem controle financeiro, mas sente que não está avançando como poderia.",
    mainIssue: "Você está organizando bem, mas não está fazendo seu dinheiro trabalhar para você.",
    hardTruth: "Organização sem estratégia de crescimento limita seu potencial financeiro.",
    actionPlan: [
      "Identifique quanto você consegue investir mensalmente.",
      "Escolha um primeiro tipo de investimento simples.",
      "Defina um valor automático para começar."
    ],
    aiPrompt: "Eu fiz um diagnóstico financeiro e estou no nível ORGANIZADO SEM CRESCIMENTO. Eu tenho controle das minhas finanças, mas não estou evoluindo como poderia. Me dê um plano simples e prático para as próximas 24 horas e 48 horas para começar a fazer meu dinheiro crescer. Foque em ações fáceis de executar.",
    nextStep: "Você precisa transformar controle em crescimento consistente.",
    cta: courseCta,
  },
  {
    minScore: 14,
    maxScore: 17,
    scoreLabel: "Nível 3 de 5",
    name: "equilibrista",
    emoji: "⚖️",
    title: "Equilibrista (Empatando)",
    diagnosis: "Você paga suas contas, mas não constrói nada. Sua vida financeira está estável, mas estagnada.",
    mainIssue: "Você não está direcionando seu dinheiro, está apenas deixando ele passar por você.",
    hardTruth: "Sem um plano claro, você pode passar anos trabalhando sem sair do lugar.",
    actionPlan: [
      "Defina um valor fixo para guardar, mesmo que pequeno.",
      "Separe esse valor antes de pagar qualquer coisa.",
      "Crie uma conta separada para esse dinheiro."
    ],
    aiPrompt: "Eu fiz um diagnóstico financeiro e estou no nível EQUILIBRISTA (empatando). Eu consigo pagar contas, mas não consigo evoluir financeiramente. Me dê um plano simples e prático para as próximas 24 horas e 48 horas para começar a sair da estagnação e construir progresso financeiro. Priorize ações pequenas e consistentes.",
    nextStep: "Você precisa estruturar um sistema que transforme esforço em progresso.",
    cta: {
      ...courseCta,
      label: "Quero sair do meu nível atual e organizar minha vida financeira",
    },
  },
  {
    minScore: 18,
    maxScore: 21,
    scoreLabel: "Nível 2 de 5",
    name: "endividado-sob-pressao",
    emoji: "📉",
    title: "Endividado sob Pressão",
    diagnosis: "As dívidas estão ocupando espaço na sua mente e no seu bolso. Existe esforço, mas falta direção clara.",
    mainIssue: "Você está tentando resolver tudo ao mesmo tempo, sem estratégia.",
    hardTruth: "Sem priorização, você continuará pagando e não saindo do lugar.",
    actionPlan: [
      "Liste todas as dívidas com valor e juros.",
      "Identifique a dívida mais crítica.",
      "Direcione todo esforço inicial para ela."
    ],
    aiPrompt: "Eu fiz um diagnóstico financeiro e estou no nível ENDIVIDADO SOB PRESSÃO. Tenho dívidas e estou tentando resolver, mas sem estratégia clara. Me dê um plano objetivo para as próximas 24 horas e 48 horas para começar a sair das dívidas com organização e prioridade. Foque em ações simples e de alto impacto.",
    nextStep: "Você precisa de um plano estruturado para sair das dívidas com clareza.",
    cta: {
      ...courseCta,
      label: "Quero um plano completo para melhorar minha situação",
    },
  },
  {
    minScore: 22,
    maxScore: 29,
    scoreLabel: "Nível 1 de 5",
    name: "sobrevivente-financeiro",
    emoji: "🚨",
    title: "Sobrevivente Financeiro",
    diagnosis: "Você está no modo sobrevivência. Seu dinheiro entra e sai sem controle real, e no fundo você sente que está sempre correndo atrás do prejuízo.",
    mainIssue: "Você não tem um sistema financeiro, você está apenas reagindo às contas.",
    hardTruth: "Enquanto você não assumir controle total do seu fluxo financeiro, qualquer aumento de renda vai continuar sumindo.",
    actionPlan: [
      "Liste todos os seus gastos dos últimos 7 dias.",
      "Identifique um gasto que pode ser cortado imediatamente.",
      "Defina um limite de gasto semanal."
    ],
    aiPrompt: "Eu fiz um diagnóstico financeiro e estou no nível SOBREVIVENTE FINANCEIRO. Minha situação atual é: sem controle claro, dinheiro entrando e saindo, sensação de aperto constante. Me dê um plano simples, direto e prático para as próximas 24 horas e 48 horas para sair do modo sobrevivência e começar a ter controle financeiro. Seja objetivo e priorize ações fáceis de executar.",
    nextStep: "Você precisa de um método simples para sair do modo sobrevivência e construir controle.",
    cta: {
      ...courseCta,
      label: "Quero um plano completo para melhorar minha situação",
    },
  },
];

export function calculateProfile(responses: Record<string, string>): ProfileResult {
  let totalScore = 0;

  Object.entries(responses).forEach(([questionId, answer]) => {
    if (scoreMatrix[questionId] && scoreMatrix[questionId][answer]) {
      totalScore += scoreMatrix[questionId][answer];
    }
  });

  const matchedProfile = profileConfigs.find(
    (profile) => totalScore >= profile.minScore && totalScore <= profile.maxScore
  ) ?? profileConfigs[profileConfigs.length - 1];

  return {
    ...matchedProfile,
    score: `${totalScore}/29 (${matchedProfile.scoreLabel})`,
  }
}
