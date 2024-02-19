module.exports = {
  "importOrder": [
    "^@Pages/(.*)$",
    "^@Components/(.*)$",
    "^@Lib/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")]
}
