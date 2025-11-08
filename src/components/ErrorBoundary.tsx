import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const sanitizedError = {
      message: error.message?.replace(/[\r\n\t]/g, ' '),
      stack: error.stack?.replace(/[\r\n\t]/g, ' ').substring(0, 500)
    };
    console.error('Erro capturado pelo ErrorBoundary:', sanitizedError);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ops! Algo deu errado</h1>
            <p className="text-gray-600 mb-6">Ocorreu um erro inesperado. Tente recarregar a página.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue3 text-white px-6 py-2 rounded-lg hover:bg-blue3H transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;