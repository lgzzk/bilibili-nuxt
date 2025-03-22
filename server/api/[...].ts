export default defineEventHandler(async (event) => {
    let proxyUrl = useRuntimeConfig().apiUrl_1;
    let path = event.path;

    // path = event.path.replace(/^\/api\//, "");

    // 构建目标 URL
    const target = proxyUrl + path;
    return proxyRequest(event, target);
});