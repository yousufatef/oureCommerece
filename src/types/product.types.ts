export interface IProducts {
    id: number;
    title: string;
    price: number;
    cat_prefix?: string;
    img: string;
    quantity?: number;
    max: number;
    isLiked?: boolean;
}
