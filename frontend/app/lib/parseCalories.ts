export function parseCalories(text: string) {
  const match = text.match(/([\d~]+ ?kcal)(.*)/i)

  return {
    calories: match?.[1] ?? text,
    suffix: match?.[2]?.trim() ?? "",
  }
}