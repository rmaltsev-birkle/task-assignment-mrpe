type SuccessResult<T> = {
  success: true;
  data: T;
};

type ErrorResult = {
  success: false;
  errors: string[];
  meta?: Record<string, unknown>;
};

export type ApiResult<T> = SuccessResult<T> | ErrorResult;

type RequestConfig<T> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  transform?: (data: unknown) => T;
};

export async function makeRequest<T>({
  url,
  method = "GET",
  body,
  headers = {},
  transform = (data) => data as T,
}: RequestConfig<T>): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      if (response.status === 500) {
        return {
          success: false,
          errors: ["Server error, please try again later"],
        };
      }

      const errorData = await response.json().catch(() => ({
        message: "Failed to parse error response",
      }));

      return {
        success: false,
        errors: [errorData.message],
        meta: errorData,
      };
    }

    const responseData = await response.json();
    return {
      success: true,
      data: transform(responseData),
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errors: ["Could not reach the server, please try again later"],
    };
  }
}
