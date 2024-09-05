
interface HttpClientRequestProps {
    method?: string
    url: '/api/layout' | '/api/winners'  
    data?: BodyInit
    headers?: HeadersInit,
    params?: Record<string, any>;
}

export const Api = {
    async request({
        method = 'GET',
        url,
        data,
        headers = { "Content-Type": "application/json" },
        params
    }: HttpClientRequestProps) {
        const API_BASE_URL = String(process.env.NEXT_PUBLIC_API_BASE_URL)
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${API_BASE_URL.concat(url)}?${queryString}` : API_BASE_URL.concat(url);

        if (data instanceof FormData) {
            if ("Content-Type" in headers) {
                delete headers["Content-Type"]
            }
        }

        try {
            const resp = await fetch(fullUrl, {
                method,
                headers,
                body: data
            })

            return await resp.json()
        } catch (err) {
            return err
        }
    }
}