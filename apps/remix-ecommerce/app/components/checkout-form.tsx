import cn from "classnames";
import { Form } from "remix";

import type { CartInfo } from "~/models/ecommerce-provider.server";

export function CheckoutForm({ className, cart }: { className: string; cart: CartInfo }) {
  return (
    <Form method="post" action="/actions/checkout" className={className}>
      <table className="w-full table-auto">
        <tbody>
          <tr>
            <th className="text-left font-normal">Subtotal</th>
            <td className="text-right">{cart.formattedSubTotal}</td>
          </tr>
          <tr>
            <th className="text-left font-normal">Taxes</th>
            <td className="text-right">{cart.formattedTaxes}</td>
          </tr>
          <tr>
            <th className="text-left font-normal">Shipping</th>
            <td className="text-right">{cart.formattedShipping}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 border-t border-zinc-700 pt-3">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="text-left font-semibold">Total</th>
              <td className="text-right font-semibold">{cart.formattedTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className={cn("mt-6 block w-full bg-gray-50 py-4 text-center font-semibold uppercase text-gray-900")}>
        Proceed to checkout
      </button>
    </Form>
  );
}
