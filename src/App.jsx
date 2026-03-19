
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Lightbulb,
  Download,
  RotateCcw,
  Check,
  Code2,
  Users,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    text: '팀플이나 과제를 시작할 때 더 먼저 하고 싶은 쪽은?',
    options: [
      { text: '전체 흐름과 순서를 먼저 정리한다', scores: { flow: 2, structure: 1 } },
      { text: '일단 한 부분이라도 시작해보면서 감을 잡는다', scores: { experiment: 2, reaction: 1 } }
    ]
  },
  {
    id: 2,
    text: '무언가를 배우거나 새로 접했을 때 더 끌리는 건?',
    options: [
      { text: '이게 어떤 원리로 돌아가는지 이해하는 것', scores: { structure: 2, trace: 1 } },
      { text: '일단 써보면서 어떤 느낌인지 보는 것', scores: { reaction: 2, connect: 1 } }
    ]
  },
  {
    id: 3,
    text: '결과물을 볼 때 더 먼저 눈에 들어오는 건?',
    options: [
      { text: '전체 구조가 자연스럽게 이어지는지', scores: { flow: 2, refine: 1 } },
      { text: '쓰는 사람이 편하게 느낄지', scores: { connect: 2, reaction: 1 } }
    ]
  },
  {
    id: 4,
    text: '같은 결과를 내더라도 더 만족스러운 쪽은?',
    options: [
      { text: '겉으로 바로 드러나지 않아도 기반이 탄탄한 상태', scores: { stable: 2, structure: 1 } },
      { text: '사람들이 바로 체감할 수 있는 변화가 생긴 상태', scores: { reaction: 2, experiment: 1 } }
    ]
  },
  {
    id: 5,
    text: '문제가 생겼을 때 더 자연스러운 반응은?',
    options: [
      { text: '일단 이것저것 시도해보며 감을 잡는다', scores: { experiment: 2, flow: 1 } },
      { text: '왜 생겼는지 원인부터 좁혀본다', scores: { trace: 2, structure: 1 } }
    ]
  },
  {
    id: 6,
    text: '팀으로 뭔가를 할 때 내가 더 신경 쓰는 건?',
    options: [
      { text: '사람들끼리 정보가 잘 공유되고 있는지', scores: { connect: 2, reaction: 1 } },
      { text: '각자 맡은 일이 정확히 정리되어 있는지', scores: { stable: 2, flow: 1 } }
    ]
  },
  {
    id: 7,
    text: '더 보람차게 느껴지는 일은?',
    options: [
      { text: '복잡했던 게 이해되고 정리됐을 때', scores: { structure: 2, flow: 1 } },
      { text: '어색했던 게 훨씬 자연스러워졌을 때', scores: { refine: 2, stable: 1 } }
    ]
  },
  {
    id: 8,
    text: '예상치 못한 상황이 생기면 더 먼저 하는 쪽은?',
    options: [
      { text: '일단 할 수 있는 방법부터 빠르게 시도해본다', scores: { experiment: 2, connect: 1 } },
      { text: '어디서부터 어긋났는지 차근차근 짚어본다', scores: { trace: 2, refine: 1 } }
    ]
  },
  {
    id: 9,
    text: '반복해서 해야 하는 일이 생기면 더 먼저 드는 생각은?',
    options: [
      { text: '헷갈리지 않게 기준이나 순서를 정리하고 싶다', scores: { structure: 2, stable: 1 } },
      { text: '번거로운 부분을 줄일 방법부터 찾고 싶다', scores: { refine: 2, experiment: 1 } }
    ]
  },
  {
    id: 10,
    text: '팀에서 역할을 맡는다면 더 편한 쪽은?',
    options: [
      { text: '전체 진행이 막히지 않게 정리하는 역할', scores: { flow: 2, stable: 1 } },
      { text: '사람들 사이에서 빠진 정보가 없게 이어주는 역할', scores: { connect: 2, trace: 1 } }
    ]
  },
  {
    id: 11,
    text: '무언가를 잘 만들었다고 느끼는 순간은?',
    options: [
      { text: '겉으로 티는 안 나도 탄탄하게 받쳐준다고 느껴질 때', scores: { stable: 2, refine: 1 } },
      { text: '바로 눈에 보이는 변화나 반응이 생길 때', scores: { reaction: 2, experiment: 1 } }
    ]
  },
  {
    id: 12,
    text: '팀 활동에서 더 끌리는 역할은?',
    options: [
      { text: '숨은 문제나 꼬인 원인을 끝까지 찾아내는 사람', scores: { trace: 2, connect: 1 } },
      { text: '실수나 불안 요소를 꼼꼼하게 줄여주는 사람', scores: { refine: 2, trace: 1 } }
    ]
  }
];

const TYPE_STYLES = {
  flow: {
    emoji: '🎼',
    bgGradient: 'from-blue-100 to-indigo-50',
    color: 'text-blue-600',
    borderColor: 'border-blue-200',
    hex: '#3b82f6'
  },
  structure: {
    emoji: '🔬',
    bgGradient: 'from-indigo-100 to-purple-50',
    color: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    hex: '#6366f1'
  },
  reaction: {
    emoji: '💖',
    bgGradient: 'from-pink-100 to-rose-50',
    color: 'text-pink-600',
    borderColor: 'border-pink-200',
    hex: '#ec4899'
  },
  refine: {
    emoji: '💎',
    bgGradient: 'from-teal-100 to-emerald-50',
    color: 'text-teal-600',
    borderColor: 'border-teal-200',
    hex: '#14b8a6'
  },
  experiment: {
    emoji: '🚀',
    bgGradient: 'from-amber-100 to-orange-50',
    color: 'text-amber-600',
    borderColor: 'border-amber-200',
    hex: '#f59e0b'
  },
  stable: {
    emoji: '🏰',
    bgGradient: 'from-emerald-100 to-teal-50',
    color: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    hex: '#10b981'
  },
  connect: {
    emoji: '🤝',
    bgGradient: 'from-violet-100 to-fuchsia-50',
    color: 'text-violet-600',
    borderColor: 'border-violet-200',
    hex: '#8b5cf6'
  },
  trace: {
    emoji: '🕵️‍♂️',
    bgGradient: 'from-rose-100 to-red-50',
    color: 'text-rose-600',
    borderColor: 'border-rose-200',
    hex: '#f43f5e'
  }
};

const RESULTS_DATA = {
  flow: {
    characterName: '큰 그림을 그리는 마에스트로 개발자',
    oneLiner: '전체가 어떻게 이어지는지 먼저 보는 사람',
    descriptionLong:
      '당신은 무언가를 볼 때 한 부분만 따로 보기보다,\n처음부터 끝까지 전체가 어떻게 이어지는지를 먼저 떠올리는 편일 가능성이 높습니다.\n\n각각의 요소가 괜찮아 보여도 전체적으로 흐름이 어색하면 만족이 잘 안 될 수 있고,\n일의 순서나 맥락이 정리되지 않았을 때 은근히 답답함을 느낄 수도 있습니다.',
    joyAtWork:
      '여러 기능이나 역할이 하나의 흐름으로 정리될 때,\n복잡한 과정이 매끄럽게 이어질 때 즐거움을 느낍니다.',
    strengths: ['전체 맥락 파악', '흐름 정리', '구조화', '큰 그림 보기'],
    frustratingSituations: ['앞뒤 맥락 없이 일이 추가될 때', '임시방편이 반복될 때'],
    recommendedFields: ['백엔드', '인프라', '풀스택'],
    recommendedEnvironments: ['여러 기능이 연결되는 팀', '규모 있는 서비스 회사'],
    studyMate: 'structure',
    projectMate: 'refine'
  },
  structure: {
    characterName: '뼈대를 파헤치는 엑스레이 개발자',
    oneLiner: '겉보다 안의 원리와 구조가 궁금한 사람',
    descriptionLong:
      '당신은 결과만 보는 것보다,\n그 안에서 어떤 원리와 구조로 돌아가는지를 이해하고 싶어하는 편일 가능성이 높습니다.\n\n무언가를 접했을 때 \'왜 이렇게 되는 거지?\'라는 질문이 자연스럽게 떠오를 수 있고,\n규칙이나 체계를 파악하는 데서 재미를 느낄 수 있습니다.',
    joyAtWork:
      '복잡한 시스템의 원리를 이해했을 때,\n얽혀 있는 구조를 논리적으로 정리했을 때 즐거움을 느낍니다.',
    strengths: ['원리 파악', '논리적 사고', '구조 이해', '체계 정리'],
    frustratingSituations: ['이유 없이 감으로 밀어붙이는 상황', '설명 없이 속도만 강조되는 환경'],
    recommendedFields: ['백엔드', 'AI', '데이터분석'],
    recommendedEnvironments: ['기술 깊이가 중요한 조직', '대규모 시스템 팀'],
    studyMate: 'trace',
    projectMate: 'experiment'
  },
  reaction: {
    characterName: '마음을 읽어내는 독심술사 개발자',
    oneLiner: '사람이 어떻게 느끼고 반응하는지를 잘 보는 사람',
    descriptionLong:
      '당신은 무언가를 만들거나 볼 때,\n쓰는 사람이 어떤 느낌을 받을지 자연스럽게 떠올리는 편일 가능성이 높습니다.\n\n결과가 실제로 누군가에게 닿는 순간,\n체감되는 변화가 생기는 순간에 만족감을 느끼기 쉬울 수 있습니다.',
    joyAtWork:
      '내가 한 일이 사용자 경험의 변화로 이어질 때,\n바로 좋아졌다는 피드백이 올 때 즐거움을 느낍니다.',
    strengths: ['사용자 관점', '공감력', '체감 개선', '서비스 감각'],
    frustratingSituations: ['아무도 체감하지 못하는 일만 오래 할 때', '결과가 너무 멀리 있을 때'],
    recommendedFields: ['프론트엔드', '모바일'],
    recommendedEnvironments: ['서비스 회사', '스타트업', '반응이 빠른 팀'],
    studyMate: 'connect',
    projectMate: 'stable'
  },
  refine: {
    characterName: '1픽셀의 장인, 현미경 개발자',
    oneLiner: '작은 어색함을 줄여 완성도를 높이는 사람',
    descriptionLong:
      '당신은 크게 뒤엎기보다,\n이미 있는 것을 더 자연스럽고 정교하게 다듬는 데 강점을 가질 가능성이 높습니다.\n\n작은 차이와 어색함을 잘 보고 그냥 넘기지 않는 편일 수 있으며,\n디테일이 쌓여 결과가 좋아지는 과정에서 만족감을 느낄 수 있습니다.',
    joyAtWork:
      '작은 불편이 사라지고 매끄러워졌을 때,\n남들이 놓친 어색함을 줄여냈을 때 즐거움을 느낍니다.',
    strengths: ['꼼꼼함', '완성도 향상', '품질 개선', '디테일 조정'],
    frustratingSituations: ['대충 돌아가기만 하면 된다는 분위기', '디테일을 무시하는 환경'],
    recommendedFields: ['프론트엔드', '모바일'],
    recommendedEnvironments: ['완성도와 안정성을 중시하는 조직', '대기업'],
    studyMate: 'stable',
    projectMate: 'flow'
  },
  experiment: {
    characterName: '일단 부딪히는 불도저 개발자',
    oneLiner: '직접 해보며 감을 잡는 사람',
    descriptionLong:
      '당신은 완벽히 이해한 뒤 시작하기보다,\n일단 직접 시도해보면서 감을 잡는 쪽이 더 자연스러운 편일 가능성이 높습니다.\n\n새로운 상황에서도 너무 오래 망설이기보다\n\'한 번 해보자\' 쪽으로 마음이 움직일 수 있습니다.',
    joyAtWork:
      '새로운 시도를 빠르게 해볼 수 있을 때,\n직접 부딪혀 배우는 과정에서 즐거움을 느낍니다.',
    strengths: ['실행력', '빠른 적응', '추진력', '실험 정신'],
    frustratingSituations: ['시작 전에 검토만 오래 이어질 때', '지나치게 조심스러운 분위기'],
    recommendedFields: ['게임', '모바일', '프론트엔드'],
    recommendedEnvironments: ['스타트업', '빠른 실험 문화', '신사업 조직'],
    studyMate: 'reaction',
    projectMate: 'structure'
  },
  stable: {
    characterName: '무너지지 않는 철옹성 개발자',
    oneLiner: '흔들리지 않는 기반과 안정감을 만드는 사람',
    descriptionLong:
      '당신은 새롭고 눈에 띄는 변화보다,\n문제가 덜 생기고 예측 가능한 상태를 더 가치 있게 여기는 편일 가능성이 높습니다.\n\n티가 덜 나더라도\n모두가 믿고 쓸 수 있는 바탕을 만드는 데 강점을 가질 수 있습니다.',
    joyAtWork:
      '시스템이 큰 문제 없이 돌아갈 때,\n믿고 맡길 수 있는 탄탄한 상태를 만들었을 때 즐거움을 느낍니다.',
    strengths: ['신뢰성', '안정성', '책임감', '기반 구축'],
    frustratingSituations: ['방향이 자주 바뀌는 환경', '안정성보다 속도만 중시하는 분위기'],
    recommendedFields: ['인프라', '보안', '백엔드'],
    recommendedEnvironments: ['금융권', '대규모 서비스', '안정성이 중요한 조직'],
    studyMate: 'refine',
    projectMate: 'reaction'
  },
  connect: {
    characterName: '모두를 잇는 만능 통역사 개발자',
    oneLiner: '사람과 정보, 역할 사이를 이어주는 사람',
    descriptionLong:
      '당신은 문제 하나만 깊게 파기보다,\n서로 다른 사람과 정보가 잘 맞물리도록 만드는 데 편안함을 느낄 가능성이 높습니다.\n\n팀이 매끄럽게 돌아가는지,\n서로 이해가 어긋나지 않는지에 자연스럽게 관심이 갈 수 있습니다.',
    joyAtWork:
      '서로 다른 역할의 관점을 맞출 때,\n팀의 흐름이 매끄러워질 때 즐거움을 느낍니다.',
    strengths: ['소통', '맥락 전달', '협업 조율', '연결 능력'],
    frustratingSituations: ['협업이 자주 끊기는 환경', '정보가 흩어져 방치되는 분위기'],
    recommendedFields: ['풀스택', '프론트엔드', '백엔드'],
    recommendedEnvironments: ['다양한 직군이 협업하는 팀', '서비스 조직'],
    studyMate: 'flow',
    projectMate: 'trace'
  },
  trace: {
    characterName: '끝까지 쫓는 명탐정 개발자',
    oneLiner: '이상한 지점을 그냥 넘기지 않고 원인을 좇는 사람',
    descriptionLong:
      '당신은 겉으로 보이는 현상보다,\n\'대체 왜 이런 일이 생겼지?\'에 더 끌리는 편일 가능성이 높습니다.\n\n이상한 점이 보이면 그냥 넘기기보다\n원인을 하나씩 좁혀가는 데서 만족감을 느낄 수 있습니다.',
    joyAtWork:
      '이상 현상의 원인을 찾아냈을 때,\n꼬인 문제를 하나씩 풀어냈을 때 즐거움을 느낍니다.',
    strengths: ['원인 분석', '집요함', '디버깅 감각', '문제 해결'],
    frustratingSituations: ['원인을 찾기보다 빨리 덮고 넘어가려는 분위기', '비슷한 문제가 반복되는 환경'],
    recommendedFields: ['데이터분석', '보안', '게임'],
    recommendedEnvironments: ['금융권', '대규모 플랫폼', '복잡한 시스템 환경'],
    studyMate: 'structure',
    projectMate: 'connect'
  }
};

const RESULT_PRIORITY = ['flow', 'structure', 'reaction', 'refine', 'experiment', 'stable', 'connect', 'trace'];
const VALID_STEPS = new Set(['intro', 'test', 'result', 'allTypes']);

const createEmptyAnswers = () => Array.from({ length: QUESTIONS.length }, () => null);

const createDefaultSnapshot = () => ({
  __app: true,
  historyDepth: 0,
  step: 'intro',
  currentQuestionIndex: 0,
  selectedAnswers: createEmptyAnswers(),
  resultType: null,
  viewingDetailType: null
});

const normalizeSnapshot = (snapshot) => {
  const safeSelectedAnswers =
    Array.isArray(snapshot?.selectedAnswers) && snapshot.selectedAnswers.length === QUESTIONS.length
      ? snapshot.selectedAnswers
      : createEmptyAnswers();

  const safeResultType = snapshot?.resultType && RESULTS_DATA[snapshot.resultType] ? snapshot.resultType : null;
  const safeViewingDetailType =
    snapshot?.viewingDetailType && RESULTS_DATA[snapshot.viewingDetailType] ? snapshot.viewingDetailType : null;

  return {
    __app: true,
    historyDepth: typeof snapshot?.historyDepth === 'number' && snapshot.historyDepth >= 0 ? snapshot.historyDepth : 0,
    step: VALID_STEPS.has(snapshot?.step) ? snapshot.step : 'intro',
    currentQuestionIndex: Number.isInteger(snapshot?.currentQuestionIndex)
      ? Math.max(0, Math.min(snapshot.currentQuestionIndex, QUESTIONS.length - 1))
      : 0,
    selectedAnswers: safeSelectedAnswers,
    resultType: safeResultType,
    viewingDetailType: safeViewingDetailType
  };
};

const drawRoundedRect = (ctx, x, y, w, h, r) => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
};

export default function App() {
  const [step, setStepState] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(createEmptyAnswers());
  const [resultType, setResultType] = useState(null);
  const [viewingDetailType, setViewingDetailType] = useState(null);
  const [historyDepth, setHistoryDepth] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  const scrollRef = useRef(null);

  const applySnapshot = useCallback((snapshot, { push = false, replace = false, scroll = true } = {}) => {
    const safeSnapshot = normalizeSnapshot(snapshot);

    setStepState(safeSnapshot.step);
    setCurrentQuestionIndex(safeSnapshot.currentQuestionIndex);
    setSelectedAnswers(safeSnapshot.selectedAnswers);
    setResultType(safeSnapshot.resultType);
    setViewingDetailType(safeSnapshot.viewingDetailType);
    setHistoryDepth(safeSnapshot.historyDepth);

    if (push) {
      window.history.pushState(safeSnapshot, '', '');
    } else if (replace) {
      window.history.replaceState(safeSnapshot, '', '');
    }

    if (scroll) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, []);

  const createSnapshot = useCallback(
    (overrides = {}) =>
      normalizeSnapshot({
        __app: true,
        historyDepth: overrides.historyDepth ?? historyDepth,
        step: overrides.step ?? step,
        currentQuestionIndex: overrides.currentQuestionIndex ?? currentQuestionIndex,
        selectedAnswers: overrides.selectedAnswers ?? selectedAnswers,
        resultType: overrides.resultType ?? resultType,
        viewingDetailType:
          Object.prototype.hasOwnProperty.call(overrides, 'viewingDetailType')
            ? overrides.viewingDetailType
            : viewingDetailType
      }),
    [historyDepth, step, currentQuestionIndex, selectedAnswers, resultType, viewingDetailType]
  );

  useEffect(() => {
    const initialSnapshot = window.history.state?.__app ? normalizeSnapshot(window.history.state) : createDefaultSnapshot();

    applySnapshot(initialSnapshot, { replace: true, scroll: false });

    const handlePopState = (event) => {
      if (event.state?.__app) {
        applySnapshot(event.state, { scroll: true });
        return;
      }

      const fallbackSnapshot = createDefaultSnapshot();
      applySnapshot(fallbackSnapshot, { replace: true, scroll: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [applySnapshot]);

  const safeGoBack = useCallback(
    (fallbackSnapshot) => {
      if (historyDepth > 0) {
        window.history.back();
        return;
      }

      applySnapshot(fallbackSnapshot, { replace: true });
    },
    [historyDepth, applySnapshot]
  );

  const navigateTo = useCallback(
    (newStep, newDetailType = null) => {
      const snapshot = createSnapshot({
        step: newStep,
        viewingDetailType: newDetailType,
        historyDepth: historyDepth + 1
      });

      applySnapshot(snapshot, { push: true });
    },
    [createSnapshot, historyDepth, applySnapshot]
  );

  const startTest = useCallback(() => {
    const snapshot = createSnapshot({
      step: 'test',
      currentQuestionIndex: 0,
      selectedAnswers: createEmptyAnswers(),
      resultType: null,
      viewingDetailType: null,
      historyDepth: historyDepth + 1
    });

    applySnapshot(snapshot, { push: true });
  }, [createSnapshot, historyDepth, applySnapshot]);

  const handleOptionSelect = useCallback(
    (optionScores, optionIndex) => {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestionIndex] = { scores: optionScores, selectedIndex: optionIndex };

      const snapshot = createSnapshot({
        selectedAnswers: newAnswers
      });

      applySnapshot(snapshot, { replace: true, scroll: false });
    },
    [selectedAnswers, currentQuestionIndex, createSnapshot, applySnapshot]
  );

  const getCalculatedResultType = useCallback((answers) => {
    if (!Array.isArray(answers) || answers.some((answer) => !answer?.scores)) {
      return null;
    }

    const finalScores = {
      flow: 0,
      structure: 0,
      reaction: 0,
      refine: 0,
      experiment: 0,
      stable: 0,
      connect: 0,
      trace: 0
    };

    const primaryCounts = {
      flow: 0,
      structure: 0,
      reaction: 0,
      refine: 0,
      experiment: 0,
      stable: 0,
      connect: 0,
      trace: 0
    };

    answers.forEach((answer) => {
      Object.entries(answer.scores).forEach(([type, score]) => {
        finalScores[type] += score;
        if (score === 2) {
          primaryCounts[type] += 1;
        }
      });
    });

    let maxScore = -1;
    let topTypes = [];

    Object.entries(finalScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topTypes = [type];
      } else if (score === maxScore) {
        topTypes.push(type);
      }
    });

    if (topTypes.length === 0) {
      return null;
    }

    if (topTypes.length === 1) {
      return topTypes[0];
    }

    let maxPrimaryCount = -1;
    let topPrimaryTypes = [];

    topTypes.forEach((type) => {
      if (primaryCounts[type] > maxPrimaryCount) {
        maxPrimaryCount = primaryCounts[type];
        topPrimaryTypes = [type];
      } else if (primaryCounts[type] === maxPrimaryCount) {
        topPrimaryTypes.push(type);
      }
    });

    if (topPrimaryTypes.length === 1) {
      return topPrimaryTypes[0];
    }

    return topPrimaryTypes.sort((a, b) => RESULT_PRIORITY.indexOf(a) - RESULT_PRIORITY.indexOf(b))[0];
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (!selectedAnswers[currentQuestionIndex]) {
      return;
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      const snapshot = createSnapshot({
        currentQuestionIndex: currentQuestionIndex + 1
      });

      applySnapshot(snapshot, { replace: true });
      return;
    }

    const finalResultType = getCalculatedResultType(selectedAnswers);

    if (!finalResultType) {
      return;
    }

    const snapshot = createSnapshot({
      step: 'result',
      resultType: finalResultType,
      viewingDetailType: null,
      historyDepth: historyDepth + 1
    });

    applySnapshot(snapshot, { push: true });
  }, [
    selectedAnswers,
    currentQuestionIndex,
    createSnapshot,
    applySnapshot,
    getCalculatedResultType,
    historyDepth
  ]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex === 0) {
      return;
    }

    const snapshot = createSnapshot({
      currentQuestionIndex: currentQuestionIndex - 1
    });

    applySnapshot(snapshot, { replace: true });
  }, [currentQuestionIndex, createSnapshot, applySnapshot]);

  const drawAndDownloadImage = useCallback((targetType) => {
    if (!targetType || !RESULTS_DATA[targetType] || !TYPE_STYLES[targetType]) {
      return;
    }

    setIsCapturing(true);

    try {
      const data = RESULTS_DATA[targetType];
      const style = TYPE_STYLES[targetType];

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('2D canvas context를 가져오지 못했습니다.');
      }

      canvas.width = 800;
      canvas.height = 800;

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = style.hex;
      ctx.fillRect(0, 0, canvas.width, 280);

      ctx.fillStyle = '#ffffff';
      drawRoundedRect(ctx, 40, 150, 720, 580, 30);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(400, 150, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = style.hex;
      ctx.stroke();

      ctx.font = '60px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(style.emoji, 400, 155);

      ctx.fillStyle = '#64748b';
      ctx.font = '22px sans-serif';
      ctx.fillText('당신의 개발 성향은', 400, 250);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(data.characterName, 400, 300);

      ctx.fillStyle = style.hex;
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`"${data.oneLiner}"`, 400, 350);

      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 410);
      ctx.lineTo(720, 410);
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('📌 추천 개발 분야', 100, 460);

      ctx.fillStyle = '#475569';
      ctx.font = '20px sans-serif';
      data.recommendedFields.forEach((field, idx) => {
        const yPos = 510 + idx * 40;
        ctx.beginPath();
        ctx.arc(108, yPos + 10, 5, 0, Math.PI * 2);
        ctx.fillStyle = style.hex;
        ctx.fill();
        ctx.fillStyle = '#475569';
        ctx.fillText(field, 125, yPos);
      });

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('🏢 잘 맞는 팀 환경', 420, 460);

      ctx.fillStyle = '#475569';
      ctx.font = '20px sans-serif';
      data.recommendedEnvironments.forEach((env, idx) => {
        const yPos = 510 + idx * 40;
        ctx.beginPath();
        ctx.arc(428, yPos + 10, 5, 0, Math.PI * 2);
        ctx.fillStyle = style.hex;
        ctx.fill();
        ctx.fillStyle = '#475569';
        ctx.fillText(env, 445, yPos);
      });

      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px sans-serif';
      ctx.fillText('개발 유형 테스트', 400, 765);

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${data.characterName.replace(/\s+/g, '')}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('이미지 생성 오류', err);
      alert('이미지를 생성하는 데 실패했습니다.');
    } finally {
      setIsCapturing(false);
    }
  }, []);

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-10 text-center px-4 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 scale-150"></div>
        <div className="relative text-6xl drop-shadow-md animate-bounce">🧑‍💻</div>
      </div>

      <div className="space-y-4">
        <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-2">
          FOR BEGINNERS
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">개발 성향 진단</h1>
        <p className="text-gray-500 text-base leading-relaxed">
          나는 어떤 성향의 개발자일까?
        </p>
      </div>

      <div className="w-full rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-blue-100">
            <Lightbulb className="text-amber-500" size={18} />
          </div>

          <div className="space-y-3 text-left">
            <p className="text-sm font-semibold text-gray-900 leading-relaxed break-keep">
              정답을 맞히는 테스트가 아니에요.
            </p>

            <div className="space-y-2 text-sm text-gray-600 leading-relaxed break-keep">
              <p>코딩 경험이 없어도 괜찮아요.</p>
              <p>팀플이나 과제할 때의 모습을 떠올리며, 조금 더 끌리는 쪽을 가볍게 골라보세요.</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={startTest}
        className="w-full group relative overflow-hidden bg-gray-900 text-white py-4 rounded-xl text-base font-semibold transition-all hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <span>테스트 시작하기</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderTest = () => {
    const question = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    const currentAnswer = selectedAnswers[currentQuestionIndex];

    if (!question) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
          <p className="text-gray-600">문항 상태가 올바르지 않아요.</p>
          <button
            type="button"
            onClick={startTest}
            className="bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold"
          >
            처음부터 다시 시작하기
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full space-y-8 px-2 py-6">
        <div className="space-y-3">
          <div className="flex justify-between items-end text-sm font-medium">
            <span className="text-blue-600">Q{currentQuestionIndex + 1}.</span>
            <span className="text-gray-400 text-xs">
              {currentQuestionIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center space-y-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-[1.6] text-center px-4">
  {(() => {
    const text = question.text;
    const mid = Math.ceil(text.length / 2);
    // 공백 기준으로 가장 자연스러운 분리 지점 찾기
    const left = text.lastIndexOf(' ', mid);
    const right = text.indexOf(' ', mid);
    const splitIndex = left > 0 ? left : right > 0 ? right : mid;

    const first = text.slice(0, splitIndex);
    const second = text.slice(splitIndex + 1);

    return (
      <>
        <span className="block break-keep">{first}</span>
        <span className="block text-gray-700 break-keep">{second}</span>
      </>
    );
  })()}
</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = currentAnswer?.selectedIndex === index;

              return (
                <button
                  type="button"
                  key={`${question.id}-${index}`}
                  onClick={() => handleOptionSelect(option.scores, index)}
                  className={`w-full p-5 text-left text-base font-medium transition-all active:scale-[0.98] rounded-2xl flex items-center border-2 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-gray-100 bg-white text-gray-700 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <span className="leading-[1.65] text-sm md:text-base break-keep whitespace-normal text-left">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex-1 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 border ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm'
            }`}
          >
            이전
          </button>

          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={!currentAnswer}
            className={`flex-1 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 ${
              currentAnswer
                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === QUESTIONS.length - 1 ? '진단 결과 확인하기' : '다음으로'}
          </button>
        </div>
      </div>
    );
  };

  const renderBrokenResultFallback = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
      <p className="text-gray-600 leading-relaxed">
        결과 상태를 불러오지 못했어요.
        <br />
        다시 진단을 시작해 주세요.
      </p>
      <button
        type="button"
        onClick={startTest}
        className="bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold"
      >
        다시 진단하기
      </button>
    </div>
  );

  const renderTypeDetail = (type, isMyResult = false) => {
    if (!type || !RESULTS_DATA[type] || !TYPE_STYLES[type]) {
      return renderBrokenResultFallback();
    }

    const result = RESULTS_DATA[type];
    const style = TYPE_STYLES[type];

    const studyMateType = result.studyMate;
    const studyMateData = RESULTS_DATA[studyMateType];
    const studyMateStyle = TYPE_STYLES[studyMateType];

    const projectMateType = result.projectMate;
    const projectMateData = RESULTS_DATA[projectMateType];
    const projectMateStyle = TYPE_STYLES[projectMateType];

    return (
      <div className="flex flex-col h-full pb-10">
        {!isMyResult && (
          <div className="sticky top-0 bg-[#f1f5f9] pt-4 pb-4 z-20 flex items-center">
            <button
              type="button"
              onClick={() =>
                safeGoBack(
                  createSnapshot({
                    step: 'allTypes',
                    viewingDetailType: null
                  })
                )
              }
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
            >
              <ArrowLeft size={16} /> 이전 화면으로
            </button>
          </div>
        )}

        <div className={`bg-white px-6 md:px-8 pb-8 ${isMyResult ? 'pt-0 -mx-6 md:-mx-8' : 'rounded-3xl shadow-sm mt-2'}`}>
          <div
            className={`text-center space-y-6 pt-10 pb-12 px-6 ${
              isMyResult ? '-mx-6 md:-mx-8 rounded-b-[3rem]' : 'rounded-t-3xl -mx-6 md:-mx-8'
            } bg-gradient-to-b ${style.bgGradient} border-b ${style.borderColor}`}
          >
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-lg mb-2 relative">
              <span className="text-6xl drop-shadow-sm">{style.emoji}</span>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm">
                <Code2 size={20} className={style.color} />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-500 tracking-wider">
                {isMyResult ? '당신의 개발자 유형은' : '개발 성향 상세 조회'}
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 break-keep leading-snug">
                {result.characterName}
              </h1>
              <p
                className={`text-sm md:text-base font-semibold ${style.color} bg-white/70 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm mt-2`}
              >
                "{result.oneLiner}"
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-8">
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 text-sm md:text-base text-gray-700 leading-relaxed shadow-sm text-center break-keep whitespace-pre-line">
              {result.descriptionLong}
            </div>

            <section className="space-y-3 relative bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <h3 className={`text-sm font-bold flex items-center gap-2 ${style.color}`}>✨ 즐거움을 느끼는 순간</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{result.joyAtWork}</p>
            </section>

            <section className="space-y-3 relative bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <h3 className={`text-sm font-bold flex items-center gap-2 ${style.color}`}>💪 이런 강점이 있어요</h3>
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((strength, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-3 relative bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <h3 className="text-sm font-bold text-gray-500">⚠️ 이런 환경은 답답해요</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                {result.frustratingSituations.map((sit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-300 mt-0.5">•</span>
                    <span className="break-keep">{sit}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="block md:flex gap-4 pt-2 space-y-4 md:space-y-0">
              <section className={`w-full p-5 rounded-2xl border ${style.borderColor} bg-gray-50/50`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${style.color}`}>추천 개발 분야</h3>
                <ul className="text-sm font-medium text-gray-800 space-y-2">
                  {result.recommendedFields.map((field, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.hex }}></div>
                      {field}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={`w-full p-5 rounded-2xl border ${style.borderColor} bg-gray-50/50`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${style.color}`}>잘 맞는 팀 환경</h3>
                <ul className="text-sm font-medium text-gray-800 space-y-2">
                  {result.recommendedEnvironments.map((env, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.hex }}></div>
                      {env}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="block md:flex gap-4 pt-4 space-y-4 md:space-y-0">
              <button
                type="button"
                onClick={() => navigateTo('allTypes', studyMateType)}
                className="w-full text-left p-5 rounded-2xl bg-white border border-gray-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="relative z-10">
                  <p className="text-[11px] font-bold text-gray-400 tracking-wide mb-1">주파수 일치</p>
                  <p className="text-xs font-semibold text-gray-800 mb-2">티키타카 공부 메이트</p>
                  <p className={`text-sm font-bold ${studyMateStyle.color}`}>{studyMateData.characterName}</p>
                </div>
                <div className="absolute right-3 bottom-3 text-4xl opacity-80 z-10">{studyMateStyle.emoji}</div>
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-30 bg-gradient-to-br ${studyMateStyle.bgGradient}`}></div>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('allTypes', projectMateType)}
                className="w-full text-left p-5 rounded-2xl bg-gray-900 text-white relative overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="relative z-10">
                  <p className="text-[11px] font-bold text-gray-400 tracking-wide mb-1">사각지대 방어</p>
                  <p className="text-xs font-semibold text-gray-300 mb-2">약점 보완 프로젝트 동료</p>
                  <p className="text-sm font-bold text-white">{projectMateData.characterName}</p>
                </div>
                <div className="absolute right-3 bottom-3 text-4xl opacity-80 z-10">{projectMateStyle.emoji}</div>
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-30 bg-gradient-to-br ${projectMateStyle.bgGradient}`}></div>
              </button>
            </div>
          </div>
        </div>

        {isMyResult && (
          <div className="flex flex-col space-y-3 pt-6">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => drawAndDownloadImage(type)}
                disabled={isCapturing}
                className={`flex-1 text-white py-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm ${
                  isCapturing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ backgroundColor: style.hex }}
              >
                {isCapturing ? (
                  <span className="animate-pulse">저장 중...</span>
                ) : (
                  <>
                    <Download size={18} /> 요약 결과 저장
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={startTest}
                className="flex-1 bg-white text-gray-700 border border-gray-200 py-4 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={18} /> 다시 진단하기
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('allTypes')}
              className="w-full bg-gray-50 text-gray-600 border border-gray-200 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Users size={16} /> 다른 성향 유형 구경하기
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAllTypes = () => {
    if (viewingDetailType) {
      return renderTypeDetail(viewingDetailType, false);
    }

    return (
      <div className="flex flex-col h-full pb-6">
        <div className="sticky top-0 bg-[#f1f5f9] pt-4 pb-4 z-10 flex items-center">
          <button
            type="button"
            onClick={() =>
              safeGoBack(
                createSnapshot({
                  step: resultType ? 'result' : 'intro',
                  viewingDetailType: null
                })
              )
            }
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
          >
            <ArrowLeft size={16} /> 내 결과로 돌아가기
          </button>
        </div>

        <div className="text-center space-y-2 mt-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">모든 성향 도감</h2>
          <p className="text-sm text-gray-500">총 8가지의 성향이 존재해요</p>
        </div>

        <div className="space-y-4">
          {Object.keys(RESULTS_DATA).map((type) => {
            const data = RESULTS_DATA[type];
            const style = TYPE_STYLES[type];

            return (
              <button
                type="button"
                key={type}
                onClick={() => navigateTo('allTypes', type)}
                className={`w-full text-left bg-white border ${style.borderColor} p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden group`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${style.bgGradient} flex items-center justify-center text-3xl shrink-0 z-10 shadow-inner group-hover:scale-105 transition-transform`}
                >
                  {style.emoji}
                </div>
                <div className="z-10 flex-1">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {data.characterName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed break-keep">{data.oneLiner}</p>
                </div>
                <div className="z-10 text-gray-300 group-hover:text-gray-500 transition-colors pr-2">
                  <ChevronRight size={20} />
                </div>
                <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l ${style.bgGradient} opacity-30`}></div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-gray-900 font-sans sm:p-6 md:p-12 flex justify-center items-start">
      <div className="w-full max-w-md bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-gray-200/50 min-h-screen sm:min-h-[850px] overflow-hidden flex flex-col relative border border-gray-100">
        <div ref={scrollRef} className="flex-grow p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {step === 'intro' && renderIntro()}
          {step === 'test' && renderTest()}
          {step === 'result' && renderTypeDetail(resultType, true)}
          {step === 'allTypes' && renderAllTypes()}
        </div>
      </div>
    </div>
  );
}
