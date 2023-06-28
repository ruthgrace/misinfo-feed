FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY .env .env
CMD [ "python", "/usr/src/app/pull_rss_feeds.py" ]
