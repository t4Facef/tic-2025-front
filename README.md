# Apojobs - Plataforma de Empregos Inclusiva

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-06b6d4?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Plataforma web inclusiva que conecta **profissionais PCDs** com **empresas** comprometidas com diversidade e inclusão. Sistema completo com autenticação, perfis personalizados e matching inteligente.

## 🎯 Objetivo

O Apojobs foi criado para facilitar a inclusão de pessoas com deficiência no mercado de trabalho, conectando talentos PCDs com empresas que buscam cumprir suas metas de diversidade e inclusão de forma eficiente e humanizada.

## 🚀 Stack Tecnológica

- **React 19.1.1** - Interface moderna e reativa
- **TypeScript 5.8.3** - Tipagem estática e desenvolvimento seguro
- **Vite 7.1.2** - Build tool rápido e otimizado
- **React Router DOM 7.8.2** - Roteamento SPA avançado
- **Tailwind CSS 3.4.0** - Design system responsivo
- **Lucide React** - Ícones modernos e acessíveis
- **React Image Crop** - Edição de imagens de perfil
- **XLSX** - Exportação de dados para Excel

## 📁 Arquitetura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── accessibility/   # Componentes de acessibilidade
│   ├── buttons/         # Sistema de botões padronizados
│   ├── content/         # Componentes de conteúdo e layout
│   ├── forms/           # Formulários inteligentes e validação
│   ├── image/           # Componentes de imagem e upload
│   ├── profile/         # Componentes de perfil de usuário
│   └── structure/       # Layout e estrutura base
├── contexts/            # Contextos React (Auth, etc.)
├── hooks/               # Custom hooks reutilizáveis
├── pages/               # Páginas da aplicação (25+ rotas)
├── types/               # Definições TypeScript
│   ├── forms/           # Tipos para formulários
│   ├── perfis/          # Tipos para perfis
│   └── vagas/           # Tipos para sistema de vagas
├── utils/               # Utilitários e helpers
├── config/              # Configurações (API, etc.)
└── data/                # Constantes e dados estáticos
```

## 🎨 Design System

### Paleta de Cores
- **blue1**: `#BDEAFC` - Azul claro
- **blue2**: `#219EBC` - Azul médio
- **blue3**: `#023047` - Azul escuro
- **blue3H**: `#054D71` - Azul escuro hover
- **blue4**: `#9CDFFE` - Azul suave
- **blue5**: `#64CEFF` - Azul adicional
- **blue5H**: `#85D8FF` - Azul hover
- **red1**: `#FF7979` - Vermelho suave
- **red2**: `#CA0000` - Vermelho forte

### Tipografia
- **Fonte principal**: Georgia (serif)
- **Fonte secundária**: Nunito (sans-serif)

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Navegue até o diretório
cd tic-2025-front

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
```

## 🚀 Scripts Disponíveis

```bash
# Servidor de desenvolvimento (Vite)
npm run dev

# Build de produção otimizado
npm run build

# Preview do build de produção
npm run preview

# Linting com ESLint
npm run lint
```

## 📱 Funcionalidades Principais

### Sistema de Autenticação
- **Login/Logout** com persistência de sessão
- **Cadastro multi-step** para candidatos e empresas
- **Recuperação de senha** com validação segura
- **Contexto de autenticação** global
- **Proteção de rotas** baseada em roles

### Perfis Inteligentes
- **Candidatos PCD** - Perfil completo com formações, experiências e habilidades
- **Empresas** - Perfil corporativo com vagas e informações de inclusão
- **Upload de fotos** com crop e otimização
- **Validação de documentos** (CPF, CNPJ)
- **Geolocalização** por CEP

### Sistema de Vagas
- **Criação e edição** de vagas inclusivas
- **Busca avançada** com filtros específicos
- **Matching inteligente** PCD-Empresa
- **Notificações** de novas oportunidades
- **Exportação de dados** para Excel

### Painel Administrativo
- **Dashboard completo** para administradores
- **Gestão de usuários** e empresas
- **Relatórios** de inclusão e estatísticas
- **Moderação de conteúdo**

## 🔧 Status de Desenvolvimento

### ✅ Implementado
- **Sistema de autenticação** completo com Context API e persistência
- **24 páginas** com roteamento avançado e proteção de rotas
- **Formulários multi-step** com validação TypeScript e persistência local
- **Upload e crop de imagens** com preview e armazenamento local
- **Sistema de tipos robusto** (candidatos, empresas, vagas, notificações)
- **Hooks customizados** (useAuth, useFileStorage, useFormValidation, useDebounceEffect)
- **Utilitários avançados** para CPF, CNPJ, exportação Excel e manipulação de texto
- **Editor Markdown** com preview em tempo real e toolbar
- **Componentes de busca** com filtros avançados e debounce
- **Sistema de notificações** com modal customizado e feedback visual
- **Loading states** e spinners para melhor UX
- **Design system** responsivo com paleta de cores personalizada

### 🚧 Em Desenvolvimento
- Integração completa com backend
- Sistema de notificações em tempo real
- Recursos de acessibilidade ARIA

### Arquitetura Técnica
- **Vite** para build ultrarrápido
- **Context API** para estado global
- **Custom Hooks** para lógica reutilizável
- **TypeScript** com tipagem rigorosa
- **Componentes funcionais** com performance otimizada
- **Lazy loading** para otimização de bundle

## 🧪 Qualidade e Testes

```bash
# Linting com ESLint
npm run lint

# Verificação de tipos TypeScript
npx tsc --noEmit

# Build de produção (validação completa)
npm run build
```

## 📦 Build e Deploy

```bash
# Gerar build otimizado
npm run build

# Os arquivos serão gerados na pasta 'dist/'
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎓 Contexto Acadêmico

Projeto desenvolvido como trabalho de faculdade para o **TIC 2025**, com foco em:
- Desenvolvimento web moderno
- Inclusão e acessibilidade digital
- Responsabilidade social corporativa
- Tecnologias React e TypeScript

## ✨ Funcionalidades Avançadas Implementadas

### 🎨 Interface e UX
- **Editor Markdown** com preview em tempo real, toolbar e formatação rica
- **Crop de imagens** com modal interativo e preview instantâneo
- **Busca inteligente** com filtros dinâmicos e debounce
- **Loading states** e feedback visual em todas as operações
- **Modais responsivos** com animações e validação
- **Sistema de tags** com busca e seleção múltipla

### 🔧 Funcionalidades Técnicas
- **Persistência local** de arquivos com conversão base64
- **Validação de documentos** (CPF/CNPJ) com algoritmos matemáticos
- **Exportação Excel** de dados de candidatos aprovados
- **Sistema de notificações** com contadores e feedback
- **Debounce customizado** para otimização de performance
- **Gerenciamento de estado** complexo com Context API

### 📊 Recursos de Dados
- **Constantes organizadas** para opções de formulários
- **Tipos TypeScript** robustos para todas as entidades
- **Matching de compatibilidade** entre candidatos e vagas
- **Filtros avançados** por localização, setor, tipo de trabalho
- **Estatísticas visuais** com componentes de métricas

### 🎯 Inclusão e Acessibilidade
- **Campos inclusivos** para gênero e orientação sexual
- **Suporte a diferentes tipos** de deficiência
- **Design responsivo** mobile-first
- **Contraste otimizado** para baixa visão
- **Navegação semântica** estruturada

## 🚀 Próximos Passos

### Backend Integration
- [ ] API REST completa com Node.js
- [ ] Autenticação JWT segura
- [ ] Banco de dados PostgreSQL
- [ ] Upload de arquivos na nuvem

### Features Avançadas
- [ ] Sistema de chat em tempo real
- [ ] Matching com Machine Learning
- [ ] Notificações push
- [ ] Relatórios avançados com gráficos

### Otimizações
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados (Jest + Testing Library)
- [ ] CI/CD com GitHub Actions
- [ ] Monitoramento com Sentry
- [ ] Lazy loading de componentes
- [ ] Service Workers para cache
- [ ] Compressão de imagens automática

---

**Apojobs** - Conectando talentos às oportunidades certas.
