#!/bin/bash

ENV=$1

rm envs/.env 2> /dev/null
cp envs/.$ENV.env envs/.env