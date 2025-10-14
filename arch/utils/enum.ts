export type EnumLike = Record<string, string | number>

const enumLookupCache = new WeakMap<EnumLike, Map<number, string>>()

function buildEnumLookup(enumLike: EnumLike): Map<number, string> {
	const lookup = new Map<number, string>()
	for (const [key, value] of Object.entries(enumLike)) {
		if (typeof value !== 'string') {
			continue
		}
		const numericKey = Number(key)
		if (Number.isNaN(numericKey)) {
			continue
		}
		lookup.set(numericKey, value)
	}
	return lookup
}

function getEnumLookup(enumLike: EnumLike): Map<number, string> {
	let lookup = enumLookupCache.get(enumLike)
	if (!lookup) {
		lookup = buildEnumLookup(enumLike)
		enumLookupCache.set(enumLike, lookup)
	}
	return lookup
}

export function enumName(enumLike: EnumLike, value: number | null | undefined): string | null {
	if (value === null || value === undefined) {
		return null
	}
	return getEnumLookup(enumLike).get(value) ?? null
}

export function enumNameOrFallback(enumLike: EnumLike, value: number | null | undefined, fallback: string): string {
	return enumName(enumLike, value) ?? fallback
}

export function enumFlagNames(enumLike: EnumLike, mask: number): string[] {
	const names: string[] = []
	for (const [name, rawValue] of Object.entries(enumLike)) {
		if (typeof rawValue !== 'number') {
			continue
		}
		const value = rawValue >>> 0
		if (value === 0) {
			continue
		}
		if ((mask & value) === value) {
			names.push(name)
		}
	}
	return names
}

export function enumLookup(enumLike: EnumLike): ReadonlyMap<number, string> {
	return getEnumLookup(enumLike)
}
