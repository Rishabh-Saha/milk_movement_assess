import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "localhost",
  user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "password",
  database: process.env.RDS_DATABASE || "mm_route_service",
});

const getLocations = async (event) => {
  const routeid = event.queryStringParameters.routeSessionId;
  const locations = await connection.query(
    "SELECT * FROM location where RouteSessionID= ?",
    routeid
  );

  return {
    "body": JSON.stringify({
      locations: locations[0]
    })
  };
};

export const handler = getLocations;
