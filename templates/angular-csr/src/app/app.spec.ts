import {describe, expect, it} from "vitest"
import {page} from "vitest/browser"

import {render} from "~test-utils/render"

import {App} from "./app"

describe("App", () => {
  it("should render app", async () => {
    await render(App, {withRouting: true})

    await expect.element(page.getByText("Qualcomm App")).toBeVisible()
  })
})
