/** Eesti isikukood (11 numbrit + kontrolljärk). Tühi string = valikuline väli. */
export function isValidIsikukood(raw: string): boolean {
  const id = raw.replace(/\s/g, '')
  if (!id) return true
  if (!/^\d{11}$/.test(id)) return false

  const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
  let sum = 0
  for (let i = 0; i < 10; i++) sum += Number(id[i]) * weights1[i]
  let mod = sum % 11
  if (mod === 10) {
    const weights2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
    sum = 0
    for (let i = 0; i < 10; i++) sum += Number(id[i]) * weights2[i]
    mod = sum % 11
    if (mod === 10) mod = 0
  }
  return mod === Number(id[10])
}

export function normalizeIsikukood(raw: string): string {
  return raw.replace(/\s/g, '').slice(0, 11)
}
