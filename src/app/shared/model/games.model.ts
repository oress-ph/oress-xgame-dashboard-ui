export class GameModel {
    id: number = 0;
    game_name: string = '';
    description: string = '';
    game_token?: string=''
    categories: Categories[] = [];
}
export class ProductModel {
    id: number = 0;
    game_logo: string = '';
    game_name: string = '';
    game_banner: string = '';
    game_token: string = '';
    game_link: string = '';
    ingame_images: string[] = [];
    ingame_description: string = '';
    game_market_description: string = '';
    description: string = '';
    published: boolean = false;
    published_date: string = '';
    status: string = 'DRAFT';
    created_at: string = '';
    updated_at: string = '';
}
// Messages
export class Categories {
    id : number = 0 ;
    category_name: string = '';
    description: string = '';
    game_id: number = 0 ;
    created_at?: any;
    updated_at?: any;
}