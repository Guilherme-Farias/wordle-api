import { parseISO, startOfDay } from 'date-fns';

import { DateProvider } from './date.provider';

export class DateFnsProvider implements DateProvider {
  parseISO(isoString: string): Date {
    return parseISO(isoString);
  }

  startOfDay(value: string | number | Date): Date {
    return startOfDay(value);
  }
}
