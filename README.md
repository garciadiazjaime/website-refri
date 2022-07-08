Project: Paldi

Description

- Activa entorno virtual

$ . bin/activate


- Entrar al proyecto y jalar branch develop

$ cd project_path
$ git checkout develop

- Crear branch en la que se estara trabjando y desde la cual se generara Pull Request.

$ git checkout -b topic/actividad

- Instalar paquetes python

$ pip install -r requirements.txt


- Instalar paquetes node

$ npm install


- Instalar paquetes bower

$ bower install


- Levantar server

$ python manage.py runserver


- Escuchar cambios JS

$ gulp watch

Este comando genera la carpeta de 'assets', jalando JS/CSS.

Al momento de trabajar con FE/JS vamos estar modificando los archivos que estan en la
carpeta 'angular_components'. El comando en automatico jala los cambios a
carpeta assets.

Los archivos que se van a trabajar de BE estaran en carpeta project y django_components.

Base de datos: Sqlite.

NOTA: La manera de subir cambios sera a traves de branches y pull requests.


Example about how to document our functions.

/**
 * Short description about the function
 * @param {type} variableName 
 * @param {type|type} variableName 
 * @return {type} variableName 
 */

docker build -t garciadiazjaime/website-refritect .
docker run -d -p 49184:3084 garciadiazjaime/website-refritect
docker push garciadiazjaime/website-refritect
docker pull garciadiazjaime/website-refritect