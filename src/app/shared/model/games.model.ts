export class GameModel {
    id: number = 0;
    game_name: string = '';
    description: string = '';
    game_token?: string=''
    categories: Categories[] = [];
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