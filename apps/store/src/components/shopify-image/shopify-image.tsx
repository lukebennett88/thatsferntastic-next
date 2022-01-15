import type { ImageProps } from "next/image";
import NextImage from "next/image";

export function ShopifyImage({ height, width, src, ...rest }: ImageProps): JSX.Element {
  const renderedHeight = height ? `&height=${Number(height) * 1.5}` : "";
  const renderedWidth = width ? `&width=${Number(width) * 1.5}` : "";
  return <NextImage height={height} width={width} src={src + renderedHeight + renderedWidth} {...rest} />;
}
