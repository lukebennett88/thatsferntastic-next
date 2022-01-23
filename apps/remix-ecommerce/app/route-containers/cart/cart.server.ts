import type { ActionFunction, HeadersFunction, LoaderFunction } from "remix";
import { json, redirect } from "remix";

import commerce from "~/commerce.server";
import type { CartInfo } from "~/models/ecommerce-provider.server";
import { getSession, removeCartItem, updateCartItem } from "~/session.server";
import { validateRedirect } from "~/utils/redirect.server";

export let headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export let action: ActionFunction = async ({ request }) => {
  let [body, session] = await Promise.all([request.text(), getSession(request)]);

  let formData = new URLSearchParams(body);
  let redirectTo = validateRedirect(formData.get("redirect"), "/cart");
  let action = formData.get("_action");

  try {
    let cart = await session.getCart();

    switch (action) {
      case "set-quantity": {
        let variantId = formData.get("variantId");
        let quantityStr = formData.get("quantity");
        if (!variantId || !quantityStr) {
          break;
        }
        let quantity = Number.parseInt(quantityStr, 10);
        cart = updateCartItem(cart, variantId, quantity);
        break;
      }
      case "delete": {
        let variantId = formData.get("variantId");
        if (!variantId) {
          break;
        }
        cart = removeCartItem(cart, variantId);
        break;
      }
    }

    await session.setCart(cart);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await session.commitSession(),
      },
    });
  } catch (error) {
    console.error(error);
  }

  return redirect(redirectTo);
};

export type LoaderData = {
  cart?: CartInfo;
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request);
  let cart = await session.getCart().then((cartItems) => commerce.getCartInfo(cartItems));

  return json<LoaderData>({
    cart,
  });
};
