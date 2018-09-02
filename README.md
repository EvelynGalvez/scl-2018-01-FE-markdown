# Markdown Links

## Markdown

Markdown es un lenguaje muy popular en el mundo de los desarrolladores, permite escribir texto como si se tratase de un documento html, pero de forma mucho más sencilla, lo que se traduce en mayor rapidez y eficiencia.

Muchas veces los documentos en este formato contienen links que redirigen a diversas páginas web, pero en ocasiones uno o más links ya no funcionan. Para agilizar la tarea de detectar qué link se encuentra caído y cuáles se encuentran funcionales, se creó esta librería. Para su utilización sólo debes seguir las instrucciones de instalación que se detallan más adelante; además de tener ciertas herramientas instaladas previamente, las que también se detallan.

## Instalación

### Previamente 

Para utilizar md-links, debes tener instalado previamente en tu equipo node.js y seguir las siguientes indicaciones:

- Debes instalar librería marked, pues trabajamos con ella para hacer la extracción de links.
- Debes instalar el módulo fetch de node.

* De esta manera:

~~~

$npm install --save marked
$npm install node-fetch --save

~~~

### Integración de md-links a tu trabajo

* Instala la librería con el siguiente comando con la terminal situada en el directorio de tu proyecto
~~~
$npm install md-links
~~~

* Para analizar un directorio que contenga archivos .md, ejecuta el siguiente comando:
~~~
$md-links <ruta_directorio>
~~~

* Para analizar un archivo específico .md, ejecuta el siguiente comando:
~~~
$md-links <ruta_archivo>
~~~

* En ambos casos, si deseas validar funcionalidad de los links contenidos en los archivos .md, sólo debes agregar un espacio, seguido del comando "--validate". El siguiente ejemplo muestra como se efecturía la operación, situándonos en la carpeta contenedora del archivo "ejemplo_archivo_md1.md". Si estás afuera del nivel de tu archivo a analizar, simplemente entrega la ruta relativa a tu ubicación actual.
~~~
$md-links ejemplo_archivo_md1.md --validate
~~~


### Librería

Al ser ejecutados los comandos correctamente, la libería mostrará en la terminal los links funcionales y caídos del documento que previamente fue asignado para escanear, identificando la ruta al archivo, el link propiamente tal, la línea en que está contenido en el archivo y según si deseas validar el link o no, mostrará la respuesta respectiva al hacer una petición http.

### Planificación

La planificación fue realizada con la herramienta [Trello](https://trello.com/).

### Versiones

**Versión 1.0.0**


___

### Desarrollado por 

Evelyn Gálvez

