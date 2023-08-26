"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation";

import "./navigation.css"

const navigationItems: string[][] = Object.entries({
  // attributeValue: textValue //
  coffee: "Books + Coffee",
  cleancode: "Clean code",
  protocols: "Protocols",
  research: "Research",
  testing: "Testing",
})

interface INavigation { }

const Navigation: React.FC<INavigation> = (): React.ReactElement => {
  const pathname = usePathname()
  const router = useRouter();

  return (
    <header>
      <div id="logo-wrapper">
        <div id="logo" onClick={() => router.push("/")} />
      </div>
      <nav>
        <ul>
          {navigationItems.map(([attributeValue, textValue]: string[]) => {
            return (
              <li
                key={attributeValue}
                id={attributeValue === "coffee" ? "special" : ""}
                className={(pathname as string).replace("/", "") === attributeValue ? "active" : ""}
                onClick={() => router.push(`/${attributeValue}`)}
                value={attributeValue}
              >
                {attributeValue !== "coffee" ? textValue : "📚 ☕"}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
