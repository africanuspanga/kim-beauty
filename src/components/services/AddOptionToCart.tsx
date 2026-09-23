"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { buttonClass } from "@/components/ui/Button";

/**
 * Puts one service style in the cart so a client can pay for exactly
 * what she picked. The server re-prices the line from `service_options`,
 * so the price sent from here is only ever a display value.
 */
export function AddOptionToCart({
  id,
  name,
  price,
  imageUrl,
  label = "Add to Cart",
  size = "sm",
}: {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  label?: string;
  size?: "sm" | "md";
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem({ id, name, price, image_url: imageUrl })}
      className={buttonClass("outline", size, "w-full sm:w-auto")}
    >
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
