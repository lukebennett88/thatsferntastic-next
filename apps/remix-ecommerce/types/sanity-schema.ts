import type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from "sanity-codegen";

export type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
};

/**
 * Blog Post
 */
export interface BlogPost extends SanityDocument {
  _type: "blogPost";

  /**
   * Title — `string`
   */
  title?: string;

  /**
   * Description — `string`
   */
  description?: string;

  /**
   * Slug — `slug`
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Share image — `imageWithAltText`
   */
  shareImage?: ImageWithAltText;

  /**
   * Post — `richText`
   */
  content?: RichText;
}

/**
 * Page
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `string`
   */
  title?: string;

  /**
   * Description — `string`
   */
  description?: string;

  /**
   * Slug — `slug`
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Share image — `image`
   */
  shareImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Page sections — `array`
   */
  content?: Array<SanityKeyed<RichText>>;
}

/**
 * Settings
 */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";

  /**
   * Default page title — `string`
   */
  title?: string;

  /**
   * Default page description — `text`
   */
  description?: string;

  /**
   * Site URL — `string`
   */
  siteUrl?: string;

  /**
   * Banner Text — `array`
   */
  bannerText?: Array<SanityKeyed<string>>;

  /**
   * Share image — `imageWithAltText`
   */
  shareImage?: ImageWithAltText;

  /**
   * Social Links — `array`
   */
  socialLinks?: Array<SanityKeyed<SocialLinks>>;
}

export type ImageWithAltText = {
  _type: "imageWithAltText";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Alt text — `string`
   */
  altText?: string;
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type SocialLinks = {
  _type: "socialLinks";
  /**
   * Social Network — `string`
   */
  socialNetwork?: "Facebook" | "Instagram" | "LinkedIn" | "Twitter";

  /**
   * Link — `string`
   */
  link?: string;
};

export type RichText = {
  _type: "richText";
  /**
   * Block Content — `blockContent`
   */
  blockContent?: BlockContent;
};

export type Documents = BlogPost | Page | SiteSettings;
