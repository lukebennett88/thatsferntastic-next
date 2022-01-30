export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface FullCartItem extends CartItem {
  info: Product;
}

export interface CartInfo {
  formattedTaxes: string;
  formattedTotal: string;
  formattedShipping: string;
  formattedSubTotal: string;
  items: Array<FullCartItem>;
}

export interface WishlistItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface FullWishlistItem extends WishlistItem {
  info: Product;
}

export interface Category {
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  title: string;
  formattedPrice: string;
  formattedOptions?: string;
  image: string;
  slug: string;
  defaultVariantId: string;
}

export interface ProductOption {
  name: string;
  values: Array<string>;
}

export interface FullProduct extends Product {
  description?: string;
  descriptionHtml?: string;
  images: Array<string>;
  availableForSale: boolean;
  selectedVariantId?: string;
  options: Array<ProductOption>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
}

export interface FullPage extends Page {
  body: string;
  summary: string;
}

export interface SortByOption {
  label: string;
  value: string;
}

export interface SelectedProductOption {
  name: string;
  value: string;
}

export interface ProductsResult {
  hasNextPage: boolean;
  nextPageCursor?: string;
  products: Array<Product>;
}

export interface EcommerceProvider {
  getCartInfo(items: Array<CartItem>): Promise<CartInfo | undefined>;
  getCollections(count: number, nocache?: boolean): Promise<Array<Category>>;
  getCheckoutUrl(items: Array<CartItem>): Promise<string>;
  getFeaturedProducts(): Promise<Array<Product>>;
  getPage(slug: string): Promise<FullPage | undefined>;
  getPages(): Promise<Array<Page>>;
  getProduct(slug: string, selectedOptions?: Array<SelectedProductOption>): Promise<FullProduct | undefined>;
  getProducts(
    category?: string,
    sort?: string,
    search?: string,
    cursor?: string,
    perPage?: number,
    nocache?: boolean,
  ): Promise<ProductsResult>;
  getSortByOptions(): Promise<Array<SortByOption>>;
  getWishlistInfo(items: Array<WishlistItem>): Promise<Array<FullWishlistItem> | undefined>;
}
