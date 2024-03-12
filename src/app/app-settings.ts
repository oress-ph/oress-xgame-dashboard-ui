import { environment } from "./enviroments/enviroment";

import { LabelModel } from "./../app/shared/model/label.model";
import { WalletInfoModel } from "./shared/model/wallet-info.model"

export class AppSettings {
    public AllURL = [
        {
            url: "nft.xgame.live"
        },
        {
            url: "nft.xgame.co"
        },
        {
            url: "dashboard.xgame.live"
        },
        {
            url: "dashboard.xgame.co"
        },
        {
            url: "astrochibbi.xgame.live"
        },
        {
            url: "astrochibbi.xgame.co"
        },
        {
            url: "xgame.live"
        },
        {
            url: "xgame.co"
        },
        {
            url: "mint.xgame.live"
        },
        {
            url: "mint.xgame.co"
        },
        {
            url: "localhost"
        },
    ]

    // public wallet_info: WalletInfoModel = new WalletInfoModel();


    public wsProviderEndpoint = 'wss://rpcnodea01.xode.net/n7yoxCmcIrCF6VziCcDmYTwL8R03a/rpc';

    public keypair = localStorage.getItem("wallet-keypair") || "";
    public collectionId = '5FJ9VWpubQXeiLKGcVmo3zD627UAJCiW6bupSUATeyNXTH1m';
    public dexAccount = '5HNfKk7JdZRiwt9UZVpJRmpFpt4fPDhnh1uPEeFEQhZtggQt';
    public lumiAccountAddress = localStorage.getItem("lumi-account-address") || "";
    public lumiContractAddress = localStorage.getItem("lumi-contract-address") || "";
    public phpuContractAddress = localStorage.getItem("phpu-contract-address") || "";
    public lphpuAccountAddress = localStorage.getItem("lphpu-account-address") || "";
    public lphpuContractAddress = localStorage.getItem("lphpu-contract-address") || "";
    public swapFees = localStorage.getItem("swap-fees") || "";
    public forexUpdates = localStorage.getItem("forex-updates") || "";

    public APIURLHost = environment.APIURLHost;
    public UIURLHomePageHost = 'https://xgame.live/';

    public UIURLMarketplaceHost = 'https://nft.xgame.live/';
    public UIURLDashboardlaceHost = 'https://dashboard.xgame.live/';

    public APIURLHostAuth = 'http://127.0.0.1:3001';
    public APIURLHostCollection = 'http://127.0.0.1:3002';
    // public APIURLHostNFT = 'http://127.0.0.1:3004';
    public APIURLHostNFT = 'https://wallet-api.xode.net';
    public APIURLHostLanguage = 'http://127.0.0.1:3006';
    // public APIURLHostLabel = 'http://127.0.0.1:3004';
    public APIURLHostLabel = 'https://labels-api.xgame.live';
    public APIURLHostGames = 'http://127.0.0.1:3008';
    public chatBotURLHOST = 'https://chatbot-xgame-api.serveo.net/api/chatbot';
    public APIURLHostProduct = 'https://product-page-api.xgame.live';

    public Email = 'admin@xgame.co';
    public LinkedIn = 'https://www.linkedin.com/company/xgame-official/about/';
    public Facebook = 'https://www.facebook.com/official.xgames';
    public Youtube = 'https://www.youtube.com/@XGame-mb7cd';
    public Discord = 'https://discord.gg/gGqhyzUjZN';
    public Twitter = 'https://twitter.com/XGameOfficial_';

    public APIUploadURL = this.APIURLHost + '/uploads/'
    public AppVersion = 'Alpha.001';
    // table list date format
    public date_list_format = 'dd MMM yyyy';
    public time_list_format ='hh:mm a'

    // p-calendar date format
    public date_detail_format_ts = 'dd MMM yyyy';
    public date_detail_format_html = "dd M yy";

    public date_time_detail_format_ts = 'dd MMM yyyy h:mm a';
    public date_time_detail_format_html = "dd MMM yyyy hh:mm a";

    // Laravel date format
    public date_format_laravel = 'yyyy/MM/dd';
    public time_format_laravel = 'hh:mm:ss';

    public default_date_format =  'yyyy/MM/dd hh:mm'

    public company_logo: string = '../../../assets/images/new-assets/jkslogo3.png';
    constructor() {
        let hostName = window.location.hostname;
        switch (hostName) {
            case 'template-ui-demo.hiro-test.net':
                this.company_logo = '../../../assets/images/logo/new-assets/jkslogo3.png';
                break;
            default:
                break;

        }
    }

    // Translation
    public translation_list: LabelModel[] = [];

    translate(value:any){
        if(this.translation_list.filter(translation=> translation.label=== value)[0]!=undefined){
            return this.translation_list.filter(translation=> translation.label=== value)[0].displayed_label
        }else{
            return value;
        }
    }
    translate_to_english(value:any){
        if(this.translation_list.filter(translation=> translation.displayed_label=== value)[0]!=undefined){
          return this.translation_list.filter(translation=> translation.displayed_label=== value)[0].label
        }else{
            return value;
        }
    }
}
