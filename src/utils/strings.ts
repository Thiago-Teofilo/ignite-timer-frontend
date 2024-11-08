export function toPlural(
  pluralForm: string,
  singularForm: string,
  amount: number,
) {
  return amount > 1 ? pluralForm : singularForm
}
