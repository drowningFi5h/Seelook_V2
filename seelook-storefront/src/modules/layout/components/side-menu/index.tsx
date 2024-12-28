"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import {Text, clx, useToggleState, Button} from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import {Instagram, Menu, Twitter} from "lucide-react";

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
      <div className="h-full">
        <div className="flex items-center h-full">
          <Popover className="h-full flex">
            {({open, close}) => (
                <>
                  <div className="relative flex h-full">
                    <Popover.Button
                        data-testid="nav-menu-button"
                        className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                    >
                      {!open && <Menu/>}
                    </Popover.Button>
                  </div>

                  <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-300 transform"
                      enterFrom="opacity-0 translate-x-10"
                      enterTo="opacity-100 translate-x-0"
                      leave="transition ease-in duration-300 transform"
                      leaveFrom="opacity-100 translate-x-0"
                      leaveTo="opacity-0 translate-x-10"
                  >
                    <Popover.Panel
                        className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/4 sm:max-w-[400px] h-[calc(100vh-3rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 bg-gradient-to-t from-gray-900/80 to-transparent backdrop-blur-2xl rounded-lg">
                      <div
                          data-testid="nav-menu-popup"
                          className="flex flex-col h-full bg-[rgba(3,7,18,0.2)] rounded-lg justify-between p-6"
                      >
                        <div className="flex justify-end py-4" id="xmark">
                          <button
                              data-testid="close-menu-button"
                              onClick={close}
                              className="transition-transform duration-200 hover:text-red-500 hover:scale-110 focus:outline-none"
                          >
                            <XMark className="w-8 h-8 sm:w-10 sm:h-10"/>
                          </button>
                        </div>
                        <ul className="flex flex-col gap-6 items-start justify-start">
                          {Object.entries(SideMenuItems).map(([name, href]) => (
                              <li
                                  key={name}
                                  className="hover:text-gray-950 hover:border-gray-950 rounded-xl px-6 py-2 transition duration-200 ease-in-out"
                              >
                                <LocalizedClientLink
                                    href={href}
                                    className="text-3xl leading-10"
                                    onClick={close}
                                    data-testid={`${name.toLowerCase()}-link`}
                                >
                                  {name}
                                </LocalizedClientLink>
                              </li>
                          ))}
                        </ul>
                        <div className="flex flex-col gap-y-6">
                          <div
                              className="flex justify-between items-center"
                              onMouseEnter={toggleState.open}
                              onMouseLeave={toggleState.close}
                              onKeyDown={(e) => e.key === "Enter" && toggleState.open()}
                              onBlur={toggleState.close}
                          >
                            {regions && (
                                <CountrySelect toggleState={toggleState} regions={regions}/>
                            )}
                            <ArrowRightMini
                                className={`transition-transform duration-150 ${
                                    toggleState.state ? "-rotate-90" : ""
                                }`}
                            />
                          </div>
                          <div className="flex justify-center gap-4">
                            <a href="https://twitter.com" className="hover:text-blue-500">
                              <Twitter className="h-5 w-5"/>
                            </a>
                            <a href="https://instagram.com" className="hover:text-pink-500">
                              <Instagram className="h-5 w-5"/>
                            </a>
                          </div>
                          <Text className="flex justify-between txt-compact-small">
                            © {new Date().getFullYear()} SeeLook Store. All rights reserved.
                          </Text>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
            )}
          </Popover>
        </div>
      </div>

  )
}

export default SideMenu
