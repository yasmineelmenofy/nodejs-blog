export const isActiveRoute = (route: string, currentRoute: string): string => {
  return route === currentRoute ? "active" : "";
};
