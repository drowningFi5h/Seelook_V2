"use client"
import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"

type ProductPreviewProps = {
  product: HttpTypes.StoreProduct
}

const ProductPreview = ({ product }: ProductPreviewProps) => (
  <div className="product-preview border p-4 rounded-lg shadow-md">
    <Link href={`/products/${product.handle}`}>
      <div className="w-full h-80 overflow-hidden mb-4 rounded">
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      {product.variants && product.variants[0] && (
        <p className="text-blue-500 font-bold">Price: {product.variants[0].calculated_price?.toString() || 'N/A'}</p>
      )}
    </Link>
  </div>
)

export default function Search() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [collections, setCollections] = useState<HttpTypes.StoreCollection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return

    setLoading(true)
    setHasSearched(true)

    const searchParams = new URLSearchParams({
      q: searchQuery,
    })

    try {
      const productResponse = await fetch(`http://localhost:9000/store/products?${searchParams.toString()}`, {
        credentials: "include",
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
        },
      })
      const productData = await productResponse.json()
      setProducts(productData.products)

      // Search for collections
      const collectionResponse = await fetch(`http://localhost:9000/store/collections?${searchParams.toString()}`, {
        credentials: "include",
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
        },
      })
      const collectionData = await collectionResponse.json()
      setCollections(collectionData.collections)
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products and collections..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mr-2 "
        />
        <button
          onClick={handleSearch}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 "
        >
          Search
        </button>
      </div>

      {loading && <span>Loading...</span>}
      {!loading && hasSearched && products.length === 0 && collections.length === 0 && <span>No results found.</span>}

      {collections.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Collections</h2>
          <ul className="list-disc pl-5">
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link href={`/collections/${collection.handle}`}>
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductPreview key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}