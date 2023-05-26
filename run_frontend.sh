#!/bin/bash

if [ $PRODUCTION = true ]; then
    ln -s /etc/nginx/sites-available/misinfo_trends_prod_nginx.conf /etc/nginx/sites-enabled/misinfo_trends_prod_nginx.conf
else
    ln -s /etc/nginx/sites-available/misinfo_trends_dev_nginx.conf /etc/nginx/sites-enabled/misinfo_trends_dev_nginx.conf
fi
service nginx start
tail -f /dev/null
