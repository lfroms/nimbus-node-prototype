import moment from 'moment';

export default function parseDateTimeAsUNIX(dateTime: string): number {
  return moment(dateTime, 'YYYYMMDDHHmmss').unix();
}
