const generalRules = [
  {
    title: 'Objetivo do sistema',
    text: 'O auxiliar deve reconhecer a infração em tempo real e orientar o juiz com categoria, gravidade, penalidade, correção e verificações de contexto.'
  },
  {
    title: 'Regra de correção',
    text: 'Quando possível, o jogo deve ser corrigido antes de continuar. Se a situação afetou o estado do duelo de forma irreparável, o juiz deve aplicar a penalidade máxima indicada no card.'
  },
  {
    title: 'Regra de repetição',
    text: 'Repetição da mesma categoria, no mesmo duelo, deve aumentar a sanção e pode transformar uma infração leve em grave ou gravíssima.'
  },
  {
    title: 'Regra de intenção',
    text: 'Quando houver intenção clara de obter vantagem, manipular o resultado ou enganar o oponente, a infração deve ser tratada como trapaça e pode levar à desqualificação.'
  }
];

const penaltyTable = [
  { severity: 'Leve', level1: 'Precaução', level2: 'Advertência' },
  { severity: 'Grave', level1: 'Advertência', level2: 'Carta de Prêmio Dupla' },
  { severity: 'Gravíssimo', level1: 'Derrota Mandatória', level2: 'Derrota Mandatória' },
  { severity: 'Cartas Marcadas', level1: 'Carta de Prêmio Quádrupla', level2: 'Derrota Mandatória' },
  { severity: 'Baralho Inválido', level1: 'Derrota Mandatória', level2: 'Derrota Mandatória' },
  { severity: 'Conduta Antiesportiva', level1: 'Advertência / Derrota Mandatória', level2: 'Desqualificação' },
  { severity: 'Trapaça', level1: 'Desqualificação', level2: 'Desqualificação' }
];

const keywordAliases = {
  'TCG-GAME-001': ['nao revelou carta', 'não revelou carta', 'carta não revelada', 'carta nao revelada', 'colocou carta na mao sem revelar'],
  'TCG-GAME-002': ['nao estabeleceu premios no comeco', 'não estabeleceu prêmios no começo', 'antes de qualquer procura', 'nenhuma procura no baralho', 'começou sem colocar premios'],
  'TCG-GAME-003': ['apoiador nao foi para o descarte', 'apoiador não foi para o descarte', 'esqueceu de descartar apoiador', 'nao colocou apoiador no descarte'],
  'TCG-GAME-004': ['atacou sem energia', 'atacou sem energia suficiente', 'ataque sem energia suficiente', 'quantidade de energia necessaria', 'quantidade de energia necessária', 'energia insuficiente para atacar', 'declarou ataque sem energia', 'atacou sem a energia necessária'],
  'TCG-GAME-005': ['nao jogou moeda queimado', 'não jogou moeda queimado', 'esqueceu moeda queimado', 'pokemon queimado sem moeda'],
  'TCG-GAME-006': ['revelou carta do topo', 'revelou carta de premio', 'revelou carta de prêmio', 'virou carta do baralho', 'mostrou carta do topo'],
  'TCG-GAME-007': ['jogou duas energias', 'jogou 2 energias', 'colocou duas energias', 'mais de uma energia no turno', 'duas energias no mesmo turno'],
  'TCG-GAME-008': ['comprou', 'carta extra', 'cartas a mais', 'comprou 2 cartas', 'pegou 2 cartas', 'carta extra', 'mais cartas', 'pegou carta a mais'],
  'TCG-GAME-009': ['embaralhou', 'deck', 'baralho', 'misturou', 'sem efeito', 'embaralhou o deck', 'embaralhar baralho'],
  'TCG-GAME-010': ['nao embaralhou o suficiente', 'não embaralhou o suficiente', 'embaralhamento insuficiente', 'embaralhou pouco', 'baralho mal embaralhado'],
  'TCG-GAME-012': ['pegou premio sem nocaute', 'pegou prêmio sem nocaute', 'pegou premio sem nocautear', 'tirou premio sem nocautear'],
  'TCG-GAME-013': ['pegou premios demais', 'pegou prêmios demais', 'pegou premio a mais depois do nocaute', 'pegou cartas de premio demais'],
  'TCG-GAME-014': ['nao colocou contador de dano', 'não colocou contador de dano', 'esqueceu contador de dano', 'nao colocou dano de envenenado', 'não colocou dano de envenenado'],
  'TCG-GAME-015': ['usou habilidade impedida', 'usou habilidade quando nao podia', 'usou habilidade quando não podia', 'habilidade bloqueada usada', 'apoiador indevido', 'uso invalido de apoiador', 'apoiador ilegal', 'suporte ilegal', 'apoiador sem efeito', 'uso ilegal de apoiador'],
  'TCG-GAME-017': ['mão', 'mao', 'baralho', 'deck', 'embaralhou a mão', 'embaralhou a propria mão', 'misturou a mão no deck', 'mão no deck'],
  'TCG-GAME-018': ['embaralhou os premios', 'embaralhou os prêmios', 'prêmios no baralho', 'premios no deck'],
  'TCG-GAME-019': ['embaralhou o descarte', 'descarte no baralho', 'descarte no deck', 'misturou o descarte no deck'],
  'TCG-GAME-020': ['recolheu as cartas antes', 'recolheu o jogo antes', 'pegou as cartas antes de confirmar', 'recolheu antes de concordar'],
  'TCG-GAME-011': ['nao estabeleceu premios depois de procurar', 'não estabeleceu prêmios depois de procurar', 'uma procura no baralho', 'depois de uma procura', 'depois de começar a jogar e procurar'],
  'TCG-GAME-016': ['nao estabeleceu premios depois de tres procuras', 'não estabeleceu prêmios depois de três procuras', 'tres ou mais procuras', 'três ou mais procuras', '3 ou mais procuras', 'depois de procurar tres vezes'],
  'TCG-MARK-001': ['carta marcada', 'cartas marcadas', 'capa marcada', 'capas marcadas', 'marca na carta', 'marcas nas cartas'],
  'TCG-MARK-002': ['padrão perceptível', 'padrao perceptivel', 'marca perceptivel', 'padrao visivel', 'padrão visível', 'padrao visivel'],
  'TCG-MARK-003': ['antes do evento', 'antes de começar o evento', 'antes de iniciar o evento', 'verificação antes do evento', 'verificacao antes do evento', 'problema descoberto antes do jogo'],
  'TCG-PACE-001': ['jogo lento', 'demora', 'lento', 'tempo', 'procurar repetidas', 'conversa', 'atraso de jogo'],
  'TCG-PROC-003': ['atrasado', 'atraso', '5 minutos', 'resultado incorreto', 'partida errada', 'chegou tarde'],
  'TCG-UC-001': ['xingou', 'ofendeu', 'atrapalhou', 'tocar cartas do oponente', 'conduta', 'interrompeu partida', 'atrapalhar partida'],
  'TCG-CHEAT-001': ['trapaça', 'trapaça intencional', 'fraude', 'enganar', 'vantagem indevida', 'cartas marcadas intencionalmente', 'manipular resultado']
};

const decisionCards = [
  { CARD_ID: 'TCG-GAME-001', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Leve', SITUAÇÃO: 'Colocar uma carta na mão sem revelá-la quando a carta exige revelação.', GATILHO_DO_SISTEMA: 'carta na mão + não revelou + efeito exige revelar', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Aplicar o procedimento correto conforme o efeito da carta.', ESCALAÇÃO_DESVIO: 'Pode aumentar conforme repetição/circunstâncias.', OBSERVAÇÃO: 'Impacto muito pequeno; normalmente corrigível.' },
  { CARD_ID: 'TCG-GAME-002', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Leve', SITUAÇÃO: 'Não estabelecer as Cartas de Prêmio no começo, descoberto antes de qualquer procura no baralho.', GATILHO_DO_SISTEMA: 'prêmios não estabelecidos + nenhuma procura no baralho', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Estabelecer as Cartas de Prêmio conforme o procedimento.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-003', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Leve', SITUAÇÃO: 'Esquecer de colocar uma carta de Apoiador na pilha de descarte depois de jogá-la.', GATILHO_DO_SISTEMA: 'Apoiador jogado + não foi para descarte', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Corrigir o descarte se ainda for possível.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-004', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Leve', SITUAÇÃO: 'Declarar um ataque sem ter a quantidade apropriada de Energia.', GATILHO_DO_SISTEMA: 'ataque declarado + energia insuficiente', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Corrigir a situação conforme o estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-005', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Leve', SITUAÇÃO: 'Esquecer de jogar a moeda para um Pokémon Queimado entre as vezes de jogar.', GATILHO_DO_SISTEMA: 'Pokémon Queimado + moeda obrigatória não realizada', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Aplicar o procedimento correto conforme o estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-006', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Leve', SITUAÇÃO: 'Revelar sem querer a primeira carta do baralho ou uma Carta de Prêmio.', GATILHO_DO_SISTEMA: 'carta do topo/prêmio revelada acidentalmente', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Seguir a correção aplicável ao estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-007', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Jogar mais de uma carta de Energia em uma vez de jogar sem efeito que permita.', GATILHO_DO_SISTEMA: 'mais de 1 energia no turno + sem efeito permitindo', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Corrigir conforme possível; avaliar o estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-008', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Comprar uma carta a mais.', GATILHO_DO_SISTEMA: 'comprou carta extra', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Revelar a(s) carta(s) em questão ao oponente e embaralhá-la(s) no baralho.', ESCALAÇÃO_DESVIO: 'Se mais de uma carta adicional foi comprada, pode ser apropriado aumentar a penalidade.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-009', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Embaralhar o próprio baralho no meio do jogo sem efeito de carta.', GATILHO_DO_SISTEMA: 'embaralhou baralho durante jogo + sem efeito', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Interromper o procedimento indevido e avaliar o estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-010', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Não embaralhar o baralho o suficiente.', GATILHO_DO_SISTEMA: 'embaralhamento insuficiente', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Solicitar embaralhamento adequado.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-011', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Não estabelecer as Cartas de Prêmio, descoberto depois de uma procura no baralho.', GATILHO_DO_SISTEMA: 'prêmios não estabelecidos + já houve procura no baralho', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Avaliar o número de procuras e o estado do jogo.', ESCALAÇÃO_DESVIO: 'Se duas procuras tiverem sido feitas, a penalidade inicial pode aumentar em um grau.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-012', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Pegar uma Carta de Prêmio sem Nocautear um Pokémon.', GATILHO_DO_SISTEMA: 'pegou prêmio + sem nocaute', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Corrigir o estado se ainda for possível.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-013', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Pegar Cartas de Prêmio demais depois de Nocautear um Pokémon.', GATILHO_DO_SISTEMA: 'pegou prêmios em excesso após nocaute', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Avaliar e corrigir conforme o estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-014', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Esquecer de colocar contadores de dano por um efeito mandatório, como Envenenado.', GATILHO_DO_SISTEMA: 'efeito obrigatório + contador de dano não colocado', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Corrigir conforme o estado do jogo.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-015', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Grave', SITUAÇÃO: 'Usar uma Habilidade quando uma carta previne o seu uso.', GATILHO_DO_SISTEMA: 'Habilidade usada + uso impedido por carta', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Avaliar o estado do jogo e aplicar a correção possível.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-016', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Não estabelecer as Cartas de Prêmio, descoberto depois de três ou mais procuras no baralho.', GATILHO_DO_SISTEMA: 'prêmios não estabelecidos + 3 ou mais procuras', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Não há correção capaz de reverter o estado para prosseguir.', ESCALAÇÃO_DESVIO: 'Pode haver Advertência ao oponente por falta de atenção.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-017', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Embaralhar a própria mão no baralho sem efeito de carta.', GATILHO_DO_SISTEMA: 'mão embaralhada no baralho + sem efeito', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Estado do jogo irreparável.', ESCALAÇÃO_DESVIO: 'Pode haver Advertência ao oponente.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-018', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Embaralhar as próprias Cartas de Prêmio no baralho sem efeito de carta.', GATILHO_DO_SISTEMA: 'prêmios embaralhados no baralho + sem efeito', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Estado do jogo irreparável.', ESCALAÇÃO_DESVIO: 'Pode haver Advertência ao oponente.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-019', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Embaralhar a própria pilha de descarte no baralho sem efeito de carta.', GATILHO_DO_SISTEMA: 'descarte embaralhado no baralho + sem efeito', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Estado do jogo irreparável.', ESCALAÇÃO_DESVIO: 'Pode haver Advertência ao oponente.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-GAME-020', CATEGORIA: 'Erro de jogo', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Pegar as cartas antes que ambos os jogadores concordem em quem é o vencedor.', GATILHO_DO_SISTEMA: 'cartas recolhidas antes de concordância sobre vencedor', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Estado do jogo irreparável.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-MARK-001', CATEGORIA: 'Cartas marcadas', SEVERIDADE: 'Leve', SITUAÇÃO: 'Há cartas/capas marcadas, mas não existe padrão perceptível.', GATILHO_DO_SISTEMA: 'marcas presentes + sem padrão perceptível', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Colocar capas ou trocar capas danificadas; substituir cartas/capas marcadas o mais rápido possível sem atrapalhar o jogo.', ESCALAÇÃO_DESVIO: 'Se surgir padrão perceptível, tratar como grave.', OBSERVAÇÃO: 'A gravidade considera marcas, capas e variedade de cartas marcadas.' },
  { CARD_ID: 'TCG-MARK-002', CATEGORIA: 'Cartas marcadas', SEVERIDADE: 'Grave', SITUAÇÃO: 'Existe padrão perceptível nas cartas/capas marcadas.', GATILHO_DO_SISTEMA: 'marcas presentes + padrão perceptível', PENALIDADE_NÍVEL_1: 'Carta de Prêmio Quádrupla', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Trocar cartas/capas marcadas o mais rápido possível sem atrapalhar o jogo.', ESCALAÇÃO_DESVIO: 'Investigação pode determinar intenção; se confirmado uso intencional para vantagem, aumentar para trapaça.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-MARK-003', CATEGORIA: 'Cartas marcadas', SEVERIDADE: 'Antes do evento', SITUAÇÃO: 'Problema de cartas/capas marcadas descoberto na verificação antes do começo do evento.', GATILHO_DO_SISTEMA: 'marcação descoberta antes do início do evento', PENALIDADE_NÍVEL_1: 'Sem penalidade', PENALIDADE_NÍVEL_2: 'Sem penalidade', CORREÇÃO: 'Corrigir o problema antes do evento.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-DECK-001', CATEGORIA: 'Problemas de baralho', SEVERIDADE: 'Categoria', SITUAÇÃO: 'Lista inválida + baralho válido.', GATILHO_DO_SISTEMA: 'identificar correspondência entre lista e baralho', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Trocar cartas inválidas da lista por Energia básica escolhida pelo jogador e modificar o baralho para refletir.', ESCALAÇÃO_DESVIO: 'Antes do início do evento: pode ser corrigido sem penalidade. Durante a partida: Derrota Mandatória.', OBSERVAÇÃO: 'Ex.: lista tem 5 Energia de Plasma e baralho 4; lista tem >60 ou <60.' },
  { CARD_ID: 'TCG-DECK-002', CATEGORIA: 'Problemas de baralho', SEVERIDADE: 'Categoria', SITUAÇÃO: 'Lista válida + baralho inválido.', GATILHO_DO_SISTEMA: 'identificar correspondência entre lista e baralho', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Remover cartas inválidas e modificar o baralho para coincidir com a lista; carta faltante pode ser substituída por Energia básica se não houver carta idêntica.', ESCALAÇÃO_DESVIO: 'Antes do início do evento: pode ser corrigido sem penalidade. Durante a partida: Derrota Mandatória.', OBSERVAÇÃO: 'Ex.: lista tem 4 cópias e baralho 3; Electivire de coleção diferente; carta estrangeira.' },
  { CARD_ID: 'TCG-DECK-003', CATEGORIA: 'Problemas de baralho', SEVERIDADE: 'Categoria', SITUAÇÃO: 'Lista inválida + baralho inválido.', GATILHO_DO_SISTEMA: 'identificar correspondência entre lista e baralho', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Modificar ambos para tornar o baralho válido; cartas inválidas devem ser trocadas por Energia básica escolhida pelo jogador e refletidas na lista.', ESCALAÇÃO_DESVIO: 'Antes do início do evento: pode ser corrigido sem penalidade. Durante a partida: Derrota Mandatória.', OBSERVAÇÃO: 'Ex.: 5 Energia Incolor Dupla; mais/menos de 60 cartas; cartas não legais no formato.' },
  { CARD_ID: 'TCG-DECK-004', CATEGORIA: 'Problemas de baralho', SEVERIDADE: 'Categoria', SITUAÇÃO: 'Lista válida + baralho válido, mas diferentes.', GATILHO_DO_SISTEMA: 'identificar correspondência entre lista e baralho', PENALIDADE_NÍVEL_1: 'Carta de Prêmio Dupla', PENALIDADE_NÍVEL_2: 'Carta de Prêmio Dupla', CORREÇÃO: 'Modificar o baralho para coincidir com a lista; se faltar carta listada, substituir por Energia básica e atualizar a lista.', ESCALAÇÃO_DESVIO: 'Antes do início do evento: pode ser corrigido sem penalidade. Durante a partida: Derrota Mandatória.', OBSERVAÇÃO: 'Ex.: 4 Energia de Luta no baralho vs 4 Energia Intensa na lista; quantidades/coleções diferentes.' },
  { CARD_ID: 'TCG-PACE-001', CATEGORIA: 'Ritmo de jogo', SEVERIDADE: 'Jogo lento', SITUAÇÃO: 'Demorar excessivamente para decidir; contar/procurar repetidamente no baralho/descarte; procurar repetidas vezes; conversa desviando do jogo e interferindo no ritmo.', GATILHO_DO_SISTEMA: 'demora excessiva OU buscas repetidas OU conversa interfere no ritmo', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Fazer o jogo voltar a um ritmo animado; juiz pode conceder extensão de tempo.', ESCALAÇÃO_DESVIO: 'Depois da primeira Advertência, aumentar para Carta de Prêmio Dupla; não exceder Carta de Prêmio Dupla.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-PACE-002', CATEGORIA: 'Ritmo de jogo', SEVERIDADE: 'Apressar', SITUAÇÃO: 'Pressionar o oponente para jogar mais rápido por gestos, comentários, antecipação ou colocação de contadores antes da declaração.', GATILHO_DO_SISTEMA: 'pressiona oponente para acelerar', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Orientar o jogador a respeitar o tempo de decisão do oponente.', ESCALAÇÃO_DESVIO: 'Se contínuo e usado para intimidar/distrair, pode ser Conduta Antiesportiva.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-PACE-TIME', CATEGORIA: 'Ritmo de jogo', SEVERIDADE: 'Referência', SITUAÇÃO: 'Limites gerais de tempo por ação.', GATILHO_DO_SISTEMA: 'consulta de tempo', PENALIDADE_NÍVEL_1: 'Informativo', PENALIDADE_NÍVEL_2: 'Informativo', CORREÇÃO: 'Ações de carta/ataque: 15s; preparação inicial: 2min; busca/embaralhamento no meio do jogo: 15s; início do turno após fim do oponente: 5s; considerar posição antes de jogar: 10s.', ESCALAÇÃO_DESVIO: 'Tentar segmentar o turno para usar cada segundo pode ser Conduta Antiesportiva.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-PROC-001', CATEGORIA: 'Erro de procedimento', SEVERIDADE: 'Leve', SITUAÇÃO: 'Esquecer de assinar a guia da partida; entrar em área exclusiva de funcionários; interromper funcionários durante anúncios/regras.', GATILHO_DO_SISTEMA: 'erro operacional menor', PENALIDADE_NÍVEL_1: 'Precaução', PENALIDADE_NÍVEL_2: 'Precaução', CORREÇÃO: 'Corrigir a situação imediatamente.', ESCALAÇÃO_DESVIO: 'Se causar atraso/interrupção, Advertência na primeira infração.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-PROC-002', CATEGORIA: 'Erro de procedimento', SEVERIDADE: 'Grave', SITUAÇÃO: 'Preencher incorretamente a guia; chegar atrasado para partida por menos de 5 minutos; não fornecer marcadores de Condições Especiais quando necessários; não fornecer contadores de dano.', GATILHO_DO_SISTEMA: 'erro operacional com impacto significativo', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Corrigir o procedimento e minimizar o impacto no evento.', ESCALAÇÃO_DESVIO: 'Em casos extremos, pode aumentar para Derrota Mandatória.', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-PROC-003', CATEGORIA: 'Erro de procedimento', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Reportar resultado incorretamente; chegar 5 minutos ou mais atrasado; abandonar evento sem informar; jogar contra o oponente errado.', GATILHO_DO_SISTEMA: 'erro de procedimento gravíssimo', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Corrigir o procedimento do evento quando possível.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-UC-001', CATEGORIA: 'Conduta antiesportiva', SEVERIDADE: 'Leve', SITUAÇÃO: 'Xingar na área de torneio; deixar pouco lixo; causar atritos; tocar/mover cartas do oponente repetidamente sem autorização; atrapalhar partida.', GATILHO_DO_SISTEMA: 'conduta inadequada sem efeito no funcionamento do evento', PENALIDADE_NÍVEL_1: 'Advertência', PENALIDADE_NÍVEL_2: 'Advertência', CORREÇÃO: 'Interromper a conduta e orientar o jogador/espectador.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-UC-002', CATEGORIA: 'Conduta antiesportiva', SEVERIDADE: 'Grave', SITUAÇÃO: 'Deixar muito lixo; não seguir orientação de funcionários; seguir regra de modo a violar seu espírito; intimidar/distraír para manipular partida; recusar assinatura; jogadas legais sem progresso para manipular tempo; jogo lento para manipular tempo.', GATILHO_DO_SISTEMA: 'conduta afeta funcionamento ou causa angústia', PENALIDADE_NÍVEL_1: 'Derrota Mandatória', PENALIDADE_NÍVEL_2: 'Derrota Mandatória', CORREÇÃO: 'Interromper a conduta e registrar a penalidade.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-UC-003', CATEGORIA: 'Conduta antiesportiva', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Danos à área de torneio; influenciar resultado por meios aleatórios/suborno/extorsão; agressão; ameaçar/insultar funcionário; roubo; calúnias ou insultos.', GATILHO_DO_SISTEMA: 'conduta com grande impacto/confronto', PENALIDADE_NÍVEL_1: 'Desqualificação', PENALIDADE_NÍVEL_2: 'Desqualificação', CORREÇÃO: 'Interromper a conduta e seguir o procedimento de desqualificação.', ESCALAÇÃO_DESVIO: '', OBSERVAÇÃO: '' },
  { CARD_ID: 'TCG-CHEAT-001', CATEGORIA: 'Trapaça', SEVERIDADE: 'Gravíssimo', SITUAÇÃO: 'Comprar cartas a mais; retirar cartas do descarte para mão/baralho; oferecer compensação para ceder; alterar resultado após partida; cartas marcadas intencionalmente; mentir a funcionários; ajustar marcadores arbitrariamente; enganar oponente para provocar erro; manipular resultado aleatório; arranjar baralho ilegalmente a favor.', GATILHO_DO_SISTEMA: 'infração intencional buscando vantagem desleal', PENALIDADE_NÍVEL_1: 'Desqualificação', PENALIDADE_NÍVEL_2: 'Desqualificação', CORREÇÃO: 'Interromper a situação e encaminhar ao Juiz Principal para determinação.', ESCALAÇÃO_DESVIO: 'A intenção deve ser cuidadosamente considerada; se não intencional, esta penalidade não deve ser aplicada.', OBSERVAÇÃO: '' }
];

const db = decisionCards.map((card) => {
  const rawKeywords = [
    card.SITUAÇÃO,
    card.GATILHO_DO_SISTEMA,
    card.CATEGORIA,
    card.OBSERVAÇÃO,
    card.CORREÇÃO,
    ...(keywordAliases[card.CARD_ID] || [])
  ]
    .flatMap((value) => String(value || '').split(/[;,.]/))
    .map((item) => normalizeText(item).trim())
    .filter(Boolean);

  const keywords = Array.from(new Set(rawKeywords.filter((keyword) => keyword.length > 2)));

  return {
    id: card.CARD_ID,
    keywords,
    category: card.CATEGORIA,
    severity: card.SEVERIDADE,
    levelOne: card.PENALIDADE_NÍVEL_1,
    levelTwo: card.PENALIDADE_NÍVEL_2,
    fix: card.CORREÇÃO,
    checks: [
      `O caso corresponde a: ${card.GATILHO_DO_SISTEMA}?`,
      `Houve impacto imediato no estado do jogo?`,
      `A infração foi intencional, repetida ou teve vantagem clara?`
    ],
    raw: card
  };
});

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
const cardSuggestions = document.querySelector('#cardSuggestions');
const playerSelect = document.querySelector('#playerSelect');
const notesInput = document.querySelector('#notes');
const analyzeBtn = document.querySelector('#analyzeBtn');
const resultPanel = document.querySelector('#resultPanel');
const resultModalOverlay = document.querySelector('#resultModalOverlay');
const closeResultModalBtn = document.querySelector('#closeResultModal');
const repeatToggle = document.querySelector('#repeat');
const intentionalToggle = document.querySelector('#intentional');
const toggleSetupBtn = document.querySelector('#toggleSetupBtn');
const setupBody = document.querySelector('#setupBody');
const matchSummary = document.querySelector('#matchSummary');
const resultTitle = document.querySelector('#resultTitle');
const categoryBadge = document.querySelector('#categoryBadge');
const severityBadge = document.querySelector('#severityBadge');
const levelOne = document.querySelector('#levelOne');
const levelTwo = document.querySelector('#levelTwo');
const fixText = document.querySelector('#fixText');
const escalationText = document.querySelector('#escalationText');
const observationText = document.querySelector('#observationText');
const situationText = document.querySelector('#situationText');
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

function renderCardSuggestions() {
  const query = normalizeText(incidentInput.value).trim();
  if (query.length < 2) {
    cardSuggestions.innerHTML = '';
    cardSuggestions.classList.remove('is-visible');
    return;
  }

  const terms = query.split(/\s+/).filter((term) => term.length > 1);
  const matches = decisionCards
    .map((card) => {
      const searchable = normalizeText(`${card.CARD_ID} ${card.CATEGORIA} ${card.SITUAÇÃO} ${card.GATILHO_DO_SISTEMA}`);
      const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
      return { card, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ card }) => card);

  cardSuggestions.innerHTML = '';
  matches.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'card-suggestion';
    button.setAttribute('role', 'option');

    const title = document.createElement('strong');
    title.textContent = `${card.CARD_ID} · ${card.CATEGORIA} · ${card.SEVERIDADE}`;
    const description = document.createElement('span');
    description.textContent = card.SITUAÇÃO;
    button.append(title, description);

    button.addEventListener('click', () => {
      incidentInput.value = card.SITUAÇÃO;
      cardSuggestions.innerHTML = '';
      cardSuggestions.classList.remove('is-visible');
      incidentInput.focus();
    });

    cardSuggestions.appendChild(button);
  });

  cardSuggestions.classList.toggle('is-visible', matches.length > 0);
}

function matchRule(text) {
  const normalized = normalizeText(text);
  const tokens = new Set(normalized.split(/\s+/).filter((token) => token.length > 2));

  if (!normalized.trim()) {
    return null;
  }

  const mentionsPrizeSetup = /(premio|premios|carta[s]? premio|carta[s]? de premio)/.test(normalized)
    && /(nao|não).*(separou|estabeleceu|colocou)/.test(normalized);

  if (mentionsPrizeSetup) {
    const prizeCardId = /(antes de qualquer procura|nenhuma procura no baralho|antes de procurar|antes da procura)/.test(normalized)
      ? 'TCG-GAME-002'
      : /(3|tres|três|tres ou mais|três ou mais|mais de duas|mais de 2).*(procura|busca|vezes|vez)/.test(normalized)
      || /(procura|busca|vezes|vez).*(3|tres|três|tres ou mais|três ou mais|mais de duas|mais de 2)/.test(normalized)
      ? 'TCG-GAME-016'
      : 'TCG-GAME-011';

    const prizeRule = db.find((item) => item.id === prizeCardId);
    if (prizeRule) return prizeRule;
  }

  const exactCards = decisionCards.filter((card) => [card.SITUAÇÃO, card.GATILHO_DO_SISTEMA]
    .some((value) => normalizeText(value).trim() === normalized));
  if (exactCards.length === 1) {
    return db.find((item) => item.id === exactCards[0].CARD_ID) || null;
  }

  if (exactCards.length > 1 && exactCards.every((card) => normalizeText(card.GATILHO_DO_SISTEMA).trim() === normalized)) {
    return null;
  }

  const directAliasMap = [
    { match: /(antes do evento|antes de comecar o evento|antes de iniciar o evento|verificacao antes do evento|problema descoberto antes do jogo)/, id: 'TCG-MARK-003' },
    { match: /(premio|premios|carta[s]? premio|carta[s]? de premio).*(nao|não).*(estabeleceu|separou|colocou).*(3|tres|três).*(procura|busca)/, id: 'TCG-GAME-016' },
    { match: /(premio|premios|carta[s]? premio|carta[s]? de premio).*(nao|não).*(estabeleceu|separou|colocou).*(procura|busca).*(3|tres|três)/, id: 'TCG-GAME-016' },
    { match: /(premio|premios|carta[s]? premio|carta[s]? de premio).*(nao|não).*(estabeleceu|separou|colocou).*(uma procura|uma busca|procurou uma vez)/, id: 'TCG-GAME-011' },
    { match: /(premio|premios|carta[s]? premio|carta[s]? de premio).*(nao|não).*(estabeleceu|separou|colocou).*(depois de começar|depois de iniciar|durante o jogo)/, id: 'TCG-GAME-011' },
    { match: /(nao|não).*(estabeleceu|separou|colocou).*(premio|premios|carta[s]? premio|carta[s]? de premio).*(3|tres|três).*(procura|busca)/, id: 'TCG-GAME-016' },
    { match: /(nao|não).*(estabeleceu|separou|colocou).*(premio|premios|carta[s]? premio|carta[s]? de premio).*(uma procura|uma busca|procurou uma vez)/, id: 'TCG-GAME-011' },
    { match: /(nao|não).*(estabeleceu|separou|colocou).*(premio|premios|carta[s]? premio|carta[s]? de premio).*(depois de começar|depois de iniciar|durante o jogo)/, id: 'TCG-GAME-011' },
    { match: /(atacou|ataque|declarou ataque).*(energia).*(necessaria|necessario|suficiente|insuficiente)/, id: 'TCG-GAME-004' },
    { match: /(jogou|colocou).*(2|duas|mais de uma).*(energia)/, id: 'TCG-GAME-007' },
    { match: /(nao|não).*(revelou|mostrou).*(carta)/, id: 'TCG-GAME-001' },
    { match: /(premio|premios).*(nao|não).*(colocou|estabeleceu)/, id: 'TCG-GAME-002' },
    { match: /(apoiador).*(descarte).*(nao|não)/, id: 'TCG-GAME-003' },
    { match: /(moeda).*(queimado|queimadura).*(nao|não)/, id: 'TCG-GAME-005' },
    { match: /(topo|premio|prêmio).*(revelou|mostrou|virou)/, id: 'TCG-GAME-006' },
    { match: /(apoiador|suporte).*(indevido|ilegal|sem efeito|invalido|nao permitido)/, id: 'TCG-GAME-015' },
    { match: /(comprou|pegou).*(2|duas|mais de 1|uma carta a mais|carta a mais).*(cartas|carta)/, id: 'TCG-GAME-008' },
    { match: /(embaralhou|misturou).*(mao).*(deck|baralho)/, id: 'TCG-GAME-017' },
    { match: /(padrao perceptivel|padrao visivel|padr[aã]o perceptivel|padr[aã]o visivel|marca perceptivel)/, id: 'TCG-MARK-002' },
    { match: /(carta marcada|cartas marcadas|capa marcada|capas marcadas)/, id: 'TCG-MARK-001' },
    { match: /(jogo lento|demora|lento|atraso de jogo)/, id: 'TCG-PACE-001' },
    { match: /(trapa[açc]a|fraude|enganar|vantagem indevida|manipular resultado)/, id: 'TCG-CHEAT-001' }
  ];

  const directMatch = directAliasMap.find(({ match }) => match.test(normalized));
  if (directMatch) {
    const found = db.find((item) => item.id === directMatch.id);
    if (found) return found;
  }

  let candidates = [];

  for (const item of db) {
    let directMatches = 0;
    let score = 0;

    for (const keyword of item.keywords) {
      if (normalized.includes(keyword)) {
        directMatches += 1;
        score += 25;
        continue;
      }

      const keywordTokens = new Set(keyword.split(/\s+/).filter((token) => token.length > 2));
      const overlap = [...keywordTokens].filter((token) => tokens.has(token));
      if (overlap.length > 0) {
        score += overlap.length * 4;
      }
    }

    if (directMatches > 0 || score >= 26) {
      candidates.push({
        item,
        score,
        severityRank: ['Leve', 'Grave', 'Gravíssimo', 'Antes do evento'].indexOf(item.severity)
      });
    }
  }

  if (!candidates.length) {
    const explicitFallbacks = [
      { matcher: /(apoiador|suporte).*(indevido|ilegal|sem efeito|invalido)/, id: 'TCG-GAME-015' },
      { matcher: /(embaralhou|misturou).*(m[aã]o|mao).*(deck|baralho)/, id: 'TCG-GAME-017' },
      { matcher: /(comprou|pegou).*(2|duas|mais de 1|uma carta a mais|carta a mais).*(cartas|carta)/, id: 'TCG-GAME-008' },
      { matcher: /(carta marcada|cartas marcadas|padrao perceptivel|padrao visivel|padr[aã]o perceptivel)/, id: 'TCG-MARK-002' },
      { matcher: /(jogo lento|demora|lento|atraso de jogo)/, id: 'TCG-PACE-001' }
    ];

    const fallback = explicitFallbacks.find(({ matcher }) => matcher.test(normalized));
    if (fallback) {
      return db.find((item) => item.id === fallback.id) || null;
    }

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
    escalationText.textContent = '—';
    observationText.textContent = '—';
    situationText.textContent = '—';
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
    escalationText.textContent = '—';
    observationText.textContent = '—';
    situationText.textContent = 'Descreva também quando a ocorrência foi descoberta: antes do evento ou durante a partida.';
    return;
  }

  const repetitionCount = getRepetitionCount(involvedPlayer, rule.category);
  const isRepeat = repeatToggle.checked || repetitionCount > 0;

  if (isRepeat) {
    repeatToggle.checked = true;
  }

  const resolved = applyEscalation(rule);

  resultTitle.textContent = rule.id;
  categoryBadge.textContent = resolved.category;
  severityBadge.textContent = resolved.severity;
  levelOne.textContent = resolved.levelOne;
  levelTwo.textContent = resolved.levelTwo;
  fixText.textContent = resolved.fix;
  escalationText.textContent = rule.raw?.ESCALAÇÃO_DESVIO || '—';
  observationText.textContent = rule.raw?.OBSERVAÇÃO || '—';
  situationText.textContent = rule.raw?.SITUAÇÃO || '—';

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

toggleSetupBtn.addEventListener('click', () => {
  const isCollapsed = setupBody.classList.toggle('is-collapsed');
  toggleSetupBtn.textContent = isCollapsed ? 'Expandir' : 'Minimizar';
  toggleSetupBtn.setAttribute('aria-expanded', String(!isCollapsed));
});

function openResultModal() {
  resultModalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeResultModal() {
  resultModalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

analyzeBtn.addEventListener('click', () => {
  analyze();
  openResultModal();
});

closeResultModalBtn.addEventListener('click', closeResultModal);

resultModalOverlay.addEventListener('click', (event) => {
  if (event.target === resultModalOverlay) {
    closeResultModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && resultModalOverlay.classList.contains('is-open')) {
    closeResultModal();
  }
});
incidentInput.addEventListener('input', renderCardSuggestions);
incidentInput.addEventListener('focus', renderCardSuggestions);
incidentInput.addEventListener('blur', () => {
  window.setTimeout(() => cardSuggestions.classList.remove('is-visible'), 150);
});
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
