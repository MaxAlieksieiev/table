export function startWithUpperCaseLetter(str: string): string {
  const words = str.split(/(?=[A-Z])/);

  const transformedWords = words.map((word, index) =>
    index === 0
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word.toLowerCase(),
  );

  return transformedWords.join(' ');
}
