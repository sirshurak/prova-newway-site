/**
 * Formatação em Real
 * @param n Número para formatar 
 */
export function formatarReal(n: number) {
    return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}