import type {ReactNode} from "react"

import {Link} from "@qualcomm-ui/react/link"

export function Welcome(): ReactNode {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-heading-xl text-neutral-primary mb-6">
        Welcome to Your App
      </h1>

      <div className="bg-neutral-01 mb-6 rounded-lg pt-6 shadow-sm">
        <h2 className="font-heading-lg text-neutral-primary mb-4">
          Getting Started
        </h2>
        <p className="text-neutral-secondary font-body-md mb-4">
          This is a preconfigured QUI starter application. Refer to the{" "}
          <Link
            href="https://react-next.qui.qualcomm.com"
            size="md"
            target="_blank"
          >
            documentation
          </Link>{" "}
          for component usage.
        </p>
        <p className="text-neutral-secondary font-body-md">
          Use the theme toggle in the header to switch between light and dark
          modes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">
            Components
          </h3>
          <p className="text-neutral-secondary font-body-sm">
            This template uses various QUI components like the HeaderBar,
            Avatar, Link, and more.
          </p>
        </div>

        <div className="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">Theming</h3>
          <p className="text-neutral-secondary font-body-sm">
            Full support for light and dark themes with automatic persistence
            using a cookie.
          </p>
        </div>

        <div className="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">ESLint</h3>
          <p className="text-neutral-secondary font-body-sm">
            Preconfigured ESLint configuration for automatic linting and
            formatting.
          </p>
        </div>

        <div className="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">
            Tailwind
          </h3>
          <p className="text-neutral-secondary font-body-sm">
            Tailwind support including theme variables from the the QUI{" "}
            <Link href="https://react-next.qui.qualcomm.com/integrations/tailwind">
              Tailwind Plugin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
