export const alpha = 1
const beta = 2

function helper() {
  return beta
}

export { beta as gamma }
export default helper

export function delta(offset = 0) {
  return helper() + offset
}
