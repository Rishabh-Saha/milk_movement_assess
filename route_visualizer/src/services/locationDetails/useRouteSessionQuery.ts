import { useQuery } from "@tanstack/react-query";
import { getRouteSessionData } from "../api";

type Location = {
  LocationID: number;
  Coordinates: {
    x: number;
    y: number;
  };
  RouteSessionID: string;
  UserID: string;
  CreatedDate: string;
  UpdatedDate: string;
};
type RouteSessionResponse = {
  locations: Location[];
};

export const useRouteSessionQuery = (routeSessionId: string | undefined) => {
  return useQuery<RouteSessionResponse, Error>({
    queryKey: ["routeSessionDetails", routeSessionId],
    enabled: !!routeSessionId,
    queryFn: () =>
      routeSessionId
        ? getRouteSessionData(routeSessionId)
        : Promise.reject("No route session "),
  });
};
