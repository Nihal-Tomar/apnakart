export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Returns a greeting string based on the supplied hour.
 * Accepts `hour` as a parameter so callers decide when to capture
 * `new Date().getHours()` — always client-side inside useEffect.
 */
export function getGreetingForHour(hour: number): string {
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

/**
 * Formats a JS timestamp (number) into a locale time string.
 * Always call this client-side so the output is consistent
 * between server render (where it should never run) and the client.
 */
export function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
