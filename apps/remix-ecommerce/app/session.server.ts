import { createCookieSessionStorage } from "remix";

import type { CartItem } from "./models/ecommerce-provider.server";

if (!process.env.ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY environment variable is not set");
}

let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.ENCRYPTION_KEY],
  },
});

let cartSessionKey = "cart";

export async function getSession(input: Request | string | null | undefined) {
  let cookieHeader = !input || typeof input === "string" ? input : input.headers.get("Cookie");
  let session = await sessionStorage.getSession(cookieHeader);

  return {
    commitSession() {
      return sessionStorage.commitSession(session);
    },
    // TODO: Get and set cart from redis or something if user is logged in (could probably use a storage abstraction)
    async getCart(): Promise<Array<CartItem>> {
      let cart = JSON.parse(session.get(cartSessionKey) || "[]");
      return cart;
    },
    async setCart(cart: Array<CartItem>) {
      session.set(cartSessionKey, JSON.stringify(cart));
    },
  };
}

export function addToCart(cart: Array<CartItem>, variantId: string, quantity: number) {
  let added = false;
  for (let item of cart) {
    if (item.variantId === variantId) {
      item.quantity += quantity;
      added = true;
      break;
    }
  }
  if (!added) {
    cart.push({ variantId, quantity });
  }
  return cart;
}

export function updateCartItem(cart: Array<CartItem>, variantId: string, quantity: number) {
  let updated = false;
  for (let item of cart) {
    if (item.variantId === variantId) {
      item.quantity = quantity;
      updated = true;
      break;
    }
  }
  if (!updated) {
    cart.push({ variantId, quantity });
  }
  return cart;
}

export function removeCartItem(cart: Array<CartItem>, variantId: string) {
  return cart.filter((item) => item.variantId !== variantId);
}
