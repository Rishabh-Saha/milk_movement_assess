import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "localhost",
  user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "password",
  database: process.env.RDS_DATABASE || "mm_route_service",
});

const handleLocationUpdate = async ({ event }) => {
  console.log("event", event);
  const { location, user } = event;

  try {
    await createUser(user, connection);
    await createRouteSession(user.trip, connection);
    await createLocation(location, user, connection);
    return {
      statusCode: 200,
      body: {
        message: "Location data ingested successfully",
      },
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      body: {
        error: "Could not ingest location data",
        details: error.message,
      },
    };
  }
};

const createUser = async ({ MMUserId }, connection) => {
  // Function to find a user by ID in the database
  const findUserById = async (userId, connection) => {
    return await connection.query("SELECT * FROM user WHERE UserID = ?", [
      userId,
    ]);
  };

  // Function to update an existing user in the database
  const createUser = async (userId, connection) => {
    return await connection.query("INSERT INTO user (UserID) VALUES (?);", [
      userId,
    ]);
  };
  // Check if the user already exists in the database
  const [existingUser] = await findUserById(MMUserId, connection);
  console.log("existingUser->", existingUser);
  if (!existingUser.length) {
    // Create a new user
    return await createUser(MMUserId, connection);
  }

  return existingUser;
};

const createRouteSession = async (trip, connection) => {
  const findUserByRouteSessionId = async (RouteSessionID, connection) => {
    return await connection.query(
      "SELECT * FROM trips WHERE RouteSessionID = ?",
      [RouteSessionID]
    );
  };

  const [existingRoute] = await findUserByRouteSessionId(
    trip.metadata.route_session_id,
    connection
  );

  if (existingRoute.length) return existingRoute;

  const query = `
      INSERT INTO trips (
        RouteSessionID, RouteSessionType, TripID, ThirdPartyReferenceID, UserID
      ) VALUES (?, ?, ?, ?, ?);
    `;

  const values = [
    trip.metadata.route_session_id,
    trip.metadata.route_session_type,
    trip._id,
    trip.external_id,
    trip.MMUserId,
  ];
  return await connection.query(query, values);
};

const createLocation = async (location, user, connection) => {
  const query = `
    INSERT INTO location (
      Coordinates, RouteSessionID, UserID
    ) VALUES (ST_GeomFromText(?), ?, ?);
  `;
  const coordinates = `POINT(${location.coordinates[0]} ${location.coordinates[1]})`;
  const values = [
    coordinates,
    user.trip.metadata.route_session_id,
    user.MMUserId,
  ];

  return await connection.query(query, values);
};

export const handler = handleLocationUpdate;
