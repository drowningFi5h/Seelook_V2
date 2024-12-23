"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import {Text, clx, useToggleState, Button} from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import {Menu} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lib/components/ui/card"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Wholesale: "/collections/wholesale",
  Cart: "/cart",
}

const  SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full ">
      <div className="flex items-center h-full ">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  {!open && <Menu />}
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl "
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/4 2xl:w-1/5 sm:min-w-min h-[calc(100vh-3rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full bg-[rgba(3,7,18,0.2)] rounded-rounded justify-between p-6"
                  >
                    <div className="flex justify-end py-4" id="xmark">
                      <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                      >
                        <XMark className="w-8 h-8 sm:w-10 sm:h-10"/>
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                            <li
                                key={name}
                                className="transition-transform duration-200 hover:scale-125"
                            >
                              <LocalizedClientLink
                                  href={href}
                                  className="text-3xl leading-10 hover:text-ui-fg-disabled"
                                  onClick={close}
                                  data-testid={`${name.toLowerCase()}-link`}
                              >
                                {name}
                              </LocalizedClientLink>
                            </li>
                        );
                      })}
                    </ul>
                    <Card className={"hover:bg-gray-500 hover:shadow-lg py-4"}>
                      <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Contact us</CardTitle>
                        <CardDescription>
                          Place custom or special orders.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 pt-0 md:p-4 md:pt-0 transition-transform duration-200 hover:scale-105">
                        <Button className="w-full bg-gray-100 text-emerald-600 hover:bg-emerald-600 hover:text-white" >
                          Whatsapp
                        </Button>
                      </CardContent>
                    </Card>
                    <div className="flex flex-col gap-y-6">
                      <div
                          className="flex justify-between"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                      >
                        {regions && (
                            <CountrySelect toggleState={toggleState} regions={regions}/>
                        )}
                        <ArrowRightMini
                            className={clx(
                                "transition-transform duration-150",
                                toggleState.state ? "-rotate-90" : ""
                            )}
                        />
                      </div>

                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} SeeLook Store. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
