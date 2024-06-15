import { handler } from "../update_location/index.js";

const generateData = () => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      event: {
        createdAt: new Date(Date.now() + i * 60 * 1000),
        type: "user.updated_trip",
        location: {
          type: "Point",
          coordinates: [-119.3056079094478, 36.00942850116281],
        },
        user: {
          _id: "6477c8c614fe6c005a89df2b",
          updatedAt: "2023-07-24T19:52:07.507Z",
          MMUserId: "619481dd940bbe643baf776e",
          trip: {
            _id: "64bebf33fc633e0061e84882",
            createdAt: new Date(Date.now() + i * 60 * 1000),
            updatedAt: new Date(Date.now() + i * 60 * 1000),
            externalId: "1f76eed0-992a-4d17-b532-462f089a42e8",
            MMUserId: "619481dd940bbe643baf776e",
            startedAt: new Date(),
            metadata: {
              route_session_type: "RawMilk",
              route_session_id: "64bebf32d38530406ca4f254",
            },
          },
        },
      },
    });
  }
  return data;
};

setTimeout(async () => {
  const data = generateData();

  data.map(async (d) => {
    const result = await fetch(
      "https://7a4yafkl72.execute-api.us-east-1.amazonaws.com/dev",
      {
        method: "POST",
        body: JSON.stringify(d),
      }
    );
    console.log("result", result);
  });
}, 1000);
