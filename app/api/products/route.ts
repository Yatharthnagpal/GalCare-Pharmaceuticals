import { NextResponse } from "next/server"
import { fetchWPProducts } from "@/lib/wordpress"
import { PRODUCTS } from "@/lib/site-data"

export async function GET() {
  try {
    const wpProducts = await fetchWPProducts()
    if (wpProducts && wpProducts.length > 0) {
      return NextResponse.json({ success: true, products: [...wpProducts, ...PRODUCTS] })
    }
    return NextResponse.json({ success: true, products: PRODUCTS })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: true, products: PRODUCTS })
  }
}
