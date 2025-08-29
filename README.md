# Apojobs - Plataforma de Empregos Inclusiva

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06b6d4?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Uma plataforma web inclusiva para conectar **profissionais PCDs** (Pessoas com Deficiência) e **recrutadores de empresas** que precisam cumprir cotas de inclusão, desenvolvida com React, TypeScript e Tailwind CSS.

## 🎯 Objetivo

O Apojobs foi criado para facilitar a inclusão de pessoas com deficiência no mercado de trabalho, conectando talentos PCDs com empresas que buscam cumprir suas metas de diversidade e inclusão de forma eficiente e humanizada.

## 🚀 Tecnologias Utilizadas

- **React 19.1.1** - Biblioteca para construção de interfaces
- **TypeScript 4.9.5** - Superset do JavaScript com tipagem estática
- **React Router DOM 7.7.1** - Roteamento para aplicações React
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **React Testing Library** - Ferramentas para testes de componentes

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── buttons/         # Botões customizados (GenericBlueButton, HeaderButton)
│   ├── content/         # Componentes de conteúdo (JobPosition, StepIndicator, etc.)
│   ├── forms/           # Formulários e campos
│   │   ├── register/    # Formulários de cadastro (candidate_form1-5, companie_form1-4)
│   │   └── generic_form_field.tsx # Campo de formulário genérico
│   ├── profile/         # Componentes de perfil
│   └── structure/       # Componentes estruturais (Layout, Header, Footer, DevMenu)
├── data/                # Dados mockados (fakedata.tsx)
├── pages/               # Páginas da aplicação
│   ├── home.tsx         # Página inicial
│   ├── auth_entry.tsx   # Entrada de autenticação
│   ├── main_register.tsx # Seleção de tipo de cadastro
│   ├── register.tsx     # Formulário multi-step de cadastro
│   ├── login.tsx        # Página de login
│   ├── candidate_*.tsx  # Páginas do candidato (dashboard, profile)
│   ├── company_*.tsx    # Páginas da empresa (dashboard, profile)
│   ├── jobs.tsx         # Listagem de vagas
│   ├── about.tsx        # Sobre a plataforma
│   ├── faq.tsx          # Perguntas frequentes
│   ├── adaptation.tsx   # Processo de adequação
│   └── usage.tsx        # Guia de utilização
└── App.tsx              # Componente principal com roteamento
```

## 🎨 Design System

### Paleta de Cores
- **blue1**: `#BDEAFC` - Azul claro
- **blue2**: `#219EBC` - Azul médio
- **blue3**: `#023047` - Azul escuro
- **blue3H**: `#054D71` - Azul escuro hover
- **blue4**: `#9CDFFE` - Azul suave
- **blue5**: `#64CEFF` - Azul adicional
- **orange1**: `#FF950C` - Laranja principal
- **orange2**: `#FFDCAD` - Laranja claro

### Tipografia
- **Fonte principal**: Georgia (serif)

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Navegue até o diretório
cd front

# Instale as dependências
npm install
```

## 🚀 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm start

# Executa os testes
npm test

# Gera build de produção
npm run build

# Ejeta as configurações (irreversível)
npm run eject
```

## 📱 Funcionalidades

### Páginas Principais
- **Home** - Apresentação da plataforma e vagas inclusivas em destaque
- **Auth Entry** - Página de entrada para autenticação
- **Main Register** - Seleção entre cadastro de candidato ou empresa
- **Register** - Formulário multi-step para cadastro de candidatos (5 etapas)
- **Login** - Autenticação de usuários
- **Dashboards** - Painéis personalizados para candidatos e empresas
- **Profiles** - Perfis detalhados de candidatos e empresas
- **Jobs** - Listagem e busca de vagas inclusivas
- **About** - Informações sobre o projeto de inclusão
- **FAQ** - Perguntas frequentes sobre acessibilidade
- **Adaptation** - Processo de adequação de perfis para vagas inclusivas
- **Usage** - Guia de uso da plataforma com foco em acessibilidade

### Componentes Principais
- **Layout** - Estrutura base acessível com header, footer e menu de desenvolvimento
- **GenericFormField** - Campo de formulário reutilizável com suporte a autocomplete
- **StepIndicator** - Indicador visual de progresso em formulários multi-step
- **GenericBlueButton** - Botão padronizado com variações de cor e tamanho
- **DevMenu** - Menu lateral de desenvolvimento para navegação rápida
- **Job Position** - Exibição de vagas inclusivas
- **Companies Row** - Carrossel de empresas comprometidas com inclusão
- **Profile Components** - Componentes para perfis de candidatos e empresas

## 🔧 Desenvolvimento

### Status Atual
- ✅ Estrutura base do projeto
- ✅ Sistema de roteamento completo (15+ páginas)
- ✅ Design system com Tailwind CSS personalizado
- ✅ Componentes estruturais e de formulário
- ✅ Formulários multi-step com validação
- ✅ Sistema de autocomplete em formulários
- ✅ Menu de desenvolvimento para testes
- ✅ Scroll suave para navegação interna
- 🚧 Persistência de dados entre steps (planejado)
- 🚧 Integração com APIs (CEP, localização)
- 📋 Backend com Node.js (planejado)

### Estrutura de Componentes
- Componentes funcionais com TypeScript
- Hooks do React para gerenciamento de estado
- Tailwind CSS para estilização acessível
- React Router para navegação

### Padrões de Código
- **Componentes** em PascalCase (ex: `GenericFormField`)
- **Arquivos** em snake_case (ex: `candidate_form1.tsx`)
- **Props** tipadas com TypeScript interfaces
- **Responsividade** mobile-first com Tailwind CSS
- **Acessibilidade** seguindo padrões WCAG
- **Autocomplete** implementado conforme HTML5 standards
- **Estados** gerenciados com React Hooks
- **Roteamento** declarativo com React Router DOM

## 🧪 Testes

O projeto utiliza React Testing Library para testes de componentes:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch
```

## 📦 Build e Deploy

```bash
# Gerar build otimizado
npm run build

# Os arquivos serão gerados na pasta 'build/'
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

## ✨ Funcionalidades Implementadas

### Formulários Inteligentes
- **Multi-step Registration** - Cadastro em 5 etapas para candidatos
- **Autocomplete Nativo** - Campos com suporte a preenchimento automático
- **Validação de Campos** - Tipos específicos (email, date, select)
- **Campos Inclusivos** - Orientação sexual e identidade de gênero respeitosas

### Experiência do Usuário
- **Navegação Fluida** - Scroll suave entre seções
- **Design Responsivo** - Layout adaptável para diferentes telas
- **Menu de Desenvolvimento** - Navegação rápida entre páginas (temporário)
- **Indicadores Visuais** - Progresso claro em formulários

### Acessibilidade
- **Labels Semânticos** - Todos os campos com labels apropriados
- **Autocomplete Standards** - Seguindo padrões HTML5 de acessibilidade
- **Cores Contrastantes** - Paleta otimizada para legibilidade
- **Estrutura Semântica** - HTML estruturado para screen readers

## 🚀 Roadmap

- [x] Estrutura base do frontend
- [x] Design system inclusivo
- [x] Sistema de roteamento completo
- [x] Formulários multi-step
- [x] Componentes reutilizáveis
- [ ] Persistência de dados entre steps
- [ ] Integração com APIs externas (CEP, localização)
- [ ] Backend com Node.js
- [ ] Sistema de autenticação JWT
- [ ] Matching inteligente PCD-Empresa
- [ ] Recursos de acessibilidade avançados (ARIA, teclado)
- [ ] Testes automatizados

---

**Apojobs** - Conectando talentos às oportunidades certas.