const options: Intl.DateTimeFormatOptions = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}
const formatter = new Intl.DateTimeFormat('en-US', options)

const time = () => {
  const formattedDate = formatter.format(new Date())
  const [datePart, timePart] = formattedDate.split(', ')
  return `${datePart.replace(/\//g, '.')} ${timePart}`
}

const generateMsg = (msgs: any[]) =>
  msgs.map((arg) => (typeof arg === 'object' && arg !== null ? JSON.stringify(arg, null, 2) : arg))

const log = (...msgs: any[]) => {
  const message = generateMsg(msgs).join('')
  console.log(`%c [${time()}]%c  LOG     %c${message}`, 'color: #13a10e;', 'color: #dff9fb;', 'color: #dff9fb;')
}

log.warn = (...msgs: any[]) => {
  const message = generateMsg(msgs).join('')
  console.log(`%c [${time()}]%c  WARN    %c${message}`, 'color: #13a10e;', 'color: #f6e58d;', 'color: #f6e58d;')
}

log.error = (...msgs: any[]) => {
  const message = generateMsg(msgs).join('')
  console.log(`%c [${time()}]%c  ERROR   %c${message}`, 'color: #13a10e;', 'color: #ff7979;', 'color: #ff7979;')
}
log.info = (...msgs: any[]) => {
  const message = generateMsg(msgs).join('')
  console.log(`%c [${time()}]%c  INFO    %c${message}`, 'color: #13a10e;', 'color: #7ed6df;', 'color: #7ed6df;')
}

export default log
