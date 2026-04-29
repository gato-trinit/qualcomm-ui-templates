import type {EnvironmentProviders, Provider, Type} from "@angular/core"
import {
  type ComponentFixture,
  ɵgetCleanupHook as getCleanupHook,
  TestBed,
} from "@angular/core/testing"
import {provideRouter, Router, type Routes} from "@angular/router"
import {RouterTestingHarness} from "@angular/router/testing"
import {type Locator, page} from "vitest/browser"

import {provideQdsTheme, QdsThemeService} from "@qualcomm-ui/angular/theme"

interface RoutingConfig {
  initialRoute?: string
  routes: Routes
}

interface RenderConfig {
  imports?: unknown[]
  providers?: Array<Provider | EnvironmentProviders>
  withRouting?: RoutingConfig | boolean
}

export interface RenderResult<T> {
  component: Locator
  componentClassInstance: T
  fixture: ComponentFixture<T>
  router?: Router
  routerHarness?: RouterTestingHarness
}

export type RenderFn = <T>(
  component: Type<T>,
  config?: RenderConfig,
) => Promise<RenderResult<T>>

export async function render<T>(
  componentClass: Type<T>,
  config?: RenderConfig,
) {
  const imports = [componentClass, ...(config?.imports || [])]
  const providers = [
    ...(config?.providers || []),
    provideQdsTheme({
      defaultTheme: "light",
    }),
  ]
  const renderResult: Partial<RenderResult<T>> = {}

  if (config?.withRouting) {
    const routes =
      typeof config.withRouting === "boolean" ? [] : config.withRouting.routes
    providers.push(provideRouter(routes))
  }

  TestBed.configureTestingModule({
    imports,
    providers,
    teardown: {destroyAfterEach: false},
  })

  if (config?.withRouting) {
    const routerHarness = await RouterTestingHarness.create(
      typeof config.withRouting === "boolean"
        ? undefined
        : config.withRouting.initialRoute,
    )
    renderResult.routerHarness = routerHarness
    renderResult.router = TestBed.inject(Router)
  }
  TestBed.inject(QdsThemeService)
  const fixture = TestBed.createComponent(componentClass)
  fixture.autoDetectChanges()
  await fixture.whenStable()

  const component = page.elementLocator(fixture.nativeElement)

  return {
    ...renderResult,
    component,
    componentClassInstance: fixture.componentInstance,
    fixture,
  }
}

export function cleanup(shouldTeardown: boolean = false) {
  return getCleanupHook(shouldTeardown)()
}
