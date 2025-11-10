export const getMinBirthDate = (): string => {
  // Mínimo: 120 anos atrás
  const date = new Date();
  date.setFullYear(date.getFullYear() - 120);
  return date.toISOString().split('T')[0];
};

export const getMaxBirthDate = (): string => {
  // Máximo: 14 anos atrás (idade mínima para trabalhar)
  const date = new Date();
  date.setFullYear(date.getFullYear() - 14);
  return date.toISOString().split('T')[0];
};

export const getMinEducationDate = (): string => {
  // Mínimo: 50 anos atrás
  const date = new Date();
  date.setFullYear(date.getFullYear() - 50);
  return date.toISOString().split('T')[0];
};

export const getMaxEducationDate = (): string => {
  // Máximo: 10 anos no futuro
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
};

export const getMinJobDate = (): string => {
  // Mínimo: 50 anos atrás
  const date = new Date();
  date.setFullYear(date.getFullYear() - 50);
  return date.toISOString().split('T')[0];
};

export const getMaxJobDate = (): string => {
  // Máximo: hoje
  return new Date().toISOString().split('T')[0];
};