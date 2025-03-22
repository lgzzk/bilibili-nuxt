const httpApi = async (
    url: RequestInfo | URL,
    options?: HttpApiOptions,
    includeHeaders: boolean = false
) => {
    try {
        const finalUrl = options?.params
            ? `${url}${url.toString().includes('?') ? '&' : '?'}${new URLSearchParams(options.params)}`
            : url
        const response = await fetch(finalUrl, {...options?.options})
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        let data = await handleContentType(response)

        if (includeHeaders) return {data, headers: response.headers} as HttpApiResult

        return data

    } catch (error: Error | any) {
        if (error.name === 'AbortError')
            return
        console.error('Fetch error:', error)
        throw error
    }
}

export function setCookie() {
    const expiresInSeconds = 12 * 60 * 60;
    const b_nut = useCookie('b_nut', {maxAge: expiresInSeconds})
    const buvid3 = useCookie('buvid3', {maxAge: expiresInSeconds})
    const buvid4 = useCookie('buvid4', {maxAge: expiresInSeconds})
    if (!buvid3.value || !buvid4.value) {
        b_nut.value = '723348237'
        httpApi('https://api.bilibili.com/x/frontend/finger/spi').then(({data}) => {
            buvid3.value = `buvid3=${data.b_3};path=/;max-age=${expiresInSeconds};`
            buvid4.value = `buvid4=${data.b_4};path=/;max-age=${expiresInSeconds};`
        })
    }
}

async function handleContentType(response: Response): Promise<any> {
    const contentType = response.headers.get('Content-Type')?.split(';')[0].trim()
    if (!contentType) return JSON.parse(await response.text())
    if (contentHandlers.has(contentType)) {
        return contentHandlers.get(contentType)!(response)
    }

    return Promise.reject(new Error('Unsupported Content-Type: ' + contentType))
}


type ContentHandler = (response: Response) => Promise<any>
type HttpApiOptions = {
    params?: Record<string, any>
    options?: RequestInit
}
type HttpApiResult = {
    data: any
    headers: Headers
}

const contentHandlers: Map<string, ContentHandler> = new Map([
    ['application/json', (response) => response.json()],
    ['application/octet-stream', (response) => response.arrayBuffer()],
    ['format/mp4', (response) => response.arrayBuffer()],
    ['format/webm', (response) => response.blob()],
    ['text/html', (response) => response.text()],
    ['video/mp4', (response) => response.arrayBuffer()],
    ['video/webm', (response) => response.blob()]
])

export default httpApi
