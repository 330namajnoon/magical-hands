export default function parseint(str: string): number {
    let res = str.match(/\d+/);
    if (res && typeof res[0] === "string")
        return parseInt(res[0]);
    return 0;
}