// Define a constante usuarioAutenticado, que verifica se há um token no localStorage
export const usuarioAutenticado = () => localStorage.getItem('usuario-gufos') !== null

// Define a constante parseJwtm
export const parseJwt = () => {
    // Define a variável base64, que recebe o payload do token
    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

    // Retorna o payload covertido de base64 para string e de string para JSON
    return JSON.parse(window.atob(base64))
}