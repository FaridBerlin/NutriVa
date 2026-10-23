export function bmiPercent(
  bmi: number | null | undefined,
  min = 12,
  max = 40,
): number {
  if (bmi === null || bmi === undefined || Number.isNaN(bmi)) return 0
  const pct = ((bmi - min) / (max - min)) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

export function getBMIColor(bmi: number | null | undefined): string {
  if (bmi === null || bmi === undefined || Number.isNaN(bmi)) return '#83D385'
  if (bmi < 18.5) return '#3b82f6'
  if (bmi < 25) return '#83D385'
  if (bmi < 30) return '#f97316'
  return '#ef4444'
}

export function bmiCategory(bmi: number | null | undefined): string {
  if (bmi === null || bmi === undefined || Number.isNaN(bmi)) return 'N/A'
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Healthy'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}
