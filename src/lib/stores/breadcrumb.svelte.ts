  interface BreadcrumbInterface {
    href: string
    label: string
  }

  interface State {
    breadcrumbs: BreadcrumbInterface[]
  }

  let state = $state<State>({
    breadcrumbs: []
  })

  export const getBreadcrumbs = () => state.breadcrumbs

  export const setBreadcrumbs = (crumbs: BreadcrumbInterface[] ) => state.breadcrumbs = crumbs
