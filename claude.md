# Fidgetman

Una navaja suiza del desarrollador con muchas herramientas comunes para todo desarrollador.

* La aplicación está por ahora solo disponible en inglés.

## Especificaciones técnicas

* La app debe ser dual-platform: correr perfectamente en web y correr perfectamente en desktop con electron
* La persistencia de la app (si es que la tiene) es 100% local usando su respectiva tecnología según el tipo de build. Nada de datos en la nube
* Hecha en tecnologías web React y Typescript

## Arquitectura de código

* Cada componente de alto nivel que no tenga representación directa por un componente built-in (por ejemplo, campo de búsqueda, lista de herramientas) debe vivir separado en su propio archivo.
* Cada componente en lo posible debe ser totalmente modular, altamente flexible y altamente extensible. Parámetros de control deben ser recibidos por props en lo posible.
* Otro tipo de parámetro más general, especialmente aquellos que se suelen arrastrar hacia arriba, se pasan por contexto.
* Cada vista, modal o popup debe vivir en su propio archivo.
* Las hojas de estilo para cada componente debe vivir en su archivo separado, y humanamente legible y formateado.
* No usar clases nativas de HTML. En su lugar, en lo posible crear un wrapper de React si es que no existe uno built-in
* Si es que hay componentes que sean de más bajo nivel (que se puedan usar en practicamente cualquier proyecto) van en una carpeta más general llamada "widgets" permitiría implementar nuevos entrypoints de esta app.
* Cada herramienta vive en su propia carpeta, incluyendo su funcionalidad core en su propio archivo y su vista. La vista y componentes de UI viven en la carpeta "ui" dentro de la carpeta de la herramienta. Es decir, en el código las herramientas se separan por carpetas y dentro tienen todo lo necesario para funcionar dentro de Fidgetman, incluyendo su vista de UI, sus componentes de UI y sus componentes funcionales.
* Cuando se agrega nueva funcionalidad, en lo posible intentar no modificar en absoluto lo que ya existe a menos que en serio tenga sentido hacerlo (por ejemplo, al agregar un prop nuevo a un componente existente), y extender más que modificar.

## Unit testing

* No testees componentes de UI. Solo testea funciones core. No testees tipos (porque typescript ayuda mucho), solo testea happy path, casos comunes y casos bordes.
