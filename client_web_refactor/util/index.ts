export function convertBr(text: string): string {
    return text.replace(new RegExp("\n", "gm"), "<br/>");
}
