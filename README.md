# pulling the repo

```
git clone https://github.com/ruthgrace/misinfo-feed.git
git submodule update --init
```

# Replit

## Running React on Repl.it

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started

#### Set up CORS anywhere

- Create a replit and click Import from GitHub. Select the CORS anywhere repo (https://github.com/Rob--W/cors-anywhere) to import, and hit Run.

#### Set up web dev environment
The code template used at first was the React Typescript one from Replit.
- Set `const corsProxy` to the URL of the CORS anywhere replit
- Install tailwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Hit run
- Edit [App.tsx](#src/App.tsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the [configuration file](#.replit). Here are the vite docs for [serving production websites](https://vitejs.dev/guide/build.html)

#### set up front end on server

build docker container
```
cd misinfo-feed/docker
./build.sh
```

run development server on port 8080
```
docker stop misinfo-app-dev
docker rm misinfo-app-dev
docker run --net=host --name misinfo-app-dev misinfo-app:latest
```

run production server on port 80
```
docker stop misinfo-app-prod
docker rm misinfo-app-prod
docker run -e PRODUCTION=true --name misinfo-app-prod misinfo-app:
latest
```

#### build docker containers

```
cd misinfo-feed/docker
./build.sh
```

### Set up production server

#### update production code

0. Add to ~/.ssh/config on your laptop
```
Host misinfo-backend
  ForwardAgent yes
  HostName <put server IP address here>
```

1. log in as root user forwarding credentials (for github access)
```
ssh -A -i ~/.ssh/id_rsa.pub root@misinfo-backend
```

2. pull new code from github
```
cd /root/code/misinfo-feed
git pull origin main
```

#### set up cron job to fetch RSS feeds

1. build the docker container (redo this step every time the production code is updated)
```
cd /root/code/misinfo-feed/docker
/root/code/misinfo-feed/docker/build.sh production
```

2. add the cron job. Run as root:
```
crontab -e
```

Make sure you have an entry to fetch the RSS feeds once a day (custom RSS feeds made with fetchrss.com dissapear if not accessed for a week)
```
12 17 * * * docker rm /misinfo-fetch-new-articles && docker run --net=host --name misinfo-fetch-new-articles misinfo-fetch-new-articles:production
```
