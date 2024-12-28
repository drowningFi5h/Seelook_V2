import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
      <div
          className="flex flex-col small:flex-row content-container relative space-x-6"
          data-testid="category-container"
      >
        <div className={"py-5 h-screen"}>
        <div className="sticky top-0 self-start w-[250px] bg-gray-100 p-6 rounded-xl">
          <h2 className="font-sans text-lg font-bold mb-6 border-b-2 py-2">Refine Search</h2>
          <div className="mb-6 border-b-2 ">
            <RefinementList sortBy={sort || 'default'}/>
          </div>
          <div className={"px-4"}>
            <h3 className="text-lg font-sans mb-4 py-2">Collections</h3>
            <div className="flex flex-col gap-2 px-4">
            {['Collection 1', 'Collection 2', 'Collection 3'].map((collection, index) => (
                  <a
                      key={index}
                      href="#"
                      className="hover:text-blue-600 text-sm"
                      aria-label={`Navigate to ${collection}`}
                  >
                    {collection}
                  </a>
              ))}
            </div>
          </div>
        </div>
        </div>
        <div className="flex-1">
          <div className="mb-8 text-2xl font-semibold">
            <h1 data-testid="store-page-title">All Products</h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid/>}>
            <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>

  )
}

export default StoreTemplate
