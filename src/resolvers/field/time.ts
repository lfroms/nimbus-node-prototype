import moment from 'moment';

export default function time(obj: any) {
  const { time } = obj;
  const utcTimeObject = time[0];

  const date = moment(utcTimeObject.timeStamp, 'YYYYMMDDHHmmss');

  return date.unix();
}
