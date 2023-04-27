# Sedna

# Install dependencies:

'sudo apt install docker.io docker-compose'

# Starting Backend via Docker Compose

Run `sudo ./build.sh` to :
- automatically build backend & frontend
- start via Docker compose
- start streaming server logs to console

You can only build the backend/frontend by using `sudo ./build.sh backend` or `sudo ./build.sh frontend` respectively

Connect to application via `localhost:8080`

Remote debugging is available on port `8000`. Use the Remote JVM Debug run configuration to connect to it.

To wipe the DB, run `docker-compose down` before running `./build.sh`

# Starting Backend Locally

1. Start up a Postgres database using Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=gitlabanalyzer -p 5432:5432 -d postgres`

2. Open IntelliJ IDEA Ultimate (free for students)

3. Run `ln -s ../../../../frontend/build ./backend/src/main/resources/public` to let Spring pick up on frontend files when you build them

4. Run `npm run build` in the `frontend` folder.

5. Go to the Application class, and click on the play button.

6. Application is now running at `localhost:8080`
