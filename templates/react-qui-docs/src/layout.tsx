import {type ComponentPropsWithRef, type ReactNode, useState} from "react"

import {MoonIcon, SunIcon} from "lucide-react"
import {
  Link as ReactRouterLink,
  useLocation,
  useSearchParams,
} from "react-router"

import {QdsTheme} from "@qualcomm-ui/qds-core/theme"
import {HeaderBar} from "@qualcomm-ui/react/header-bar"
import {Link} from "@qualcomm-ui/react/link"
import {
  DocsFooter,
  DocsLayout,
  type DocsLayoutSettings,
  MobileSidebar,
} from "@qualcomm-ui/react-mdx/docs-layout"
import {SiteSearch} from "@qualcomm-ui/react-mdx/site-search"
import {useTheme} from "@qualcomm-ui/react-router-utils/client"

function ThemeToggle(): ReactNode {
  const [theme, setTheme] = useTheme()

  const handleThemeSwitch = () => {
    const nextTheme = theme === QdsTheme.DARK ? QdsTheme.LIGHT : QdsTheme.DARK
    setTheme(nextTheme)
  }

  return (
    <HeaderBar.ActionIconButton
      aria-label="Toggle Theme"
      icon={theme === QdsTheme.LIGHT ? SunIcon : MoonIcon}
      onClick={handleThemeSwitch}
    />
  )
}

interface DocLinkProps extends ComponentPropsWithRef<"a"> {
  href: string
}

function DocLink({href, ref, ...props}: DocLinkProps) {
  return (
    <ReactRouterLink
      ref={ref}
      prefetch="intent"
      to={href}
      viewTransition
      {...props}
    />
  )
}

interface Props extends Partial<DocsLayoutSettings> {
  /**
   * React {@link https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children children} prop.
   */
  children: ReactNode
}

export function MdxLayout({children, ...props}: Props): ReactNode {
  const [searchParams] = useSearchParams()

  // persist the search input to the URL
  const query = searchParams.get("query") ?? ""

  const [searchInput, setSearchInput] = useState(query)

  const location = useLocation()

  // sync the search input with the url state (used in browser back/forward)
  if (searchInput !== query) {
    setSearchInput(query)
  }

  return (
    <DocsLayout
      footer={
        <DocsFooter className="flex flex-col items-start justify-center gap-1">
          Copyright © 2026 QUALCOMM incorporated. All rights reserved.{" "}
          <span>
            This site is built with{" "}
            <Link
              href="https://docs-next.qui.qualcomm.com/"
              size="md"
              target="_blank"
            >
              QUI Docs
            </Link>
            . Head over to the{" "}
            <Link
              href="https://github.com/qualcomm/qualcomm-ui-templates/tree/main/templates/qui-docs-template"
              size="md"
              target="_blank"
            >
              template repository
            </Link>{" "}
            to start building.
          </span>
        </DocsFooter>
      }
      header={
        <div className="qui-docs__header">
          <HeaderBar.Root>
            <HeaderBar.Logo>
              <MobileSidebar>
                <HeaderBar.AppTitle>QUI Docs</HeaderBar.AppTitle>
              </MobileSidebar>
              <ReactRouterLink className="flex items-center gap-2" to="/">
                <HeaderBar.AppTitle>
                  <span className="whitespace-nowrap">QUI Docs</span>
                </HeaderBar.AppTitle>
              </ReactRouterLink>
            </HeaderBar.Logo>

            <HeaderBar.Divider />

            <HeaderBar.Nav className="hidden @min-[600px]:flex">
              {/* TODO: nav items go here */}
            </HeaderBar.Nav>

            <HeaderBar.ActionBar>
              <SiteSearch />
              <ThemeToggle />
            </HeaderBar.ActionBar>
          </HeaderBar.Root>
        </div>
      }
      pathname={location.pathname}
      renderLink={DocLink}
      rootBreadcrumb={{
        children: "Home",
        render: <ReactRouterLink to="/" viewTransition />,
      }}
      {...props}
    >
      {children}
    </DocsLayout>
  )
}
