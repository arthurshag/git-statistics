export function calcCountPages(countsElements: number, perPage: number, maximumElements?: number) {
    const countPages = Math.ceil(countsElements / perPage);
    if (maximumElements) {
        return Math.min(countPages, Math.ceil(maximumElements / perPage))
    }

    return countPages;
}
