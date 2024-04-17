// .lintstagedrc.js
// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

const path = require("path")

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`

module.exports = {
  "*.{js,jsx,ts,tsx}": () => "bun run typecheck",
  "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": () => "biome check --apply --no-errors-on-unmatched",
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
}
