/**
 * Altera nome do usuário no header.
 * Não consegui pensar em um jeito mais "fancy" de fazer isso.
 * @param data HTML
 */
export function callbackLogin(data: any) {
    const spanLogin = document.getElementsByClassName("nav-link-login").item(0)?.firstElementChild?.getElementsByTagName("span")?.item(0);
    if (spanLogin)
        spanLogin.innerHTML = data;
}