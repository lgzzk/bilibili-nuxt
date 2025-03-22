import type {Header, HeaderBarItem} from "@/api/types/header.ts";
import type {HttpApiResponse} from "~/api/types/http";


export async function getHeaderBar(): Promise<HeaderBarItem[]> {
    const {data} = await useFetch<HttpApiResponse<Header>>('/api/x/web-show/wbi/res/locs?pf=0&ids=2837,2836,2870,2953,2954,2955,2956,5672')
    return Object.entries(data.value?.data)
        .filter(item => item[1] !== null)
        .map(item => item[1][0])
}

export async function getBannerLayer(): Promise<Header> {
    const {data} = await useFetch<HttpApiResponse<Header>>('/api/x/web-show/page/header?resource_id=142')
    let header = data.value?.data
    let layers = JSON.parse(header?.split_layer)
    return {...header,split_layer:layers.layers}
}

