//  waitMs
//  Returns a Promise that resolves after the given number of milliseconds.
//  Used to add delay between requests.

export const waitMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
