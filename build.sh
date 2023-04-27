docker-compose down

if [ "$1" != "backend" ]; then
  cd frontend || exit
  npm i --no-save
  npm run build
  cd ../ || exit
else
  echo "Skipping frontend build"
fi

if [ "$1" != "frontend" ]; then
  ./gradlew assemble
else
  echo "Skipping backend build"
fi

docker build -t gitlabanalyzer .

docker-compose up -d
docker-compose logs -f