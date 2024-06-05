export const throwError = (message?: string) => {
  return (): never => {
    throw new Error(message);
  };
};
