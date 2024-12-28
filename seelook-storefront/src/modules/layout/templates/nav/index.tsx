import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import {Skeleton} from "@mui/material";
import Image from 'next/image';



export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav
            className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="w-full">

              <SideMenu regions={regions}/>
            </div>
          </div>

          <div className="relative w-auto h-full inset-0 p-2">
            <Suspense fallback={<Skeleton className="h-full bg-red-500 aspect-square"/>}>
              <Image src="/in/images/logo.svg" alt="logo" width={80} height={80} className="w-auto h-10 pt-2"
                     loading="lazy"/>
            </Suspense>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
            >
              SeeLook Store
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden sm:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                  className="flex items-center gap-x-2 text-ui-fg-muted hover:text-ui-fg-base transition duration-200"
                  href="/account"
                  data-testid="nav-account-link"
                  aria-label="Go to account page"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A8.003 8.003 0 0112 16a8.003 8.003 0 016.879 1.804M12 12a5 5 0 100-10 5 5 0 000 10z"
                  />
                </svg>
                <span>Account</span>
              </LocalizedClientLink>
            </div>

            <Suspense
                fallback={
                  <LocalizedClientLink
                      className="hover:text-ui-fg-base flex gap-2"
                      href="/cart"
                      data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
            >
              <CartButton/>
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
