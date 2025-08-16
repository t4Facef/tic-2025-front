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
│   ├── buttons/         # Botões customizados
│   ├── content/         # Componentes de conteúdo
│   ├── profile/         # Componentes de perfil
│   └── structure/       # Componentes estruturais (header, footer, layout)
├── data/                # Dados mockados
├── pages/               # Páginas da aplicação
│   ├── home.tsx         # Página inicial
│   ├── login.tsx        # Página de login
│   ├── cadastrar.tsx    # Página de cadastro
│   ├── candidate_profile.tsx # Perfil do candidato
│   ├── sobre.tsx        # Sobre a plataforma
│   ├── faq.tsx          # Perguntas frequentes
│   └── ...
└── App.tsx              # Componente principal com roteamento
```

## 🎨 Design System

### Paleta de Cores
- **blue1**: `#BDEAFC` - Azul claro
- **blue2**: `#219EBC` - Azul médio
- **blue3**: `#023047` - Azul escuro
- **blue4**: `#9CDFFE` - Azul suave
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
- **Login/Cadastro** - Autenticação para candidatos PCDs e recrutadores
- **Perfil do Candidato** - Visualização e edição de perfis acessíveis
- **Sobre** - Informações sobre o projeto de inclusão
- **FAQ** - Perguntas frequentes sobre acessibilidade
- **Adequação** - Processo de adequação de perfis para vagas inclusivas
- **Utilização** - Guia de uso da plataforma com foco em acessibilidade

### Componentes Principais
- **Layout** - Estrutura base acessível com header e footer
- **Navigation** - Sistema de navegação responsivo e inclusivo
- **Job Position** - Exibição de vagas inclusivas
- **Companies Row** - Carrossel de empresas comprometidas com inclusão
- **Profile Components** - Componentes para perfis de candidatos PCDs

## 🔧 Desenvolvimento

### Status Atual
- ✅ Estrutura base do projeto
- ✅ Sistema de roteamento
- ✅ Design system com Tailwind CSS
- ✅ Componentes estruturais básicos
- 🚧 Funcionalidades com TypeScript (em desenvolvimento)
- 📋 Integração com backend Node.js (planejado)

### Estrutura de Componentes
- Componentes funcionais com TypeScript
- Hooks do React para gerenciamento de estado
- Tailwind CSS para estilização acessível
- React Router para navegação

### Padrões de Código
- Componentes em PascalCase
- Arquivos em snake_case
- Props tipadas com TypeScript
- Responsividade mobile-first
- Foco em acessibilidade (WCAG)

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

## 🚀 Roadmap

- [x] Estrutura base do frontend
- [x] Design system inclusivo
- [ ] Funcionalidades avançadas com TypeScript
- [ ] Backend com Node.js
- [ ] Sistema de autenticação
- [ ] Matching inteligente PCD-Empresa
- [ ] Recursos de acessibilidade avançados

---

**Apojobs** - Conectando talentos às oportunidades certas.