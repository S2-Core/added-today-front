const normalizeUrl = (value?: string): string => {
  return (value || "").replace(/\/+$/, "");
};

export const API_URL = normalizeUrl(process.env.NEXT_PUBLIC_API_URL);

export const PAGBANK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAGBANK_PUBLIC_KEY;

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
