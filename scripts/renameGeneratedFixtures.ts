import { readdirSync, readFileSync, renameSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("__tests__/fixtures_generated");

function parseComboComment(firstLine: string): string | null {
	// 期望格式：// 组合：a + b + c
	const m = firstLine.match(/^\s*\/\/\s*组合：\s*(.+?)\s*$/);
	return m?.[1] ?? null;
}

function slugifyCombo(combo: string): string {
	// 用 '+' 分割，生成可读的 kebab-case。
	const parts = combo
		.split("+")
		.map((s) => s.trim())
		.filter(Boolean);

	const raw = parts.join("-");
	const slug = raw
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[\/_]+/g, "-")
		.replace(/[^a-z0-9-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 120);

	return slug || "fixture";
}

function getIdFromFilename(file: string): string | null {
	const m = file.match(/^complex-(\d+)\.ts$/);
	return m?.[1] ?? null;
}

function main() {
	const files = readdirSync(ROOT).filter((f) => f.endsWith(".ts"));
	const used = new Set(files);

	const planned: Array<{ from: string; to: string }> = [];

	for (const file of files) {
		const id = getIdFromFilename(file);
		if (!id) continue;

		const abs = path.join(ROOT, file);
		const firstLine = readFileSync(abs, "utf8").split(/\r?\n/)[0] ?? "";
		const combo = parseComboComment(firstLine);
		if (!combo) continue;

		const slug = slugifyCombo(combo);

		// 保留原编号，避免同组合重复时冲突。
		let target = `${slug}-${id}.ts`;
		if (used.has(target) && target !== file) {
			let n = 2;
			while (used.has(`${slug}-${id}-${n}.ts`)) n++;
			target = `${slug}-${id}-${n}.ts`;
		}

		if (target !== file) {
			planned.push({ from: file, to: target });
			used.delete(file);
			used.add(target);
		}
	}

	if (planned.length === 0) {
		console.log("No renames planned.");
		return;
	}

	planned.sort((a, b) => a.from.localeCompare(b.from));
	for (const { from, to } of planned) {
		renameSync(path.join(ROOT, from), path.join(ROOT, to));
	}

	console.log(`Renamed ${planned.length} files.`);
	for (const { from, to } of planned.slice(0, 30)) {
		console.log(`${from} -> ${to}`);
	}
	if (planned.length > 30) console.log(`...and ${planned.length - 30} more`);
}

main();

