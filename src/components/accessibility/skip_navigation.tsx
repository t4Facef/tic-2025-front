import React from 'react';

const SkipNavigation: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-navigation-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-blue3 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue2 focus:shadow-lg"
      aria-label="Pular para o conteúdo principal"
    >
      Pular para conteúdo principal
    </a>
  );
};

export default SkipNavigation;