---
published: true
title: "Docker (compose)"
thumbnail: "/assets/img/cheatsheet_icons/docker.png"
---

### Docker-compose network port order
```shell 
services:
  web:
    ports:
      - <HOST_PORT>:<CONTAINER_PORT> // Map container port to system/host port
```