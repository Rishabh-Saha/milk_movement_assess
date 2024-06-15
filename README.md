Notes:

How to get started:

1) Create a database from script.sql
2) Insert the data using curl provided
3) Application URL: http://54.84.163.238/

Folder structure:

update_location: Code deployed to lambda function responsible for insert data into database. The function for web hook

get_route_sessions: Code deployed to lambda function responsible for fetching presentation data.

get_individual_route: Code deployed to lambda function responsible for fetching locations against a route session_id


Application deployement:

- All functions are deployed in lambda functions
- All API endpoints are exposed via API Gateway
- React code deployed on EC2 and exposed via nginx


Future scope:
- Use serverless framework to deploy
- Use google maps to display the coordinates on map