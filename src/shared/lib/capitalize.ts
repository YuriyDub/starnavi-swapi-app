// Helper function to capitalize first letter (optional, but nice for presentation)
export const capitalize = (s?: string) => {
  if (typeof s !== 'string' || !s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
