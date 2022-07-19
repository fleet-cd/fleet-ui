import { Version } from "../models/product.model";
import semverSort from "semver-sort"


export function getSortedVersions(vers?: { [v: string]: Version }): Version[] {
    if (!vers) {
        return []
    }
    const keys = Object.keys(vers)
    const sortedKeys = semverSort.desc(keys);
    const out = []
    for (const version of sortedKeys) {
        out.push(vers[version])
    }
    return out
}

export function semverSortVersions(vers?: Version[]): Version[] {
    if (!vers) {
        return []
    }
    const vMap: { [v: string]: Version } = {}
    for (const v of vers) {
        vMap[v.version] = v
    }
    return getSortedVersions(vMap)
}