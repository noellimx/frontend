#!/bin/sh

container_name=dev-fe-forager
port_src=80
image_name=forager-fe

docker build . -t $image_name -f ./build.Dockerfile


echo "force stopping container with same name [$container_name], if any."
docker stop $container_name  >> /dev/null 2>&1  
docker rm -f -v $container_name >> /dev/null 2>&1  
echo "Running [$container_name]"
docker run -d --name $container_name -p $port_src:80 $image_name
