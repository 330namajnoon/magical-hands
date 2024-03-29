
export const dateToString = (date: Date): string => {
    const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const y = date.getFullYear();

    return `${y}-${m}-${d}`;
}