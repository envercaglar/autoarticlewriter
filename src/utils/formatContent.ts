export function formatContent(content: string): string {
  // Remove extra whitespace and empty lines
  let formatted = content.trim().replace(/\n{3,}/g, '\n\n');

  // Add proper spacing around headers
  formatted = formatted.replace(/^(#{1,3})\s*(.*?)$/gm, '\n$1 $2\n');

  // Add bullet points for lists
  formatted = formatted.replace(/^[-*]\s+/gm, '• ');

  return formatted;
}