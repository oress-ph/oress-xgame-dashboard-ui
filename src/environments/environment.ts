// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
    // Website URL
    HomePageURL: 'https://xgame.live/',
    MarketplaceURL: 'https://nft.xgame.live/',
    DashboardURL: 'https://dashboard.xgame.live/',
  
    // API URL
    NFTAPIURL: "https://astrochibbi-nft-api.xgame.live",
    ProductAPIURL: "https://product-page-api.xgame.live",
    LabelAPIURL: "https://labels-api.xgame.live",
    ChatBotAPIURL: "https://chatbot-api.xgame.live/api/chatbot",
    BlogAPIURL: "https://blogs-api.xgame.live",
    ExchangeAPIRUL: "http://127.0.0.1:3002",
  
    // Social Media
    LinkedIn : 'https://www.linkedin.com/company/xgame-official/about/',
    Facebook : 'https://www.facebook.com/official.xgames',
    Youtube : 'https://www.youtube.com/@XGame-mb7cd',
    Discord : 'https://discord.gg/gGqhyzUjZN',
    Twitter : 'https://twitter.com/XGameOfficial_',
    Github : "https://github.com/Blockspace-Corporation/humidefi-parachain-v2.git",
    Instagram: "https://www.instagram.com/officialxgame_/",
    // Smart Contract
    wsProviderEndpoint: 'wss://humidefi-dev.zeeve.net/para',
  
    // Info
    email: 'admin@xgame.co',

    // Binance Websocket
    binance_trade_api: 'wss://ws-api.binance.com:443/ws-api/v3',
    binance_trade: 'wss://stream.binance.com:9443/ws/dotusdt@aggTrade',
    binance_depth: 'wss://stream.binance.com:9443/ws/dotusdt@depth20@100ms',
    binance_ticker: 'wss://stream.binance.com:9443/ws/dotusdt@ticker',

    // ip api
    ipapi: "https://ipapi.co/json/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
