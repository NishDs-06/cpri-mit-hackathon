import { API_BASE_URL } from '@/lib/constants';

/**
 * Typed API error. Maps HTTP status codes to meaningful error states.
 * The UI renders different screens for 401 (session expired) vs 403 (access denied).
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

interface ApiErrorBody {
  code?: string;
  message?: string;
  error?: string;
}

/**
 * Core fetch wrapper. All API calls go through this function.
 *
 * - Credentials are sent with every request (cookies for session auth).
 * - Responses with non-2xx status throw a typed ApiError.
 * - 401 → the AuthContext should transition state to 'session_expired'.
 * - 403 → the UI should render an access-denied screen.
 *
 * SECURITY: Never put tokens, secrets, or PII in the URL. Use POST body.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Send session cookie with every request
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let body: ApiErrorBody = {};
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      // Body may not be JSON on network errors
    }

    throw new ApiError(
      response.status,
      body.code ?? 'UNKNOWN_ERROR',
      body.message ?? body.error ?? `HTTP ${response.status}`,
    );
  }

  // 204 No Content — return empty object cast as T
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
