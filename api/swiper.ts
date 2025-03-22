import httpApi from "@/utils/request";
import type {SwipeItem} from "@/api/types/swiper";
import type {HttpApiResponse} from "~/api/types/http";


export async function getRecommendSwipe(): Promise<SwipeItem[]> {

    const {data} = (await useFetch<HttpApiResponse<SwipeItem[]>>('/api/x/web-show/res/locs', {
        query: {pf: 0, ids: 4694}
    }))
    return data.value?.data[4694]
}

export async function setSwipeColor(swipes: SwipeItem[]) {
    for (const i of swipes) {
        i.color = (await httpApi(
                `${i.pic}@.avg_color`.startsWith('http://')
                    ? `https://${i.pic.slice(7)}@.avg_color`
                    : `${i.pic}@.avg_color`, {
                    options: {referrerPolicy: 'no-referrer'}
                })
        )['RGB']
    }
    for (const i of swipes) {
        // const {data} = await useFetch('', {}
    }
}
