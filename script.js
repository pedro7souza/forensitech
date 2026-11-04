const SHEET_URL = "";
let S = {};
try {
  S = JSON.parse(localStorage.getItem("ft-state") || "{}");
} catch (e) {}
S.ans = S.ans || {};
const sv = () => {
  try {
    localStorage.setItem("ft-state", JSON.stringify(S));
  } catch (e) {}
};
const SU = {
  A: { g: "SUSPEITA A", n: "Katerina", r: "Assistente de laboratório · testemunha", i: "suspect-a.png", d: "Fiquei até tarde organizando os materiais da feira. Por volta das 20h45 abri a porta do laboratório e vi o professor caído ao lado da bancada, bem à vista. Entrei em choque, saí correndo e chamei a segurança. Eu juro que não toquei em nada, nem no armário do protótipo." },
  B: { g: "SUSPEITO B", n: "Rafael", r: "Estagiário de química", i: "suspect-b.png", d: "Usei aquele copo à tarde, durante o experimento com o professor, só para tomar água. Saí às 18h e minha mãe foi me buscar, ela pode confirmar. Só voltei ao laboratório no dia seguinte, quando já estava tudo isolado. Não faço ideia do que aconteceu depois que eu saí." },
  C: { g: "SUSPEITA C", n: "Bianca", r: "Monitora de ciências · tem a chave do laboratório", i: "suspect-c.png", d: "Sim, eu estava no laboratório naquela noite e não vou negar. Tinha discutido com o professor na semana passada por causa do crédito do projeto e fui conversar com ele de novo. A conversa ficou tensa, ele estava muito nervoso. Fui embora logo depois, mas não olhei o relógio e não lembro bem o horário. Tenho a chave porque sou monitora, mas não levei nada, e não sei dizer se o protótipo ainda estava no armário." },
};
const stages = [
  { nav: "Ficha da ocorrência", title: "O caso do crime no laboratório", label: "RELATÓRIO INICIAL", html: `
 <p class="hero-label">CASO PT-04/27 · ACESSO RESTRITO</p><h1>Perícia 4.0 — O caso do crime no laboratório</h1><p class="lead">Um professor e cientista foi encontrado morto no laboratório da escola. Um protótipo valioso desapareceu. Não há sinais de arrombamento. Sua equipe foi chamada para analisar as evidências e descobrir o que aconteceu.</p>
 <div class="facts"><div class="fact"><strong>20:40</strong><span>HORÁRIO ESTIMADO</span></div><div class="fact"><strong>01</strong><span>PROTÓTIPO DESAPARECIDO</span></div><div class="fact"><strong>03</strong><span>PESSOAS INVESTIGADAS</span></div></div>
 <div class="card"><span class="label">MISSÃO DA EQUIPE</span><p>Examine cada pista, separe fatos de suposições e escolha quem acredita ser responsável. A conclusão oficial será revelada no final.</p></div>
 <span class="label">IDENTIFICAÇÃO DA EQUIPE (OPCIONAL)</span><input id="teamName" class="text-input" placeholder="Digite o nome da equipe">` },
  { nav: "Cena e fotografias", title: "Análise da cena", label: "EVIDÊNCIA FÍSICA", html: `
 <h1>O laboratório</h1><p class="lead">A porta não apresenta sinais de força. O corpo foi encontrado perto da bancada central, e o protótipo não estava em seu compartimento habitual.</p>
 <div class="grid two"><div class="card"><img class="ph" src="porta.jpg" alt="Porta do laboratório" onclick="zoomImg(this.src)"><h3>E-01 · Entrada</h3><p>Fechadura intacta; acesso provavelmente feito por alguém com autorização ou chave.</p></div><div class="card"><img class="ph" src="pegadas.jpg" alt="Marcas de calçado no piso" onclick="zoomImg(this.src)"><h3>E-03 · Piso</h3><p>Uma marca de calçado foi registrada, mas não é suficiente para identificar uma pessoa sozinha.</p></div></div>
 ${Q("q1", "O que a ausência de arrombamento sugere?", ["Com certeza, foi alguém da equipe.", "Não aconteceu crime.", "O acesso autorizado é uma possibilidade, mas não prova quem entrou.", "A porta nunca foi trancada, então ninguém precisa ser investigado."], 2, "A ausência de arrombamento é uma pista, não uma identificação definitiva.")}` },
  { nav: "Impressões digitais", title: "Análise papiloscópica", label: "EVIDÊNCIA E-02", html: `
 <h1>Impressão digital no copo</h1><p class="lead">O laboratório de análise encontrou uma impressão compatível com o suspeito B. Porém, a impressão não informa quando o contato aconteceu.</p><div class="card"><span class="label">LAUDO SIMULADO</span><div class="facts"><div class="fact"><strong>B</strong><span>COMPATIBILIDADE</span></div><div class="fact"><strong>Não</strong><span>DATA DO CONTATO</span></div><div class="fact"><strong>Parcial</strong><span>CONTEXTO</span></div></div><p>A presença de uma impressão pode resultar de um contato anterior e não demonstra, por si só, participação no crime.</p></div>
 ${Q("q2", "Qual é a interpretação mais cuidadosa?", ["A digital é relevante, mas precisa ser relacionada a outras evidências.", "O suspeito B é culpado, pois sua digital estava no copo.", "A digital deve ser ignorada.", "A digital prova o horário em que B esteve na sala."], 0, "Correto: a evidência precisa de contexto e corroboração.")}` },
  { nav: "Vestígios biológicos", title: "Análise de DNA", label: "EVIDÊNCIA E-03", html: `
 <h1>O vestígio biológico</h1><p class="lead">Um vestígio biológico apresentou compatibilidade com o suspeito C. A análise não consegue determinar sozinha quando ou por que o material foi deixado.</p><div class="evidence"><b>COLETA</b><p>Material recolhido de uma área próxima à bancada.</p></div><div class="evidence"><b>RESULTADO</b><p>Compatibilidade com C no cenário simulado.</p></div><div class="evidence"><b>LIMITE</b><p>O resultado não prova, isoladamente, a participação no crime ou o momento do contato.</p></div>
 ${Q("q3", "Uma correspondência de DNA prova automaticamente culpa?", ["Sim, em qualquer situação.", "Sim, porque DNA nunca pode ser contaminado.", "Só se o DNA estiver em qualquer objeto da escola.", "Não. É preciso avaliar a origem, o contexto e outras provas."], 3, "Isso mesmo. Um vestígio deve ser interpretado com contexto.")}` },
  { nav: "Perícia digital", title: "Registros de segurança", label: "EVIDÊNCIA DIGITAL", html: `
 <h1>O que mostram as câmeras?</h1><p class="lead">Os registros de segurança têm uma interrupção incomum perto do horário estimado. A auditoria indica que um trecho pode ter sido alterado, mas ainda é necessário identificar quem fez isso.</p><div class="grid"><div class="card"><span class="label">19:58</span><h3>Registro normal</h3><p>Movimentação no corredor do laboratório.</p></div><div class="card"><span class="label">20:12</span><h3>Intervalo irregular</h3><p>Há uma lacuna no vídeo e divergência entre cópias do arquivo.</p></div></div><div class="panel vid"><span class="label">REGISTRO DE SEGURANÇA · CÂMERA 01 (SIMULADO)</span><video src="camera.mp4" poster="camera.jpg" controls playsinline muted preload="metadata"></video></div><div class="warning">A alteração do arquivo é uma pista de possível ocultação, mas não identifica automaticamente o responsável.</div>
 ${Q("q4", "Qual seria o próximo passo técnico?", ["Acusar quem aparece por último no vídeo.", "Comparar cópias, metadados, logs de acesso e cadeia de custódia.", "Apagar as cópias divergentes para evitar confusão.", "Considerar que a câmera simplesmente quebrou."], 1, "Correto: preserve os arquivos e investigue os registros de acesso.")}` },
  { nav: "Reconstrução da cena", title: "Reconstrução 3D", label: "ANÁLISE ESPACIAL", html: `
 <h1>É possível ver o corpo da porta?</h1><p class="lead">A equipe reconstruiu a posição da bancada e dos equipamentos. Do ponto em que a testemunha disse ter parado, parte da área onde o corpo foi encontrado ficava obstruída.</p><div class="card"><span class="label">RESULTADO DA RECONSTRUÇÃO</span><h3>Campo de visão parcialmente bloqueado</h3><p>A testemunha afirmou que viu claramente o corpo assim que chegou à porta. A reconstrução coloca essa declaração em dúvida e torna necessário esclarecer a contradição.</p></div>
 ${Q("q5", "Por que essa informação é importante?", ["Prova definitivamente que a testemunha cometeu o crime.", "Não tem importância para a investigação.", "Contradiz o depoimento e exige investigação, sem provar culpa isoladamente.", "Mostra que a testemunha estava dentro da sala."], 2, "Exato. A contradição é importante, mas deve ser combinada com outras pistas.")}` },
  { nav: "Seu veredito", title: "Deliberação da equipe", label: "VOTAÇÃO", html: `
 <h1>Quem você considera responsável?</h1><p class="lead">Revise as pistas antes de registrar sua hipótese. Esta votação é parte de uma simulação escolar e não representa uma acusação real.</p>${suspects()}<div class="question"><h3>Seu veredito</h3><label class="option"><input type="radio" name="verdict" value="A"> Suspeita A — Katerina</label><label class="option"><input type="radio" name="verdict" value="B"> Suspeito B — Rafael</label><label class="option"><input type="radio" name="verdict" value="C"> Suspeita C — Bianca</label><label class="option"><input type="radio" name="verdict" value="inconclusivo"> As evidências ainda são inconclusivas</label><button class="btn primary" onclick="submitVote()">Registrar meu veredito</button><p id="voteFeedback" class="feedback"></p></div>` },
  { nav: "Resultado do caso", title: "Caso encerrado", label: "REVELAÇÃO FINAL", html: `
 <p class="hero-label">RELATÓRIO FINAL · PT-04/27</p><h1>A verdade por trás do caso</h1><div id="finalView"></div><div class="grid"><div class="card"><h3>Por que não B?</h3><p>A impressão digital poderia ter sido deixada antes e não prova, sozinha, participação no crime.</p></div><div class="card"><h3>Por que não C?</h3><p>O DNA não estabelece sozinho quando ou em que circunstância o material foi deixado.</p></div></div><div class="warning">Este é o desfecho fictício da atividade. Em uma investigação real, nenhuma pessoa deve ser considerada culpada apenas com base nessas pistas isoladas.</div><h2>Resultado da votação neste dispositivo</h2><div id="voteResults"></div><button class="btn secondary" onclick="resetVote()">Limpar respostas deste navegador</button>` },
];
let current = 0;
const meta = [
  ["Ficha da Ocorrência", "Dados iniciais do caso", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/><path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/></svg>'],
  ["Registro Fotográfico", "Imagens do local", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/><path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/></svg>'],
  ["Datiloscopia", "Impressões digitais", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"/><path d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332q0 .613-.066 1.221A.5.5 0 0 1 6 8.447q.06-.555.06-1.115zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8m-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329"/><path d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334m.3 1.67a.5.5 0 0 1 .449.546 10.7 10.7 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.7 9.7 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"/><path d="M3.902 4.222a5 5 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 4 4 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556m6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705M3.68 5.842a.5.5 0 0 1 .422.568q-.044.289-.044.59c0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.5 6.5 0 0 0 3.058 7q0-.375.054-.736a.5.5 0 0 1 .568-.422m8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.5 10.5 0 0 0 .584-2.678.5.5 0 0 1 .54-.456"/><path d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865m-.89 1.257a.5.5 0 0 1 .04.706A5.48 5.48 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346m12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49"/></svg>'],
  ["Biologia Forense", "Perfil genético", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/></svg>'],
  ["Perícia Digital", "Rastreamento e logs", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/></svg>'],
  ["Reconstrução 3D", "Ambiente interativo", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>'],
  ["Veredito", "Decisão da equipe", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/></svg>'],
  ["Resultado", "Encerramento", '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z"/></svg>']
];
const nav = document.getElementById("stageNav"), dots = document.getElementById("dots");
stages.forEach((s, i) => {
  const b = document.createElement("button");
  b.innerHTML = `<em>${meta[i][2]}</em><div><b>${String(i + 1).padStart(2, "0")} ${meta[i][0]}</b><small>${meta[i][1]}</small></div>`;
  b.onclick = () => showStage(i);
  nav.appendChild(b);
  dots.appendChild(document.createElement("i"));
});
function dna() {
  let a = "", b = "", r = "";
  for (let i = 0; i <= 40; i++) {
    const y = 6 + i * 6, d = Math.sin(i / 3) * 50, x1 = 150 + d, x2 = 150 - d;
    a += (i ? "L" : "M") + x1.toFixed(1) + " " + y;
    b += (i ? "L" : "M") + x2.toFixed(1) + " " + y;
    if (i % 2) r += `<line x1="${x1.toFixed(1)}" y1="${y}" x2="${x2.toFixed(1)}" y2="${y}"/>`;
  }
  return `<div class="panel viz"><span class="label" style="color: #1e5aa8; font-weight: 700; letter-spacing: 1px; display: block; margin-bottom: 15px;">VISUALIZAÇÃO 3D DO DNA</span><svg viewBox="0 0 300 250" class="dna"><g fill="none" stroke-linecap="round"><path d="${a}" stroke="#00e5ff" stroke-width="4"/><path d="${b}" stroke="#4dabf7" stroke-width="4"/><g stroke="#b0e0ff" stroke-width="1.5" opacity=".8">${r}</g></g></svg></div>`;
}
function showStage(i) {
  current = Math.max(0, Math.min(stages.length - 1, i));
  const s = stages[current];
  document.getElementById("stageNumber").textContent = `ETAPA ${String(current + 1).padStart(2, "0")}`;
  document.getElementById("stageContent").innerHTML = `<p class="hero-label">${s.label}</p>${inject(s.html)}`;
  document.getElementById("progressBar").style.width = ((current + 1) / stages.length) * 100 + "%";
  document.getElementById("progressText").textContent = `Etapa ${current + 1} de ${stages.length}`;
  [...nav.children].forEach((b, j) => b.classList.toggle("active", j === current));
  [...dots.children].forEach((d, j) => d.classList.toggle("on", j <= current));
  document.getElementById("backBtn").disabled = current === 0;
  document.getElementById("nextBtn").textContent = current === stages.length - 1 ? "↻ Voltar ao início" : "Próxima etapa →";
  document.getElementById("nextBtn").onclick = () => showStage(current === stages.length - 1 ? 0 : current + 1);
  document.getElementById("backBtn").onclick = () => showStage(current - 1);
  clearInterval(window._rot);
  restore();
  if (current === stages.length - 1) renderVotes();
  if (current === 2) initFinger();
  if (current === 5) init3D();
}
function check(name, c, msg) {
  const ch = document.querySelector(`input[name="${name}"]:checked`), fb = document.getElementById("fb-" + name);
  if (!ch) { fb.textContent = "Selecione uma opção primeiro."; return; }
  const ok = +ch.value === c;
  S.ans[name] = { v: +ch.value, ok };
  sv();
  fb.textContent = ok ? msg : "Revise as pistas e tente novamente.";
}
function submitVote() {
  const sel = document.querySelector('input[name="verdict"]:checked'), fb = document.getElementById("voteFeedback");
  if (!sel) { fb.textContent = "Escolha uma opção antes de registrar."; return; }
  S.verdict = sel.value;
  sv();
  fb.textContent = SHEET_URL ? "Veredito registrado e enviado. Avance para ver o resultado." : "Veredito registrado. Avance para ver o resultado.";
  sendVote();
}
function renderVotes() {
  renderFinal();
  const el = document.getElementById("voteResults");
  if (!el) return;
  const v = S.verdict;
  el.innerHTML = v ? `<p>Veredito salvo: <strong>${v === "inconclusivo" ? "Evidências inconclusivas" : SU[v].n}</strong>${S.team ? " — Equipe: " + escapeHtml(S.team) : ""}</p>` : "<p>Nenhum veredito foi registrado neste navegador.</p>";
}
function resetVote() {
  if (!confirm("Limpar todas as respostas e o veredito deste navegador?")) return;
  S = { ans: {}, id: S.id };
  sv();
  setTeam();
  showStage(0);
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
function inject(h) {
  if (current === 3) return h + dna();
  const v = { 2: finger, 5: scene3d }[current];
  return v ? h.replace('<div class="question">', v() + '<div class="question">') : h;
}
function finger() {
  let r = "";
  for (let i = 1; i <= 10; i++) {
    const rx = 10 + i * 12.5, ry = 8 + i * 13, d = i % 3 ? "" : `stroke-dasharray="${40 + i * 9} 6 ${20 + i * 5} 9"`;
    r += `<path ${d} d="M${150 - rx} 190A${rx} ${ry} 0 1 1 ${150 + rx} 190"/>`;
  }
  return `<div class="panel viz fp"><div class="vh"><span>DIGITAL</span><span class="cy">● VISUALIZAÇÃO</span></div><svg viewBox="0 0 300 210" id="fpSvg"><g class="ridges" fill="none" stroke-linecap="round">${r}</g><circle cx="150" cy="160" r="3" fill="#cfefff"/><g id="minut" style="display:none">${[[104, 122, "Bifurcação"],[196, 96, "Fim de crista"],[150, 60, "Ilhota"],[78, 150, "Bifurcação"],[224, 150, "Fim de crista"]].map((m) => `<circle class="mn" cx="${m[0]}" cy="${m[1]}" r="7" data-t="${m[2]}"/>`).join("")}</g><line x1="0" y1="190" x2="300" y2="190" stroke="#3cc8ff" opacity=".5"/><rect id="scan" x="0" y="0" width="300" height="2"/></svg><div class="tb"><button class="btn secondary" id="fpScan">▶ Escanear</button><button class="btn secondary" id="fpMin">◎ Minúcias</button><button class="btn secondary" id="fpZoom">⤢ Ampliar</button></div><p class="cap" id="fpInfo">AMOSTRA ILUSTRATIVA · COP0-01</p></div>`;
}
function initFinger() {
  const svg = document.getElementById("fpSvg"), sc = document.getElementById("scan"), mi = document.getElementById("minut"), inf = document.getElementById("fpInfo");
  document.getElementById("fpScan").onclick = () => {
    sc.classList.remove("go"); void sc.getBoundingClientRect(); sc.classList.add("go"); svg.classList.add("lit");
    setTimeout(() => svg.classList.remove("lit"), 2600); inf.textContent = "VARREDURA CONCLUÍDA · PADRÃO: LAÇO (SIMULADO)";
  };
  document.getElementById("fpMin").onclick = () => {
    const on = mi.style.display === "none"; mi.style.display = on ? "" : "none";
    inf.textContent = on ? "Clique em um ponto para identificar a minúcia." : "AMOSTRA ILUSTRATIVA · COP0-01";
  };
  document.getElementById("fpZoom").onclick = () => svg.classList.toggle("big");
  mi.querySelectorAll(".mn").forEach((c) => (c.onclick = () => { inf.textContent = "MINÚCIA: " + c.dataset.t.toUpperCase() + " · uso ilustrativo"; }));
}
function box(x, y, w, d, h, c) {
  const t = `position:absolute;background:${c};border:1px solid #8fdcf5;`,
    f = (a, b, ww, hh, tr, br) => `<i style="${t}width:${ww}px;height:${hh}px;left:${a}px;top:${b}px;transform:${tr};${br || ""}"></i>`;
  return `<div class="bx" style="transform:translate3d(${x}px,${y}px,0)">${f(-w / 2, -d / 2, w, d, `translateZ(${h}px)`)}${f(-w / 2, d / 2 - h / 2, w, h, `translateZ(${h / 2}px) rotateX(90deg)`, "filter:brightness(.7)")}${f(-w / 2, -d / 2 - h / 2, w, h, `translateZ(${h / 2}px) rotateX(90deg)`, "filter:brightness(.6)")}${f(-w / 2 - h / 2, -d / 2, h, d, `translateZ(${h / 2}px) rotateY(90deg)`, "filter:brightness(.65)")}${f(w / 2 - h / 2, -d / 2, h, d, `translateZ(${h / 2}px) rotateY(90deg)`, "filter:brightness(.8)")}</div>`;
}
function scene3d() {
  const mk = (n, x, y, z) => `<b class="mk" data-n="${n}" style="left:${x}px;top:${y}px;--mz:${z}px">${n}</b>`;
  return `<div class="panel viz s3"><div class="tb"><button class="btn secondary" id="bAuto">Girar</button><button class="btn secondary" id="bStep">Girar ↷</button><button class="btn secondary" id="bCenter">Centralizar vista</button><label class="zl">ZOOM <input type="range" id="zoom3d" min="60" max="180" value="110"> <span id="zv">110%</span></label></div><div class="st3d" id="st3d"><span class="tg l">LABORATÓRIO · MODELO 3D</span><span class="tg r" id="readout3d"></span><div class="world"><div class="floor"></div><div class="wall" style="left:-200px;top:-210px;width:400px;height:120px;transform:translateZ(60px) rotateX(90deg)"><div class="win"></div></div><div class="wall" style="left:-260px;top:-150px;width:120px;height:300px;transform:translateZ(60px) rotateY(90deg)"></div><div class="glow"></div><div class="body"></div><div class="head"></div><div class="shoe"></div><div class="cup"></div>${box(0, -10, 130, 64, 24, "#5f7f95")}${box(115, 5, 100, 70, 18, "#4a6a82")}${mk(1, 0, -10, 46)}${mk(2, -100, -5, 30)}${mk(3, -10, 95, 28)}${mk(4, 115, 5, 40)}</div></div><p class="cap" id="info3d">Arraste para girar · role para dar zoom · clique nos marcadores 1–4 para ver as evidências.</p></div>`;
}
function init3D() {
  const st = document.getElementById("st3d"), w = st.querySelector(".world"), ro = document.getElementById("readout3d"), zs = document.getElementById("zoom3d"), inf = document.getElementById("info3d"), bA = document.getElementById("bAuto");
  let a = -35, z = 110, drag = false, lx = 0, mv = 0;
  const up = () => {
    w.style.setProperty("--a", a + "deg");
    w.style.setProperty("--z", z / 100);
    ro.textContent = `ÂNGULO: ${Math.round(((a % 360) + 360) % 360)}° · ZOOM: ${z}%`;
    zs.value = z;
    document.getElementById("zv").textContent = z + "%";
  };
  const M = {
    1: "E-02 · Bancada: copo recolhido para análise de impressões digitais.",
    2: "Posição do corpo, perto da bancada central. Parte da área fica oculta de quem está na porta.",
    3: "E-03 · Marca de calçado no piso: não identifica uma pessoa sozinha.",
    4: "E-02 · Copo com impressão digital na bancada central, compatível com o suspeito B.",
  };
  st.onpointerdown = (e) => { drag = true; lx = e.clientX; mv = 0; st.classList.add("grab"); };
  window.onpointermove = (e) => {
    if (!drag) return;
    const dx = e.clientX - lx; lx = e.clientX; mv += Math.abs(dx); a -= dx * 0.5; up();
  };
  window.onpointerup = window.onpointercancel = () => { drag = false; st.classList.remove("grab"); };
  st.onwheel = (e) => {
    if (window.matchMedia("(max-width: 800px)").matches) return;
    e.preventDefault(); z = Math.max(60, Math.min(180, z - Math.sign(e.deltaY) * 8)); up();
  };
  zs.oninput = () => { z = +zs.value; up(); };
  bA.onclick = () => {
    if (window._rot) { clearInterval(window._rot); window._rot = 0; bA.classList.remove("on"); }
    else { bA.classList.add("on"); window._rot = setInterval(() => { a += 0.7; up(); }, 30); }
  };
  document.getElementById("bStep").onclick = () => { a += 45; up(); };
  document.getElementById("bCenter").onclick = () => {
    clearInterval(window._rot); window._rot = 0; bA.classList.remove("on"); a = -35; z = 110; up();
    w.querySelectorAll(".mk").forEach((m) => m.classList.remove("sel"));
  };
  w.querySelectorAll(".mk").forEach((m) => (m.onclick = () => {
    if (mv > 5) return;
    w.querySelectorAll(".mk").forEach((x) => x.classList.remove("sel"));
    m.classList.add("sel"); inf.textContent = M[m.dataset.n];
  }));
  up();
}
function Q(id, h, o, c, m) {
  return `<div class="question"><h3>${h}</h3>${o.map((t, i) => `<label class="option"><input type="radio" name="${id}" value="${i}"> ${t}</label>`).join("")}<p class="feedback" id="fb-${id}"></p><button class="btn secondary" onclick="check('${id}',${c},'${m}')">Conferir resposta</button></div>`;
}
function suspects() {
  return `<div class="slist">${["A", "B", "C"].map((k) => {
    const u = SU[k];
    return `<div class="srow"><img src="${u.i}" alt="${u.n}"><div><span class="label">${u.g}</span><h3>${u.n}</h3><b class="role">${u.r}</b><p>“${u.d}”</p></div></div>`;
  }).join("")}</div>`;
}
function setTeam() {
  const e = document.querySelector(".st-text");
  if (e) e.textContent = (S.team || "Equipe de Perícia").toUpperCase();
}
function restore() {
  const ab = nav.children[current];
  if (ab) nav.scrollLeft = ab.offsetLeft - nav.clientWidth / 2 + ab.clientWidth / 2;
  const t = document.getElementById("teamName");
  if (t) { t.value = S.team || ""; t.oninput = () => { S.team = t.value.trim(); sv(); setTeam(); }; }
  for (const n in S.ans) {
    const r = document.querySelector(`input[name="${n}"][value="${S.ans[n].v}"]`), f = document.getElementById("fb-" + n);
    if (r) r.checked = true;
    if (f) f.textContent = S.ans[n].ok ? "Resposta correta (salva)." : "Resposta salva — revise as pistas.";
  }
  if (S.verdict) {
    const r = document.querySelector(`input[name="verdict"][value="${S.verdict}"]`), f = document.getElementById("voteFeedback");
    if (r) r.checked = true;
    if (f) f.textContent = "Veredito registrado.";
  }
}
function renderFinal() {
  const el = document.getElementById("finalView");
  if (!el) return;
  const v = S.verdict, ok = v === "A", k = SU.A, n = Object.values(S.ans).filter((a) => a.ok).length;
  const msg = !v ? "Nenhum veredito foi registrado. Volte à etapa 7 para concluir o laudo." : ok ? "Sua equipe identificou corretamente a responsável. Laudo aprovado, peritos!" : v === "inconclusivo" ? "Concluir que as evidências eram inconclusivas não se sustenta: o depoimento contraditório, a reconstrução 3D e a adulteração dos registros apontavam para uma conclusão. Um perito não pode errar — revise o caso." : `A hipótese que aponta ${SU[v].n} não se sustenta diante das evidências. Um perito não pode errar — revise as pistas e refaça o laudo.`;
  el.innerHTML = `<div class="result"><div class="rrow"><img src="${k.i}" alt="${k.n}"><div><span class="label">RESPONSÁVEL NA HISTÓRIA</span><h2>Suspeita A — ${k.n}</h2><p>Ela conhecia o laboratório e tentou ocultar sua movimentação manipulando os registros de segurança. Afirmou ter visto claramente o corpo da porta, mas a reconstrução mostrou que a visão era parcialmente obstruída.</p></div></div></div><div class="verdict ${ok ? "okv" : "badv"}"><b>${!v ? "SEM VEREDITO" : ok ? "LAUDO CONFIRMADO" : "LAUDO CONTESTADO"}</b><p>${msg}</p></div><p class="muted">Perguntas acertadas: ${n} de 5.</p>`;
}
setTeam();
function sendVote() {
  if (!SHEET_URL || !S.verdict) return;
  if (!S.id) S.id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const v = S.verdict;
  S.pending = true;
  sv();
  fetch(SHEET_URL, {
    method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ id: S.id, team: S.team || "", verdict: v, name: v === "inconclusivo" ? "Inconclusivo" : SU[v].n, acertos: Object.values(S.ans).filter((a) => a.ok).length }),
  }).then(() => { S.pending = false; sv(); }).catch(() => {});
}
window.addEventListener("online", () => { if (S.pending) sendVote(); });
function zoomImg(u) {
  const d = document.createElement("div");
  d.className = "lb"; d.innerHTML = `<img src="${u}">`; d.onclick = () => d.remove(); document.body.appendChild(d);
}
showStage(0);
