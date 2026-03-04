import type {
  DifferentialItem,
  NavItem,
  ProcessItem,
  ServiceItem,
  StatItem,
  TestimonialItem,
} from '../types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' },
]

export const HERO_STATS: StatItem[] = [
  { num: '150+', label: 'Projetos entregues' },
  { num: '98%', label: 'Taxa de satisfação' },
  { num: '5+', label: 'Anos de experiência' },
]

export const SERVICES: ServiceItem[] = [
  {
    id: '001',
    title: 'Landing\nPages',
    description:
      'Páginas de alta conversão, projetadas para transformar visitantes em clientes. Cada elemento — do título ao botão — é posicionado com intenção para guiar o usuário à ação.',
    tags: ['Alta Conversão', 'SEO Técnico', 'Performance', 'A/B Ready'],
    image: '/testimonials/camisa_papaco.png',
    imageAlt: 'Camisa PaPaco',
  },
  {
    id: '002',
    title: 'Sistemas\nWeb',
    description:
      'Aplicações web sob medida para o seu fluxo de trabalho. Desde painéis internos a plataformas complexas — robustas, escaláveis e com experiência de uso impecável.',
    tags: ['Fullstack', 'Banco de Dados', 'APIs REST', 'Autenticação'],
    image: '/testimonials/caneca_papaco.png',
    imageAlt: 'Caneca PaPaco',
  },
  {
    id: '003',
    title: 'Web\nsites',
    description:
      'Sites corporativos e institucionais que comunicam autoridade e geram confiança. Sua marca representada com precisão, elegância e consistência visual em cada página.',
    tags: ['Branding', 'Responsivo', 'CMS', 'Multi-idioma'],
    image: '/testimonials/caneca_inox_papaco.png',
    imageAlt: 'Caneca inox PaPaco',
  },
]

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    title: 'Design de Alta Precisão',
    desc: 'Cada pixel é intencional. Alinhamento, tipografia e espaçamento ditam a qualidade percebida.',
  },
  {
    title: 'Código Limpo e Rápido',
    desc: 'Performance de 95+ no Lighthouse. Sites que carregam antes do usuário perceber.',
  },
  {
    title: 'Entrega Pontual',
    desc: 'Cronograma transparente, comunicação direta, sem surpresas no final do projeto.',
  },
  {
    title: 'Suporte Pós-Entrega',
    desc: 'Não somamos após o lançamento. Suporte técnico ativo para garantir sua operação.',
  },
]

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'O resultado superou todas as expectativas. A landing page converteu 3x mais do que a anterior. Design limpo, carregamento rápido e atenção a cada detalhe.',
    author: 'Marcela Torres',
    role: 'CEO, Clínica Estética Refina',
    img: '/testimonials/marcela.jpg',
  },
  {
    quote:
      'Profissionalismo do início ao fim. O sistema entregue automatizou processos que antes nos tomavam horas diárias. Comunicação impecável durante todo o projeto.',
    author: 'Rafael Menezes',
    role: 'Fundador, LogiControl',
    img: '/testimonials/rafael.jpg',
  },
  {
    quote:
      'Nosso novo website mudou completamente a percepção da nossa marca. Clientes novos nos contactaram citando a qualidade do site como fator de decisão.',
    author: 'Aline Carvalho',
    role: 'Diretora de Marketing, GrupoVital',
    img: '/testimonials/aline.jpg',
  },
]

export const PROCESS_STEPS: ProcessItem[] = [
  { step: 'I', title: 'Briefing', desc: 'Imersão no seu negócio, objetivos e público-alvo.' },
  { step: 'II', title: 'Proposta', desc: 'Escopo detalhado, prazo e investimento sem surpresas.' },
  { step: 'III', title: 'Criação', desc: 'Design e desenvolvimento com revisões colaborativas.' },
  { step: 'IV', title: 'Lançamento', desc: 'Deploy, testes e suporte ativo após a entrega.' },
]
