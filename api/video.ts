import httpApi from "@/utils/request";
import type {
    OnlineTotal,
    RecommendVideo,
    RecommendVideoItems,
    VideoPlayConfig,
    VideoPlayer,
    VideoRelated,
    VideoView
} from "@/api/types/video";
import type {HttpApiResponse} from "~/api/types/http";


export async function getRecommendVideos(ps: number = 11): Promise<RecommendVideo[]> {
    const {data} = await useFetch<HttpApiResponse<RecommendVideoItems>>('/api/x/web-interface/wbi/index/top/feed/rcmd', {
        query: {ps}
    })
    return data.value?.data.item

}

export async function getVideoView(bvid: string): Promise<VideoView> {
    return (await httpApi('/x/web-interface/wbi/view', {
        params: {bvid},
    })).data
}

export async function getVideoPlayer(video: VideoView): Promise<VideoPlayer> {
    const {bvid, cid} = video
    return (await httpApi('/x/player/wbi/playurl', {
        params: {
            bvid,
            cid,
            qn: 80,
            fnval: 4048,
            try_look: 1,
            gaia_source: 'pre-load'
        }
    })).data
}

export async function getVideoRelated(bvid: string): Promise<VideoRelated[]> {
    return (await httpApi('/x/web-interface/archive/related', {
        params: {bvid}
    })).data
}

export async function getVideoPlayConfig(video: VideoView): Promise<VideoPlayConfig> {
    const {cid, aid} = video
    return (await httpApi('/x/player/wbi/v2', {
        params: {aid, cid}
    })).data
}

export async function getOnlineTotal(video: VideoView): Promise<OnlineTotal> {
    return (await httpApi('/x/player/online/total', {
        params: {aid: video.aid, cid: video.cid}
    })).data
}
