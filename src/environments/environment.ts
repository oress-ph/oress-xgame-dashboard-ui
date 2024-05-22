// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  network: [
    {
      networks: [
        { 
          id: 1,
          name: 'Mainnet',
          wsProviderEndpoint: 'wss://rpcnodea01.xode.net/n7yoxCmcIrCF6VziCcDmYTwL8R03a/ws',
          net_name: 'MAINNET',
          is_default: true
        }
      ]
    },
    {
      networks: [
        { 
          id: 2,
          name: 'Testnet',
          wsProviderEndpoint: 'wss://testrpcnodea01.xode.net/aRoyklGrhl9m2LlhX8NP/rpc' ,
          net_name: 'TESTNET',
          is_default: false
        }
      ]
    },
  ], 
  
  keypair: localStorage.getItem("wallet-keypair") || "",
  // Website URL
  HomePageURL: 'https://xgame.live',
  MarketplaceURL: 'https://nft.xgame.live',
  DashboardURL: 'https://dashboard.xgame.live',

  // API URL
  NFTAPIURL: "https://astrochibbi-nft-api.xgame.live",
  // NFTAPIURL: "http://127.0.0.1:3003",
  ProductAPIURL: "https://product-page-api.xgame.live",
  // ProductAPIURL: "http://127.0.0.1:3005/",
  LabelAPIURL: "https://labels-api.xgame.live",
  ChatBotAPIURL: "http://chatbot-api.xgame.live",
  ChatBotAPIWSHost: "chatbot-api.xgame.live",
  BlogAPIURL: "https://blogs-api.xgame.live",
  ContactAPIURL: "http://127.0.0.1:3009",
  ExchangeAPIRUL: "http://127.0.0.1:3002",
  TeamsAPIURL: "https://teams-api.xgame.live",
  NeedsAPIURL: "https://leads-api.xgame.live",
  // NeedsAPIURL: "http://127.0.0.1:3011",
  LanguageAPIURL: "",
  WALLETAPIURL: "https://wallet-api.xode.net",

  // Social Media
  LinkedIn : 'https://www.linkedin.com/company/xgame-official/about/',
  Facebook : 'https://www.facebook.com/xgameweb3gamingplatform',
  Youtube : 'https://www.youtube.com/@XGameOfficial_',
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
  ipapi: "https://ipapi.co/json/",

  // maintenance
  maintenance: false,

  // mobile apk download link
  mobile_apps:"https://drive.usercontent.google.com/u/0/uc?id=1Fb7M_hCvEn2nc2EmLa9wId4K2z1yE3DN&export=download",

  // secret_key
  secret_key: "^a7T&kPzL#9s@4!gF%8H",

  // URL to set session
  AllURL: [
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
    {
        url: "xgame-homepage-ui.staginglab.info"
    },
    {
        url: "xgame-marketplace-ui.staginglab.info"
    },
    {
      url: "xgame-dashboard-ui.staginglab.info"
  }
  ],
  recaptcha: {
    siteKey: '6Lf7UL0cAAAAAIt_m-d24WG4mA1XFPHE8yVckc5S',
  },
  collectionId: '5FJ9VWpubQXeiLKGcVmo3zD627UAJCiW6bupSUATeyNXTH1m',

  APIURLHostNFT: 'https://astrochibbi-nft-api.xgame.live',
  contractAddress: '5HSfgnzakyDnJ21d5RdsnZQiJcukUA6UShD1k4AuvgVDLSzZ'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
