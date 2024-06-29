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

interface ContentStatusColors {
  [key: string]: string;
  APPROVED: string;
  PENDING_APPROVAL: string;
}

export const contentStatusColors: ContentStatusColors = {
  APPROVED: 'green',
  PENDING_APPROVAL: 'gray',
};

export const getContentStatusColor = (key: string): string => {
  if (key in contentStatusColors) {
    return contentStatusColors[key];
  }

  return 'gray';
};

export const profileStatusColors: ContentStatusColors = {
  APPROVED: 'green',
  PENDING_APPROVAL: 'gray',
  BANNED: 'red',
};

export const getProfileStatusColor = (key: string): string => {
  if (key in profileStatusColors) {
    return profileStatusColors[key];
  }

  return 'gray';
};

export const isEmpty = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0;
  }
  return !value; // For strings, numbers, booleans, null, undefined
};
