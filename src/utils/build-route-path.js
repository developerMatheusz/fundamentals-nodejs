//Regex é uma expressão regular
//Uma forma de encontrar textos em um formato específico dentro de textos maiores
export function buildRoutePath(path) {

    const routeParametersRegex = /:([a-zA-Z]+)/g;

    const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)");

    const pathRegex = new RegExp(`^${pathWithParams}`);

    return pathRegex;

}
