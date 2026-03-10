export function findToggledElement<T extends string | number>(a: T[], b: T[]): T {
    if (Math.abs(a.length - b.length) !== 1) {
        throw new Error("Invalid difference between arrays");
    }
    const [smaller, larger] = a.length < b.length ? [a, b] : [b, a];
    const set = new Set(smaller);
    return larger.find(item => !set.has(item))!;
}

export function isSubset<T>(a: T[], b: T[], comparator?: (a: T, b: T) => number) {
    const sortedA = [...a].sort(comparator);
    const sortedB = [...b].sort(comparator);

    let i = 0;
    let j = 0;
    while (i < sortedA.length && j < sortedB.length) {
        const comparison = comparator(a, b)
    }
}