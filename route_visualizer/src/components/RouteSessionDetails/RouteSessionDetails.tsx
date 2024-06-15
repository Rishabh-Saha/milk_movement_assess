import React from "react";
import { useParams } from "react-router-dom";
import { useRouteSessionQuery } from "../../services/locationDetails/useRouteSessionQuery";

export const RouteSessionDetails = () => {
  const { routeSessionId } = useParams();
  const { data } = useRouteSessionQuery(routeSessionId);

  return <div>Route Session Details: {JSON.stringify(data)}</div>;
};
