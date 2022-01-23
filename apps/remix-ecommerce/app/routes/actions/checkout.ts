import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";

import commerce from "~/commerce.server";
import { getSession } from "~/session.server";

export let action: ActionFunction = async ({ request }) => {
  let session = await getSession(request);

  try {
    let cart = await session.getCart();
    let checkoutUrl = await commerce.getCheckoutUrl(cart);

    return redirect(checkoutUrl);
  } catch (error) {
    console.error(error);
    return redirect("/cart");
  }
};

export let loader: LoaderFunction = async () => {
  return redirect("/cart");
};
