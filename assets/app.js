/* A&D Eventos · Sistema de Gestão — front-end de demonstração · NexusUp Company */
(function () {
'use strict';

/* ================= utilidades ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const brl = v => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const num = v => Number(v || 0).toLocaleString('pt-BR');
const mil = v => 'R$ ' + (v / 1000).toLocaleString('pt-BR', { minimumFractionDigits: v >= 100000 ? 0 : 1, maximumFractionDigits: 1 }) + ' mil';
const pct = v => (v * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
const ini = n => String(n).split(' ').filter(w => w.length > 2 || /^[A-Z]/.test(w)).slice(0, 2).map(p => p[0]).join('').toUpperCase();
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const agora = () => { const d = new Date(); return '25/11 ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };

const I = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><circle cx="16.5" cy="13.5" r="1.3"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  bed: '<path d="M2 20V6M2 16h20M22 20v-8a3 3 0 0 0-3-3h-9v7"/><circle cx="6.5" cy="11.5" r="2"/>',
  waves: '<path d="M2 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/>',
  ball: '<circle cx="12" cy="12" r="9.5"/><path d="m12 7.5 3.8 2.8-1.4 4.4H9.6l-1.4-4.4z"/><path d="M12 2.5v5M21.4 10.3l-5.6 0M18 19.5l-3.6-4.8M6 19.5l3.6-4.8M2.6 10.3h5.6"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  receipt: '<path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 2 2V2l-2 2-3-2-3 2-3-2-3 2-3-2z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 1.9L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-1.1z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  wpp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  store: '<path d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/>',
  cup: '<path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
  car: '<path d="M5 17h14M3 13l2-6h14l2 6v5h-3M3 13v5h3M3 13h18"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M15 8l2 2"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3.5"/>'
};
const ic = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.store}</svg>`;

/* ================= estado ================= */
const KEY = 'ad_gestao_demo_v1';
let S = null;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
if (!S || S.v !== 1 || !Array.isArray(S.setores)) S = window.AD_SEED();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* armazenamento indisponível */ } };

const PERFIS = window.AD_PERFIS;
const NOMES = { diretoria: 'Diretoria A&D', financeiro: 'Financeiro A&D', ger_hotel: 'Marcos Vinícius Araújo', ger_eventos: 'Patrícia Gomes', recepcao: 'Fernanda Costa Lima', prof_natacao: 'Rafael Nunes', prof_futebol: 'Vinícius Batista' };

let sess = null;
try { sess = JSON.parse(sessionStorage.getItem('ad_sessao')); } catch (e) { sess = null; }
const qs = new URLSearchParams(location.search);
let perfilId = qs.get('perfil') || (sess && sess.perfil) || 'diretoria';
if (!PERFIS[perfilId]) perfilId = 'diretoria';
let nomeUser = (qs.get('nome') || (sess && sess.nome) || '').replace(/[<>&"']/g, '').slice(0, 40);
function setSess() { try { sessionStorage.setItem('ad_sessao', JSON.stringify({ perfil: perfilId, nome: nomeUser, t: Date.now() })); } catch (e) { } }
setSess();
if (location.search) history.replaceState(null, '', location.pathname + location.hash);

const P = () => PERFIS[perfilId];
const userName = () => nomeUser || NOMES[perfilId];
const isAll = () => P().setores === 'all';
const canSector = id => isAll() || P().setores.includes(id);
const canMod = m => P().mods.includes(m);
const canMoney = () => P().fin || perfilId === 'ger_hotel' || perfilId === 'ger_eventos';
const isProf = () => !!P().prof;
const isDir = () => perfilId === 'diretoria';

function addLog(a) { S.log.unshift({ t: agora(), u: userName(), p: P().nome, a }); S.log = S.log.slice(0, 60); save(); }
if (qs.get('perfil')) addLog('Entrou no sistema');

/* ================= cálculos ================= */
const sec = id => S.setores.find(s => s.id === id);
const extras = id => S.lancExtras[id] || [];
const rec = s => s.fontes.reduce((a, f) => a + f[1], 0);
const visSet = () => S.setores.filter(s => canSector(s.id));
function tot(list) {
  const r = list.reduce((a, s) => a + rec(s), 0), d = list.reduce((a, s) => a + s.despesas, 0), f = list.reduce((a, s) => a + s.folha, 0);
  return { rec: r, desp: d, folha: f, lucro: r - d - f, margem: r ? (r - d - f) / r : 0 };
}
const ocupacao = () => S.quartos.filter(q => q.status === 'ocupado' || q.status === 'chegada').length / S.quartos.length;
const alunos = t => t.reduce((a, x) => a + x.alunos, 0);
const inadTot = esc2 => S.inadimplentes.filter(x => !esc2 || x.escola === esc2).reduce((a, x) => a + x.valor, 0);
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const fmtD = s => { const d = parseD(s); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); };
const WD = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const HOJE = '2026-11-25';
const ESPACOS = [
  { n: 'Salão dos Lustres', img: 'salao-lustres.jpg', c: '#f39314' },
  { n: 'Auditório', img: 'auditorio.jpg', c: '#1f5bff' },
  { n: 'Salão Multiuso', img: 'salao-multiuso.jpg', c: '#8b5cf6' },
  { n: 'Área da piscina', img: 'piscina.jpg', c: '#06a3c4' },
  { n: 'Área de churrasco', img: 'churrasqueira.jpg', c: '#e5484d' },
  { n: 'Pátio e palco', img: 'palco.jpg', c: '#16a34a' }
];
const espCor = n => (ESPACOS.find(e => e.n === n) || { c: '#5e5f66' }).c;

function alertas() {
  const a = [
    { s: 'escolas', t: '7 alunos com mensalidade atrasada', d: brl(inadTot()) + ' em aberto nas escolas', k: 'bad', l: 'Atrasado', go: canMod('natacao') ? 'natacao' : 'futebol' },
    { s: 'eventos', t: 'Evento de 06/12 sem sinal', d: 'Escola Sonho Meu · Auditório', k: 'warn', l: 'Pendente', go: 'eventos' },
    { s: 'hotel', t: '9 check-ins no hotel hoje', d: '3 já chegaram · 6 previstos', k: 'bl', l: 'Hoje', go: 'hotel' },
    { s: 'geral', t: 'Conta de água: ' + brl(2130), d: 'CAEMA · vence amanhã (26/11)', k: 'dk', l: 'Amanhã', go: 'financeiro' },
    { s: 'eventos', t: 'Evento hoje às 19h', d: 'Associação Comercial do Turu · Salão Multiuso', k: 'bl', l: 'Hoje', go: 'eventos' },
    { s: 'natacao', t: '2 mensalidades vencem hoje', d: 'Natação · cobrança automática por Pix', k: 'warn', l: 'Hoje', go: 'natacao' }
  ];
  return a.filter(x => {
    if (x.s === 'geral') return P().fin;
    if (x.s === 'escolas') return (canSector('natacao') || canSector('futebol')) && !isProf();
    if (x.s === 'natacao' && isProf()) return false;
    return canSector(x.s) && (canMod(x.go) || canMod('dashboard'));
  });
}

/* ================= rotas ================= */
const MODS = {
  dashboard: { t: 'Dashboard', i: 'grid' },
  agente: { t: 'Agente de IA', i: 'spark' },
  hotel: { t: 'Hotel', i: 'bed', setor: 'hotel' },
  eventos: { t: 'Casa de eventos', i: 'calendar', setor: 'eventos' },
  natacao: { t: 'Escola de natação', i: 'waves', setor: 'natacao' },
  futebol: { t: 'Escola de futebol', i: 'ball', setor: 'futebol' },
  setores: { t: 'Todos os setores', i: 'layers' },
  financeiro: { t: 'Financeiro', i: 'wallet' },
  pessoas: { t: 'Pessoas e acessos', i: 'users' },
  folha: { t: 'Folha de pagamento', i: 'receipt' },
  relatorios: { t: 'Relatórios', i: 'file' },
  seguranca: { t: 'Segurança e LGPD', i: 'shield' }
};
function route() {
  const h = (location.hash || '').replace(/^#\/?/, '');
  const [a, b] = h.split('/');
  return { a: a || P().mods[0], b };
}
function go(r) { location.hash = '#/' + r; }

/* ================= interface base ================= */
function sidebar() {
  const r = route();
  const item = (k, label, icon, extra = '') => `<a href="#/${k}" class="${(r.a === k || (r.a + '/' + r.b) === k) ? 'on' : ''}">${icon}<span>${esc(label)}</span>${extra}</a>`;
  const g1 = ['dashboard', 'agente'].filter(canMod).map(k => item(k, MODS[k].t, ic(MODS[k].i), k === 'agente' ? '<span class="tag">IA</span>' : '')).join('');
  const sets = S.setores.filter(s => canSector(s.id)).map(s => {
    const k = s.fixo ? s.id : 'setor/' + s.id;
    if (s.fixo && !canMod(s.id)) return '';
    if (!s.fixo && !(isDir() || P().fin)) return '';
    return item(k, s.nome, `<span class="dot" style="background:${s.cor}"></span>`);
  }).join('') + (canMod('setores') ? item('setores', 'Todos os setores', ic('layers')) : '');
  const g3 = ['financeiro', 'pessoas', 'folha', 'relatorios', 'seguranca'].filter(canMod).map(k => item(k, MODS[k].t, ic(MODS[k].i))).join('');
  $('#side').innerHTML = `
    <div class="brand"><img src="/img/logo-ad.png" alt="A&D Eventos"><div><b>A&amp;D Eventos</b><small>Sistema de Gestão</small></div></div>
    <nav class="nav">
      ${g1 ? `<div class="navg"><p>Visão geral</p>${g1}</div>` : ''}
      ${sets ? `<div class="navg"><p>Setores</p>${sets}</div>` : ''}
      ${g3 ? `<div class="navg"><p>Gestão</p>${g3}</div>` : ''}
    </nav>
    <div class="sidefoot"><b>Demonstração</b> · dados fictícios<br>Desenvolvido por <b>NexusUp Company</b><br>NexusUp.company</div>`;
}

function topbar(title, crumb) {
  const n = alertas().length;
  $('#top').innerHTML = `
    <button class="iconbtn burger" data-act="menu" aria-label="Abrir menu">${ic('menu')}</button>
    <div><h1>${esc(title)}</h1>${crumb ? `<div class="crumb">${esc(crumb)}</div>` : ''}</div>
    <div class="grow"></div>
    <label class="search">${ic('search')}<input id="q" placeholder="Buscar pessoa, hóspede, evento…" autocomplete="off"></label>
    <span class="chip per">${ic('calendar')} Novembro 2026</span>
    <button class="iconbtn" data-act="alerts" aria-label="Alertas">${ic('bell')}${n ? `<span class="badge">${n}</span>` : ''}</button>
    <button class="me" data-act="profile"><span class="av">${esc(ini(userName()))}</span><span class="tx"><b>${esc(userName())}</b><small>${esc(P().nome)}</small></span></button>`;
  $('#q').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.value.trim()) buscar(e.target.value.trim()); });
}

function kpi(label, value, sub, icon, color) {
  return `<div class="card kpi"><div class="lb"><span class="ic" ${color ? `style="background:${color}1a;color:${color}"` : ''}>${ic(icon)}</span>${esc(label)}</div><div class="v">${value}</div><div class="s">${sub || ''}</div></div>`;
}
function pill(status) {
  const m = { 'Realizado': '', 'Hoje': 'bl', 'Confirmado': 'ok', 'Sinal pago': 'ok', 'Sem sinal': 'bad', 'Orçamento': 'warn', 'Chega hoje': 'warn', 'Hospedado': 'bl', 'Confirmada': 'ok', 'Cortesia': '', 'Pago': 'ok', 'Amanhã': 'warn', 'A vencer': '', 'Atrasado': 'bad', 'Pendente': 'warn', 'A receber': 'bl', 'Programado': '', 'Ativo': 'ok', 'Desligado': 'bad', 'Reservado': 'bl', 'Livre': 'ok', 'Finalizada': '' };
  return `<span class="pill ${m[status] ?? ''}">${esc(status)}</span>`;
}
function setorPill(id) {
  const s = sec(id);
  if (!s) return `<span class="pill">${id === 'geral' ? 'Geral' : id === 'escolas' ? 'Escolas' : esc(id)}</span>`;
  return `<span class="pill" style="background:${s.cor}14;color:${s.cor}"><span class="sdot" style="background:${s.cor}"></span>${esc(s.nome)}</span>`;
}
function noAccess(mod) {
  return `<div class="card" style="max-width:640px;margin:40px auto;text-align:center;padding:40px">
    <div class="bot" style="margin:0 auto;background:var(--ink);box-shadow:none">${ic('lock')}</div>
    <h2 style="margin-top:16px;font-size:22px;letter-spacing:-.02em">Sem acesso a ${esc(MODS[mod] ? MODS[mod].t : 'esta área')}</h2>
    <p style="color:var(--ink2);margin-top:8px">O cargo <b>${esc(P().nome)}</b> vê só o que precisa para o trabalho. Quem libera acessos é a diretoria, em Pessoas e acessos.</p>
    <a class="btn d" style="margin-top:20px" href="#/${P().mods[0]}">Voltar ao meu início</a></div>`;
}

/* ================= gráficos ================= */
function chart6(list) {
  const T = tot(list), H = S.hist;
  const a = H.receita.map(f => T.rec * f / 1000), b = H.custo.map(f => (T.desp + T.folha) * f / 1000);
  const max = Math.max(...a, ...b) * 1.15 || 1, W = 640, Ht = 230, pb = 28, pl = 40, cw = (W - pl) / 6, bw = Math.min(26, cw / 3.4);
  const y = v => Ht - pb - (v / max) * (Ht - pb - 10);
  let g = '';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = max / steps * i, yy = y(v);
    g += `<line x1="${pl}" x2="${W}" y1="${yy}" y2="${yy}" stroke="#eeeef2"/><text x="${pl - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#8c8a85">${Math.round(v)}</text>`;
  }
  H.meses.forEach((m, i) => {
    const x = pl + cw * i + cw / 2;
    g += `<rect x="${x - bw - 2}" y="${y(a[i])}" width="${bw}" height="${Ht - pb - y(a[i])}" rx="${bw / 2.6}" fill="#1f5bff"><title>${m}: receita ${mil(a[i] * 1000)}</title></rect>`;
    g += `<rect x="${x + 2}" y="${y(b[i])}" width="${bw}" height="${Ht - pb - y(b[i])}" rx="${bw / 2.6}" fill="#c9d6ff"><title>${m}: despesas e folha ${mil(b[i] * 1000)}</title></rect>`;
    g += `<text x="${x}" y="${Ht - 8}" text-anchor="middle" font-size="12" fill="#5e5f66" ${i === 5 ? 'font-weight="600"' : ''}>${m}</text>`;
  });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${Ht}" role="img" aria-label="Receita e custos dos últimos 6 meses, em mil reais">${g}</svg></div>`;
}
function setorBars(list) {
  const T = tot(list) ;
  return `<div class="list">${list.map(s => {
    const r = rec(s), p = T.rec ? r / T.rec : 0;
    return `<a class="li" href="#/${s.fixo ? s.id : 'setor/' + s.id}"><span class="ic" style="background:${s.cor}18;color:${s.cor}">${ic(s.icon)}</span>
      <div class="t"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(s.nome)}</b><b class="mono">${mil(r)}</b></div>
      <div class="bar" style="margin-top:7px"><i style="width:${Math.max(p * 100, 2)}%;background:${s.cor}"></i></div>
      <small>${pct(p)} do faturamento · ${esc(s.volume || '')}</small></div></a>`;
  }).join('')}</div>`;
}

/* ================= DASHBOARD ================= */
function vDashboard() {
  const list = visSet(), T = tot(list), all = isAll();
  const h = new Date().getHours(), saud = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  let kpis = '';
  if (all) {
    kpis = [
      kpi('Faturamento', mil(T.rec), '<span class="up">+12%</span> vs. outubro', 'trend'),
      kpi('Despesas', mil(T.desp), pct(T.desp / T.rec) + ' da receita', 'wallet', '#e5484d'),
      kpi('Folha', mil(T.folha), S.pessoas.filter(p => p.status === 'Ativo').length + ' pessoas', 'receipt', '#8b5cf6'),
      kpi('Lucro', mil(T.lucro), 'Margem ' + pct(T.margem), 'spark', '#12a150'),
      kpi('Ocupação do hotel', '74%', 'Diária média R$ 289 · hoje ' + pct(ocupacao()), 'bed', '#1f5bff'),
      kpi('Eventos no mês', '11', '3 já agendados em dezembro', 'calendar', '#f39314'),
      kpi('Alunos ativos', num(alunos(S.turmasNat) + alunos(S.turmasFut)), '<span class="up">+18</span> no mês', 'users', '#06a3c4'),
      kpi('Inadimplência', '4,1%', brl(inadTot()) + ' em aberto', 'alert', '#c27c00')
    ].join('');
  } else {
    const s = list[0], r = rec(s);
    const extra = s.id === 'hotel' ? [
      kpi('Ocupação hoje', pct(ocupacao()), '74% no mês', 'bed'),
      kpi('Diárias no mês', '248', 'Diária média R$ 289', 'calendar'),
      kpi('Check-ins hoje', '9', '3 já chegaram', 'user'),
      kpi('Consumo no quarto', mil(10500), 'Frigobar e serviço', 'cup')
    ] : [
      kpi('Eventos no mês', '11', '3 em dezembro', 'calendar'),
      kpi('Ticket médio', mil(59400 / 11), 'Por evento', 'trend'),
      kpi('Hoje', '1 evento', 'Salão Multiuso · 19h', 'clock'),
      kpi('Sinais pendentes', '1', 'Evento de 06/12', 'alert', '#c27c00')
    ];
    kpis = [kpi('Receita do setor', mil(r), '<span class="up">+9%</span> vs. outubro', 'trend', s.cor), kpi('Despesas', mil(s.despesas), pct(s.despesas / r) + ' da receita', 'wallet', '#e5484d'), kpi('Folha do setor', mil(s.folha), S.pessoas.filter(p => p.setor === s.id).length + ' pessoas', 'receipt', '#8b5cf6'), kpi('Lucro do setor', mil(r - s.despesas - s.folha), 'Margem ' + pct((r - s.despesas - s.folha) / r), 'spark', '#12a150')].concat(extra).join('');
  }
  const al = alertas();
  const prox = S.eventos.filter(e => e.data >= HOJE).slice(0, 4);
  const q = st => S.quartos.filter(x => x.status === st).length;
  return `
  ${all ? `<div class="demo">${ic('spark')}<b>Ambiente de demonstração</b><span>Dados fictícios · acesso aberto sem senha</span>${isDir() ? `<button class="btn w sm" data-act="reset">${ic('refresh')} Restaurar dados</button>` : ''}</div>` : ''}
  <div class="sec-title"><div><h2>${saud}, ${esc(userName().split(' ')[0])}</h2><p>${all ? 'A empresa inteira em uma tela · novembro de 2026' : 'Dashboard do setor ' + esc(list[0].nome) + ' · novembro de 2026'}</p></div>
    <div class="r">${canMod('relatorios') ? `<button class="btn g" data-act="dl" data-k="${all ? 'completo' : list[0].id}">${ic('download')} Baixar relatório</button>` : ''}<a class="btn p" href="#/agente">${ic('spark')} Perguntar ao agente</a></div></div>
  <div class="grid g4">${kpis}</div>
  <div class="grid g21 mt">
    <div class="card"><div class="ch"><h3>Últimos 6 meses</h3><p>em mil reais</p><div class="r legend"><span><i class="sdot" style="background:#1f5bff"></i>Faturamento</span><span><i class="sdot" style="background:#c9d6ff"></i>Despesas e folha</span></div></div>${chart6(list)}
      <div class="stats"><div><small>Receita em novembro</small><b>${brl(T.rec)}</b></div><div><small>Custos (despesas + folha)</small><b>${brl(T.desp + T.folha)}</b></div><div><small>Sobrou</small><b style="color:var(--ok)">${brl(T.lucro)}</b></div></div></div>
    <div class="card"><div class="ch"><h3>${all ? 'Faturamento por setor' : 'De onde entra'}</h3></div>${all ? setorBars(list) : `<div class="list">${list[0].fontes.map(f => `<div class="li"><span class="ic" style="background:${list[0].cor}18;color:${list[0].cor}">${ic(list[0].icon)}</span><div class="t"><b>${esc(f[0])}</b><small>${pct(f[1] / rec(list[0]))} da receita</small></div><b class="mono">${brl(f[1])}</b></div>`).join('')}</div>`}</div>
  </div>
  <div class="grid g3 mt">
    <div class="card"><div class="ch"><h3>Alertas de hoje</h3><p>${al.length} itens</p></div><div class="list">${al.map(a => `<a class="li" href="#/${a.go}"><span class="pill ${a.k}" style="min-width:78px;justify-content:center">${a.l}</span><div class="t"><b>${esc(a.t)}</b><small>${esc(a.d)}</small></div>${ic('right')}</a>`).join('') || '<div class="empty">Nada pendente.</div>'}</div></div>
    ${canSector('eventos') ? `<div class="card"><div class="ch"><h3>Próximos eventos</h3><div class="r"><a class="btn g sm" href="#/eventos">Agenda</a></div></div><div class="list">${prox.map(e => `<div class="li"><span class="ic" style="background:${espCor(e.espaco)}18;color:${espCor(e.espaco)};font-weight:600;font-size:12px">${fmtD(e.data)}</span><div class="t"><b>${esc(e.cliente)}</b><small>${esc(e.tipo)} · ${esc(e.espaco)} · ${e.hora}</small></div>${pill(e.status)}</div>`).join('')}</div></div>` : ''}
    ${canSector('hotel') ? `<div class="card"><div class="ch"><h3>Hotel agora</h3><div class="r"><a class="btn g sm" href="#/hotel">Mapa</a></div></div>
      <div class="big mono">${pct(ocupacao())}</div><p class="note">ocupação hoje · ${S.quartos.length} quartos</p>
      <div class="list mt">${[['ocupado', 'Ocupados', '#1f5bff'], ['chegada', 'Chegam hoje', '#f39314'], ['limpeza', 'Em limpeza', '#8c8a85'], ['manutencao', 'Manutenção', '#e5484d'], ['livre', 'Livres', '#12a150']].map(x => `<div class="li" style="padding:8px 0"><span class="sdot" style="background:${x[2]}"></span><div class="t">${x[1]}</div><b class="mono">${q(x[0])}</b></div>`).join('')}</div></div>` : ''}
  </div>
  ${all && P().fin ? `<div class="grid g2 mt"><div class="card"><div class="ch"><h3>Contas a vencer</h3><div class="r"><button class="btn g sm" data-act="goto" data-r="financeiro" data-tab="pagar">Ver todas</button></div></div><div class="list">${S.contasPagar.filter(c => c.status !== 'Pago').slice(0, 5).map(c => `<div class="li"><span class="ic">${ic('wallet')}</span><div class="t"><b>${esc(c.desc)}</b><small>Vence ${c.venc} · ${esc((sec(c.setor) || { nome: 'Geral' }).nome)}</small></div><b class="mono">${brl(c.valor)}</b></div>`).join('')}</div></div>` : ''}
    ${all && P().fin ? `<div class="card"><div class="ch"><h3>Atividade recente</h3>${canMod('seguranca') ? '<div class="r"><a class="btn g sm" href="#/seguranca">Histórico</a></div>' : ''}</div><div class="list">${S.log.slice(0, 5).map(l => `<div class="li"><span class="av" style="width:32px;height:32px;font-size:11px">${esc(ini(l.u))}</span><div class="t"><b>${esc(l.a)}</b><small>${esc(l.u)} · ${esc(l.t)}</small></div></div>`).join('')}</div></div></div>` : ''}`;
}

/* ================= FINANCEIRO ================= */
let finTab = 'resumo';
function vFinanceiro() {
  const list = visSet(), T = tot(list);
  const tabs = [['resumo', 'Resumo por setor'], ['receber', 'A receber'], ['pagar', 'A pagar'], ['lanc', 'Lançamentos']];
  let body = '';
  if (finTab === 'resumo') {
    body = `<div class="card pad0"><div class="ch" style="padding:18px 20px 0"><h3>Tudo o que entra, de onde vem e quanto sobra</h3><p>${list.length} negócios · ${list.reduce((a, s) => a + s.fontes.length, 0)} fontes de receita</p></div><div class="tw"><table>
      <thead><tr><th>Setor</th><th>De onde entra</th><th class="n">Receita</th><th class="n">Despesas</th><th class="n">Folha</th><th class="n">Lucro</th><th class="n">Margem</th><th></th></tr></thead><tbody>
      ${list.map(s => { const r = rec(s), l = r - s.despesas - s.folha; return `<tr><td>${setorPill(s.id)}<div class="note" style="margin-top:4px">${esc(s.volume || '')}</div></td><td>${s.fontes.map(f => `<div style="display:flex;justify-content:space-between;gap:14px"><span>${esc(f[0])}</span><span class="mono">${brl(f[1])}</span></div>`).join('')}</td><td class="n">${num(r)}</td><td class="n">${num(s.despesas)}</td><td class="n">${num(s.folha)}</td><td class="n"><b>${num(l)}</b></td><td class="n">${r ? pct(l / r) : '—'}</td><td><button class="btn g sm" data-act="dl" data-k="${s.id}">${ic('download')}</button></td></tr>`; }).join('')}
      </tbody><tfoot><tr><td>A&amp;D</td><td>${list.length} negócios</td><td class="n">${num(T.rec)}</td><td class="n">${num(T.desp)}</td><td class="n">${num(T.folha)}</td><td class="n">${num(T.lucro)}</td><td class="n">${pct(T.margem)}</td><td></td></tr></tfoot></table></div></div>
      <div class="grid g21 mt"><div class="card"><div class="ch"><h3>Fluxo dos últimos 6 meses</h3><p>em mil reais</p></div>${chart6(list)}</div>
      <div class="card"><div class="ch"><h3>Para onde vai o dinheiro</h3></div>${[['Despesas', T.desp, '#e5484d'], ['Folha', T.folha, '#8b5cf6'], ['Lucro', T.lucro, '#12a150']].map(x => `<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between"><span>${x[0]}</span><b class="mono">${brl(x[1])}</b></div><div class="bar" style="margin-top:7px"><i style="width:${T.rec ? x[1] / T.rec * 100 : 0}%;background:${x[2]}"></i></div><small class="note">${T.rec ? pct(x[1] / T.rec) : '—'} da receita</small></div>`).join('')}</div></div>`;
  } else if (finTab === 'receber') {
    const l = S.contasReceber.filter(c => c.setor === 'escolas' ? (canSector('natacao') || canSector('futebol')) : canSector(c.setor));
    body = `<div class="card pad0"><div class="tw"><table><thead><tr><th>Descrição</th><th>Setor</th><th>Vencimento</th><th class="n">Valor</th><th>Status</th><th></th></tr></thead><tbody>
      ${l.map((c, i) => `<tr><td><b style="font-weight:500">${esc(c.desc)}</b></td><td>${setorPill(c.setor)}</td><td class="mono">${c.venc}</td><td class="n">${brl(c.valor)}</td><td>${pill(c.status)}</td><td>${c.status !== 'Pago' ? `<button class="btn g sm" data-act="cobrar" data-i="${S.contasReceber.indexOf(c)}">${ic('wpp')} Cobrar</button>` : ''}</td></tr>`).join('')}
      </tbody><tfoot><tr><td colspan="3">Total a receber</td><td class="n">${brl(l.filter(c => c.status !== 'Pago').reduce((a, c) => a + c.valor, 0))}</td><td colspan="2"></td></tr></tfoot></table></div></div>`;
  } else if (finTab === 'pagar') {
    const l = S.contasPagar.filter(c => c.setor === 'geral' ? P().fin : canSector(c.setor));
    body = `<div class="card pad0"><div class="tw"><table><thead><tr><th>Conta</th><th>Setor</th><th>Vencimento</th><th class="n">Valor</th><th>Status</th><th></th></tr></thead><tbody>
      ${l.map(c => `<tr><td><b style="font-weight:500">${esc(c.desc)}</b></td><td>${setorPill(c.setor)}</td><td class="mono">${c.venc}</td><td class="n">${brl(c.valor)}</td><td>${pill(c.status)}</td><td>${c.status !== 'Pago' ? `<button class="btn g sm" data-act="pagar" data-id="${c.id}">${ic('check')} Marcar como paga</button>` : ''}</td></tr>`).join('')}
      </tbody><tfoot><tr><td colspan="3">Em aberto</td><td class="n">${brl(l.filter(c => c.status !== 'Pago').reduce((a, c) => a + c.valor, 0))}</td><td colspan="2"></td></tr></tfoot></table></div></div>`;
  } else {
    const l = S.despesas.filter(d => canSector(d.setor));
    body = `<div class="card pad0"><div class="tw"><table><thead><tr><th>Data</th><th>Descrição</th><th>Setor</th><th>Categoria</th><th>Lançado por</th><th class="n">Valor</th></tr></thead><tbody>
      ${l.map(d => `<tr><td class="mono">${d.data}</td><td><b style="font-weight:500">${esc(d.desc)}</b></td><td>${setorPill(d.setor)}</td><td>${esc(d.cat)}</td><td>${/Agente/.test(d.via) ? `<span class="pill bl">${ic('spark')}${esc(d.via)}</span>` : esc(d.via)}</td><td class="n">${brl(d.valor)}</td></tr>`).join('')}
      </tbody></table></div></div><p class="note mt">Despesas lançadas pelo agente de IA (texto, áudio ou foto do comprovante) entram aqui na hora, já no setor certo.</p>`;
  }
  return `<div class="sec-title"><div><h2>Financeiro</h2><p>Receitas, despesas, folha e lucro de cada negócio.</p></div>
    <div class="r"><button class="btn g" data-act="dl" data-k="setor">${ic('download')} Baixar por setor</button><button class="btn d" data-act="dl" data-k="completo">${ic('download')} Baixar relatório completo</button><button class="btn p" data-act="despesa">${ic('plus')} Lançar despesa</button></div></div>
  <div class="grid g4">${kpi('Receita', mil(T.rec), '<span class="up">+12%</span> vs. outubro', 'trend')}${kpi('Despesas', mil(T.desp), pct(T.desp / T.rec) + ' da receita', 'wallet', '#e5484d')}${kpi('Folha', mil(T.folha), 'CLT, por aula e freelancer', 'receipt', '#8b5cf6')}${kpi('Lucro', mil(T.lucro), 'Margem ' + pct(T.margem), 'spark', '#12a150')}</div>
  <div class="mt2" style="margin-bottom:14px"><div class="tabs">${tabs.map(t => `<button class="${finTab === t[0] ? 'on' : ''}" data-act="fintab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div></div>${body}`;
}

/* ================= EVENTOS ================= */
let calM = 10, calY = 2026;
function vEventos() {
  const s = sec('eventos'), r = rec(s), mes = S.eventos.filter(e => e.data.startsWith('2026-11'));
  const first = new Date(calY, calM, 1), dias = new Date(calY, calM + 1, 0).getDate(), off = first.getDay();
  let cells = WD.map(d => `<div class="dw">${d}</div>`).join('') + Array.from({ length: off }, () => '<div class="d x"></div>').join('');
  for (let d = 1; d <= dias; d++) {
    const ds = `${calY}-${String(calM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const evs = S.eventos.filter(e => e.data === ds);
    cells += `<div class="d ${ds === HOJE ? 'today' : ''}"><span>${d}</span>${evs.map(e => `<div class="ev" style="background:${espCor(e.espaco)}" data-act="evento" data-id="${e.id}" title="${esc(e.cliente)}">${e.hora} ${esc(e.cliente)}</div>`).join('')}</div>`;
  }
  const canV = canMoney();
  return `<div class="sec-title"><div><h2>Casa de eventos</h2><p>Agenda dos espaços, orçamentos, contratos, sinal e lucro de cada evento.</p></div>
    <div class="r">${canMod('relatorios') ? `<button class="btn g" data-act="dl" data-k="eventos">${ic('download')} Relatório</button>` : ''}<button class="btn p" data-act="orcamento">${ic('plus')} Novo orçamento</button></div></div>
  <div class="grid g4">${canV ? kpi('Receita do mês', mil(r), 'Locação ' + mil(38200) + ' · bufê ' + mil(21200), 'trend', '#f39314') : ''}${kpi('Eventos em novembro', String(mes.length), mes.filter(e => e.status === 'Realizado').length + ' realizados', 'calendar', '#f39314')}${kpi('Dezembro', String(S.eventos.filter(e => e.data.startsWith('2026-12')).length) + ' eventos', 'Domingos livres no salão: 6, 13 e 20', 'clock')}${kpi('Sinais pendentes', String(S.eventos.filter(e => e.status === 'Sem sinal').length), 'Cobrança automática pelo agente', 'alert', '#c27c00')}</div>
  <div class="card mt"><div class="ch"><h3>${MESES[calM]} de ${calY}</h3><div class="r"><button class="iconbtn" data-act="cal" data-d="-1" aria-label="Mês anterior">${ic('left')}</button><button class="iconbtn" data-act="cal" data-d="1" aria-label="Próximo mês">${ic('right')}</button></div></div>
    <div class="legend" style="margin-bottom:12px">${ESPACOS.map(e => `<span><i class="sdot" style="background:${e.c}"></i>${e.n}</span>`).join('')}</div><div class="cal">${cells}</div></div>
  <div class="card pad0 mt"><div class="ch" style="padding:18px 20px 0"><h3>Eventos</h3><p>novembro e dezembro</p></div><div class="tw"><table><thead><tr><th>Data</th><th>Cliente</th><th>Tipo</th><th>Espaço</th><th class="n">Convidados</th>${canV ? '<th class="n">Valor</th><th class="n">Lucro</th>' : ''}<th>Status</th><th></th></tr></thead><tbody>
    ${S.eventos.map(e => `<tr><td class="mono">${fmtD(e.data)} · ${e.hora}</td><td><b style="font-weight:500">${esc(e.cliente)}</b></td><td>${esc(e.tipo)}</td><td><span class="sdot" style="background:${espCor(e.espaco)};margin-right:6px"></span>${esc(e.espaco)}</td><td class="n">${e.convidados}</td>${canV ? `<td class="n">${num(e.valor)}</td><td class="n">${num(e.valor - e.custo)}</td>` : ''}<td>${pill(e.status)}</td><td><button class="btn g sm" data-act="evento" data-id="${e.id}">Abrir</button></td></tr>`).join('')}
  </tbody></table></div></div>
  <h3 class="mt2" style="font-size:15px;margin-bottom:12px">Espaços da A&amp;D</h3>
  <div class="grid g3">${ESPACOS.map(e => `<div class="space"><img src="/img/${e.img}" alt="${esc(e.n)}" loading="lazy"><div><b><span class="sdot" style="background:${e.c};margin-right:8px"></span>${esc(e.n)}</b><small>${(n => n === 0 ? 'Disponível em nov. e dez.' : n + (n > 1 ? ' eventos' : ' evento') + ' em nov. e dez.')(S.eventos.filter(x => x.espaco === e.n).length)}</small></div></div>`).join('')}</div>`;
}

/* ================= HOTEL ================= */
let resQ = '';
function vHotel() {
  const s = sec('hotel'), q = st => S.quartos.filter(x => x.status === st).length;
  const lab = { ocupado: 'Ocupado', chegada: 'Chega hoje', limpeza: 'Limpeza', manutencao: 'Manutenção', livre: 'Livre' };
  const rs = S.reservas.filter(r => !resQ || norm(r.hospede + r.quarto + r.id).includes(norm(resQ)));
  return `<div class="sec-title"><div><h2>Hotel</h2><p>Mapa de quartos, reservas, check-in com FNRH Digital e consumo no quarto.</p></div>
    <div class="r">${canMod('relatorios') ? `<button class="btn g" data-act="dl" data-k="hotel">${ic('download')} Relatório</button>` : ''}<button class="btn p" data-act="reserva">${ic('plus')} Nova reserva</button></div></div>
  <div class="grid g4">${kpi('Ocupação hoje', pct(ocupacao()), q('ocupado') + ' ocupados · ' + q('chegada') + ' chegando', 'bed')}${kpi('Check-ins hoje', '9', (9 - q('chegada')) + ' já chegaram · ' + q('chegada') + ' previstos', 'user', '#f39314')}${kpi('Check-outs amanhã', String(S.quartos.filter(x => x.out === '26/11' && x.status === 'ocupado').length + S.quartos.filter(x => x.out === '26/11' && x.status === 'chegada').length), 'Até 12h · 26/11', 'clock', '#8b5cf6')}${canMoney() ? kpi('Receita do mês', mil(rec(s)), '248 diárias · média R$ 289', 'trend', '#12a150') : kpi('Hóspedes agora', String(q('ocupado')), 'quartos ocupados', 'users', '#12a150')}</div>
  <div class="card mt"><div class="ch"><h3>Mapa de quartos</h3><p>toque em um quarto para agir</p><div class="r legend">${[['#1f5bff', 'Ocupado'], ['#f39314', 'Chega hoje'], ['#8c8a85', 'Limpeza'], ['#e5484d', 'Manutenção'], ['#12a150', 'Livre']].map(x => `<span><i class="sdot" style="background:${x[0]}"></i>${x[1]}</span>`).join('')}</div></div>
    <div class="rooms">${S.quartos.map(r => `<button class="room ${r.status}" data-act="quarto" data-n="${r.n}"><b>${r.n}</b><small>${r.tipo}</small><small style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.hospede || ' ')}</small><em>${lab[r.status]}</em></button>`).join('')}</div></div>
  <div class="card pad0 mt"><div class="ch" style="padding:18px 20px 0"><h3>Reservas</h3><div class="r"><label class="search" style="width:240px;height:36px">${ic('search')}<input id="resq" placeholder="Buscar hóspede ou quarto" value="${esc(resQ)}"></label></div></div><div class="tw"><table><thead><tr><th>Reserva</th><th>Hóspede</th><th>Quarto</th><th>Entrada</th><th>Saída</th><th>Origem</th>${canMoney() || perfilId === 'recepcao' ? '<th class="n">Valor</th>' : ''}<th>Status</th></tr></thead><tbody>
    ${rs.map(r => `<tr><td class="mono">${r.id}</td><td><b style="font-weight:500">${esc(r.hospede)}</b></td><td class="mono">${esc(r.quarto)}</td><td class="mono">${r.entrada}</td><td class="mono">${r.saida}</td><td>${r.origem === 'WhatsApp' ? `<span class="pill ok">${ic('wpp')}WhatsApp</span>` : esc(r.origem)}</td>${canMoney() || perfilId === 'recepcao' ? `<td class="n">${r.valor ? brl(r.valor) : '—'}</td>` : ''}<td>${pill(r.status)}</td></tr>`).join('') || `<tr><td colspan="8" class="empty">Nenhuma reserva encontrada.</td></tr>`}
  </tbody></table></div></div>
  <p class="note mt">Registro de hóspedes alinhado à FNRH Digital, obrigatória para hospedagens desde 20/04/2026.</p>`;
}

/* ================= ESCOLAS ================= */
const chamadaState = {};
function vEscola(id) {
  const isNat = id === 'natacao', s = sec(id), turmas = isNat ? S.turmasNat : S.turmasFut;
  const prof = P().prof, minhas = prof ? turmas.filter(t => t.prof === prof) : turmas;
  const inad = S.inadimplentes.filter(x => x.escola === id);
  const tSel = chamadaState[id + '_t'] ?? 0, turma = minhas[tSel] || minhas[0];
  const nomes = S.chamada[id].slice(0, Math.min(turma ? turma.alunos : 10, S.chamada[id].length));
  const pres = chamadaState[id] || (chamadaState[id] = {});
  const kp = prof ? [
    kpi('Minhas turmas', String(minhas.length), minhas.map(t => t.nome.split(' (')[0]).join(' · '), isNat ? 'waves' : 'ball', s.cor),
    kpi('Meus alunos', String(alunos(minhas)), 'em ' + minhas.length + ' turmas', 'users', s.cor),
    kpi('Presença hoje', isNat ? '38 de 45' : '33 de 37', 'Frequência pelo celular', 'check', '#12a150'),
    kpi('Próxima aula', minhas[0] ? minhas[0].hora : '—', minhas[0] ? minhas[0].dias : '', 'clock')
  ] : [
    kpi('Alunos ativos', String(alunos(turmas)), '<span class="up">+' + (isNat ? 11 : 7) + '</span> no mês', 'users', s.cor),
    kpi('Turmas', String(turmas.length), Math.round(alunos(turmas) / turmas.reduce((a, t) => a + t.vagas, 0) * 100) + '% das vagas ocupadas', isNat ? 'waves' : 'ball', s.cor),
    kpi('Presença hoje', isNat ? '38 de 45' : '33 de 37', isNat ? '2 mensalidades vencem hoje' : 'Treinos da tarde', 'check', '#12a150'),
    kpi('Inadimplência', brl(inadTot(id)), inad.length + ' alunos em atraso', 'alert', '#c27c00')
  ];
  return `<div class="sec-title"><div><h2>${esc(s.nome)}</h2><p>${prof ? 'Suas turmas e a frequência de hoje.' : isNat ? 'Matrículas, turmas, horários, frequência e mensalidade automática por Pix.' : 'Categorias por idade, treinos, aluguel do campo e mensalidades.'}</p></div>
    <div class="r">${!prof && canMod('relatorios') ? `<button class="btn g" data-act="dl" data-k="${id}">${ic('download')} Relatório</button>` : ''}${!prof ? `<button class="btn p" data-act="matricula" data-e="${id}">${ic('plus')} Nova matrícula</button>` : ''}</div></div>
  <div class="grid g4">${kp.join('')}</div>
  <div class="grid g21 mt">
    <div class="card pad0"><div class="ch" style="padding:18px 20px 0"><h3>${prof ? 'Minhas turmas' : 'Turmas'}</h3><p>${prof ? 'Você vê só as turmas em que dá aula' : 'Vagas e horários'}</p></div><div class="tw"><table><thead><tr><th>Turma</th><th>Dias</th><th>Horário</th><th>Professor</th><th>Ocupação</th></tr></thead><tbody>
      ${minhas.map(t => `<tr><td><b style="font-weight:500">${esc(t.nome)}</b></td><td>${esc(t.dias)}</td><td class="mono">${t.hora}</td><td>${esc(t.prof)}</td><td style="min-width:150px"><div style="display:flex;justify-content:space-between;font-size:12px"><span>${t.alunos}/${t.vagas}</span><span class="note">${t.vagas - t.alunos ? (t.vagas - t.alunos) + ' vagas' : 'lotada'}</span></div><div class="bar" style="margin-top:5px"><i style="width:${t.alunos / t.vagas * 100}%;background:${s.cor}"></i></div></td></tr>`).join('')}
    </tbody></table></div></div>
    <div class="card"><div class="ch"><h3>Frequência de hoje</h3><p>no celular do professor</p></div>
      <div class="f"><select data-act-change="turmasel" data-e="${id}">${minhas.map((t, i) => `<option value="${i}" ${i === tSel ? 'selected' : ''}>${esc(t.nome)} · ${t.hora}</option>`).join('')}</select></div>
      <div class="list mt" style="max-height:300px;overflow-y:auto">${nomes.map(n => `<label class="li" style="cursor:pointer;padding:9px 0"><span class="av" style="width:30px;height:30px;font-size:11px;background:${s.cor}">${esc(ini(n))}</span><div class="t">${esc(n)}</div><input type="checkbox" data-act-change="pres" data-e="${id}" data-n="${esc(n)}" ${pres[n] !== false ? 'checked' : ''} style="width:20px;height:20px;accent-color:${s.cor}"></label>`).join('')}</div>
      <button class="btn d" style="width:100%;margin-top:14px" data-act="salvarfreq" data-e="${id}">${ic('check')} Salvar frequência</button></div>
  </div>
  ${!prof ? `<div class="grid ${isNat ? 'g2' : 'g2'} mt">
    <div class="card pad0"><div class="ch" style="padding:18px 20px 0"><h3>Mensalidades em atraso</h3><p>${brl(inadTot(id))}</p></div><div class="tw"><table><thead><tr><th>Aluno</th><th>Turma</th><th class="n">Em aberto</th><th class="n">Dias</th><th></th></tr></thead><tbody>
      ${inad.map(x => `<tr><td><div class="who"><span class="av" style="background:${s.cor}">${esc(ini(x.aluno))}</span><div><b>${esc(x.aluno)}</b><small>Resp.: ${esc(x.resp)}</small></div></div></td><td>${esc(x.turma)}</td><td class="n">${brl(x.valor)}<div class="note">${x.parcelas} ${x.parcelas > 1 ? 'parcelas' : 'parcela'}</div></td><td class="n">${x.dias}</td><td><button class="btn g sm" data-act="lembrete" data-n="${esc(x.resp !== '—' ? x.resp : x.aluno)}">${ic('wpp')} Cobrar</button></td></tr>`).join('')}
    </tbody></table></div></div>
    ${isNat ? `<div class="card"><div class="ch"><h3>Como a mensalidade funciona</h3></div><div class="list">
      ${[['Matrícula com aceite do responsável', 'Termo e LGPD assinados no celular', 'check'], ['Cobrança automática por Pix', 'Todo dia 5, com lembrete do agente de IA', 'wallet'], ['Atrasou? O agente avisa', 'Mensagem educada no WhatsApp do responsável', 'wpp'], ['Pagou, baixa sozinha', 'O financeiro é atualizado na hora', 'refresh']].map(x => `<div class="li"><span class="ic" style="background:${s.cor}18;color:${s.cor}">${ic(x[2])}</span><div class="t"><b>${x[0]}</b><small>${x[1]}</small></div></div>`).join('')}</div></div>`
    : `<div class="card"><div class="ch"><h3>Campo society · hoje</h3><p>aluguel por hora</p></div><div class="list">${S.campo.map((c, i) => `<div class="li"><span class="ic" style="background:${s.cor}18;color:${s.cor}">${ic('clock')}</span><div class="t"><b>${c.hora}</b><small>${esc(c.cliente)}</small></div>${c.valor ? `<span class="mono">${brl(c.valor)}</span>` : ''}${c.status === 'Livre' ? `<button class="btn p sm" data-act="campo" data-i="${i}">Reservar</button>` : pill(c.status)}</div>`).join('')}</div></div>`}
  </div>` : ''}`;
}

/* ================= SETORES ================= */
const MODELOS = {
  'Restaurante ou bar': { icon: 'cup', fontes: ['Vendas no salão', 'Delivery', 'Bebidas'] },
  'Academia': { icon: 'dumbbell', fontes: ['Mensalidades', 'Diárias', 'Aulas avulsas'] },
  'Locação de espaço': { icon: 'key', fontes: ['Locação por hora', 'Locação por diária'] },
  'Estacionamento': { icon: 'car', fontes: ['Avulso', 'Mensalistas', 'Eventos'] },
  'Loja': { icon: 'bag', fontes: ['Vendas', 'Encomendas'] },
  'Personalizado': { icon: 'store', fontes: ['Receita principal'] }
};
function vSetores() {
  return `<div class="sec-title"><div><h2>Todos os setores</h2><p>Cada negócio com receita, custo e lucro próprios. Abriu um novo negócio? Cadastre em minutos.</p></div><div class="r">${isDir() ? `<button class="btn p" data-act="novosetor">${ic('plus')} Novo setor</button>` : ''}</div></div>
  <div class="grid g3">${S.setores.map(s => { const r = rec(s), l = r - s.despesas - s.folha; return `<a class="card sector-card" href="#/${s.fixo ? s.id : 'setor/' + s.id}"><span class="stripe" style="background:${s.cor}"></span>
    <div class="ch"><span class="ic" style="width:40px;height:40px;border-radius:99px;display:grid;place-items:center;background:${s.cor}18;color:${s.cor}">${ic(s.icon)}</span><div><h3>${esc(s.nome)}</h3><p>Resp.: ${esc(s.resp || '—')}</p></div><div class="r">${s.fixo ? '' : '<span class="pill bl">Novo</span>'}</div></div>
    <div style="display:flex;gap:18px;flex-wrap:wrap"><div><div class="note">Receita</div><b class="mono" style="font-size:20px">${mil(r)}</b></div><div><div class="note">Lucro</div><b class="mono" style="font-size:20px">${mil(l)}</b></div><div><div class="note">Margem</div><b class="mono" style="font-size:20px">${r ? pct(l / r) : '—'}</b></div></div>
    <p class="note" style="margin-top:12px">${s.fontes.length} fontes de receita · ${esc(s.volume || 'sem movimento ainda')}</p></a>`; }).join('')}
    ${isDir() ? `<button class="card" data-act="novosetor" style="border:2px dashed #d6d6de;box-shadow:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:190px;color:var(--ink2)"><span class="bot" style="background:var(--ink);box-shadow:none">${ic('plus')}</span><b>Cadastrar novo setor</b><small class="note">Restaurante, academia, locação, loja…</small></button>` : ''}</div>`;
}
function vSetorCustom(id) {
  const s = sec(id);
  if (!s) return `<div class="empty">Setor não encontrado. <a href="#/setores" style="color:var(--accent)">Ver setores</a></div>`;
  const r = rec(s), l = r - s.despesas - s.folha, lx = extras(id);
  return `<div class="sec-title"><div><h2><span class="sdot" style="background:${s.cor};width:14px;height:14px;margin-right:10px"></span>${esc(s.nome)}</h2><p>Setor cadastrado pela diretoria · responsável: ${esc(s.resp || '—')}</p></div>
    <div class="r"><button class="btn g" data-act="dl" data-k="${s.id}">${ic('download')} Relatório</button><button class="btn g" data-act="lanc" data-s="${s.id}" data-tp="despesa">${ic('wallet')} Lançar despesa</button><button class="btn p" data-act="lanc" data-s="${s.id}" data-tp="receita">${ic('plus')} Lançar receita</button></div></div>
  <div class="grid g4">${kpi('Receita', brl(r), s.fontes.length + ' fontes', 'trend', s.cor)}${kpi('Despesas', brl(s.despesas), 'no mês', 'wallet', '#e5484d')}${kpi('Lucro', brl(l), r ? 'Margem ' + pct(l / r) : 'Sem receita ainda', 'spark', '#12a150')}${kpi('Lançamentos', String(lx.length), 'este mês', 'receipt')}</div>
  <div class="grid g12 mt"><div class="card"><div class="ch"><h3>Fontes de receita</h3></div><div class="list">${s.fontes.map(f => `<div class="li"><span class="ic" style="background:${s.cor}18;color:${s.cor}">${ic(s.icon)}</span><div class="t"><b>${esc(f[0])}</b></div><b class="mono">${brl(f[1])}</b></div>`).join('')}</div></div>
  <div class="card pad0"><div class="ch" style="padding:18px 20px 0"><h3>Lançamentos</h3></div><div class="tw"><table><thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th class="n">Valor</th></tr></thead><tbody>${lx.map(x => `<tr><td class="mono">${x.data}</td><td>${x.tipo === 'receita' ? '<span class="pill ok">Receita</span>' : '<span class="pill bad">Despesa</span>'}</td><td>${esc(x.desc)}</td><td class="n">${brl(x.valor)}</td></tr>`).join('') || '<tr><td colspan="4" class="empty">Nenhum lançamento ainda. Use “Lançar receita” ou peça ao agente de IA.</td></tr>'}</tbody></table></div></div></div>
  ${isDir() ? `<div style="margin-top:20px"><button class="btn g" data-act="delsetor" data-s="${s.id}">${ic('trash')} Excluir setor</button></div>` : ''}`;
}

/* ================= PESSOAS ================= */
let pesTab = 'equipe', pesF = 'todos', pesQ = '';
const ACOES = [['Dashboard geral', 'dash_geral'], ['Dashboard do setor', 'dash_setor'], ['Vendas e reservas', 'vendas'], ['Contas e folha', 'contas'], ['Alunos e frequência', 'alunos'], ['Cadastrar funcionários', 'cadastrar'], ['Agente de IA', 'agente']];
const COLS = ['Diretoria', 'Gerente', 'Financeiro', 'Recepção', 'Professor'];
if (!S.perm) S.perm = { dash_geral: [1, 0, 1, 0, 0], dash_setor: [1, 1, 1, 0, 0], vendas: [1, 1, 0, 1, 0], contas: [1, 0, 1, 0, 0], alunos: [1, 1, 0, 0, 1], cadastrar: [1, 0, 0, 0, 0], agente: [1, 1, 1, 1, 1] };
function vPessoas() {
  const tabs = [['equipe', 'Equipe'], ['perm', 'Cargos e permissões'], ['wpp', 'WhatsApp do agente']];
  let body = '';
  if (pesTab === 'equipe') {
    const l = S.pessoas.filter(p => (pesF === 'todos' || p.setor === pesF) && (!pesQ || norm(p.nome + p.cargo).includes(norm(pesQ))));
    body = `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px"><div class="tabs">${[['todos', 'Todos']].concat(S.setores.map(s => [s.id, s.nome])).map(t => `<button class="${pesF === t[0] ? 'on' : ''}" data-act="pesf" data-f="${t[0]}">${esc(t[1])}</button>`).join('')}</div><label class="search" style="height:42px">${ic('search')}<input id="pesq" placeholder="Buscar nome ou cargo" value="${esc(pesQ)}"></label></div>
    <div class="card pad0"><div class="tw"><table><thead><tr><th>Pessoa</th><th>Cargo</th><th>Setor</th><th>Vínculo</th><th>Acesso ao sistema</th><th>Status</th><th></th></tr></thead><tbody>
    ${l.map(p => `<tr><td><div class="who"><span class="av" style="background:${(sec(p.setor) || {}).cor || '#16171b'}">${esc(ini(p.nome))}</span><div><b>${esc(p.nome)}</b><small>${esc(p.fone)}</small></div></div></td><td>${esc(p.cargo)}</td><td>${setorPill(p.setor)}</td><td>${esc(p.vinculo)}</td><td>${p.perfil === 'sem' ? '<span class="note">Sem login</span>' : `<span class="pill bl">${ic('key')}${esc(PERFIS[p.perfil].nome)}</span>`}</td><td>${pill(p.status)}</td><td>${isDir() ? `<button class="btn g sm" data-act="deslig" data-id="${p.id}">${p.status === 'Ativo' ? 'Desligar' : 'Reativar'}</button>` : ''}</td></tr>`).join('')}
    </tbody></table></div></div><p class="note mt">${l.length} de ${S.pessoas.length} pessoas · funcionário desligado perde o acesso na hora.</p>`;
  } else if (pesTab === 'perm') {
    body = `<div class="card pad0"><div class="ch" style="padding:18px 20px 0"><h3>Cada pessoa vê só o que precisa</h3><p>${isDir() ? 'Toque para liberar ou bloquear' : 'Somente a diretoria altera permissões'}</p></div><div class="tw"><table class="perm"><thead><tr><th>Ação</th>${COLS.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>
    ${ACOES.map(a => `<tr><td><b style="font-weight:500">${a[0]}</b></td>${COLS.map((c, j) => `<td><button class="tg ${S.perm[a[1]][j] ? 'on' : ''}" ${isDir() && j > 0 ? `data-act="perm" data-a="${a[1]}" data-j="${j}"` : 'disabled'} aria-label="${a[0]} — ${c}"></button></td>`).join('')}</tr>`).join('')}
    </tbody></table></div></div><p class="note mt">Gerente e professor veem só o próprio setor e as próprias turmas. Perfis são editáveis: a diretoria cria cargos e escolhe cada permissão.</p>`;
  } else {
    body = `<div class="grid g21"><div class="card"><div class="ch"><h3>Números autorizados no agente</h3><p>só estes números conversam com o agente no WhatsApp</p></div><div class="list">${S.whats.map((w, i) => `<div class="li"><span class="ic" style="background:#e7f7ee;color:#12a150">${ic('wpp')}</span><div class="t"><b>${esc(w.nome)}</b><small>${esc(w.num)} · ${esc(w.perfil)}</small></div>${isDir() ? `<button class="btn g sm" data-act="delwpp" data-i="${i}">Remover</button>` : ''}</div>`).join('')}</div>
      ${isDir() ? `<div class="fg mt"><div class="f"><input id="wnome" placeholder="Nome"></div><div class="f"><input id="wnum" placeholder="(98) 9 0000-0000" inputmode="tel"></div></div><button class="btn p mt" data-act="addwpp">${ic('plus')} Autorizar número</button>` : ''}</div>
      <div class="card"><div class="ch"><h3>Regras do agente</h3></div><div class="list">${['Respeita o cargo e o setor de quem pergunta', 'Número desconhecido não recebe dados da empresa', 'Pede confirmação antes de lançar ou alterar', 'Tudo fica registrado no histórico'].map(t => `<div class="li"><span class="ic" style="background:var(--soft);color:var(--accent)">${ic('check')}</span><div class="t">${t}</div></div>`).join('')}</div></div></div>`;
  }
  return `<div class="sec-title"><div><h2>Pessoas e acessos</h2><p>${S.pessoas.filter(p => p.status === 'Ativo').length} pessoas ativas · cargo, setor e acesso de cada uma.</p></div><div class="r">${isDir() ? `<button class="btn p" data-act="novapessoa">${ic('plus')} Novo funcionário</button>` : ''}</div></div>
  <div style="margin-bottom:14px"><div class="tabs">${tabs.map(t => `<button class="${pesTab === t[0] ? 'on' : ''}" data-act="pestab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div></div>${body}`;
}

/* ================= FOLHA ================= */
let folF = 'todos';
const desc = p => p.vinculo === 'CLT' ? Math.round(p.salario * 0.085 * 100) / 100 : 0;
function vFolha() {
  const ativos = S.pessoas.filter(p => p.status === 'Ativo');
  const l = ativos.filter(p => folF === 'todos' || p.setor === folF);
  const bruto = l.reduce((a, p) => a + p.salario, 0), ds = l.reduce((a, p) => a + desc(p), 0);
  const cnt = v => ativos.filter(p => p.vinculo === v).length;
  return `<div class="sec-title"><div><h2>Folha de pagamento</h2><p>Competência novembro de 2026 · ${S.folhaFechada ? 'folha fechada' : 'fecha em 30/11'}</p></div>
    <div class="r"><button class="btn g" data-act="dl" data-k="folha">${ic('download')} Baixar folha</button>${S.folhaFechada ? '<span class="pill ok" style="height:38px;padding:0 16px">' + ic('check') + 'Folha fechada</span>' : `<button class="btn p" data-act="fecharfolha">${ic('check')} Fechar folha</button>`}</div></div>
  <div class="grid g4">${kpi('Total da folha', brl(ativos.reduce((a, p) => a + p.salario, 0)), 'Custo de pessoal no mês', 'receipt', '#8b5cf6')}${kpi('Pessoas', String(ativos.length), cnt('CLT') + ' CLT · ' + cnt('Por aula') + ' por aula · ' + cnt('Freelancer') + ' freelancers', 'users')}${kpi('Descontos', brl(ativos.reduce((a, p) => a + desc(p), 0)), 'INSS e vale-transporte (estimado)', 'wallet', '#e5484d')}${kpi('Pagamento', '05/12', 'Pix para cada pessoa', 'clock', '#12a150')}</div>
  <div class="grid g12 mt"><div class="card"><div class="ch"><h3>Custo por setor</h3></div>${S.setores.filter(s => s.folha).map(s => `<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between"><span><span class="sdot" style="background:${s.cor};margin-right:8px"></span>${esc(s.nome)}</span><b class="mono">${brl(s.folha)}</b></div><div class="bar" style="margin-top:6px"><i style="width:${s.folha / 19800 * 100}%;background:${s.cor}"></i></div></div>`).join('')}<p class="note">Holerite e vales enviados pelo WhatsApp de cada pessoa.</p></div>
  <div class="card pad0"><div class="ch" style="padding:18px 20px 0"><div class="tabs">${[['todos', 'Todos']].concat(S.setores.filter(s => s.folha).map(s => [s.id, s.nome.replace('Escola de ', '')])).map(t => `<button class="${folF === t[0] ? 'on' : ''}" data-act="folf" data-f="${t[0]}">${esc(t[1])}</button>`).join('')}</div></div><div class="tw"><table><thead><tr><th>Pessoa</th><th>Vínculo</th><th class="n">Bruto</th><th class="n">Descontos</th><th class="n">Líquido</th><th></th></tr></thead><tbody>
  ${l.map(p => `<tr><td><div class="who"><span class="av" style="background:${(sec(p.setor) || {}).cor}">${esc(ini(p.nome))}</span><div><b>${esc(p.nome)}</b><small>${esc(p.cargo)}</small></div></div></td><td>${esc(p.vinculo)}</td><td class="n">${brl(p.salario)}</td><td class="n">${desc(p) ? '− ' + brl(desc(p)) : '—'}</td><td class="n"><b>${brl(p.salario - desc(p))}</b></td><td><button class="btn g sm" data-act="holerite" data-id="${p.id}">Holerite</button></td></tr>`).join('')}
  </tbody><tfoot><tr><td colspan="2">${l.length} pessoas</td><td class="n">${brl(bruto)}</td><td class="n">− ${brl(ds)}</td><td class="n">${brl(bruto - ds)}</td><td></td></tr></tfoot></table></div></div></div>`;
}

/* ================= AGENTE DE IA ================= */
let chat = null;
function sugestoes() {
  const s = [];
  if (canMoney()) s.push('Quanto faturamos este mês?');
  if (P().fin) s.push('Paguei 380 na manutenção da bomba da piscina', 'Quais contas vencem esta semana?');
  if (canSector('eventos') || perfilId === 'recepcao') s.push('Tem data livre no salão em dezembro?');
  if (canSector('hotel')) s.push('Como está a ocupação do hotel hoje?');
  if (canSector('natacao') || canSector('futebol')) s.push(isProf() ? 'Quantos alunos tenho nas minhas turmas?' : 'Quem está com mensalidade atrasada?');
  s.push('Me passa uma receita de bolo?');
  return s.slice(0, 6);
}
function vAgente() {
  if (!chat) chat = [{ b: 1, t: `Olá, ${userName().split(' ')[0]}! Sou o agente de IA da A&D. Respondo sobre a operação da empresa, lanço gastos e aviso o que vence — sempre dentro do seu cargo (${P().nome}).\nTambém atendo pelo WhatsApp dos números cadastrados.` }];
  return `<div class="agent">
    <div class="card chat"><div class="hd"><span class="bot">${ic('spark')}</span><div><b>Agente de IA · A&amp;D</b><div class="note"><span class="sdot" style="background:#12a150;margin-right:6px"></span>Conectado ao sistema e ao WhatsApp</div></div><div style="margin-left:auto" class="pill bl">Padrão NexusUp</div></div>
      <div class="msgs" id="msgs">${chat.map(msgHtml).join('')}</div>
      <div class="sugs">${sugestoes().map(s => `<button data-act="sug" data-t="${esc(s)}">${esc(s)}</button>`).join('')}</div>
      <form class="composer" id="cform"><button type="button" class="iconbtn" data-act="anexo" aria-label="Enviar foto do comprovante">${ic('camera')}</button><input id="cin" placeholder="Pergunte sobre a A&D ou lance um gasto…" autocomplete="off" maxlength="300"><button class="btn p" aria-label="Enviar">${ic('send')}</button></form></div>
    <div class="side-panel" style="display:flex;flex-direction:column;gap:16px;overflow-y:auto">
      <div class="card"><div class="ch"><h3>Conectado a</h3></div><div class="list">
        <div class="li"><span class="ic" style="background:var(--soft);color:var(--accent)">${ic('grid')}</span><div class="t"><b>Sistema A&amp;D</b><small>Financeiro, hotel, eventos e escolas</small></div><span class="pill ok">ativo</span></div>
        <div class="li"><span class="ic" style="background:#e7f7ee;color:#12a150">${ic('wpp')}</span><div class="t"><b>WhatsApp Business</b><small>${S.whats.length} números autorizados</small></div><span class="pill ok">ativo</span></div></div></div>
      <div class="card"><div class="ch"><h3>Regras</h3></div><div class="list">${['Só fala da operação da A&D', 'Respeita o cargo e o setor de quem pergunta', 'Pede confirmação antes de lançar', 'Lança gasto por texto, áudio ou foto', 'Protegido contra injeção de comandos'].map(t => `<div class="li" style="padding:9px 0"><span style="color:var(--accent)">${ic('check')}</span><div class="t">${t}</div></div>`).join('')}</div>
        <p class="note mt">Agente focado no negócio, no formato permitido pela Meta para a API do WhatsApp.</p></div>
    </div></div>`;
}
function msgHtml(m) {
  return `<div class="m ${m.b ? 'b' : 'u'}${m.no ? ' no' : ''}">${esc(m.t)}${m.acts ? `<div class="acts">${m.acts.map(a => `<button class="btn ${a.k || 'g'} sm" data-act="${a.act}" ${Object.entries(a.d || {}).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ')}>${esc(a.l)}</button>`).join('')}</div>` : ''}</div>`;
}
function pushMsg(m) {
  chat.push(m);
  const box = $('#msgs');
  if (box) { box.insertAdjacentHTML('beforeend', msgHtml(m)); box.scrollTop = box.scrollHeight; }
}
function perguntar(txt) {
  txt = String(txt).trim().slice(0, 300);
  if (!txt) return;
  pushMsg({ b: 0, t: txt });
  const box = $('#msgs');
  if (box) { box.insertAdjacentHTML('beforeend', '<div class="m b" id="typ"><span class="typing"><i></i><i></i><i></i></span></div>'); box.scrollTop = box.scrollHeight; }
  setTimeout(() => { const t = $('#typ'); if (t) t.remove(); pushMsg(responder(txt)); }, 550 + Math.random() * 400);
}
const NEG = t => ({ b: 1, no: 1, t });
function setorDoTexto(t) {
  if (/piscina|natac|nado|hidro/.test(t)) return 'natacao';
  if (/campo|futebol|bola|chuteira|uniforme|society/.test(t)) return 'futebol';
  if (/quarto|hotel|hosped|lavand|enxoval|frigobar|cafe da manha|recepc/.test(t)) return 'hotel';
  if (/evento|salao|bufe|buffet|festa|decora|garcom|bebida|auditorio|som|dj/.test(t)) return 'eventos';
  const c = S.setores.find(s => !s.fixo && t.includes(norm(s.nome)));
  return c ? c.id : null;
}
function catDoTexto(t) {
  if (/manuten|consert|reparo|bomba|ar.condic|eletric|encanad/.test(t)) return 'Manutenção';
  if (/comida|aliment|cafe|mercado|carne|pao/.test(t)) return 'Alimentos';
  if (/bebida|cerveja|refri|agua mineral/.test(t)) return 'Bebidas';
  if (/limpeza|cloro|produto/.test(t)) return 'Limpeza e produtos';
  if (/flor|decora/.test(t)) return 'Decoração';
  if (/uniforme|bola|colete|material/.test(t)) return 'Material esportivo';
  if (/gas|energia|luz|agua|internet/.test(t)) return 'Contas da casa';
  return 'Outros';
}
function responder(raw) {
  const t = norm(raw);
  const nomeS = id => (sec(id) || {}).nome || id;
  if (/(ignore|esqueca|desconsidere|finja|aja como|modo desenvolvedor|jailbreak|system prompt|suas instruc|novas instruc)/.test(t))
    return NEG('Não posso mudar minhas regras nem revelar configurações. Sigo só as permissões do seu cargo e falo apenas da operação da A&D.');
  if (/receita de (?!novembro|outubro|setembro|dezembro|hoje|ontem|hotel|evento|natac|futebol|mes|quanto)|piada|horoscopo|novela|politic|eleic|placar|jogo do |brasileirao|previsao do tempo|letra de|filme|poema|traduz|dever de casa|bitcoin|aposta/.test(t))
    return NEG('Eu respondo só sobre a operação da A&D. Posso ajudar com faturamento, agenda, hotel, alunos, contas e lançamentos.');
  if (/^(oi|ola|bom dia|boa tarde|boa noite|e ai|opa)\b/.test(t) && t.length < 25)
    return { b: 1, t: `Olá! Posso ver faturamento, agenda do salão, ocupação do hotel, alunos e contas — e lançar gastos. O que você precisa?` };
  const val = (raw.match(/(?:r\$\s*)?(\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:,\d{1,2})?)/i) || [])[1];
  if (/(paguei|gastei|comprei|lanca|lance|lancar|despesa de)/.test(t) && val) {
    const v = parseFloat(val.replace(/\./g, '').replace(',', '.'));
    const sid = setorDoTexto(t);
    if (!sid) return { b: 1, t: `Em qual setor eu lanço ${brl(v)}?`, acts: visSet().map(s => ({ l: s.nome, act: 'aglanc', d: { v, s: s.id, c: catDoTexto(t), x: raw.slice(0, 80) } })) };
    if (!(P().fin || (canSector(sid) && canMoney()))) return NEG(`Seu cargo (${P().nome}) não lança despesas em ${nomeS(sid)}. Peça para a diretoria ou o financeiro.`);
    return { b: 1, t: `Vou lançar ${brl(v)} em ${catDoTexto(t)} · ${nomeS(sid)}, com data de hoje. Confirma?`, acts: [{ l: 'Confirmar lançamento', k: 'p', act: 'aglanc', d: { v, s: sid, c: catDoTexto(t), x: raw.slice(0, 80) } }, { l: 'Cancelar', act: 'agcancel' }] };
  }
  if (/(folha|salario|holerite|pagamento dos func)/.test(t)) {
    if (!P().fin) return NEG(`A folha de pagamento é restrita à diretoria e ao financeiro. Seu cargo: ${P().nome}.`);
    return { b: 1, t: `Folha de novembro: ${brl(48900)} para 42 pessoas.\nHotel ${brl(19800)} · Eventos ${brl(12300)} · Natação ${brl(9200)} · Futebol ${brl(7600)}.\nStatus: ${S.folhaFechada ? 'fechada' : 'aberta, fecha em 30/11'} · pagamento em 05/12.`, acts: [{ l: 'Abrir folha', act: 'goto', d: { r: 'folha' } }] };
  }
  if (/(lucro|margem|sobrou)/.test(t)) {
    if (!canMoney()) return NEG(`Seu cargo (${P().nome}) não tem acesso a dados financeiros.`);
    const T = tot(visSet());
    return { b: 1, t: `Lucro de novembro${isAll() ? '' : ' em ' + visSet()[0].nome}: ${brl(T.lucro)} (margem ${pct(T.margem)}).\nReceita ${brl(T.rec)} − despesas ${brl(T.desp)} − folha ${brl(T.folha)}.` };
  }
  if (/(fatur|receita|vendemos|vendeu|quanto entrou|entrada)/.test(t)) {
    if (!canMoney()) return NEG(`Seu cargo (${P().nome}) não tem acesso ao faturamento. Posso ajudar com ${isProf() ? 'suas turmas e frequência' : 'reservas e quartos'}.`);
    const l = visSet(), T = tot(l);
    return { b: 1, t: `Faturamento de novembro${isAll() ? '' : ' (' + l[0].nome + ')'}: ${brl(T.rec)}${isAll() ? ' · +12% vs. outubro' : ''}.\n` + l.map(s => `• ${s.nome}: ${brl(rec(s))}`).join('\n'), acts: canMod('relatorios') ? [{ l: 'Baixar relatório', act: 'dl', d: { k: isAll() ? 'completo' : l[0].id } }] : null };
  }
  if (/(despesa|gasto|gastamos|custo)/.test(t)) {
    if (!canMoney()) return NEG(`Seu cargo (${P().nome}) não tem acesso às despesas.`);
    const l = visSet();
    return { b: 1, t: `Despesas de novembro: ${brl(tot(l).desp)}.\n` + l.map(s => `• ${s.nome}: ${brl(s.despesas)}`).join('\n') + `\nÚltimo lançamento: ${S.despesas[0].desc} (${brl(S.despesas[0].valor)}).` };
  }
  if (/(conta|vence|vencer|boleto|pagar)/.test(t)) {
    if (!P().fin) return NEG('Contas a pagar são vistas pela diretoria e pelo financeiro.');
    const l = S.contasPagar.filter(c => c.status !== 'Pago');
    return { b: 1, t: 'Contas em aberto:\n' + l.map(c => `• ${c.venc} — ${c.desc}: ${brl(c.valor)}`).join('\n'), acts: [{ l: 'Abrir contas a pagar', act: 'goto', d: { r: 'financeiro', tab: 'pagar' } }] };
  }
  if (/(livre|disponiv|vaga no salao|agenda|data)/.test(t) && /(salao|data|agenda|dezembro|novembro|janeiro|sabado|domingo|evento)/.test(t)) {
    if (!(canSector('eventos') || isDir() || perfilId === 'recepcao')) return NEG('A agenda de eventos é vista pela diretoria e pela equipe de eventos.');
    let m = 11, nm = 'dezembro';
    if (/novembro/.test(t)) { m = 10; nm = 'novembro'; } else if (/janeiro/.test(t)) { m = 12; nm = 'janeiro'; }
    const y = m === 12 ? 2027 : 2026, mm = m % 12, dias = new Date(y, mm + 1, 0).getDate(), livres = [];
    for (let d = 1; d <= dias; d++) {
      const dt = new Date(y, mm, d); if (dt.getDay() !== 0 && dt.getDay() !== 6) continue;
      const ds = `${y}-${String(mm + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (ds < HOJE) continue;
      if (!S.eventos.some(e => e.data === ds && e.espaco === 'Salão dos Lustres')) livres.push(`${WD[dt.getDay()].toLowerCase()} ${d}`);
    }
    return { b: 1, t: livres.length ? `Fins de semana livres no Salão dos Lustres em ${nm}: ${livres.join(', ')}.` : `O Salão dos Lustres está sem fins de semana livres em ${nm}.`, acts: canMod('eventos') ? [{ l: 'Criar orçamento', k: 'p', act: 'orcamento' }] : null };
  }
  if (/(evento|festa|casamento|formatura)/.test(t)) {
    if (!(canSector('eventos') || perfilId === 'recepcao')) return NEG('A agenda de eventos é vista pela diretoria e pela equipe de eventos.');
    const p = S.eventos.filter(e => e.data >= HOJE).slice(0, 4);
    return { b: 1, t: 'Próximos eventos:\n' + p.map(e => `• ${fmtD(e.data)} ${e.hora} — ${e.cliente} (${e.espaco}) · ${e.status}`).join('\n') };
  }
  if (/(ocupa|quarto|hotel|check|hosped|reserva|diaria)/.test(t)) {
    if (!canSector('hotel')) return NEG(`Seu cargo (${P().nome}) não tem acesso ao hotel.`);
    const q = st => S.quartos.filter(x => x.status === st).length;
    return { b: 1, t: `Hotel hoje: ocupação ${pct(ocupacao())}.\n${q('ocupado')} quartos ocupados, ${q('chegada')} chegadas previstas, ${q('limpeza')} em limpeza, ${q('manutencao')} em manutenção e ${q('livre')} livre(s).\nDiária média do mês: R$ 289.`, acts: [{ l: 'Abrir mapa de quartos', act: 'goto', d: { r: 'hotel' } }] };
  }
  if (/(inadimpl|atrasad|devendo|mensalidade)/.test(t)) {
    if (isProf()) return NEG('Mensalidades são vistas pela coordenação e pelo financeiro. Você vê suas turmas e a frequência.');
    if (!(canSector('natacao') || canSector('futebol'))) return NEG(`Seu cargo (${P().nome}) não tem acesso às escolas.`);
    return { b: 1, t: `${S.inadimplentes.length} alunos em atraso, total ${brl(inadTot())}:\n` + S.inadimplentes.map(x => `• ${x.aluno} (${x.turma}) — ${brl(x.valor)}`).join('\n'), acts: [{ l: 'Enviar lembrete a todos', k: 'p', act: 'lembrete', d: { n: 'todos os responsáveis' } }] };
  }
  if (/(aluno|turma|natac|futebol|frequen|presen|aula)/.test(t)) {
    const esc2 = /futebol|campo|sub-/.test(t) ? 'futebol' : /natac|piscina/.test(t) ? 'natacao' : (P().setores !== 'all' ? P().setores[0] : null);
    if (isProf()) { const tt = (P().setores[0] === 'natacao' ? S.turmasNat : S.turmasFut).filter(x => x.prof === P().prof); return { b: 1, t: `Suas turmas (${tt.length}): ` + tt.map(x => `${x.nome} — ${x.alunos} alunos`).join('; ') + '.' }; }
    if (esc2 && !canSector(esc2)) return NEG(`Seu cargo (${P().nome}) não tem acesso a essa escola.`);
    if (!canSector('natacao') && !canSector('futebol')) return NEG(`Seu cargo (${P().nome}) não tem acesso às escolas.`);
    return { b: 1, t: `Alunos ativos: ${alunos(S.turmasNat) + alunos(S.turmasFut)}.\nNatação: ${alunos(S.turmasNat)} em ${S.turmasNat.length} turmas · presença hoje 38 de 45.\nFutebol: ${alunos(S.turmasFut)} em ${S.turmasFut.length} turmas.` };
  }
  if (/(funcionar|equipe|quem trabalha|pessoas|colaborador)/.test(t)) {
    if (!isDir()) return NEG('O cadastro de pessoas é visto pela diretoria.');
    return { b: 1, t: `${S.pessoas.filter(p => p.status === 'Ativo').length} pessoas ativas: ` + S.setores.filter(s => s.fixo).map(s => `${s.nome} ${S.pessoas.filter(p => p.setor === s.id && p.status === 'Ativo').length}`).join(' · ') + '.' };
  }
  if (/(relatorio|baixar|exportar|pdf|planilha)/.test(t)) {
    if (!canMod('relatorios')) return NEG(`Seu cargo (${P().nome}) não baixa relatórios.`);
    return { b: 1, t: 'Posso gerar o relatório completo ou por setor, em PDF ou planilha.', acts: [{ l: 'Escolher relatório', k: 'p', act: 'dl', d: { k: isAll() ? 'completo' : P().setores[0] } }] };
  }
  return NEG('Eu respondo só sobre a operação da A&D: faturamento, agenda, hotel, alunos, contas e lançamentos. Como posso ajudar com a empresa?');
}

/* ================= RELATÓRIOS ================= */
function vRelatorios() {
  const R = [];
  if (isAll()) R.push(['completo', 'Relatório completo', 'Todos os setores: receita, despesas, folha, lucro, contas e indicadores', 'layers', '#16171b']);
  visSet().forEach(s => R.push([s.id, 'Relatório · ' + s.nome, 'Fontes de receita, custos, lucro e indicadores do setor', s.icon, s.cor]));
  if (P().fin) R.push(['folha', 'Folha de pagamento', '42 pessoas, bruto, descontos e líquido por setor', 'receipt', '#8b5cf6'], ['contas', 'Contas a pagar e a receber', 'Vencimentos, status e valores em aberto', 'wallet', '#e5484d']);
  return `<div class="sec-title"><div><h2>Relatórios</h2><p>Baixe o relatório completo ou o de cada setor, em PDF ou planilha.</p></div></div>
  <div class="grid g3">${R.map(r => `<div class="card"><div class="ch"><span class="ic" style="width:42px;height:42px;border-radius:99px;display:grid;place-items:center;background:${r[4]}14;color:${r[4]}">${ic(r[3])}</span><div><h3>${esc(r[1])}</h3><p>Novembro de 2026</p></div></div><p style="color:var(--ink2);min-height:42px">${esc(r[2])}</p>
    <div style="display:flex;gap:8px;margin-top:14px"><button class="btn d sm" data-act="gerar" data-k="${r[0]}" data-f="pdf">${ic('download')} PDF</button><button class="btn g sm" data-act="gerar" data-k="${r[0]}" data-f="csv">${ic('download')} Planilha</button></div></div>`).join('')}</div>
  <p class="note mt">A planilha abre no Excel e no Google Planilhas. O PDF sai pela janela de impressão: escolha “Salvar como PDF”.</p>`;
}

function relDados(k) {
  const rows = [], T = tot(visSet());
  const head = ['Seção', 'Item', 'Detalhe', 'Valor (R$)'];
  const addSetor = s => { const r = rec(s); s.fontes.forEach(f => rows.push([s.nome, 'Receita', f[0], f[1]])); rows.push([s.nome, 'Despesas', '', s.despesas], [s.nome, 'Folha', '', s.folha], [s.nome, 'Lucro', 'Margem ' + (r ? pct((r - s.despesas - s.folha) / r) : '—'), r - s.despesas - s.folha]); };
  let titulo = '';
  if (k === 'completo') {
    titulo = 'Relatório completo';
    visSet().forEach(addSetor);
    rows.push(['A&D', 'Total receita', '', T.rec], ['A&D', 'Total despesas', '', T.desp], ['A&D', 'Total folha', '', T.folha], ['A&D', 'Lucro', 'Margem ' + pct(T.margem), T.lucro]);
    S.contasPagar.filter(c => c.status !== 'Pago').forEach(c => rows.push(['Contas a pagar', c.desc, 'Vence ' + c.venc, c.valor]));
    rows.push(['Indicadores', 'Ocupação do hotel', '74% no mês · diária média R$ 289', ''], ['Indicadores', 'Eventos no mês', '11', ''], ['Indicadores', 'Alunos ativos', String(alunos(S.turmasNat) + alunos(S.turmasFut)), ''], ['Indicadores', 'Inadimplência', '4,1%', inadTot()]);
  } else if (k === 'folha') {
    titulo = 'Folha de pagamento';
    S.pessoas.filter(p => p.status === 'Ativo').forEach(p => rows.push([(sec(p.setor) || {}).nome, p.nome, p.cargo + ' · ' + p.vinculo, p.salario]));
    rows.push(['Total', '', '', S.pessoas.filter(p => p.status === 'Ativo').reduce((a, p) => a + p.salario, 0)]);
  } else if (k === 'contas') {
    titulo = 'Contas a pagar e a receber';
    S.contasPagar.forEach(c => rows.push(['A pagar', c.desc, c.venc + ' · ' + c.status, c.valor]));
    S.contasReceber.forEach(c => rows.push(['A receber', c.desc, c.venc + ' · ' + c.status, c.valor]));
  } else {
    const s = sec(k); if (!s) return null;
    titulo = 'Relatório · ' + s.nome;
    addSetor(s);
    if (k === 'hotel') S.reservas.forEach(r => rows.push(['Reservas', r.hospede, `${r.id} · quarto ${r.quarto} · ${r.entrada}–${r.saida} · ${r.status}`, r.valor]));
    if (k === 'eventos') S.eventos.forEach(e => rows.push(['Eventos', e.cliente, `${fmtD(e.data)} · ${e.tipo} · ${e.espaco} · ${e.status}`, e.valor]));
    if (k === 'natacao' || k === 'futebol') { (k === 'natacao' ? S.turmasNat : S.turmasFut).forEach(t => rows.push(['Turmas', t.nome, `${t.dias} ${t.hora} · ${t.prof} · ${t.alunos}/${t.vagas}`, ''])); S.inadimplentes.filter(x => x.escola === k).forEach(x => rows.push(['Em atraso', x.aluno, x.turma + ' · ' + x.dias + ' dias', x.valor])); }
    extras(k).forEach(x => rows.push(['Lançamentos', x.desc, x.data + ' · ' + x.tipo, x.valor]));
  }
  return { titulo, head, rows };
}
function gerar(k, f) {
  const d = relDados(k);
  if (!d) return toast('Relatório indisponível.');
  if (f === 'csv') {
    const cell = v => { const s = typeof v === 'number' ? v.toFixed(2).replace('.', ',') : String(v ?? ''); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const csv = '﻿' + [['A&D Eventos — ' + d.titulo + ' — novembro de 2026'], [], d.head, ...d.rows].map(r => r.map(cell).join(';')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'AD-Eventos-' + d.titulo.replace(/[^\wÀ-ú]+/g, '-') + '-nov-2026.csv';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast('Planilha baixada: ' + d.titulo);
  } else {
    let sec2 = '', html = '';
    d.rows.forEach(r => {
      if (r[0] !== sec2) { if (sec2) html += '</tbody></table>'; sec2 = r[0]; html += `<h2>${esc(r[0])}</h2><table><thead><tr><th>Item</th><th>Detalhe</th><th class="n">Valor</th></tr></thead><tbody>`; }
      html += `<tr><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="n">${typeof r[3] === 'number' ? brl(r[3]) : esc(r[3])}</td></tr>`;
    });
    html += '</tbody></table>';
    $('#print').innerHTML = `<div class="ph"><img src="/img/logo-ad.png" alt=""><div><b style="font-size:13pt">A&amp;D Assessoria Eventos e Serviços LTDA</b><br><span style="color:#666">CNPJ 16.628.608/0001-03 · São Luís/MA</span></div></div><h1>${esc(d.titulo)}</h1><p style="color:#555">Competência novembro de 2026 · gerado em ${new Date().toLocaleDateString('pt-BR')} por ${esc(userName())} (${esc(P().nome)}) · dados de demonstração</p>${html}<div class="pf">Sistema de Gestão A&amp;D Eventos · Desenvolvido por NexusUp Company · NexusUp.company</div>`;
    addLog('Baixou ' + d.titulo + ' (PDF)');
    setTimeout(() => window.print(), 120);
  }
}

/* ================= SEGURANÇA ================= */
function vSeguranca() {
  const acessos = S.pessoas.filter(p => p.perfil !== 'sem' && p.status === 'Ativo').length;
  return `<div class="sec-title"><div><h2>Segurança e LGPD</h2><p>Quem acessou, o que fez e como os dados da A&amp;D e dos clientes ficam protegidos.</p></div></div>
  <div class="grid g4">${kpi('Pessoas com login', String(acessos), 'cada uma com seu cargo', 'key')}${kpi('Verificação em 2 etapas', '100%', 'na versão final', 'shield', '#12a150')}${kpi('Último backup', 'Hoje 03:00', 'criptografado · diário', 'refresh', '#8b5cf6')}${kpi('Tentativas bloqueadas', '0', 'nas últimas 24 horas', 'lock', '#e5484d')}</div>
  <div class="grid g21 mt"><div class="card pad0"><div class="ch" style="padding:18px 20px 0"><h3>Histórico de ações</h3><p>registro que não pode ser apagado</p></div><div class="tw"><table><thead><tr><th>Quando</th><th>Quem</th><th>Cargo</th><th>O que fez</th></tr></thead><tbody>${S.log.slice(0, 25).map(l => `<tr><td class="mono">${esc(l.t)}</td><td>${esc(l.u)}</td><td>${esc(l.p)}</td><td>${esc(l.a)}</td></tr>`).join('')}</tbody></table></div></div>
  <div style="display:flex;flex-direction:column;gap:16px"><div class="card"><div class="ch"><h3>Proteções ativas</h3></div><div class="list">${[['Criptografia', 'Dados protegidos em trânsito e armazenados'], ['Permissões por cargo', 'Cada um vê só o seu setor'], ['Bloqueio automático', 'Após tentativas erradas de login'], ['Desligou, perdeu acesso', 'Na hora, sem depender de ninguém'], ['Backup diário', 'Cópia criptografada fora do servidor']].map(x => `<div class="li" style="padding:9px 0"><span style="color:var(--ok)">${ic('check')}</span><div class="t"><b>${x[0]}</b><small>${x[1]}</small></div></div>`).join('')}</div></div>
  <div class="card"><div class="ch"><h3>LGPD</h3></div><div class="list"><div class="li"><div class="t"><b>Aceite dos responsáveis</b><small>Alunos menores: termo assinado na matrícula</small></div><span class="pill ok">ok</span></div><div class="li"><div class="t"><b>Dados de hóspedes</b><small>Usados só para a FNRH e a reserva</small></div><span class="pill ok">ok</span></div><div class="li"><div class="t"><b>Pedidos de titulares</b><small>Acesso, correção ou exclusão</small></div><span class="pill">0 abertos</span></div></div>
  ${isDir() ? `<button class="btn g mt" style="width:100%" data-act="lgpd">${ic('download')} Exportar dados de uma pessoa</button>` : ''}</div></div></div>`;
}

/* ================= modais ================= */
function modal(title, body, foot, lg) {
  $('#layer').innerHTML = `<div class="ov" data-act="ovclose"><div class="modal ${lg ? 'lg' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="mh"><h3>${esc(title)}</h3><button class="iconbtn" data-act="close" aria-label="Fechar">${ic('x')}</button></div><div class="mb">${body}</div>${foot ? `<div class="mf">${foot}</div>` : ''}</div></div>`;
  const f = $('#layer input, #layer select'); if (f && window.innerWidth > 900) f.focus();
}
const close = () => { $('#layer').innerHTML = ''; };
function toast(t) {
  const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = ic('check') + '<span>' + esc(t) + '</span>';
  $('#toasts').appendChild(el); setTimeout(() => el.remove(), 3200);
}
const val = id => { const e = document.getElementById(id); return e ? e.value.trim() : ''; };
const opts = (arr, sel) => arr.map(o => Array.isArray(o) ? `<option value="${esc(o[0])}" ${o[0] === sel ? 'selected' : ''}>${esc(o[1])}</option>` : `<option ${o === sel ? 'selected' : ''}>${esc(o)}</option>`).join('');

function mDownload(k) {
  const list = visSet();
  const pre = k === 'setor' ? (list[0] || {}).id : k;
  const ops = (isAll() ? [['completo', 'Relatório completo (todos os setores)']] : []).concat(list.map(s => [s.id, 'Por setor · ' + s.nome]));
  if (P().fin) ops.push(['folha', 'Folha de pagamento'], ['contas', 'Contas a pagar e a receber']);
  modal('Baixar relatório', `<div class="fg"><div class="f full"><label>Relatório</label><select id="rk">${opts(ops, pre)}</select></div>
    <div class="f full"><label>Formato</label><div style="display:flex;gap:8px"><label class="chip" style="cursor:pointer;flex:1"><input type="radio" name="rf" value="pdf" checked style="accent-color:var(--accent)"> PDF</label><label class="chip" style="cursor:pointer;flex:1"><input type="radio" name="rf" value="csv" style="accent-color:var(--accent)"> Planilha (Excel)</label></div></div></div>
    <p class="note mt">Competência novembro de 2026.</p>`, `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="dlgo">${ic('download')} Baixar</button>`);
}
function mDespesa() {
  modal('Lançar despesa', `<div class="fg"><div class="f full"><label>Descrição</label><input id="dd" placeholder="Ex.: Conserto do ar-condicionado do 107"></div>
    <div class="f"><label>Setor</label><select id="ds">${opts(visSet().map(s => [s.id, s.nome]))}</select></div>
    <div class="f"><label>Categoria</label><select id="dc">${opts(['Manutenção', 'Alimentos', 'Bebidas', 'Limpeza e produtos', 'Decoração', 'Material esportivo', 'Contas da casa', 'Outros'])}</select></div>
    <div class="f"><label>Valor (R$)</label><input id="dv" inputmode="decimal" placeholder="0,00"></div>
    <div class="f"><label>Pagamento</label><select id="dp">${opts(['Pix', 'Cartão', 'Dinheiro', 'Boleto'])}</select></div></div>
    <p class="note mt">Dica: dá para lançar pelo WhatsApp — “paguei 380 na bomba da piscina” — ou mandando a foto do comprovante para o agente.</p>`, `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="despok">Lançar</button>`);
}
function addDespesa(v, sid, cat, descr, via) {
  const s = sec(sid); if (!s || !(v > 0)) return false;
  s.despesas += v;
  S.despesas.unshift({ data: '25/11', desc: descr, setor: sid, cat, valor: v, via });
  if (!s.fixo) (S.lancExtras[sid] = S.lancExtras[sid] || []).unshift({ data: '25/11', tipo: 'despesa', desc: descr, valor: v });
  addLog(`Lançou ${brl(v)} em ${cat} · ${s.nome}${/Agente/.test(via) ? ' (via agente)' : ''}`);
  save(); return true;
}
function mOrcamento() {
  modal('Novo orçamento de evento', `<div class="fg"><div class="f full"><label>Cliente</label><input id="oc" placeholder="Nome do cliente"></div>
    <div class="f"><label>Tipo</label><select id="ot">${opts(['Casamento', 'Aniversário de 15 anos', 'Aniversário', 'Formatura', 'Corporativo', 'Confraternização', 'Infantil', 'Batizado', 'Churrasco'])}</select></div>
    <div class="f"><label>Espaço</label><select id="oe">${opts(ESPACOS.map(e => e.n))}</select></div>
    <div class="f"><label>Data</label><input id="od" type="date" min="2026-11-25" value="2026-12-13"></div>
    <div class="f"><label>Horário</label><input id="oh" value="20h"></div>
    <div class="f"><label>Convidados</label><input id="og" inputmode="numeric" value="150"></div>
    <div class="f"><label>Pacote</label><select id="op">${opts([['espaco', 'Só o espaço'], ['bufe', 'Espaço + bufê'], ['completo', 'Completo (bufê, bebidas e decoração)']], 'bufe')}</select></div></div>
    <div class="card mt" style="background:#fafafc;box-shadow:none"><div class="note">Valor sugerido</div><div class="big mono" id="ov">—</div><div class="note">Sinal de 30% para reservar a data · contrato enviado pelo WhatsApp</div></div>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="orcok">Salvar orçamento</button>`);
  const calc = () => { const g = parseInt(val('og')) || 0, p = val('op'), base = { 'Salão dos Lustres': 3200, 'Auditório': 2400, 'Salão Multiuso': 1400, 'Área da piscina': 1200, 'Área de churrasco': 900, 'Pátio e palco': 2000 }[val('oe')] || 1500; const v = base + g * (p === 'espaco' ? 0 : p === 'bufe' ? 38 : 62); $('#ov').textContent = brl(v); return v; };
  ['og', 'op', 'oe'].forEach(id => { $('#' + id).addEventListener('input', calc); $('#' + id).addEventListener('change', calc); }); calc();
  window.__orcCalc = calc;
}
function mEvento(id) {
  const e = S.eventos.find(x => x.id === id); if (!e) return;
  const canV = canMoney();
  modal(e.cliente, `<div class="grid g2" style="gap:12px">${[['Data', fmtD(e.data) + ' · ' + e.hora], ['Tipo', e.tipo], ['Espaço', e.espaco], ['Convidados', e.convidados]].concat(canV ? [['Valor', brl(e.valor)], ['Lucro previsto', brl(e.valor - e.custo)]] : []).map(x => `<div><div class="note">${x[0]}</div><b>${esc(x[1])}</b></div>`).join('')}</div>
    <div style="margin-top:16px">${pill(e.status)}</div>
    <div class="list mt">${['Orçamento enviado', 'Contrato assinado', 'Sinal (30%)', 'Parcelas', 'Equipe escalada'].map((x, i) => { const done = e.status === 'Realizado' || e.status === 'Hoje' || e.status === 'Confirmado' ? true : (e.status === 'Sinal pago' ? i < 3 : e.status === 'Sem sinal' ? i < 2 : i < 1); return `<div class="li" style="padding:9px 0"><span style="color:${done ? 'var(--ok)' : 'var(--ink3)'}">${ic(done ? 'check' : 'clock')}</span><div class="t">${x}</div></div>`; }).join('')}</div>`,
  `${e.status === 'Sem sinal' || e.status === 'Orçamento' ? `<button class="btn g" data-act="contrato" data-id="${e.id}">${ic('wpp')} Enviar contrato</button><button class="btn p" data-act="sinal" data-id="${e.id}">${ic('check')} Registrar sinal</button>` : `<button class="btn g" data-act="close">Fechar</button>`}`);
}
function mQuarto(n) {
  const q = S.quartos.find(x => x.n === n); if (!q) return;
  const lab = { ocupado: 'Ocupado', chegada: 'Chega hoje', limpeza: 'Em limpeza', manutencao: 'Em manutenção', livre: 'Livre' };
  const acts = { chegada: `<button class="btn p" data-act="checkin" data-n="${n}">${ic('user')} Fazer check-in (FNRH)</button>`, ocupado: `<button class="btn g" data-act="consumo" data-n="${n}">${ic('cup')} Lançar consumo</button><button class="btn p" data-act="checkout" data-n="${n}">Fazer check-out</button>`, limpeza: `<button class="btn p" data-act="qstatus" data-n="${n}" data-s="livre">${ic('check')} Limpeza concluída</button>`, manutencao: `<button class="btn p" data-act="qstatus" data-n="${n}" data-s="limpeza">${ic('check')} Manutenção concluída</button>`, livre: `<button class="btn p" data-act="reserva" data-n="${n}">${ic('plus')} Nova reserva</button>` };
  modal('Quarto ' + n, `<div style="display:flex;gap:14px;align-items:center"><img src="/img/${q.tipo === 'Casal' ? 'quarto-casal' : 'quarto-duplo'}.jpg" alt="" style="width:120px;height:90px;object-fit:cover;border-radius:16px"><div><b style="font-size:18px">Quarto ${n} · ${q.tipo}</b><div class="note">Diária a partir de R$ 289</div><div style="margin-top:8px"><span class="pill">${lab[q.status]}</span></div></div></div>
    ${q.hospede ? `<div class="grid g2 mt" style="gap:12px"><div><div class="note">Hóspede</div><b>${esc(q.hospede)}</b></div><div><div class="note">Período</div><b>${q.in} → ${q.out}</b></div></div>` : ''}`, acts[q.status]);
}
function mCheckin(n) {
  const q = S.quartos.find(x => x.n === n);
  modal('Check-in · quarto ' + n, `<p class="note" style="margin-bottom:14px">Ficha do hóspede alinhada à FNRH Digital. Os dados ficam protegidos e são usados só para a hospedagem.</p><div class="fg">
    <div class="f full"><label>Nome completo</label><input id="cn" value="${esc(q ? q.hospede.replace(/\s*\(.*\)$/, '') : '')}"></div>
    <div class="f"><label>CPF ou passaporte</label><input id="cd" placeholder="000.000.000-00"></div>
    <div class="f"><label>Data de nascimento</label><input id="cb" type="date"></div>
    <div class="f"><label>Nacionalidade</label><input id="cna" value="Brasileira"></div>
    <div class="f"><label>Telefone (WhatsApp)</label><input id="ct" inputmode="tel" placeholder="(98) 9 0000-0000"></div>
    <div class="f"><label>Motivo da viagem</label><select>${opts(['Lazer', 'Negócios', 'Evento na A&D', 'Saúde', 'Outro'])}</select></div>
    <div class="f"><label>Meio de transporte</label><select>${opts(['Carro', 'Avião', 'Ônibus', 'Outro'])}</select></div>
    <div class="f"><label>Cidade de origem</label><input placeholder="Cidade/UF"></div>
    <div class="f"><label>Próximo destino</label><input placeholder="Cidade/UF"></div>
    <label class="chk f full"><input type="checkbox" id="clg"> O hóspede leu e aceitou o termo de privacidade (LGPD).</label></div>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="checkinok" data-n="${n}">${ic('check')} Confirmar check-in</button>`, true);
}
function mReserva(n) {
  const livres = S.quartos.filter(q => q.status === 'livre' || q.status === 'limpeza');
  modal('Nova reserva', `<div class="fg"><div class="f full"><label>Hóspede</label><input id="rh" placeholder="Nome do hóspede"></div>
    <div class="f"><label>Quarto</label><select id="rq">${opts(livres.map(q => [q.n, q.n + ' · ' + q.tipo + (q.status === 'limpeza' ? ' (em limpeza)' : '')]), n)}</select></div>
    <div class="f"><label>Origem</label><select id="ro">${opts(['WhatsApp', 'Balcão', 'Booking', 'Site', 'Empresa'])}</select></div>
    <div class="f"><label>Entrada</label><input id="ri" type="date" value="2026-11-25" min="2026-11-25"></div>
    <div class="f"><label>Saída</label><input id="rs" type="date" value="2026-11-27" min="2026-11-26"></div></div>
    <div class="card mt" style="background:#fafafc;box-shadow:none"><div class="note">Total estimado</div><div class="big mono" id="rv">${brl(578)}</div><div class="note">R$ 289 por diária · confirmação automática pelo WhatsApp</div></div>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="reservaok">Salvar reserva</button>`);
  const calc = () => { const a = new Date(val('ri')), b = new Date(val('rs')); const nn = Math.max(1, Math.round((b - a) / 864e5) || 1); $('#rv').textContent = brl(nn * 289); return nn; };
  ['ri', 'rs'].forEach(id => $('#' + id).addEventListener('change', calc));
  window.__resCalc = calc;
}
function mMatricula(e) {
  const tur = e === 'natacao' ? S.turmasNat : S.turmasFut;
  modal('Nova matrícula · ' + sec(e).nome, `<div class="fg"><div class="f full"><label>Nome do aluno</label><input id="ma"></div>
    <div class="f"><label>Data de nascimento</label><input type="date" id="mn"></div>
    <div class="f"><label>Turma</label><select id="mt">${opts(tur.map((t, i) => [String(i), t.nome + (t.alunos >= t.vagas ? ' — lotada' : ` — ${t.vagas - t.alunos} vagas`)]))}</select></div>
    <div class="f"><label>Responsável</label><input id="mr" placeholder="Se menor de idade"></div>
    <div class="f"><label>WhatsApp do responsável</label><input id="mw" inputmode="tel" placeholder="(98) 9 0000-0000"></div>
    <div class="f full"><label>Plano</label><select id="mp">${opts(e === 'natacao' ? ['2x por semana · R$ 199', '3x por semana · R$ 259', 'Hidroginástica · R$ 189'] : ['Escolinha · R$ 165', 'Escolinha + goleiro · R$ 199'])}</select></div>
    <label class="chk f full"><input type="checkbox" id="mac"> O responsável aceitou o termo de matrícula e de privacidade (LGPD) pelo celular.</label></div>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="matok" data-e="${e}">Matricular</button>`);
}
function mNovoSetor() {
  const cores = ['#8b5cf6', '#e5484d', '#0ea5e9', '#d946ef', '#14b8a6', '#64748b'];
  modal('Novo setor', `<div class="fg"><div class="f full"><label>Nome do setor</label><input id="sn" placeholder="Ex.: Restaurante da piscina" maxlength="40"></div>
    <div class="f"><label>Modelo</label><select id="sm">${opts(Object.keys(MODELOS))}</select></div>
    <div class="f"><label>Responsável</label><select id="sr">${opts(['A definir'].concat(S.pessoas.filter(p => p.vinculo !== 'Freelancer').map(p => p.nome)))}</select></div>
    <div class="f full"><label>Fontes de receita (separe por vírgula)</label><input id="sf" value="${MODELOS['Restaurante ou bar'].fontes.join(', ')}"></div>
    <div class="f full"><label>Cor</label><div style="display:flex;gap:10px" id="scs">${cores.map((c, i) => `<button type="button" data-act="scor" data-c="${c}" style="width:34px;height:34px;border-radius:99px;background:${c};outline:${i === 0 ? '3px solid ' + c + '55' : 'none'};outline-offset:2px"></button>`).join('')}</div><input type="hidden" id="sc" value="${cores[0]}"></div></div>
    <p class="note mt">O setor novo já nasce com dashboard, financeiro, relatórios e acesso por cargo.</p>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="setorok">${ic('plus')} Criar setor</button>`);
  $('#sm').addEventListener('change', () => { $('#sf').value = MODELOS[val('sm')].fontes.join(', '); });
}
function mLanc(sid, tp) {
  const s = sec(sid);
  modal((tp === 'receita' ? 'Lançar receita · ' : 'Lançar despesa · ') + s.nome, `<div class="fg">${tp === 'receita' ? `<div class="f full"><label>Fonte</label><select id="lf">${opts(s.fontes.map((f, i) => [String(i), f[0]]))}</select></div>` : ''}
    <div class="f full"><label>Descrição</label><input id="ld" placeholder="${tp === 'receita' ? 'Ex.: Vendas do fim de semana' : 'Ex.: Compra de insumos'}"></div>
    <div class="f"><label>Valor (R$)</label><input id="lv" inputmode="decimal" placeholder="0,00"></div><div class="f"><label>Data</label><input value="25/11/2026" disabled></div></div>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="lancok" data-s="${sid}" data-tp="${tp}">Lançar</button>`);
}
function mPessoa() {
  modal('Novo funcionário', `<div class="fg"><div class="f full"><label>Nome completo</label><input id="pn"></div>
    <div class="f"><label>Cargo</label><input id="pc" placeholder="Ex.: Recepcionista"></div>
    <div class="f"><label>Setor</label><select id="ps">${opts(S.setores.map(s => [s.id, s.nome]))}</select></div>
    <div class="f"><label>Vínculo</label><select id="pv">${opts(['CLT', 'Por aula', 'Freelancer', 'Prestador'])}</select></div>
    <div class="f"><label>Salário / valor (R$)</label><input id="psa" inputmode="decimal" placeholder="0,00"></div>
    <div class="f"><label>Acesso ao sistema</label><select id="pp">${opts([['sem', 'Sem login']].concat(Object.keys(PERFIS).filter(k => k !== 'diretoria').map(k => [k, PERFIS[k].nome])))}</select></div>
    <div class="f"><label>WhatsApp</label><input id="pw" inputmode="tel" placeholder="(98) 9 0000-0000"></div></div>
    <p class="note mt">Com login, a pessoa recebe o acesso pelo WhatsApp e vê só o setor dela.</p>`,
  `<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="pessoaok">Cadastrar</button>`);
}
function mHolerite(id) {
  const p = S.pessoas.find(x => x.id === +id); if (!p) return;
  const d = desc(p);
  modal('Holerite · novembro de 2026', `<div class="holerite"><div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:12px"><div><b>${esc(p.nome)}</b><div class="note">${esc(p.cargo)} · ${esc((sec(p.setor) || {}).nome)} · ${esc(p.vinculo)}</div></div><img src="/img/logo-ad.png" alt="" style="width:56px;height:auto"></div>
    <div class="row"><span>${p.vinculo === 'Por aula' ? 'Aulas do mês' : p.vinculo === 'Freelancer' ? 'Diárias de eventos' : 'Salário base'}</span><span class="mono">${brl(p.salario)}</span></div>
    ${d ? `<div class="row"><span>INSS (estimado)</span><span class="mono">− ${brl(Math.round(d * 0.88 * 100) / 100)}</span></div><div class="row"><span>Vale-transporte</span><span class="mono">− ${brl(Math.round(d * 0.12 * 100) / 100)}</span></div>` : ''}
    <div class="row"><span>Líquido a receber</span><span class="mono">${brl(p.salario - d)}</span></div></div><p class="note mt">Pagamento por Pix em 05/12 · valores de demonstração.</p>`,
  `<button class="btn g" data-act="holwpp" data-n="${esc(p.nome)}">${ic('wpp')} Enviar no WhatsApp</button><button class="btn p" data-act="holpdf" data-id="${p.id}">${ic('download')} Baixar PDF</button>`);
}

/* ================= busca e menus ================= */
function buscar(q) {
  const n = norm(q), res = [];
  if (canMod('pessoas')) S.pessoas.filter(p => norm(p.nome + p.cargo).includes(n)).slice(0, 6).forEach(p => res.push(['Pessoa', p.nome, p.cargo, 'pessoas']));
  if (canMod('hotel')) S.reservas.filter(r => norm(r.hospede + r.quarto).includes(n)).slice(0, 6).forEach(r => res.push(['Hóspede', r.hospede, 'Quarto ' + r.quarto + ' · ' + r.entrada + '–' + r.saida, 'hotel']));
  if (canMod('eventos')) S.eventos.filter(e => norm(e.cliente + e.tipo + e.espaco).includes(n)).slice(0, 6).forEach(e => res.push(['Evento', e.cliente, fmtD(e.data) + ' · ' + e.espaco, 'eventos']));
  ['natacao', 'futebol'].forEach(k => { if (canMod(k)) S.chamada[k].filter(a => norm(a).includes(n)).slice(0, 4).forEach(a => res.push(['Aluno', a, sec(k).nome, k])); });
  modal('Busca: “' + q + '”', res.length ? `<div class="list">${res.map(r => `<a class="li" href="#/${r[3]}" data-act="close"><span class="pill">${r[0]}</span><div class="t"><b>${esc(r[1])}</b><small>${esc(r[2])}</small></div>${ic('right')}</a>`).join('')}</div>` : '<div class="empty">Nada encontrado no que seu cargo pode ver.</div>');
}
function dropdown(html) {
  const d = $('.dropdown'); if (d) { const same = d.dataset.k === html.k; d.remove(); if (same) return; }
  document.body.insertAdjacentHTML('beforeend', `<div class="dropdown" data-k="${html.k}">${html.h}</div>`);
}

/* ================= ações ================= */
const ACT = {
  menu: () => document.body.classList.toggle('menu'),
  close, ovclose: (el, e) => { if (e.target === el) close(); },
  alerts: () => dropdown({ k: 'al', h: `<h4>Alertas de hoje</h4>${alertas().map(a => `<a class="li" href="#/${a.go}"><span class="pill ${a.k}">${a.l}</span><div class="t"><b>${esc(a.t)}</b><small>${esc(a.d)}</small></div></a>`).join('') || '<div class="empty">Nada pendente.</div>'}` }),
  profile: () => dropdown({ k: 'pf', h: `<h4>Ver o sistema como</h4>${Object.keys(PERFIS).map(k => `<button class="li" style="width:100%;text-align:left" data-act="switch" data-k="${k}"><span class="av" style="width:30px;height:30px;font-size:11px;background:${k === perfilId ? 'var(--accent)' : 'var(--ink)'}">${esc(ini(NOMES[k]))}</span><div class="t"><b>${PERFIS[k].nome}</b><small>${esc(PERFIS[k].desc)}</small></div>${k === perfilId ? ic('check') : ''}</button>`).join('')}<div style="border-top:1px solid var(--line);margin:6px 0"></div><a class="li" href="/login">${ic('logout')}<div class="t"><b>Sair</b></div></a>` }),
  switch: el => { perfilId = el.dataset.k; nomeUser = ''; chat = null; setSess(); addLog('Entrou como ' + P().nome); const d = $('.dropdown'); if (d) d.remove(); const r = route(); if (!P().mods.includes(r.a)) go(P().mods[0]); else render(); toast('Agora você vê o sistema como ' + P().nome); },
  reset: () => { modal('Restaurar dados de demonstração', '<p>Volta todos os números, reservas, eventos e pessoas para o estado original da apresentação.</p>', '<button class="btn g" data-act="close">Cancelar</button><button class="btn d" data-act="resetok">Restaurar</button>'); },
  resetok: () => { S = window.AD_SEED(); save(); close(); render(); toast('Dados restaurados'); },
  dl: el => mDownload(el.dataset.k),
  dlgo: () => { const k = val('rk'), f = ($('input[name=rf]:checked') || {}).value || 'pdf'; close(); gerar(k, f); },
  gerar: el => gerar(el.dataset.k, el.dataset.f),
  fintab: el => { finTab = el.dataset.t; render(); },
  despesa: mDespesa,
  despok: () => { const v = parseFloat(val('dv').replace(/\./g, '').replace(',', '.')); if (!val('dd') || !(v > 0)) return toast('Preencha descrição e valor'); addDespesa(v, val('ds'), val('dc'), val('dd'), 'Sistema · ' + val('dp')); close(); finTab = 'lanc'; render(); toast('Despesa lançada: ' + brl(v)); },
  pagar: el => { const c = S.contasPagar.find(x => x.id === +el.dataset.id); if (c) { c.status = 'Pago'; addLog('Marcou como paga: ' + c.desc); save(); render(); toast('Conta marcada como paga'); } },
  cobrar: el => { const c = S.contasReceber[+el.dataset.i]; toast('O agente enviou a cobrança com Pix pelo WhatsApp'); if (c) addLog('Cobrança enviada: ' + c.desc); },
  cal: el => { calM += +el.dataset.d; if (calM > 11) { calM = 0; calY++; } if (calM < 0) { calM = 11; calY--; } render(); },
  evento: el => mEvento(el.dataset.id),
  orcamento: () => { if (!canMod('eventos')) { go('eventos'); return; } mOrcamento(); },
  orcok: () => {
    const c = val('oc'); if (!c) return toast('Informe o cliente');
    const d = val('od'), e = val('oe');
    if (S.eventos.some(x => x.data === d && x.espaco === e)) return toast('Esse espaço já está ocupado nessa data');
    const v = window.__orcCalc ? window.__orcCalc() : 0;
    S.eventos.push({ id: 'E-' + (315 + S.eventos.length), data: d, hora: val('oh') || '20h', cliente: c, tipo: val('ot'), espaco: e, convidados: parseInt(val('og')) || 0, valor: v, custo: Math.round(v * 0.42), status: 'Orçamento' });
    S.eventos.sort((a, b) => a.data.localeCompare(b.data)); addLog('Criou orçamento: ' + c + ' (' + fmtD(d) + ')'); save(); close();
    const dt = parseD(d); calM = dt.getMonth(); calY = dt.getFullYear(); if (route().a !== 'eventos') go('eventos'); else render(); toast('Orçamento salvo e enviado ao cliente pelo WhatsApp');
  },
  sinal: el => { const e = S.eventos.find(x => x.id === el.dataset.id); if (e) { e.status = 'Sinal pago'; addLog('Registrou sinal: ' + e.cliente); save(); close(); render(); toast('Sinal registrado · data reservada'); } },
  contrato: el => { const e = S.eventos.find(x => x.id === el.dataset.id); toast('Contrato enviado para ' + (e ? e.cliente : 'o cliente') + ' pelo WhatsApp'); },
  quarto: el => mQuarto(el.dataset.n),
  checkin: el => mCheckin(el.dataset.n),
  checkinok: el => { if (!val('cn')) return toast('Informe o nome do hóspede'); if (!$('#clg').checked) return toast('Falta o aceite do termo de privacidade'); const q = S.quartos.find(x => x.n === el.dataset.n); if (q) { q.status = 'ocupado'; const r = S.reservas.find(x => x.quarto === q.n && x.status === 'Chega hoje'); if (r) r.status = 'Hospedado'; addLog('Check-in do quarto ' + q.n + ' (' + q.hospede + ')'); save(); } close(); render(); toast('Check-in feito · ficha enviada à FNRH Digital'); },
  checkout: el => { const q = S.quartos.find(x => x.n === el.dataset.n); if (q) { addLog('Check-out do quarto ' + q.n + ' (' + q.hospede + ')'); const r = S.reservas.find(x => x.quarto === q.n && x.status === 'Hospedado'); if (r) r.status = 'Finalizada'; Object.assign(q, { status: 'limpeza', hospede: '', in: '', out: '' }); save(); } close(); render(); toast('Check-out feito · quarto enviado para limpeza'); },
  qstatus: el => { const q = S.quartos.find(x => x.n === el.dataset.n); if (q) { q.status = el.dataset.s; addLog('Quarto ' + q.n + ': ' + (el.dataset.s === 'livre' ? 'liberado' : 'manutenção concluída')); save(); } close(); render(); toast('Quarto atualizado'); },
  consumo: el => { const s = sec('hotel'); s.fontes[1][1] += 48; addLog('Consumo no quarto ' + el.dataset.n + ': R$ 48,00'); save(); close(); render(); toast('Consumo de R$ 48,00 lançado na conta do quarto ' + el.dataset.n); },
  reserva: el => mReserva(el.dataset.n),
  reservaok: () => {
    const h = val('rh'); if (!h) return toast('Informe o hóspede');
    const nn = window.__resCalc ? window.__resCalc() : 1, qn = val('rq'), di = val('ri'), ds = val('rs');
    const f = x => x.split('-').reverse().slice(0, 2).join('/');
    S.reservas.unshift({ id: 'R-' + (2422 + S.reservas.length), hospede: h, quarto: qn, entrada: f(di), saida: f(ds), noites: nn, origem: val('ro'), valor: nn * 289, status: di === HOJE ? 'Chega hoje' : 'Confirmada' });
    const q = S.quartos.find(x => x.n === qn);
    if (q && di === HOJE) Object.assign(q, { status: 'chegada', hospede: h, in: f(di), out: f(ds) });
    addLog('Nova reserva: ' + h + ' · quarto ' + qn); save(); close(); if (route().a !== 'hotel') go('hotel'); else render(); toast('Reserva salva · confirmação enviada pelo WhatsApp');
  },
  matricula: el => mMatricula(el.dataset.e),
  matok: el => {
    const e = el.dataset.e, a = val('ma'); if (!a) return toast('Informe o nome do aluno'); if (!$('#mac').checked) return toast('Falta o aceite do responsável');
    const t = (e === 'natacao' ? S.turmasNat : S.turmasFut)[+val('mt')]; if (t.alunos >= t.vagas) return toast('Turma lotada · escolha outra');
    t.alunos++; S.chamada[e].push(a); const s = sec(e); s.fontes[e === 'natacao' ? 1 : 0][1] += e === 'natacao' ? 80 : 0; addLog('Matriculou ' + a + ' em ' + t.nome); save(); close(); render(); toast('Matrícula feita · Pix da 1ª mensalidade enviado');
  },
  salvarfreq: el => { const e = el.dataset.e, p = chamadaState[e] || {}, f = Object.values(p).filter(v => v === false).length; addLog('Registrou frequência — ' + sec(e).nome); toast('Frequência salva' + (f ? ` · ${f} falta(s) avisada(s) ao responsável` : '')); },
  lembrete: el => { toast('Lembrete com Pix enviado para ' + el.dataset.n); addLog('Lembrete de mensalidade enviado: ' + el.dataset.n); },
  campo: el => { const c = S.campo[+el.dataset.i]; Object.assign(c, { cliente: 'Reserva pelo sistema', valor: 180, status: 'Reservado' }); sec('futebol').fontes[1][1] += 180; addLog('Reservou o campo ' + c.hora); save(); render(); toast('Campo reservado · ' + c.hora); },
  novosetor: mNovoSetor,
  scor: el => { $('#sc').value = el.dataset.c; $$('#scs button').forEach(b => b.style.outline = b === el ? '3px solid ' + b.dataset.c + '55' : 'none'); },
  setorok: () => {
    const n = val('sn'); if (!n) return toast('Dê um nome ao setor');
    const m = MODELOS[val('sm')], id = 'x' + Date.now().toString(36);
    const fontes = val('sf').split(',').map(x => x.trim()).filter(Boolean).slice(0, 8).map(x => [x.slice(0, 40), 0]);
    S.setores.push({ id, nome: n.slice(0, 40), cor: val('sc'), icon: m.icon, fixo: false, resp: val('sr'), volume: '', fontes: fontes.length ? fontes : [['Receita principal', 0]], despesas: 0, folha: 0 });
    addLog('Criou o setor ' + n); save(); close(); go('setor/' + id); toast('Setor criado: ' + n);
  },
  delsetor: el => { const s = sec(el.dataset.s); modal('Excluir setor', `<p>Excluir <b>${esc(s.nome)}</b> e os lançamentos dele? Esta ação fica registrada no histórico.</p>`, `<button class="btn g" data-act="close">Cancelar</button><button class="btn d" data-act="delsetorok" data-s="${s.id}">Excluir</button>`); },
  delsetorok: el => { const s = sec(el.dataset.s); S.setores = S.setores.filter(x => x.id !== el.dataset.s); delete S.lancExtras[el.dataset.s]; addLog('Excluiu o setor ' + (s ? s.nome : '')); save(); close(); go('setores'); toast('Setor excluído'); },
  lanc: el => mLanc(el.dataset.s, el.dataset.tp),
  lancok: el => {
    const s = sec(el.dataset.s), v = parseFloat(val('lv').replace(/\./g, '').replace(',', '.')); if (!(v > 0)) return toast('Informe o valor');
    const d = val('ld') || (el.dataset.tp === 'receita' ? s.fontes[+val('lf')][0] : 'Despesa');
    if (el.dataset.tp === 'receita') { s.fontes[+val('lf')][1] += v; (S.lancExtras[s.id] = S.lancExtras[s.id] || []).unshift({ data: '25/11', tipo: 'receita', desc: d, valor: v }); addLog(`Lançou receita ${brl(v)} · ${s.nome}`); save(); }
    else addDespesa(v, s.id, 'Outros', d, 'Sistema');
    close(); render(); toast('Lançado: ' + brl(v));
  },
  pestab: el => { pesTab = el.dataset.t; render(); },
  pesf: el => { pesF = el.dataset.f; render(); },
  deslig: el => { const p = S.pessoas.find(x => x.id === +el.dataset.id); if (!p) return; p.status = p.status === 'Ativo' ? 'Desligado' : 'Ativo'; addLog((p.status === 'Ativo' ? 'Reativou ' : 'Desligou ') + p.nome + (p.status !== 'Ativo' && p.perfil !== 'sem' ? ' · acesso removido' : '')); save(); render(); toast(p.status === 'Ativo' ? p.nome + ' reativado(a)' : p.nome + ' desligado(a)' + (p.perfil !== 'sem' ? ' · acesso removido na hora' : '')); },
  perm: el => { const a = S.perm[el.dataset.a], j = +el.dataset.j; a[j] = a[j] ? 0 : 1; addLog('Alterou permissão: ' + ACOES.find(x => x[1] === el.dataset.a)[0] + ' — ' + COLS[j]); save(); el.classList.toggle('on'); toast('Permissão atualizada'); },
  novapessoa: mPessoa,
  pessoaok: () => {
    const n = val('pn'); if (!n) return toast('Informe o nome');
    const sal = parseFloat(val('psa').replace(/\./g, '').replace(',', '.')) || 0;
    const p = { id: Date.now(), nome: n.slice(0, 50), cargo: val('pc') || 'Colaborador', setor: val('ps'), vinculo: val('pv'), perfil: val('pp'), salario: sal, fone: val('pw') || '—', status: 'Ativo' };
    S.pessoas.unshift(p); const s = sec(p.setor); if (s) s.folha += sal;
    addLog('Cadastrou ' + p.nome + ' (' + p.cargo + ')'); save(); close(); pesTab = 'equipe'; render(); toast(p.perfil !== 'sem' ? 'Cadastrado · acesso enviado pelo WhatsApp' : 'Funcionário cadastrado');
  },
  delwpp: el => { const w = S.whats.splice(+el.dataset.i, 1)[0]; addLog('Removeu número do agente: ' + (w ? w.nome : '')); save(); render(); toast('Número removido do agente'); },
  addwpp: () => { const n = val('wnome'), w = val('wnum'); if (!n || !w) return toast('Preencha nome e número'); S.whats.push({ num: w.slice(0, 20), nome: n.slice(0, 40), perfil: 'Autorizado' }); addLog('Autorizou número no agente: ' + n); save(); render(); toast('Número autorizado no agente'); },
  folf: el => { folF = el.dataset.f; render(); },
  fecharfolha: () => modal('Fechar folha de novembro', `<p>Total de <b>${brl(S.pessoas.filter(p => p.status === 'Ativo').reduce((a, p) => a + p.salario, 0))}</b> para ${S.pessoas.filter(p => p.status === 'Ativo').length} pessoas. Depois de fechada, os holerites são enviados pelo WhatsApp e o pagamento fica agendado para 05/12.</p>`, '<button class="btn g" data-act="close">Cancelar</button><button class="btn p" data-act="fecharok">Fechar folha</button>'),
  fecharok: () => { S.folhaFechada = true; addLog('Fechou a folha de novembro'); save(); close(); render(); toast('Folha fechada · holerites enviados'); },
  holerite: el => mHolerite(el.dataset.id),
  holwpp: el => toast('Holerite enviado para ' + el.dataset.n),
  holpdf: el => { const p = S.pessoas.find(x => x.id === +el.dataset.id); const d = desc(p); $('#print').innerHTML = `<div class="ph"><img src="/img/logo-ad.png" alt=""><div><b>A&amp;D Assessoria Eventos e Serviços LTDA</b><br><span style="color:#666">CNPJ 16.628.608/0001-03</span></div></div><h1>Holerite · novembro de 2026</h1><p><b>${esc(p.nome)}</b> — ${esc(p.cargo)} · ${esc(p.vinculo)}</p><table><tbody><tr><td>Base</td><td class="n">${brl(p.salario)}</td></tr><tr><td>Descontos</td><td class="n">− ${brl(d)}</td></tr><tr><td><b>Líquido</b></td><td class="n"><b>${brl(p.salario - d)}</b></td></tr></tbody></table><div class="pf">Valores de demonstração · Desenvolvido por NexusUp Company · NexusUp.company</div>`; setTimeout(() => window.print(), 100); },
  sug: el => perguntar(el.dataset.t),
  anexo: () => { perguntar('📷 Foto do comprovante: Distribuidora Ilha — R$ 4.860,00'); },
  aglanc: el => { const v = +el.dataset.v; if (!(P().fin || (canSector(el.dataset.s) && canMoney()))) { pushMsg(NEG('Seu cargo não lança despesas nesse setor.')); return; } addDespesa(v, el.dataset.s, el.dataset.c, el.dataset.x.replace(/^(paguei|gastei|comprei)\s*/i, '').replace(/^./, c => c.toUpperCase()), 'Agente IA · sistema'); el.closest('.acts').remove(); pushMsg({ b: 1, t: `Pronto! Lancei ${brl(v)} em ${el.dataset.c} · ${sec(el.dataset.s).nome}. Manda a foto do comprovante?` }); toast('Despesa lançada pelo agente'); },
  agcancel: el => { el.closest('.acts').remove(); pushMsg({ b: 1, t: 'Cancelado. Nada foi lançado.' }); },
  goto: el => { if (el.dataset.tab) finTab = el.dataset.tab; go(el.dataset.r); },
  lgpd: () => toast('Pedido registrado · arquivo com os dados da pessoa gerado')
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!e.target.closest('.dropdown') && !e.target.closest('[data-act="alerts"],[data-act="profile"]')) { const d = $('.dropdown'); if (d) d.remove(); }
  if (e.target.closest('.side a')) document.body.classList.remove('menu');
  if (document.body.classList.contains('menu') && !e.target.closest('.side') && !e.target.closest('[data-act="menu"]')) document.body.classList.remove('menu');
  if (!el) return;
  const fn = ACT[el.dataset.act];
  if (fn) { if (el.tagName === 'BUTTON') e.preventDefault(); fn(el, e); }
});
document.addEventListener('change', e => {
  const el = e.target.closest('[data-act-change]'); if (!el) return;
  if (el.dataset.actChange === 'turmasel') { chamadaState[el.dataset.e + '_t'] = +el.value; render(); }
  if (el.dataset.actChange === 'pres') { (chamadaState[el.dataset.e] = chamadaState[el.dataset.e] || {})[el.dataset.n] = el.checked; }
});
document.addEventListener('input', e => {
  if (e.target.id === 'resq') { resQ = e.target.value; clearTimeout(window.__rq); window.__rq = setTimeout(() => { render(); const i = $('#resq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 250); }
  if (e.target.id === 'pesq') { pesQ = e.target.value; clearTimeout(window.__pq); window.__pq = setTimeout(() => { render(); const i = $('#pesq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 250); }
});
document.addEventListener('submit', e => { if (e.target.id === 'cform') { e.preventDefault(); const i = $('#cin'); perguntar(i.value); i.value = ''; } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); const d = $('.dropdown'); if (d) d.remove(); document.body.classList.remove('menu'); } });

/* ================= render ================= */
function render() {
  const r = route();
  let html = '', title = '', crumb = '';
  const allowed = r.a === 'setor' ? (sec(r.b) && (isDir() || P().fin)) : canMod(r.a);
  if (!MODS[r.a] && r.a !== 'setor') { go(P().mods[0]); return; }
  if (!allowed) { html = noAccess(r.a); title = 'Acesso restrito'; }
  else {
    switch (r.a) {
      case 'dashboard': html = vDashboard(); title = isAll() ? 'Dashboard' : 'Dashboard do setor'; break;
      case 'financeiro': html = vFinanceiro(); title = 'Financeiro'; break;
      case 'eventos': html = vEventos(); title = 'Casa de eventos'; break;
      case 'hotel': html = vHotel(); title = 'Hotel'; break;
      case 'natacao': html = vEscola('natacao'); title = 'Escola de natação'; break;
      case 'futebol': html = vEscola('futebol'); title = 'Escola de futebol'; break;
      case 'setores': html = vSetores(); title = 'Setores'; break;
      case 'setor': html = vSetorCustom(r.b); title = (sec(r.b) || {}).nome || 'Setor'; break;
      case 'pessoas': html = vPessoas(); title = 'Pessoas e acessos'; break;
      case 'folha': html = vFolha(); title = 'Folha de pagamento'; break;
      case 'agente': html = vAgente(); title = 'Agente de IA'; break;
      case 'relatorios': html = vRelatorios(); title = 'Relatórios'; break;
      case 'seguranca': html = vSeguranca(); title = 'Segurança e LGPD'; break;
    }
  }
  crumb = 'A&D Eventos · ' + P().nome;
  sidebar(); topbar(title, crumb);
  $('#view').innerHTML = html + (r.a !== 'agente' && canMod('agente') ? `<a class="fab" href="#/agente"><span class="bot">${ic('spark')}</span><span>Perguntar ao agente</span></a>` : '');
  if (r.a === 'agente') { const m = $('#msgs'); if (m) m.scrollTop = m.scrollHeight; }
  document.title = title + ' · A&D Gestão';
}
window.addEventListener('hashchange', () => { close(); window.scrollTo(0, 0); render(); });
if (!location.hash) history.replaceState(null, '', '#/' + P().mods[0]);
render();
})();
