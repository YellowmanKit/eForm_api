const twoDigits = d => {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
export const sqlDate = date => date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + "T" + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds())

export const deltaMinute = (start, end) => {
  return Math.ceil(Math.abs(start.getTime() - end.getTime()) / (1000 * 3600))
}
