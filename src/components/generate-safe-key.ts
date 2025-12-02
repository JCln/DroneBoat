// utils/generateSafeKey.ts

// Lightweight hash function (fast + deterministic + no external libs)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit int
    }
    return Math.abs(hash).toString(36); // base36 for shorter string
}

export function generateSafeKey(
    item: any,
    index: number,
    scope: string = 'cmp' // default scope prefix
): string {
    // Only pick stable identifiers if exist
    const rawString = JSON.stringify({
        scope,
        id: item?.id,
        key: item?.key,
        value: item?.value,
        field: item?.field,
        label: item?.label,
        name: item?.name,
        header: item?.header,
        title: item?.title,
        changeDate: item?.changeDate,
        changeDetail: item?.changeDetail,
        index,
    });
    /*
        // Just Do When absolutely need it. everytime rendering will make afew parts to not predictable for example 
        on group-select multi-options single click makes it just goes
     */
    // timestemp: Date.now(), 
    //
    // random: Math.random(),

    return `${scope}_${simpleHash(rawString)}`;
}
