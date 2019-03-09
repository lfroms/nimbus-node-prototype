interface DateTimeArgs {
  zone: string;
}

export default function riseSetDateTime(obj: any, args: DateTimeArgs) {
  if (!obj.dateTime) {
    return null;
  }

  return obj.dateTime.filter((obj: any) => obj.zone === args.zone);
}
