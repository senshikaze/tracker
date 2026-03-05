declare namespace App {
  export interface PageState<T> {
    showModal?: boolean
    loaderData?: T
  }
}