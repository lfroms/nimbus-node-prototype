interface DateTimeArgs {
  zone: string;
}

export default function dateTime(obj: any, args: DateTimeArgs) {
  if (!obj.dateTime) {
    return null;
  }

  return obj.dateTime.find((obj: any) => obj.zone === args.zone);
}
