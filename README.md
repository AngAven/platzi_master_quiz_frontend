## Instalación

> Se requiere descargar [API](https://github.com/AngAven/api_sistema_de_evaluacion) que se conecta con Mongo Atlas,
> este proyecto corre por el puerto por defecto de nodemon [localhost:3000], en el archivo ".env.example", estan las
> variables de entorno que se necesitan para que pueda conectarse a una insrtancia propia. También puedes usar [el
> servicio público](https://app.apievaluacion.angelavendanocruz.com/api/questions) para hacer las peticiones. Ten en
> cuenta que no es un servicio dedicado y muchas peticiones afectarán al mismo.

Para correr este proyecto en local, se necesita clonar con el siguiente comando de git

`git clone [url]`

Dentro de la carpeta que se descargó corremos el siguiente comando y esperamos a que se instalen los paquetes de dependencias

`npm install`

Posteriormente corremos

`npm run:dev`

Nos generará una carpeta './dist', dentro de la misma y desde terminal podemos correr el comando

`live-server`

Este comando de la biblioteca de npm necesita estar de forma global en nuestra máquina

Puedes ver el proyecto corriendo [AQUÍ](https://angaven.github.io/proyecto-evaluacion-despliegue/)
