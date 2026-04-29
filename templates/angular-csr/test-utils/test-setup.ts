// prevent test auto-cleanup to enable browser preview
import "../src/styles.css"

import {NgModule, provideZonelessChangeDetection} from "@angular/core"
import {getTestBed} from "@angular/core/testing"
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing"
import {beforeEach} from "vitest"
import {page} from "vitest/browser"

import {provideQdsTheme} from "@qualcomm-ui/angular/theme"

import {cleanup} from "./render"

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class ZonelessTestModule {}

getTestBed().initTestEnvironment(
  [BrowserTestingModule, ZonelessTestModule],
  platformBrowserTesting([provideQdsTheme()]),

  // We need to set this in order for browser mode to keep showing the component
  // after the test
  {teardown: {destroyAfterEach: false}},
)

page.extend({
  [Symbol.for("vitest:component-cleanup")]: cleanup,
})

beforeEach(() => {
  cleanup(true)
})
