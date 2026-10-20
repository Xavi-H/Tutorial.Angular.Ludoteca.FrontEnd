/**
 * Escriu la data manualment, per evitar problemas amb UTC (Date guarda un instant no un dia (guarda la hora),
 * per tant podria ser que guardesi un dia incorrectament si en la franja horaria hi haguesin diveres hores
 * de diferencia, podria agafar el dia previ o posterior al que realmente es vol guardar)
 * @param date
 * @returns La data en text, obtenint el dia real sense problemes per zones horaries
 */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Els mesos van de 0 a 11, per això s'afegeix 1
  const day = String(date.getDate()).padStart(2, '0'); // padStart assegura que el dia tingui sempre 2 dígits, afegint un 0 al davant si cal
  return `${year}-${month}-${day}`;
}

/**
 * Mateix problema de UTC, genera la data correcta a partir del text rebut
 * @param text rep la data en format string
 * @returns
 */
export function fromIsoDate(text: string): Date {
  const [year, month, day] = text.split('-').map(Number);
  return new Date(year, month - 1, day);
}
