export function findToggledElement<T extends string | number>(a: T[], b: T[]): T {
    if (Math.abs(a.length - b.length) !== 1) {
        throw new Error("Invalid difference between arrays");
    }
    const [smaller, larger] = a.length < b.length ? [a, b] : [b, a];
    const set = new Set(smaller);
    return larger.find(item => !set.has(item))!;
}