import {Component} from "@angular/core"

import {LinkDirective} from "@qualcomm-ui/angular/link"

@Component({
  imports: [LinkDirective],
  selector: "app-welcome",
  template: `
    <div class="mx-auto max-w-4xl">
      <h1 class="font-heading-xl text-neutral-primary mb-6">
        Welcome to Your App
      </h1>

      <div class="mb-6 rounded-lg pt-6 shadow-sm">
        <h2 class="font-heading-lg text-neutral-primary mb-4">
          Getting Started
        </h2>
        <p class="text-neutral-secondary font-body-md mb-4">
          This is a preconfigured QUI starter application. Refer to the
          <a
            href="https://angular-next.qui.qualcomm.com"
            q-link
            size="md"
            target="_blank"
          >
            documentation
          </a>
          for component usage.
        </p>
        <p class="text-neutral-secondary font-body-md">
          Use the theme toggle in the header to switch between light and dark
          modes.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 class="font-heading-md text-neutral-primary mb-3">Components</h3>
          <p class="text-neutral-secondary font-body-sm">
            This template uses various QUI components like the HeaderBar,
            Avatar, Link, and more.
          </p>
        </div>

        <div class="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 class="font-heading-md text-neutral-primary mb-3">Theming</h3>
          <p class="text-neutral-secondary font-body-sm">
            Full support for light and dark themes with automatic persistence
            using a cookie.
          </p>
        </div>

        <div class="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 class="font-heading-md text-neutral-primary mb-3">ESLint</h3>
          <p class="text-neutral-secondary font-body-sm">
            Preconfigured ESLint configuration for automatic linting and
            formatting.
          </p>
        </div>

        <div class="bg-neutral-01 rounded-lg p-6 shadow-sm">
          <h3 class="font-heading-md text-neutral-primary mb-3">Tailwind</h3>
          <p class="text-neutral-secondary font-body-sm">
            Tailwind support including theme variables from the the QUI
            <a
              href="https://angular-next.qui.qualcomm.com/integrations/tailwind"
              q-link
            >
              Tailwind Plugin
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class Welcome {}
