import type { ImageProps } from "next/image";
import NextImage from "next/image";

interface ShopifyImageProps extends ImageProps {
  height?: number;
  width?: number;
}

export function ShopifyImage({ height, width, src, ...rest }: ShopifyImageProps): JSX.Element {
  const doubleHeight = height ? `&height=${height * 2}` : "";
  const doubleWidth = width ? `&width=${width * 2}` : "";
  return <NextImage height={height} width={width} src={src + doubleHeight + doubleWidth} {...rest} />;
}
