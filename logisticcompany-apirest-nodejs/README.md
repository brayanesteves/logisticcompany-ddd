## Tabla de Contenido

- [Descripción](#descripción)
- [Arquitectura](#Arquitectura)
- [Instalación](#instalación)
- [Pruebas](#pruebas)
- [Endpoints](#endpoints)
- [Docker](#docker)
---
## Descripción

Este microservicio tiene como objetivo proveer las funcionalidades básicas para que puedas desarrollar tus servicios que necesites.

## Desarrollo

1. Instale Node 14 o superior.
2. Clone este repositorio.
3. Ejecute npm i para instalar las dependencias.

## Arquitectura

### Construido con

El código se encuentra implementado con [Node], [Express], [Sequelize] y [Socket.io]

| Tecnología     | versión    | link                                                          |
|----------------|------------|---------------------------------------------------------------|
| Node | **v14** |  |

## Docker

# Run project

docker-compose -f docker-compose-local.yml up --build

# Access to container

docker exec -ti -u root #container_id /bin/bash