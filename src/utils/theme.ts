/** Pages that use the teal "factory" theme in the shared header/footer instead of the brand red. */
export const isFactoryThemePath = (pathname: string | null) =>
  !!pathname?.startsWith("/factory-service");
