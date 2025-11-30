type Matcher = (char: string) => boolean

export function readUntil(text: string, start: number, matcher: Matcher): number {
   let endIndex = null

   for (let i = start; i < text.length; i++) {
      if (text[i] && !matcher(text[i] as string)) continue

      endIndex = i
      break
   }

   // If target is not exist return -1
   return endIndex === null ? -1 : endIndex
}
