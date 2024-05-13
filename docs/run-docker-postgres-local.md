---
notes: This written for a Mac OSX user on an M1/M@ chipset
topicType: Reference
---

# Running Docker Postgres Local

## Running Docker Postgres

Did some research on how to run the platform from **docker-hub**. One thing had to add was for mac m1 `--platform linux/amd64`, else the runtime wasn't compatible for the image.

Set the `-e` flags to align with a standard

```shell
# Run Container (will see in Docker Dashboard)
docker run --platform linux/amd64 --name workmaps-tha-db -p 5432:5432 -e POSTGRES_PASSWORD=workmapsecret -e POSTGRES_USER=candidate -d postgres:15.6


# Will need to create a database internally
createdb -h localhost -U candidate workmaps-tha-db
```

Inside of the `.env` set the following:

```shell
DATABASE_URL="postgresql://candidate:workmapsecret@localhost/workmaps-tha-db"
```

## Dropping Database

Sometimes it is helpful to be able to drop the database and start fresh

```shell
dropdb -h localhost -U candidate workmaps-tha-db
```