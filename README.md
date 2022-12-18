# Ejercicio práctico de Angular
A partir del proyecto del siguiente [REPOSITORIO](https://github.com/joadelvia/pokemon) debes realizar lo siguiente:

- Vamos a estructurar el proyecto de forma modular, para ello crearemos un módulo pokemon que contendrá un componente list que será la tabla que muestra los pokemon. También tendrá un componente editPokemon que nos permitirá editar pokemons y contendrá el formulario para editar pokemons.
- Además crearemos un módulo shared que contendrá el componente search.
- Por último crearemos un módulo main que contendrá el componente home.
- El componente home contendrá el botón searh, el componente searh y el componente list. El componente search estará oculto y solo se mostrará cuando pulsemos el botón search y se volverá a ocultar al volver a pulsarlo. El componente list de incio mostrará el listado completo de pokemons y cuando introduzcamos algo en buscar y pulsemos intro mostrará solo los pokemons cuyo búsqueda coincida con la palabra introducida (para ello podemos hacer búsquedas con el query param q. PODER TOTAL será la suma de todos los poderes de la celda anterior.
- El proyecto constará de las siguientes rutas:
	- Raíz: mostrará el componente home.
	- /edit/+parámetro: Esta ruta recibe un parámetro llamado pokemon y muestra el componente editPokemon.
	- Cualquier otra ruta redirige a la ruta raíz.
- Los pokemons los obtendremos de un servidor json-server que levantaremos a partir del fichero pokemon.json adjunto.
- El componente editPokemon nos permitirá editar el pokemon seleccionado. Esto será posible a través del enlace al final de cada pokemon en la tabla donde se muestran todos. La edición me permitirá editar solo los campos que se ven en el proyecto inicial.
