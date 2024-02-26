
export const setSearchQuerys = (key: string, value: string, currentQuerys: string) => {
    const searchParams = new URLSearchParams(currentQuerys);
    searchParams.set(key, value);
    return searchParams.toString();
}