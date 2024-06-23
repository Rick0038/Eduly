export const formatDate = (
  date: Date | string,
  options?: Record<string, boolean>
): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (options?.useIntl) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  let formattedTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  if (!options?.skipSeconds) {
    const seconds = date.getSeconds().toString().padStart(2, '0');
    formattedTime += `:${seconds}`;
  }

  return formattedTime;
};
