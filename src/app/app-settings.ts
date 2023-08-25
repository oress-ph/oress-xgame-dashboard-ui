import { environment } from "src/environments/environment";
import { LabelModel } from "./models/label/label.model";

export class AppSettings {
    public AllURL = [
        {
            url: "nft.xgame.live"
        },
        {
            url: "dashboard.xgame.live"
        },
        {
            url: "astrochibbi.xgame.live"
        },
        {
            url: "xgame.live"
        },
        {
            url: "localhost"
        },
    ]

    public wsProviderEndpoint = 'wss://humidefi-dev.zeeve.net/para';
    public APIURLHostNFT = 'https://astrochibbi-nft-api.xgame.live';

    public keypair = localStorage.getItem("wallet-keypair") || "";

    public dexAccount = '5HNfKk7JdZRiwt9UZVpJRmpFpt4fPDhnh1uPEeFEQhZtggQt';
    public lumiAccountAddress = localStorage.getItem("lumi-account-address") || "";
    public lumiContractAddress = localStorage.getItem("lumi-contract-address") || "";
    public phpuContractAddress = localStorage.getItem("phpu-contract-address") || "";
    public lphpuAccountAddress = localStorage.getItem("lphpu-account-address") || "";
    public lphpuContractAddress = localStorage.getItem("lphpu-contract-address") || "";
    public swapFees = localStorage.getItem("swap-fees") || "";
    public forexUpdates = localStorage.getItem("forex-updates") || "";


    public APIURLHost = environment.APIURLHost;
    public UIURLHomePageHost = 'https://xgame.live/home';
    public UIURLMarketplaceHost = 'https://nft.xgame.live/';
    public UIURLDashboardlaceHost = 'https://dashboard.xgame.live/';


    public APIURLHostAuth = 'http://127.0.0.1:3001';
    public APIURLHostCollection = 'http://127.0.0.1:3002';
    public APIURLHostLabel = 'http://127.0.0.1:3004';
    public APIURLHostLanguage = 'http://127.0.0.1:3006';

    public APIUploadURL = this.APIURLHost + '/uploads/'
    public AppVersion = 'Alpha.001';
    // table list date format
    public date_list_format = 'dd MMM yyyy';
    public time_list_format = 'hh:mm a'

    // p-calendar date format
    public date_detail_format_ts = 'dd MMM yyyy';
    public date_detail_format_html = "dd M yy";

    public date_time_detail_format_ts = 'dd MMM yyyy h:mm a';
    public date_time_detail_format_html = "dd MMM yyyy hh:mm a";

    // Laravel date format
    public date_format_laravel = 'yyyy/MM/dd';
    public time_format_laravel = 'hh:mm:ss';

    public default_date_format = 'yyyy/MM/dd hh:mm'

    constructor() {
        let hostName = window.location.hostname;
        switch (hostName) {
            case 'localhost':
                // this.wsProviderEndpoint = 'ws://127.0.0.1:9944';
                this.wsProviderEndpoint = 'wss://humidefi-dev.zeeve.net/para';
                break;
            default:
                break;

        }
    }

    convertTime12to24 = (time12h: any) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }

    convertTime24to12(time: any) {
        const time_part_array = time.split(":");
        let ampm = 'AM';
        if (time_part_array[0] >= 12) {
            ampm = 'PM';
        }
        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }
        const formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
        return formatted_time;
    }

    // Translation
    public translation_list: LabelModel[] = [];

    translate(value: any) {
        if (this.translation_list.filter(translation => translation.label === value)[0] != undefined) {
            return this.translation_list.filter(translation => translation.label === value)[0].displayed_label
        } else {
            return value;
        }
    }
    translate_to_english(value: any) {
        if (this.translation_list.filter(translation => translation.displayed_label === value)[0] != undefined) {
            return this.translation_list.filter(translation => translation.displayed_label === value)[0].label
        } else {
            return value;
        }
    }
}
