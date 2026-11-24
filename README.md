# React_Assignment_1
Repositorio del assignment 1: Pagina de ta-te-ti con React

# COMPONENTE Avatar
Propiedades ==> src, onChangeSrc, onMouseOver, stats.

Funcionalidades ==> Renderiza una imagen con un input que si recibe una imagen nueva la envia como parametro a la prop onChangeSrc.
La propiedad onMouseOver envia como parametro el booleano de si la imagen tiene el cursor o no sobre ella.
La propiedad stats recibira de App {overImage:boolean, wins, draws} y renderiza las wins y draws si el boolean es true.

# COMPONENTE Player
NUEVAS Propiedades ==> avatarSrc, onChangeAvatar, onMouseAvatar, playerStats.

Nuevas funcionalidades ==> Renderiza el componente Avatar modificando sus props: 
src={avatarSrc} => Le envia la src a App para actualizar la variable de estado.
onChangeSrc={handleChangeAvatar} => Modifica onChangeAvatar enviandole su symbol.
onMouseOver={handleShowStats}  => Modifica onMouseAvatar enviandole su symbol.
stats={playerStats} => le envia playerStats para que App le devuelva los valores de las stats y el boolean.

# COMPONENTE App
Nuevas funcionalidades ==> La constante PLAYERS ahora cuenta con {name, avatarSrc, overImage, wins, draws}.
La funcion deriveWinner ahora es deriveResult que retorna el winner y el loser: Esto es para poder setear las draws tambien.
La funcion handleRestart recibe result del componente GameOver y se encarga de setear las wins y draws en player.

Renderiza Player modificando las siguientes props:
onChangeAvatar={handleChangeAvatar} => Modifica el avatarSrc de la variable de estado players.
onMouseAvatar={handleOnMouseAvatar} => Modifica el overImage de la variable de estado players.
playerStats= Le envia overImage, wins, draws.

# COMPONENTE GameOver
Nuevas funcionalidades ==> Ahora recibe el winner y el loser.
La propiedad onRestart envia el winner y el loser para que lo use handleRestart en App.



