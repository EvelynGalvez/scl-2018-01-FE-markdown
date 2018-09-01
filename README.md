# Markdown Links

## Formato Markdown

Markdown es un lenguaje muy popular en el mundo de los desarrolladores, permite escribir texto como si se tratase de un documento html, pero de forma mucho más sencilla, lo que se traduce en mayor rapidez y eficiencia.

Muchas veces los documentos en este formato contienen links que redirigen a diversas páginas web, pero en ocasiones uno o más links ya no funcionan. Para agilizar la tarea de detectar qué link se encuentra caído y cuáles se encuentran funcionales, se creó esta librería. Para su utilización sólo debes seguir las instrucciones de instalación que se detallan más adelante; además de tener ciertas herramientas instaladas previamente, las que también se detallan.

### Instalación

Para utilizar md-links, debes tener instalado en tu equipo node.js y seguir las siguientes indicaciones:

- Debes instalar el módulo fs (file system)

### Librería

Al ser ejecutados los comandos correctamente, la libería mostrará en la terminal los links funcionales y caídos del documento que previamente fue asignado para escanear, identificando la ruta al archivo, el link propiamente tal, la línea en que está contenido en el archivo y según si deseas validar el link o no, mostrará la respuesta respectiva al hacer una petición http.

