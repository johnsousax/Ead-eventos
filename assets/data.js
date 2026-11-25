/* A&D Eventos — dados de demonstração (fictícios) · NexusUp Company */
window.AD_SEED = function () {
  const nomesFree = ["Wesley Pinto","Jéssica Moraes","Kauã Ferreira","Thaís Brito","Renan Lopes","Bianca Torres","Ítalo Melo","Patrícia Reis","Douglas Viana","Luana Prado","Mateus Aguiar","Rayssa Campos","Igor Sales","Débora Cunha","Caio Rezende","Nayara Paiva"];
  const pessoas = [
    // Hotel — R$ 19.800
    {id:1,nome:"Marcos Vinícius Araújo",cargo:"Gerente do hotel",setor:"hotel",vinculo:"CLT",perfil:"ger_hotel",salario:3200,fone:"(98) 98812-4410",status:"Ativo"},
    {id:2,nome:"Fernanda Costa Lima",cargo:"Recepcionista",setor:"hotel",vinculo:"CLT",perfil:"recepcao",salario:1700,fone:"(98) 98120-3301",status:"Ativo"},
    {id:3,nome:"Juliana Pereira",cargo:"Recepcionista",setor:"hotel",vinculo:"CLT",perfil:"recepcao",salario:1700,fone:"(98) 98451-0092",status:"Ativo"},
    {id:4,nome:"Gabriel Nascimento",cargo:"Recepcionista (noite)",setor:"hotel",vinculo:"CLT",perfil:"recepcao",salario:1700,fone:"(98) 99133-8720",status:"Ativo"},
    {id:5,nome:"Larissa Mendes",cargo:"Recepcionista",setor:"hotel",vinculo:"CLT",perfil:"recepcao",salario:1700,fone:"(98) 98704-1188",status:"Ativo"},
    {id:6,nome:"Rosângela Silva",cargo:"Camareira",setor:"hotel",vinculo:"CLT",perfil:"sem",salario:1580,fone:"(98) 98266-4471",status:"Ativo"},
    {id:7,nome:"Francisca Oliveira",cargo:"Camareira",setor:"hotel",vinculo:"CLT",perfil:"sem",salario:1580,fone:"(98) 99210-3345",status:"Ativo"},
    {id:8,nome:"Antônia Sousa",cargo:"Camareira",setor:"hotel",vinculo:"CLT",perfil:"sem",salario:1580,fone:"(98) 98173-9902",status:"Ativo"},
    {id:9,nome:"Raimunda Ferreira",cargo:"Camareira",setor:"hotel",vinculo:"CLT",perfil:"sem",salario:1580,fone:"(98) 98840-2217",status:"Ativo"},
    {id:10,nome:"José Ribamar Santos",cargo:"Manutenção",setor:"hotel",vinculo:"CLT",perfil:"sem",salario:1780,fone:"(98) 98551-7034",status:"Ativo"},
    {id:11,nome:"Maria do Socorro Lima",cargo:"Cozinheira (café da manhã)",setor:"hotel",vinculo:"CLT",perfil:"sem",salario:1700,fone:"(98) 99102-6650",status:"Ativo"},
    // Eventos — R$ 12.300
    {id:12,nome:"Patrícia Gomes",cargo:"Gerente de eventos",setor:"eventos",vinculo:"CLT",perfil:"ger_eventos",salario:3400,fone:"(98) 98113-5520",status:"Ativo"},
    {id:13,nome:"Camila Andrade",cargo:"Coordenadora de eventos",setor:"eventos",vinculo:"CLT",perfil:"ger_eventos",salario:2300,fone:"(98) 98760-4419",status:"Ativo"},
    {id:14,nome:"Luís Carlos Moura",cargo:"Auxiliar de limpeza",setor:"eventos",vinculo:"CLT",perfil:"sem",salario:1600,fone:"(98) 98339-1056",status:"Ativo"},
    {id:15,nome:"Edna Barros",cargo:"Auxiliar de limpeza",setor:"eventos",vinculo:"CLT",perfil:"sem",salario:1600,fone:"(98) 98912-7783",status:"Ativo"},
    // Natação — R$ 9.200
    {id:16,nome:"Ana Beatriz Rocha",cargo:"Coordenadora de natação",setor:"natacao",vinculo:"CLT",perfil:"prof_natacao",salario:2600,fone:"(98) 98234-6601",status:"Ativo"},
    {id:17,nome:"Rafael Nunes",cargo:"Professor de natação",setor:"natacao",vinculo:"Por aula",perfil:"prof_natacao",salario:1400,fone:"(98) 99187-3320",status:"Ativo"},
    {id:18,nome:"Bruna Carvalho",cargo:"Professora de natação",setor:"natacao",vinculo:"Por aula",perfil:"prof_natacao",salario:1350,fone:"(98) 98645-0274",status:"Ativo"},
    {id:19,nome:"Thiago Martins",cargo:"Professor de natação",setor:"natacao",vinculo:"Por aula",perfil:"prof_natacao",salario:1250,fone:"(98) 98470-9915",status:"Ativo"},
    {id:20,nome:"Letícia Freitas",cargo:"Professora de hidroginástica",setor:"natacao",vinculo:"Por aula",perfil:"prof_natacao",salario:1200,fone:"(98) 99018-2246",status:"Ativo"},
    {id:21,nome:"Diego Almeida",cargo:"Salva-vidas",setor:"natacao",vinculo:"CLT",perfil:"sem",salario:1400,fone:"(98) 98321-5587",status:"Ativo"},
    // Futebol — R$ 7.600
    {id:22,nome:"Carlos Eduardo Pinheiro",cargo:"Coordenador técnico",setor:"futebol",vinculo:"CLT",perfil:"prof_futebol",salario:2400,fone:"(98) 98155-3398",status:"Ativo"},
    {id:23,nome:"Anderson Ribeiro",cargo:"Professor de futebol",setor:"futebol",vinculo:"Por aula",perfil:"prof_futebol",salario:1300,fone:"(98) 98712-0063",status:"Ativo"},
    {id:24,nome:"Vinícius Batista",cargo:"Professor de futebol",setor:"futebol",vinculo:"Por aula",perfil:"prof_futebol",salario:1300,fone:"(98) 99245-7710",status:"Ativo"},
    {id:25,nome:"Leandro Castro",cargo:"Professor de goleiros",setor:"futebol",vinculo:"Por aula",perfil:"prof_futebol",salario:1300,fone:"(98) 98587-3341",status:"Ativo"},
    {id:26,nome:"Raimundo Nonato Cruz",cargo:"Zelador do campo",setor:"futebol",vinculo:"CLT",perfil:"sem",salario:1300,fone:"(98) 98023-4459",status:"Ativo"}
  ];
  nomesFree.forEach((n,i)=>pessoas.push({id:27+i,nome:n,cargo:i<10?"Garçom/garçonete":i<13?"Segurança":"Copa e cozinha",setor:"eventos",vinculo:"Freelancer",perfil:"sem",salario:212.5,fone:"(98) 9"+(8100+i*37)+"-"+(1000+i*211),status:"Ativo"}));

  const quartos = [
    ["101","Casal","ocupado","Paulo Roberto Dias","24/11","26/11"],
    ["102","Casal","chegada","Sabrina Lopes","25/11","27/11"],
    ["103","Duplo","ocupado","Equipe Banda Vibe (2)","23/11","26/11"],
    ["104","Duplo","limpeza","","",""],
    ["105","Casal","chegada","Henrique e Joana Vale","25/11","28/11"],
    ["106","Casal","ocupado","Ricardo Fontes","25/11","27/11"],
    ["107","Duplo","manutencao","","",""],
    ["108","Casal","chegada","Kátia Rodrigues","25/11","26/11"],
    ["201","Casal","ocupado","Marta Cavalcante","25/11","29/11"],
    ["202","Duplo","chegada","Família Teixeira (3)","25/11","30/11"],
    ["203","Casal","ocupado","Leonardo Brandão","22/11","26/11"],
    ["204","Casal","livre","","",""],
    ["205","Duplo","chegada","Grupo Formatura UEMA (2)","25/11","27/11"],
    ["206","Casal","ocupado","Ivone Saraiva","25/11","26/11"],
    ["207","Duplo","chegada","Fábio e Ana Neves","25/11","29/11"],
    ["208","Casal","ocupado","Otávio Mendonça","21/11","27/11"]
  ].map(q=>({n:q[0],tipo:q[1],status:q[2],hospede:q[3],in:q[4],out:q[5]}));

  const reservas = [
    {id:"R-2411",hospede:"Sabrina Lopes",quarto:"102",entrada:"25/11",saida:"27/11",noites:2,origem:"WhatsApp",valor:578,status:"Chega hoje"},
    {id:"R-2412",hospede:"Henrique e Joana Vale",quarto:"105",entrada:"25/11",saida:"28/11",noites:3,origem:"Booking",valor:867,status:"Chega hoje"},
    {id:"R-2413",hospede:"Kátia Rodrigues",quarto:"108",entrada:"25/11",saida:"26/11",noites:1,origem:"Balcão",valor:289,status:"Chega hoje"},
    {id:"R-2414",hospede:"Família Teixeira",quarto:"202",entrada:"25/11",saida:"30/11",noites:5,origem:"WhatsApp",valor:1600,status:"Chega hoje"},
    {id:"R-2415",hospede:"Grupo Formatura UEMA",quarto:"205",entrada:"25/11",saida:"27/11",noites:2,origem:"Site",valor:640,status:"Chega hoje"},
    {id:"R-2416",hospede:"Fábio e Ana Neves",quarto:"207",entrada:"25/11",saida:"29/11",noites:4,origem:"Booking",valor:1280,status:"Chega hoje"},
    {id:"R-2408",hospede:"Ricardo Fontes",quarto:"106",entrada:"25/11",saida:"27/11",noites:2,origem:"WhatsApp",valor:578,status:"Hospedado"},
    {id:"R-2409",hospede:"Marta Cavalcante",quarto:"201",entrada:"25/11",saida:"29/11",noites:4,origem:"Site",valor:1156,status:"Hospedado"},
    {id:"R-2410",hospede:"Ivone Saraiva",quarto:"206",entrada:"25/11",saida:"26/11",noites:1,origem:"Balcão",valor:289,status:"Hospedado"},
    {id:"R-2401",hospede:"Paulo Roberto Dias",quarto:"101",entrada:"24/11",saida:"26/11",noites:2,origem:"WhatsApp",valor:578,status:"Hospedado"},
    {id:"R-2398",hospede:"Leonardo Brandão",quarto:"203",entrada:"22/11",saida:"26/11",noites:4,origem:"Booking",valor:1156,status:"Hospedado"},
    {id:"R-2396",hospede:"Otávio Mendonça",quarto:"208",entrada:"21/11",saida:"27/11",noites:6,origem:"Empresa",valor:1734,status:"Hospedado"},
    {id:"R-2420",hospede:"Eventos Turu Ltda (4 quartos)",quarto:"—",entrada:"04/12",saida:"06/12",noites:2,origem:"Empresa",valor:2400,status:"Confirmada"},
    {id:"R-2421",hospede:"Noivos Carvalho & Sá",quarto:"201",entrada:"05/12",saida:"06/12",noites:1,origem:"Pacote casamento",valor:0,status:"Cortesia"}
  ];

  const eventos = [
    {id:"E-301",data:"2026-11-01",hora:"12h",cliente:"Família Albuquerque",tipo:"Batizado",espaco:"Salão Multiuso",convidados:80,valor:4800,custo:2100,status:"Realizado"},
    {id:"E-302",data:"2026-11-07",hora:"20h",cliente:"Larissa & Bruno",tipo:"Casamento",espaco:"Salão dos Lustres",convidados:220,valor:12600,custo:5300,status:"Realizado"},
    {id:"E-303",data:"2026-11-08",hora:"16h",cliente:"Heloísa (15 anos)",tipo:"Aniversário de 15 anos",espaco:"Salão dos Lustres",convidados:160,valor:8900,custo:3700,status:"Realizado"},
    {id:"E-304",data:"2026-11-13",hora:"19h",cliente:"Colégio Dom Bosco",tipo:"Formatura",espaco:"Auditório",convidados:300,valor:6200,custo:2400,status:"Realizado"},
    {id:"E-305",data:"2026-11-14",hora:"20h",cliente:"Amanda & Felipe",tipo:"Casamento",espaco:"Salão dos Lustres",convidados:200,valor:11400,custo:4800,status:"Realizado"},
    {id:"E-306",data:"2026-11-15",hora:"14h",cliente:"Pedro Miguel (5 anos)",tipo:"Infantil",espaco:"Área da piscina",convidados:70,valor:2900,custo:1200,status:"Realizado"},
    {id:"E-307",data:"2026-11-20",hora:"19h",cliente:"Construtora Litoral",tipo:"Corporativo",espaco:"Auditório",convidados:120,valor:3600,custo:1300,status:"Realizado"},
    {id:"E-308",data:"2026-11-21",hora:"20h",cliente:"Turma Medicina UFMA",tipo:"Formatura",espaco:"Salão dos Lustres",convidados:250,valor:3200,custo:1400,status:"Realizado"},
    {id:"E-309",data:"2026-11-25",hora:"19h",cliente:"Associação Comercial do Turu",tipo:"Corporativo",espaco:"Salão Multiuso",convidados:90,valor:1800,custo:700,status:"Hoje"},
    {id:"E-310",data:"2026-11-28",hora:"20h",cliente:"Gabriela (15 anos)",tipo:"Aniversário de 15 anos",espaco:"Salão dos Lustres",convidados:180,valor:2400,custo:900,status:"Confirmado"},
    {id:"E-311",data:"2026-11-29",hora:"12h",cliente:"Família Gonçalves",tipo:"Churrasco",espaco:"Área de churrasco",convidados:60,valor:1600,custo:600,status:"Sinal pago"},
    {id:"E-312",data:"2026-12-05",hora:"20h",cliente:"Noivos Carvalho & Sá",tipo:"Casamento",espaco:"Salão dos Lustres",convidados:240,valor:14200,custo:6000,status:"Sinal pago"},
    {id:"E-313",data:"2026-12-06",hora:"19h",cliente:"Escola Sonho Meu",tipo:"Formatura infantil",espaco:"Auditório",convidados:180,valor:4300,custo:1700,status:"Sem sinal"},
    {id:"E-314",data:"2026-12-12",hora:"20h",cliente:"Grupo Mateus Atacarejo",tipo:"Confraternização",espaco:"Salão dos Lustres",convidados:280,valor:9800,custo:4100,status:"Confirmado"}
  ];

  const turmasNat = [
    {nome:"Bebê (6 meses a 3 anos)",dias:"Ter e Qui",hora:"08h",prof:"Bruna Carvalho",vagas:12,alunos:11},
    {nome:"Infantil I (4 a 6 anos)",dias:"Seg e Qua",hora:"09h",prof:"Rafael Nunes",vagas:14,alunos:14},
    {nome:"Infantil II (7 a 10 anos)",dias:"Seg e Qua",hora:"16h",prof:"Rafael Nunes",vagas:16,alunos:15},
    {nome:"Juvenil (11 a 15 anos)",dias:"Ter e Qui",hora:"17h",prof:"Thiago Martins",vagas:16,alunos:13},
    {nome:"Adulto iniciante",dias:"Seg, Qua e Sex",hora:"06h",prof:"Ana Beatriz Rocha",vagas:14,alunos:12},
    {nome:"Adulto aperfeiçoamento",dias:"Ter e Qui",hora:"19h",prof:"Thiago Martins",vagas:14,alunos:11},
    {nome:"Treino de equipe",dias:"Seg a Sex",hora:"18h",prof:"Ana Beatriz Rocha",vagas:16,alunos:14},
    {nome:"Hidroginástica",dias:"Seg, Qua e Sex",hora:"07h",prof:"Letícia Freitas",vagas:30,alunos:26}
  ];
  const turmasFut = [
    {nome:"Sub-7",dias:"Ter e Qui",hora:"16h",prof:"Anderson Ribeiro",vagas:20,alunos:16},
    {nome:"Sub-9",dias:"Ter e Qui",hora:"17h",prof:"Anderson Ribeiro",vagas:20,alunos:18},
    {nome:"Sub-11",dias:"Seg e Qua",hora:"16h30",prof:"Vinícius Batista",vagas:20,alunos:19},
    {nome:"Sub-13",dias:"Seg e Qua",hora:"17h30",prof:"Vinícius Batista",vagas:20,alunos:17},
    {nome:"Sub-15",dias:"Sex e Sáb",hora:"08h",prof:"Carlos Eduardo Pinheiro",vagas:20,alunos:15},
    {nome:"Goleiros (todas as idades)",dias:"Sáb",hora:"10h",prof:"Leandro Castro",vagas:12,alunos:11}
  ];

  const inadimplentes = [
    {aluno:"Lara Monteiro",resp:"Cláudia Monteiro",escola:"natacao",turma:"Infantil II",parcelas:2,valor:398.0,dias:34},
    {aluno:"Pedro Henrique Sá",resp:"Márcio Sá",escola:"natacao",turma:"Juvenil",parcelas:1,valor:259.0,dias:18},
    {aluno:"Ana Clara Ribeiro",resp:"Viviane Ribeiro",escola:"natacao",turma:"Bebê",parcelas:1,valor:229.0,dias:12},
    {aluno:"Maria Eduarda Lima",resp:"—",escola:"natacao",turma:"Hidroginástica",parcelas:1,valor:189.0,dias:6},
    {aluno:"Davi Lucas Costa",resp:"Rogério Costa",escola:"futebol",turma:"Sub-11",parcelas:2,valor:330.0,dias:31},
    {aluno:"Miguel Arcanjo Reis",resp:"Sílvia Reis",escola:"futebol",turma:"Sub-9",parcelas:1,valor:165.0,dias:15},
    {aluno:"Enzo Gabriel Braga",resp:"Tatiane Braga",escola:"futebol",turma:"Sub-13",parcelas:1,valor:270.0,dias:9}
  ];

  const chamada = {
    natacao:["Alice Fernandes","Benício Rocha","Cecília Moura","Davi Pacheco","Elisa Martins","Gael Souza","Helena Prado","Isaque Lima","Júlia Viana","Lorenzo Dias","Manuela Sá","Nicolas Brito","Olívia Campos","Pietro Alves","Sofia Rezende"],
    futebol:["Arthur Nogueira","Bernardo Queiroz","Caio Lima","Davi Lucas Costa","Eduardo Mota","Felipe Rangel","Gustavo Pires","Heitor Duarte","João Pedro Melo","Kevin Araújo","Lucas Barros","Matheus Coelho","Noah Santana","Otávio Leal","Rian Matos","Samuel Rios","Thales Vieira","Vitor Hugo Lins","Yuri Fonseca"]
  };

  const campo = [
    {hora:"18h–19h",cliente:"Pelada dos Amigos do Turu",valor:180,status:"Pago"},
    {hora:"19h–20h",cliente:"Time Ferroviário Society",valor:180,status:"Pago"},
    {hora:"20h–21h",cliente:"Empresa Vale Norte (interno)",valor:200,status:"Reservado"},
    {hora:"21h–22h",cliente:"Livre",valor:0,status:"Livre"}
  ];

  const contasPagar = [
    {id:1,desc:"Conta de água (CAEMA)",setor:"geral",venc:"26/11",valor:2130,status:"Amanhã"},
    {id:2,desc:"Energia elétrica (Equatorial)",setor:"geral",venc:"30/11",valor:8940,status:"A vencer"},
    {id:3,desc:"Bebidas — Distribuidora Ilha",setor:"eventos",venc:"27/11",valor:4860,status:"A vencer"},
    {id:4,desc:"Produtos da piscina (cloro e pH)",setor:"natacao",venc:"28/11",valor:1240,status:"A vencer"},
    {id:5,desc:"Enxoval e lavanderia",setor:"hotel",venc:"02/12",valor:2350,status:"A vencer"},
    {id:6,desc:"Internet fibra + Wi-Fi do hotel",setor:"hotel",venc:"05/12",valor:489,status:"A vencer"},
    {id:7,desc:"Uniformes Sub-11 e Sub-13",setor:"futebol",venc:"20/11",valor:1680,status:"Pago"},
    {id:8,desc:"Gás de cozinha (P45)",setor:"eventos",venc:"18/11",valor:1320,status:"Pago"}
  ];
  const contasReceber = [
    {desc:"Saldo do casamento Larissa & Bruno",setor:"eventos",venc:"28/11",valor:6300,status:"A receber"},
    {desc:"Sinal — Escola Sonho Meu (06/12)",setor:"eventos",venc:"27/11",valor:1290,status:"Pendente"},
    {desc:"Saldo — Gabriela 15 anos (28/11)",setor:"eventos",venc:"27/11",valor:1200,status:"A receber"},
    {desc:"Faturado — Otávio Mendonça (empresa)",setor:"hotel",venc:"30/11",valor:1734,status:"A receber"},
    {desc:"Mensalidades de dezembro (Pix automático)",setor:"natacao",venc:"05/12",valor:23120,status:"Programado"},
    {desc:"Mensalidades de dezembro (Pix automático)",setor:"futebol",venc:"05/12",valor:14800,status:"Programado"},
    {desc:"Mensalidades em atraso (7)",setor:"escolas",venc:"—",valor:1840,status:"Atrasado"}
  ];
  const despesas = [
    {data:"24/11",desc:"Manutenção da bomba da piscina",setor:"natacao",cat:"Manutenção",valor:380,via:"Agente IA · WhatsApp"},
    {data:"23/11",desc:"Compra de flores — casamento Amanda & Felipe",setor:"eventos",cat:"Decoração",valor:1150,via:"Sistema"},
    {data:"22/11",desc:"Café da manhã — reposição",setor:"hotel",cat:"Alimentos",valor:2340,via:"Agente IA · foto do comprovante"},
    {data:"21/11",desc:"Bolas e coletes",setor:"futebol",cat:"Material esportivo",valor:640,via:"Sistema"},
    {data:"20/11",desc:"Reparo do ar-condicionado 107",setor:"hotel",cat:"Manutenção",valor:520,via:"Agente IA · áudio"}
  ];

  const log = [
    {t:"25/11 08:02",u:"Fernanda Costa Lima",p:"Recepção",a:"Check-in do quarto 106 (Ricardo Fontes)"},
    {t:"25/11 07:41",u:"Agente de IA",p:"WhatsApp",a:"Avisou a diretoria: conta de água vence amanhã"},
    {t:"24/11 21:15",u:"Patrícia Gomes",p:"Gerente de eventos",a:"Enviou orçamento para Escola Sonho Meu"},
    {t:"24/11 18:30",u:"Diretoria",p:"Diretoria",a:"Lançou R$ 380,00 em Manutenção · Natação (via agente)"},
    {t:"24/11 17:05",u:"Rafael Nunes",p:"Professor",a:"Registrou frequência — Infantil II"},
    {t:"24/11 09:12",u:"Sistema",p:"Backup",a:"Backup diário criptografado concluído"},
    {t:"23/11 16:48",u:"Diretoria",p:"Diretoria",a:"Removeu acesso de ex-funcionário (desligado)"}
  ];

  return {
    v:1,
    hoje:"25/11/2026",
    setores:[
      {id:"hotel",nome:"Hotel",cor:"#1f5bff",icon:"bed",fixo:true,resp:"Marcos Vinícius Araújo",volume:"248 diárias",fontes:[["Diárias",71800],["Consumo no quarto",10500]],despesas:31100,folha:19800},
      {id:"eventos",nome:"Casa de eventos",cor:"#f39314",icon:"calendar",fixo:true,resp:"Patrícia Gomes",volume:"11 eventos",fontes:[["Locação dos espaços",38200],["Bufê e bebidas",21200]],despesas:24600,folha:12300},
      {id:"natacao",nome:"Escola de natação",cor:"#06a3c4",icon:"waves",fixo:true,resp:"Ana Beatriz Rocha",volume:"116 alunos",fontes:[["Mensalidades",23120],["Matrículas",1600]],despesas:9150,folha:9200},
      {id:"futebol",nome:"Escola de futebol",cor:"#16a34a",icon:"ball",fixo:true,resp:"Carlos Eduardo Pinheiro",volume:"96 alunos",fontes:[["Mensalidades",14800],["Aluguel do campo",5200]],despesas:6500,folha:7600}
    ],
    hist:{meses:["Jun","Jul","Ago","Set","Out","Nov"],receita:[0.79,0.84,0.81,0.86,0.89,1],custo:[0.9,0.94,0.91,0.95,0.97,1]},
    pessoas, quartos, reservas, eventos, turmasNat, turmasFut, inadimplentes, chamada, campo,
    contasPagar, contasReceber, despesas, log,
    lancExtras:{}, folhaFechada:false,
    whats:[
      {num:"(98) 9 8113-5520",nome:"Patrícia Gomes",perfil:"Gerente de eventos"},
      {num:"(98) 9 8812-4410",nome:"Marcos Vinícius Araújo",perfil:"Gerente do hotel"},
      {num:"(98) 9 8234-6601",nome:"Ana Beatriz Rocha",perfil:"Professora"},
      {num:"(98) 9 8155-3398",nome:"Carlos Eduardo Pinheiro",perfil:"Professor"},
      {num:"Diretoria (2 números)",nome:"Sócios A&D",perfil:"Diretoria"}
    ]
  };
};

/* Perfis de acesso (espelham a matriz da apresentação) */
window.AD_PERFIS = {
  diretoria:{nome:"Diretoria",desc:"Acesso total à empresa",setores:"all",mods:["dashboard","financeiro","eventos","hotel","natacao","futebol","setores","pessoas","folha","agente","relatorios","seguranca"],fin:true},
  financeiro:{nome:"Financeiro",desc:"Contas, folha e relatórios de todos os setores",setores:"all",mods:["dashboard","financeiro","folha","relatorios","agente"],fin:true},
  ger_hotel:{nome:"Gerente do hotel",desc:"Dashboard, reservas e equipe do hotel",setores:["hotel"],mods:["dashboard","hotel","relatorios","agente"],fin:false},
  ger_eventos:{nome:"Gerente de eventos",desc:"Agenda, orçamentos e contratos de eventos",setores:["eventos"],mods:["dashboard","eventos","relatorios","agente"],fin:false},
  recepcao:{nome:"Recepção do hotel",desc:"Reservas, check-in e check-out",setores:["hotel"],mods:["hotel","agente"],fin:false},
  prof_natacao:{nome:"Professor de natação",desc:"Suas turmas e frequência",setores:["natacao"],mods:["natacao","agente"],fin:false,prof:"Rafael Nunes"},
  prof_futebol:{nome:"Professor de futebol",desc:"Suas turmas e frequência",setores:["futebol"],mods:["futebol","agente"],fin:false,prof:"Vinícius Batista"}
};
