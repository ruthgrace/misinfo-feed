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
docker run --net=host -e PRODUCTION=true --name misinfo-app-prod misinfo-app:latest
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

Make sure your credentials are in the server at `/home/prod/.ssh/authorized_keys`

1. log in as prod user forwarding credentials (for github access)
```
ssh -A -i ~/.ssh/id_rsa.pub prod@misinfo-backend
```

2. pull new code from github
```
cd /home/prod/misinfo-feed
git pull origin main
```

#### update front end

1. build the docker container (redo this step every time the production code is updated)
```
cd /home/prod/misinfo-feed/docker
/home/prod/misinfo-feed/docker/build.sh production
```

2. put service file in place if you haven't already (do this as root user)
```
ln -s /home/prod/misinfo-feed/misinfo_trends.service /etc/systemd/system/misinfo_trends.service
```
If you've updated the `misinfo_trends.service` file, reload configs
```
systemctl daemon-reload
```

3. start service (do this as root user)
```
systemctl stop misinfo_trends
systemctl start misinfo_trends
```

4. sanity check to make sure its running
```
systemctl status misinfo_trends
```
sanity check to make sure it's listening on port 80
```
netstat -tnlp | grep LISTEN
```
you should see entries like
```
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      196555/nginx: maste 
tcp6       0      0 :::80                   :::*                    LISTEN      196555/nginx: maste 
```

#### set up systemd timer to fetch RSS feeds

0. Prune docker system files so we don't run out of disk space
```
docker system prune -a
```

1. make sure you have the `misinfo-feed/docker/fetch-new-articles/.env` file. The file should look like this -- you can get the values from Adam or Ruth.
```
SUPABASE_URL='<supabase url>'
SUPABASE_API_KEY='<supabase url key>'
SUPABASE_DB_PASSWORD='<supabase db pass>'
OPENAI_API_KEY='<openai api key>'
``` 

2. build the docker container (redo this step every time the production code is updated)
```
cd /home/prod/misinfo-feed/docker
/home/prod/misinfo-feed/docker/build.sh production
```

3. add the .service and .timer file to systemd. Run as root user:
```
ln -s /home/prod/misinfo-feed/fetch_new_articles.service /etc/systemd/system/fetch_new_articles.service
ln -s /home/prod/misinfo-feed/fetch_new_articles.timer /etc/systemd/system/fetch_new_articles.timer

```

Note that custom RSS feeds made with fetchrss.com dissapear if not accessed for a week. The timer is configured to run at 10:10am UTC every day.


#### Test ChatGPT reponses with known article titles

```
cd /home/prod/misinfo-feed/docker/fetch-new-articles
python3 query.py -a [-vvv]
```

#### Pull latest RSS feeds 
```
cd /home/prod/misinfo-feed/docker/fetch-new-articles
python3 pull_rss_feeds.py [-vvv] [--force-update]
```

