/* global RequestInit */
import { z } from "@repo/schemas";

interface RequestConfig<T> {
    data?: unknown;
    zodSchema?: z.ZodSchema<T>;
    method?: "POST" | "GET" | "PUT";
    customConfig?: RequestInit;
}

export async function request<T>(
    url: string,
    { data, zodSchema, method, customConfig }: RequestConfig<T>
): Promise<T | null> {
    const config: RequestInit = {
        method: method ?? (data ? "POST" : "GET"),
        body: data ? JSON.stringify(data) : null,
        headers: {
            "Content-Type": data ? "application/json" : "",
            Accept: "application/json",
        },
        ...customConfig,
    };

    // eslint-disable-next-line github/no-then
    return fetch(url, config).then(async (response) => {
        let result = null;

        try {
            result = await response.json();
        } catch (error: unknown) {
            // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
            return Promise.reject(error);
        }

        if (response.ok) {
            return zodSchema && result ? zodSchema.parse(result) : result;
        } else {
            throw result;
        }
    });
}
