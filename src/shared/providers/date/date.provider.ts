export type DateProvider = {
  parseISO(isoString: string): Date;
  startOfDay(value: string | number | Date): Date;
};
