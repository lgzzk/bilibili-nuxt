export interface HttpApiResponse<T> {
    ads_control?: Adscontrol;
    code: number;
    message: string;
    ttl: number;
    data: T;
}

interface Adscontrol {
  has_danmu: number;
  under_player_scroller_seconds: number;
  has_live_booking_ad: boolean;
}