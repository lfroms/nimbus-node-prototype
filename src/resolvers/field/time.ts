import moment from 'moment';

export default function time(obj: any) {
  const { time } = obj;
  const utcTimeObject = time.find(
    dateTimeObject => dateTimeObject.zone === 'UTC'
  );

  const date = moment(utcTimeObject.timeStamp, 'YYYYMMDDHHmmss');

  return date.unix();
}
