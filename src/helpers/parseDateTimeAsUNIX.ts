import moment from 'moment';

export default function parseDateTimeAsUNIX(dateTime: string) {
  return moment(dateTime, 'YYYYMMDDHHmmss').unix();
}
