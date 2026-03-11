export function findToggledElement<T extends string | number>(a: T[], b: T[]): T {
    if (Math.abs(a.length - b.length) !== 1) {
        throw new Error("Invalid difference between arrays");
    }
    const [smaller, larger] = a.length < b.length ? [a, b] : [b, a];
    const set = new Set(smaller);
    return larger.find(item => !set.has(item))!;
}

export function isSubset<T extends string | number>(a: T[], b: T[]) {
    const sortedA = a.toSorted();
    const sortedB = b.toSorted();

    let i = 0;
    let j = 0;
    while (i < sortedA.length && j < sortedB.length) {
        if (sortedA[i] >= sortedB[j]) {
            j++;
            if (sortedA[i] === sortedB[j]) {
                i++;
            }
        }
        else {
            return false;
        }
    }
    return i === sortedA.length;
}

export function diff<T extends string | number>(a: T[], b: T[]) {
    const sortedA = a.toSorted();
    const sortedB = b.toSorted();
    const result: T[] = [];

    let i = 0;
    let j = 0;
    while (i < sortedA.length) {
        if (j >= sortedB.length || sortedA[i] < sortedB[j]) {
            result.push(sortedA[i]);
            i++;
        }
        else if (sortedA[i] === sortedB[j]) {
            i++;
            j++;
        }
        else {
            j++;
        }
    }
    return result;
}