const db = [
  {
    id: 'card-reveal-accidental',
    keywords: ['revelar carta sem querer', 'revelar carta', 'revelou carta', 'carta revelada sem querer', 'mostrar carta sem querer', 'cartas reveladas sem querer', 'exibiu carta sem querer', 'mostrou carta sem querer', 'carta foi revelada'],
    category: 'Erro de Jogo',
    severity: 'Leve',
    levelOne: 'Precaução',
    levelTwo: 'Advertência',
    fix: 'Quando a carta foi revelada sem intenção de obter vantagem, o estado do jogo deve ser corrigido e a ação deve ser registrada para fins de repetição. Se a exposição foi acidental e não alterou o resultado, a penalidade inicial costuma ser leve.',
    checks: [
      'A carta foi revelada sem intenção de obter vantagem?',
      'A revelação alterou a decisão do oponente ou o andamento da partida?',
      'Foi a primeira ocorrência do jogador ou já houve registro anterior?'
    ]
  },
  {
    id: 'draw-extra-cards',
    keywords: ['comprou 2 cartas', 'comprou duas cartas', 'comprou carta a mais', 'comprou uma carta a mais', 'comprou cartas a mais', 'compra de carta a mais', 'duas cartas no início do turno', 'carta extra', 'comprou mais cartas', 'pegou 2 cartas', 'pegou duas cartas', 'comprou uma carta extra', 'comprou uma carta além', 'puxou 2 cartas', 'puxou duas cartas'],
    category: 'Erro de Jogo',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'A carta extra deve ser revelada ao oponente e devolvida ao baralho no estado correto. Se o erro for maior do que uma carta ou houver repetição, a penalidade pode aumentar conforme a gravidade da ocorrência.',
    checks: [
      'A compra excedente foi percebida imediatamente?',
      'Foi uma primeira ocorrência ou uma repetição?',
      'Houve intenção clara de obter vantagem por meio da compra extra?'
    ]
  },
  {
    id: 'draw-more-than-one',
    keywords: ['comprou mais de 1 carta', 'comprou 3 cartas', 'comprou 4 cartas', 'comprou varias cartas', 'mais de uma carta extra', 'comprou cartas extras', 'pegou mais de 1 carta', 'pegou 3 cartas', 'pegou mais cartas do que deveria', 'cartas extras'],
    category: 'Erro de Jogo',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'Quando há mais de uma carta extra, o juiz deve revisar a quantidade afetada e corrigir o estado do jogo antes de seguir. A penalidade tende a crescer conforme o número de cartas e o impacto na partida.',
    checks: [
      'Quantas cartas foram compradas a mais?',
      'O excesso foi descoberto antes do próximo passo do turno?',
      'A situação foi causada por erro de jogo ou por efeito válido de carta?'
    ]
  },
  {
    id: 'shuffle-deck',
    keywords: ['embaralhou o deck', 'embaralhou o baralho', 'embaralhar o deck', 'embaralhar o baralho', 'deck sem efeito', 'baralho sem efeito', 'usou apoiador e embaralhou o deck', 'embaralhou o topo do deck', 'misturou o deck sem efeito', 'baralho foi embaralhado sem efeito', 'embaralhou o baralho sem efeito'],
    category: 'Erro de Jogo',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'A ordem do baralho ou do jogo deve ser restaurada imediatamente e a ação deve ser registrada. Se a situação foi corrigida a tempo e não afetou o andamento da partida, ainda pode ser tratada como erro de jogo grave.',
    checks: [
      'A carta ou o efeito exigia embaralhamento?',
      'A ação foi percebida antes que o jogo prosseguisse?',
      'Já houve uma infração semelhante no mesmo duelo?'
    ]
  },
  {
    id: 'shuffle-hand',
    keywords: ['embaralhou a mão no deck', 'embaralhou a mão no baralho', 'mão no deck', 'mão no baralho', 'embaralhar mão', 'embaralhou a própria mão', 'misturou a mão no deck', 'misturou a própria mão no deck', 'misturou a mão ao deck', 'misturou a própria mão ao baralho'],
    category: 'Erro de Jogo',
    severity: 'Gravíssimo',
    levelOne: 'Derrota Mandatória',
    levelTwo: 'Derrota Mandatória',
    fix: 'Quando a própria mão foi embaralhada sem efeito de carta válido, a situação deve ser tratada como erro gravíssimo. A partida deve ser corrigida de acordo com a regra e, em regra, a derrota mandatória é a sanção adequada.',
    checks: [
      'A mão foi embaralhada sem efeito de carta ou efeito válido?',
      'O estado do jogo foi contaminado de forma irreparável?',
      'A ação exige derrota mandatória mesmo sem repetição?'
    ]
  },
  {
    id: 'incorrect-shuffle-order',
    keywords: ['embaralhou errado', 'embaralhou fora de ordem', 'baralho fora de ordem', 'deck fora de ordem', 'misturou sem embaralhar', 'não embaralhou o deck', 'não reorganizou o baralho', 'ordem do deck alterada', 'baralho em ordem incorreta', 'mistura incorreta do deck'],
    category: 'Erro de Jogo',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'Quando a ordem do baralho ou da mão foi alterada indevidamente, o juiz deve recompor o estado correto antes de seguir. O grau de penalidade depende de quão importante foi a alteração para o andamento da partida.',
    checks: [
      'O baralho ficou num estado impossível de jogo?',
      'O erro foi percebido imediatamente?',
      'A ordem do baralho afetou o resultado do duelo?'
    ]
  },
  {
    id: 'wrong-deck-contents',
    keywords: ['deck ilegal', 'baralho ilegal', 'baralho fora do limite', 'deck fora do limite', 'deck construction', 'decklist errado', 'lista do deck incorreta', 'baralho com cartas proibidas', 'deck fora da regra', 'baralho fora da regra'],
    category: 'Procedimento / Deck',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'O jogador deve corrigir o deck ou sua composição antes da partida continuar. Se o problema foi ignorado para obter vantagem, a situação pode evoluir para uma penalidade mais severa.',
    checks: [
      'O deck estava fora do limite de cartas ou de composição?',
      'A falha foi percebida antes ou depois do início da partida?',
      'Houve vantagem obtida como resultado do problema?'
    ]
  },
  {
    id: 'no-deck-list',
    keywords: ['sem deck list', 'sem lista do deck', 'não registrou o deck', 'falta deck list', 'sem decklist', 'não trouxe deck list', 'lista do deck ausente', 'deck list ausente'],
    category: 'Procedimento',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Advertência',
    fix: 'O jogador deve registrar a lista do deck corretamente antes da partida ou no momento indicado pela regra. Se a falha continuar, o juiz deve registrar a ocorrência e exigir a correção do registro.',
    checks: [
      'O problema foi identificado antes do início da partida?',
      'A lista do deck foi entregue após a notificação?',
      'O jogador teve tempo suficiente para corrigir o problema?'
    ]
  },
  {
    id: 'marked-cards',
    keywords: ['carta marcada', 'cartas marcadas', 'padrão perceptível', 'padrão visível', 'marca na carta', 'cartas com padrão', 'cartas com marca', 'carta com marca visível', 'carta com padrão perceptível'],
    category: 'Cartas Marcadas',
    severity: 'Grave',
    levelOne: 'Carta de Prêmio Quádrupla',
    levelTwo: 'Derrota Mandatória',
    fix: 'As cartas marcadas devem ser removidas do jogo e a penalidade deve ser aplicada conforme a visibilidade do padrão. Se a marca for perceptível e intencional, a sanção tende a aumentar conforme a natureza da manipulação.',
    checks: [
      'O padrão era perceptível ao oponente?',
      'Houve intenção de manipulação ou obtenção de vantagem?',
      'As cartas já foram usadas em jogo ou ainda estavam na mão?'
    ]
  },
  {
    id: 'prize-card-error',
    keywords: ['prize card', 'cartas de prêmio', 'erro de prêmio', 'contagem de prêmio', 'prize count', 'cartas de premio', 'prêmio errado', 'contagem de prêmios errada', 'prêmios foram contados errado'],
    category: 'Procedimento / Prêmios',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'A contagem correta dos prêmios deve ser restaurada imediatamente e o estado do jogo corrigido. Se o erro foi identificado cedo e não houve vantagem concreta, a penalidade pode ser moderada.',
    checks: [
      'Qual era a contagem correta de prêmios?',
      'O erro foi identificado antes da próxima ação relevante?',
      'O jogador se beneficiou do erro e ganhou vantagem?'
    ]
  },
  {
    id: 'slow-game',
    keywords: ['jogo lento', 'lento', 'demora', 'atraso de jogo', 'tempo demais', 'o jogo está lento', 'demorando demais', 'partida lenta', 'passando muito tempo'],
    category: 'Ritmo',
    severity: 'Leve',
    levelOne: 'Precaução',
    levelTwo: 'Advertência',
    fix: 'O juiz deve aplicar precaução e reforçar o ritmo da partida. Se a demora persistir, a penalidade pode evoluir para advertência e, em casos recorrentes, para sanção mais forte.',
    checks: [
      'O atraso foi recorrente?',
      'O oponente sinalizou a demora?',
      'Há fatores fora do controle do jogador que justifiquem o atraso?'
    ]
  },
  {
    id: 'time-usage',
    keywords: ['manipular tempo', 'manipulou o tempo', 'tempo de jogo manipulado', 'retardou a partida', 'prolongou a partida', 'atrasou deliberadamente', 'retardou deliberadamente'],
    category: 'Conduta Antiesportiva',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Derrota Mandatória',
    fix: 'Manipular o tempo de jogo ou atrasar deliberadamente a partida deve ser tratado como conduta antiesportiva. A penalidade cresce conforme a intenção e o impacto na partida.',
    checks: [
      'A ação foi deliberada?',
      'Foi feita para prejudicar o oponente ou forçar vantagem?',
      'O atraso afetou claramente o andamento da partida?'
    ]
  },
  {
    id: 'late-arrival',
    keywords: ['atrasado', 'chegou atrasado', 'atraso de chegada', 'chegou tarde', 'atraso maior que 5 minutos', 'atraso de 6 minutos', 'chegou depois do prazo', 'faltou para o início'],
    category: 'Procedimento',
    severity: 'Gravíssimo',
    levelOne: 'Derrota Mandatória',
    levelTwo: 'Derrota Mandatória',
    fix: 'Se o atraso for relevante e a partida já estiver em andamento, o juiz deve aplicar a penalidade de procedimento conforme a regra. Atrasos acima de cinco minutos tendem a ser tratados como severos.',
    checks: [
      'Qual foi o tempo de atraso?',
      'A partida já começou ou a mesa estava em espera?',
      'Houve comunicação ao juiz antes do início?'
    ]
  },
  {
    id: 'unsporting-conduct',
    keywords: ['xingou', 'xingar', 'ofendeu', 'insulto', 'agressão', 'agressao', 'conduta antiesportiva', 'má conduta', 'ma conduta', 'insultou o oponente', 'ofensivo', 'insultou'],
    category: 'Conduta Antiesportiva',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Derrota Mandatória',
    fix: 'Se a conduta for leve, a advertência é a base; se houver insulto grave, ameaça ou manipulação deliberada da partida, a sanção deve aumentar e o caso pode exigir desqualificação.',
    checks: [
      'Há insulto, ameaça ou agressão verbal ou física?',
      'A ação teve intenção de prejudicar o oponente ou a partida?',
      'O caso exige revisão de comportamento e registro oficial?'
    ]
  },
  {
    id: 'aggression',
    keywords: ['agressão física', 'agressao fisica', 'agrediu', 'atacou', 'violência', 'violencia', 'agressão', 'agressao', 'violência física', 'agressão física'],
    category: 'Conduta Antiesportiva',
    severity: 'Gravíssimo',
    levelOne: 'Desqualificação',
    levelTwo: 'Desqualificação',
    fix: 'Agressão ou violência exige desqualificação imediata ou retirada do torneio conforme a gravidade do ato e a decisão do juiz.',
    checks: [
      'A agressão foi física ou verbal diretamente ofensiva?',
      'O ato ameaçou a continuidade do torneio?',
      'O caso deve ser reportado imediatamente às autoridades do evento?'
    ]
  },
  {
    id: 'cheat',
    keywords: ['trapaça', 'trapaça intencional', 'intencionalmente', 'intencional', 'enganar', 'fraude', 'manipular', 'obter vantagem indevida', 'ma conduta intencional', 'ganhou indevidamente', 'vantagem indevida'],
    category: 'Trapaça',
    severity: 'Gravíssimo',
    levelOne: 'Desqualificação',
    levelTwo: 'Desqualificação',
    fix: 'Se houver intenção clara de obter vantagem, a situação deve ser tratada como trapaça. O juiz deve aplicar desqualificação e registrar a infração como má conduta intencional.',
    checks: [
      'Houve intenção clara de ganhar indevidamente?',
      'A ação alterou decisivamente o resultado ou o andamento da partida?',
      'O caso exige revisão por má conduta antiesportiva além da desqualificação?'
    ]
  },
  {
    id: 'illegal-use-of-supporter',
    keywords: ['usou apoiador indevido', 'apoiador ilegal', 'apoiador sem efeito', 'uso inválido de apoiador', 'suporte ilegal', 'apoiador que não permitia', 'efeito de apoiador inválido', 'usou um apoiador que não permitia'],
    category: 'Erro de Jogo',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'Quando o apoiador ou o efeito foi usado de maneira inválida, o estado do jogo deve ser corrigido e a infração deve ser registrada. Se houve intenção de vantagem, a gravidade pode aumentar.',
    checks: [
      'O apoiador permitia a ação alegada?',
      'A ação alterou o estado do jogo antes da correção?',
      'Houve intenção de ganho indevido ou apenas erro de aplicação?'
    ]
  },
  {
    id: 'illegal-card-timing',
    keywords: ['jogou carta fora de tempo', 'carta em tempo errad', 'fora do momento correto', 'ação em momento errado', 'cartas sem ordem de jogo', 'usou carta no momento errado', 'carta jogada fora de tempo'],
    category: 'Erro de Jogo',
    severity: 'Grave',
    levelOne: 'Advertência',
    levelTwo: 'Carta de Prêmio Dupla',
    fix: 'A ação deve ser anulada quando a carta ou o efeito foi usado fora do momento válido, e o estado do jogo deve ser corrigido para manter a partida consistente.',
    checks: [
      'A carta foi jogada em momento inválido?',
      'A ação já mudou o resultado antes de ser detectada?',
      'Existe repetição ou intenção de vantagem?'
    ]
  },
  {
    id: 'deck-miscut',
    keywords: ['deck virou', 'deck caindo', 'baralho derrubado', 'deck bagunçado', 'baralho fora de ordem', 'baralho caindo', 'deck misturado', 'baralho derrubado na mesa', 'deck bagunçado no jogo'],
    category: 'Erro de Jogo',
    severity: 'Leve',
    levelOne: 'Precaução',
    levelTwo: 'Advertência',
    fix: 'Se a situação se resumiu à desorganização do baralho sem vantagem, o juiz deve recompor o estado correto e aplicar precaução ou advertência conforme a gravidade do caso.',
    checks: [
      'Foi apenas uma desorganização sem vantagem?',
      'A mesa foi restaurada antes da ação seguinte?',
      'O erro foi acidental ou foi usado para manipular o jogo?'
    ]
  }
];

const state = {
  history: JSON.parse(localStorage.getItem('judgeHistory') || '[]'),
  match: JSON.parse(localStorage.getItem('judgeMatch') || JSON.stringify({
    tableName: 'Mesa não cadastrada',
    playerOne: 'Jogador 1',
    playerTwo: 'Jogador 2'
  }))
};

const tableNameInput = document.querySelector('#tableName');
const playerOneInput = document.querySelector('#playerOne');
const playerTwoInput = document.querySelector('#playerTwo');
const saveMatchBtn = document.querySelector('#saveMatchBtn');
const incidentInput = document.querySelector('#incident');
const playerSelect = document.querySelector('#playerSelect');
const notesInput = document.querySelector('#notes');
const analyzeBtn = document.querySelector('#analyzeBtn');
const repeatToggle = document.querySelector('#repeat');
const intentionalToggle = document.querySelector('#intentional');
const quickTags = document.querySelectorAll('.tag');
const matchSummary = document.querySelector('#matchSummary');
const resultTitle = document.querySelector('#resultTitle');
const categoryBadge = document.querySelector('#categoryBadge');
const severityBadge = document.querySelector('#severityBadge');
const levelOne = document.querySelector('#levelOne');
const levelTwo = document.querySelector('#levelTwo');
const fixText = document.querySelector('#fixText');
const checkList = document.querySelector('#checkList');
const historyList = document.querySelector('#historyList');
const exportSummaryBtn = document.querySelector('#exportSummaryBtn');
const exportText = document.querySelector('#exportText');
const clearHistoryBtn = document.querySelector('#clearHistory');

function normalizeText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizePlayerName(value, fallback) {
  const sanitized = String(value || '').trim();
  return sanitized || fallback;
}

function matchRule(text) {
  const normalized = normalizeText(text);

  const phraseBoosts = {
    'shuffle-hand': [/(?:embaralhou|misturou).*(?:m[aã]o|mao).*(?:deck|baralho)/, /(?:m[aã]o|mao).*(?:deck|baralho)/],
    'draw-extra-cards': [/(?:comprou|compra).*(?:2|duas|mais de 1|uma carta a mais|carta a mais).*(?:cartas|carta)/, /carta a mais/],
    'cheat': [/(?:trapaça|trapaça intencional|fraude|intencionalmente|enganar|ganhar indevidamente)/],
    'slow-game': [/(?:jogo lento|demora|lento|atraso de jogo)/],
    'late-arrival': [/(?:atrasado|chegou tarde|atraso.*\d+\s*minut)/],
    'marked-cards': [/(?:carta marcada|cartas marcadas|padr[aã]o perceptivel|padr[aã]o visivel)/],
    'aggression': [/(?:agress[aã]o|violencia|agrediu|atacou)/],
    'illegal-use-of-supporter': [/(?:apoiador|suporte).*(?:ilegal|indevido|sem efeito)/]
  };

  let candidates = [];

  for (const item of db) {
    const matchingKeywords = item.keywords.filter((keyword) => normalized.includes(keyword));
    let score = matchingKeywords.length * 10;

    const boosts = phraseBoosts[item.id] || [];
    for (const pattern of boosts) {
      if (pattern.test(normalized)) {
        score += 60;
      }
    }

    if (matchingKeywords.length > 0 || boosts.some((pattern) => pattern.test(normalized))) {
      candidates.push({
        item,
        score,
        severityRank: ['Leve', 'Grave', 'Gravíssimo'].indexOf(item.severity)
      });
    }
  }

  if (!candidates.length) {
    return null;
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.severityRank !== a.severityRank) return b.severityRank - a.severityRank;
    return a.item.category.localeCompare(b.item.category);
  });

  return candidates[0].item;
}

function applyEscalation(result) {
  const isRepeat = repeatToggle.checked;
  const isIntentional = intentionalToggle.checked;

  let category = result.category;
  let severity = result.severity;
  let level1 = result.levelOne;
  let level2 = result.levelTwo;

  if (isIntentional) {
    category = 'Trapaça';
    severity = 'Gravíssimo';
    level1 = 'Desqualificação';
    level2 = 'Desqualificação';
    return {
      category,
      severity,
      levelOne: level1,
      levelTwo: level2,
      fix: 'A situação deve ser tratada como trapaça intencional. O juiz deve considerar desqualificação e a revisão da conduta antiesportiva.',
      checks: [
        'Houve intenção clara de vantagem indevida?',
        'A ação alterou o estado do jogo de maneira decisiva?',
        'É necessário registrar o caso para revisão de conduta?'
      ]
    };
  }

  if (isRepeat) {
    const escalationMap = {
      Leve: { levelOne: 'Advertência', levelTwo: 'Carta de Prêmio Dupla' },
      Grave: { levelOne: 'Carta de Prêmio Dupla', levelTwo: 'Derrota Mandatória' },
      'Gravíssimo': { levelOne: 'Derrota Mandatória', levelTwo: 'Derrota Mandatória' }
    };

    const mapped = escalationMap[severity];
    if (mapped) {
      level1 = mapped.levelOne;
      level2 = mapped.levelTwo;
    }
  }

  return { category, severity, levelOne: level1, levelTwo: level2, fix: result.fix, checks: result.checks };
}

function renderMatchSummary() {
  const tableName = normalizePlayerName(state.match.tableName, 'Mesa não cadastrada');
  const playerOne = normalizePlayerName(state.match.playerOne, 'Jogador 1');
  const playerTwo = normalizePlayerName(state.match.playerTwo, 'Jogador 2');

  tableNameInput.value = tableName === 'Mesa não cadastrada' ? '' : tableName;
  playerOneInput.value = playerOne === 'Jogador 1' ? '' : playerOne;
  playerTwoInput.value = playerTwo === 'Jogador 2' ? '' : playerTwo;

  const options = [playerOne, playerTwo].filter((value, index, self) => value && self.indexOf(value) === index);
  const currentValue = playerSelect.value || options[0] || 'Jogador 1';
  playerSelect.innerHTML = options.map((option) => `<option value="${option}">${option}</option>`).join('');
  if (options.includes(currentValue)) {
    playerSelect.value = currentValue;
  } else if (options[0]) {
    playerSelect.value = options[0];
  }

  matchSummary.textContent = `Mesa: ${tableName} • Jogadores: ${playerOne} vs ${playerTwo}`;
}

function saveMatch() {
  const rawPlayerOne = normalizePlayerName(playerOneInput.value, 'Jogador 1');
  const rawPlayerTwo = normalizePlayerName(playerTwoInput.value, 'Jogador 2');
  const playerOne = rawPlayerOne === rawPlayerTwo ? `${rawPlayerOne} 1` : rawPlayerOne;
  const playerTwo = rawPlayerOne === rawPlayerTwo ? `${rawPlayerTwo} 2` : rawPlayerTwo;

  const nextMatch = {
    tableName: normalizePlayerName(tableNameInput.value, 'Mesa não cadastrada'),
    playerOne,
    playerTwo
  };

  state.match = nextMatch;
  localStorage.setItem('judgeMatch', JSON.stringify(nextMatch));
  renderMatchSummary();
}

function getSelectedPlayer() {
  return normalizePlayerName(playerSelect.value, state.match.playerOne || 'Jogador 1');
}

function getRepetitionCount(playerName, category) {
  const currentTable = state.match.tableName || 'Mesa não cadastrada';
  const targetPlayer = playerName || 'Jogador 1';

  return state.history.filter((entry) => {
    const sameTable = (entry.tableName || 'Mesa não cadastrada') === currentTable;
    const samePlayer = (entry.involvedPlayer || entry.playerOne || 'Jogador 1') === targetPlayer;
    const sameCategory = entry.category === category;
    return sameTable && samePlayer && sameCategory;
  }).length;
}

function renderHistory() {
  historyList.innerHTML = '';
  if (!state.history.length) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'Nenhuma ocorrência registrada ainda.';
    historyList.appendChild(emptyItem);
    return;
  }

  state.history
    .slice()
    .reverse()
    .forEach((entry) => {
      const item = document.createElement('li');
      const tableLabel = entry.tableName || 'Mesa não cadastrada';
      const playerOne = entry.playerOne || 'Jogador 1';
      const playerTwo = entry.playerTwo || 'Jogador 2';
      const playerLabel = entry.involvedPlayer || 'Jogador';
      item.innerHTML = `<strong>${tableLabel}</strong><br>${playerOne} vs ${playerTwo}<br>Jogador: ${playerLabel}<br>${entry.category} — ${entry.severity} • ${entry.levelOne}<br>${entry.note || 'Sem observações.'}`;
      historyList.appendChild(item);
    });
}

function saveHistory(entry) {
  state.history.push(entry);
  localStorage.setItem('judgeHistory', JSON.stringify(state.history.slice(-12)));
  renderHistory();
}

function exportSummary() {
  const lines = state.history.length
    ? state.history.slice().reverse().map((entry) => {
        const date = entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'agora';
        return `${date} | ${entry.tableName || 'Mesa não cadastrada'} | ${entry.involvedPlayer || 'Jogador'} | ${entry.category} | ${entry.levelOne}`;
      })
    : ['Nenhuma ocorrência registrada.'];

  exportText.value = lines.join('\n');
  exportText.style.display = 'block';
  exportText.focus();
  exportText.select();
  try {
    navigator.clipboard.writeText(exportText.value);
  } catch (error) {
    console.warn('Não foi possível copiar automaticamente:', error);
  }
}

function analyze() {
  const text = incidentInput.value.trim();
  if (!text) {
    resultTitle.textContent = 'Descreva a situação';
    categoryBadge.textContent = 'Categoria';
    severityBadge.textContent = 'Gravidade';
    levelOne.textContent = '—';
    levelTwo.textContent = '—';
    fixText.textContent = 'Informe o que aconteceu para receber a análise.';
    checkList.innerHTML = '';
    return;
  }

  const involvedPlayer = getSelectedPlayer();
  const rule = matchRule(text);
  if (!rule) {
    resultTitle.textContent = 'Não encontrou uma infração conhecida';
    categoryBadge.textContent = 'Revisar';
    severityBadge.textContent = 'Verifique manualmente';
    levelOne.textContent = 'Consultar regra';
    levelTwo.textContent = 'Consultar regra';
    fixText.textContent = 'Use a descrição para confirmar a categoria. O sistema pode não ter identificado uma regra exata do documento.';
    checkList.innerHTML = '<li>Verifique se há uma forma mais específica de descrever a ação.</li>';
    return;
  }

  const repetitionCount = getRepetitionCount(involvedPlayer, rule.category);
  const isRepeat = repeatToggle.checked || repetitionCount > 0;

  if (isRepeat) {
    repeatToggle.checked = true;
  }

  const resolved = applyEscalation(rule);

  resultTitle.textContent = `${resolved.category} — ${resolved.severity}`;
  categoryBadge.textContent = resolved.category;
  severityBadge.textContent = resolved.severity;
  levelOne.textContent = resolved.levelOne;
  levelTwo.textContent = resolved.levelTwo;
  fixText.textContent = resolved.fix;

  checkList.innerHTML = '';
  resolved.checks.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    checkList.appendChild(li);
  });

  saveHistory({
    tableName: state.match.tableName,
    playerOne: state.match.playerOne,
    playerTwo: state.match.playerTwo,
    involvedPlayer,
    category: resolved.category,
    severity: resolved.severity,
    levelOne: resolved.levelOne,
    note: notesInput.value.trim() || `Ocorrência registrada. Repetição: ${repetitionCount + (repeatToggle.checked ? 1 : 0)}`,
    timestamp: new Date().toISOString()
  });
}

saveMatchBtn.addEventListener('click', saveMatch);

quickTags.forEach((tag) => {
  tag.addEventListener('click', () => {
    incidentInput.value = tag.dataset.text || '';
    incidentInput.focus();
  });
});

analyzeBtn.addEventListener('click', analyze);
exportSummaryBtn.addEventListener('click', exportSummary);
clearHistoryBtn.addEventListener('click', () => {
  state.history = [];
  localStorage.removeItem('judgeHistory');
  exportText.value = '';
  exportText.style.display = 'none';
  renderHistory();
});

renderMatchSummary();
renderHistory();
