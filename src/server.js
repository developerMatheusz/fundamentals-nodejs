import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// 3 formas de enviar requisições para o back-end:
// Query parameters: URL Stateful => Filtro de buscas, paginação, não obrigatórios

// Router parameters: Identificação de recursos

// Request body: Envio de informações de um formulário

//Exemplo query parameter => http://localhost:3333/users?userId=1&name=Daniel

//Exemplo router parameter => http://localhost:3333/users/1

//Exemplo request body => Corpo da página

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.path.test(url);
    });

    if (route) {

        const routeParams = req.url.match(route.path);
        req.params = { ...routeParams.groups }

        return route.handler(req, res);
        
    }

    return res.writeHead(404).end();

});

server.listen(3333);
