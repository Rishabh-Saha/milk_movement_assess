import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "localhost",
  user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "password",
  database: process.env.RDS_DATABASE || "mm_route_service",
});

const getRouteLocations = async () => {
  const routes = await connection.query("SELECT * FROM trips");
  const count = await connection.query(
    "select count(*) as count from location where CreatedDate >= DATE(NOW() - INTERVAL 7 DAY)"
  );

  return {
    statusCode: 200,
    body: {
      routes: routes[0],
      count: count[0][0]["count"],
    },
  };
};

// setTimeout(async () => {
//   console.log("getRouteLocations->", JSON.stringify(await getRouteLocations()));
// });

export const handler = getRouteLocations;
