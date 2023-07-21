#!/bin/bash

ENV=$1

rm .env 2> /dev/null
cp envs/.$ENV.env .env