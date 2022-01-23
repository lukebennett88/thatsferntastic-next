import cn from "classnames";
import { Form } from "remix";

import type { CartInfo } from "~/models/ecommerce-provider.server";

export function CheckoutForm({ className, cart }: { className: string; cart: CartInfo }) {
  return (
    <Form method="post" action="/actions/checkout" className={className}>
      <table className="w-full table-auto">
        <tbody>
          <tr>
            <th className="font-normal text-left">Subtotal</th>
            <td className="text-right">{cart.formattedSubTotal}</td>
          </tr>
          <tr>
            <th className="font-normal text-left">Taxes</th>
            <td className="text-right">{cart.formattedTaxes}</td>
          </tr>
          <tr>
            <th className="font-normal text-left">Shipping</th>
            <td className="text-right">{cart.formattedShipping}</td>
          </tr>
        </tbody>
      </table>
      <div className="pt-3 mt-3 border-t border-zinc-700">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <th className="font-semibold text-left">Total</th>
              <td className="font-semibold text-right">{cart.formattedTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className={cn("mt-6 py-4 bg-gray-50 text-gray-900 block w-full text-center font-semibold uppercase")}>
        Proceed to checkout
      </button>
    </Form>
  );
}
