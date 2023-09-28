# Réponses TP 5 Dev. Web:

**`Question 1.1 Donner la liste des en-têtes de la réponse HTTP du serveur.`**
```
Connection: keep-alive
Date: Fri, 22 Sep 2023 06:34:24 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

**`Question 1.2 Donner la liste des en-têtes qui ont changé depuis la version précédente.`**
```
Connection: keep-alive
Content-Length: 20
Content-Type: application/json
Date: Fri, 22 Sep 2023 06:42:37 GMT
Keep-Alive: timeout=5
```
On remarque que le type de contenu à changer et que la page s'affiche sous forme de fichier json.

**`Question 1.3 Que contient la réponse reçue par le client ?`**\
Le client ne reçoit rien car le serveur ne s'est pas démarré à cause d'une erreur.

**`Question 1.4 Quelle est l'erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d'erreur affiché.`**\
L'erreur affichée est une erreur code: `ENOENT`. Cela signifie que le fichier mis dans le `fs.readFile()` n'existe pas.
Après avoir renommé le fichier en `index.html`, il n'y a plus de problème.

**`Question 1.5 Donner le code de requestListener() modifié avec gestion d'erreur en async/await.`**
```js
async function requestListener(_request, response) {
	try {
		const contents = await fs.readFile("index.html", "utf8");
		response.setHeader("Content-Type", "text/html");
		response.writeHead(200);
		return response.end(contents);
	} catch(error) {
		console.error(error);
		response.writeHead(500);
		return response.end("<html><h1>Erreur 500<h1></html>");
	}
}
```

**`Question 1.6 Indiquer ce que cette commande a modifié dans votre projet.`**\
Cette commande a installé 2 packages `cross-env` et `nodemon`.
Le premier package permet une meilleure gestion des variables d'environnement sur Windows.
Le second, permet de relancer automatiquement le serveur quand les fichiers sont modifiés.

**`Question 1.7 Quelles sont les différences entre les scripts http-dev et http-prod ?`**\
Avec `http-dev`, le serveur se lance grâce au package `nodemon` ce qui fournit une actualisation à chaque modification.
Au contraire, le script `http-prod`, lance le serveur de façon classique, sans actualisation automatique. Cela permet la mise en service du serveur.

**`Question 1.8 Donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.`**\
http://localhost:8000/index.html : 200\
http://localhost:8000/random.html : 200\
http://localhost:8000/ : 404\
http://localhost:8000/dont-exist : 404

**`Question 2.1 Donner les URL des documentations de chacun des modules installés par la commande précédente.`**\
Express.js : https://expressjs.com/en/4x/api.html \
http-errors : https://www.npmjs.com/package/http-errors \
loglevel : https://www.npmjs.com/package/loglevel \
morgan : https://www.npmjs.com/package/morgan

**`Question 2.2 Vérifier que les trois routes fonctionnent.`**\
Les trois routes fonctionnent bien. 
Les routes `/` et `/index.html` affichent le contenu du fichier index.html et la route `/random/:nb` affiche `nb` nombres aléatoires.

**`Question 2.3 Lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?`**\
Réponses des routes / et /index.html :
```
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Connection: keep-alive
Content-Length: 903
Content-Type: text/html; charset=UTF-8
Date: Wed, 27 Sep 2023 21:32:34 GMT
Etag: W/"387-18abb821095"
Keep-Alive: timeout=5
Last-Modified: Fri, 22 Sep 2023 06:09:37 GMT
X-Powered-By: Express
```
Réponses de la route /random/nb
```
Connection: keep-alive
Content-Length: 45
Content-Type: text/html; charset=utf-8
Date: Wed, 27 Sep 2023 21:34:37 GMT
Etag: W/"2d-NMeuZ++D4kZduzsLPFvM8ZhsUN8"
Keep-Alive: timeout=5
X-Powered-By: Express
```
On peut remarquer l'apparition d'un `Etag` et de la mention `X-Powered-By: Express`.

**`Question 2.4 Quand l'événement listening est-il déclenché ?`**\
L'événement "listening" est déclenché lorsque le serveur Express.js écoute sur le port spécifié et est prêt à recevoir des requêtes HTTP.

**`Question 2.5 Indiquer quelle est l'option (activée par défaut) qui redirige / vers /index.html ?`**\
L'option est la propriété index.
```js
app.use(express.static("static", {index:false}));
```

**`Question 2.6 Visiter la page d'accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.`**\
Avec un simple Ctrl+R, on obtient un code HTTP 304 car la page n'a pas changé par rapport au cache.
Cependant, avec un Ctrl+Shift+R, le code HTTP 200 car cela rafraichit la page en ignorant le contenu du cache.

**`Question 2.7 Vérifier que l'affichage change bien entre le mode production et le mode development.`**\
L'affichage se fait bien différemment, en mode development, l'erreur est complètement affichée contrairement au mode production.
