import React from "react";
import { usePresentationQuery } from "../../services/presentationData/usePresentationQuery";
import Dropdown from "react-bootstrap/Dropdown";
import { Outlet } from "react-router-dom";

export const Home = () => {
  const { data } = usePresentationQuery();
  console.log("data", data);
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Route Sessions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {data?.routes?.map((route) => (
            <Dropdown.Item
              href={`/route-sessions/${route.RouteSessionID}`}
              key={route.RouteSessionID}
            >
              {route.RouteSessionID}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <p>Count: {data?.count}</p>
      <Outlet />
    </div>
  );
};
