export const throwError = (error?: string | Error) => {
  return () => {
    if (typeof error === 'string') {
      throw new Error(error);
    }
    throw error;
  };
};
