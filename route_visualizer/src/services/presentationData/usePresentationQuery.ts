import { useQuery } from "@tanstack/react-query";
import { getPresentationData } from "../api";

type RouteInformation = {
  RouteSessionID: string;
  RouteSessionType: string;
  TripID: string;
  ThirdPartyReferenceID: string | null;
  UserID: string;
  StartedDate: string | null;
  CreatedDate: string;
  UpdatedDate: string;
};
type PresentationResponse = {
  routes: RouteInformation[];
  count: number;
};
export const usePresentationQuery = () => {
  return useQuery<PresentationResponse, Error>({
    queryKey: ["presentationData"],
    queryFn: getPresentationData,
  });
};
