import { parseISO } from 'date-fns';

import { DateProvider } from './date.provider';

export class DateFnsProvider implements DateProvider {
  parseISO(unformattedDate: string): Date {
    return parseISO(unformattedDate);
  }
}
