# Chunk Duper

This bot automatically dupes items using the chunk dupe. Patched on most servers.

## Installation

```cmd
  npm install
  node .
```

- once you've installed the packages modify the src/modules/dupe.js file
- change lines 15 and 38 with your chest coordinates

## Example

```js
// Line 15 the chest position which contains the books
const chestPos = new Vec3(893, 4, 2094);

// Line 38 the coordinates of the repeaters that the bot will break allowing the items to leave the chunk
const blocks = [
  [891, 4, 2094],
  [890, 4, 2094],
];

```

![Logo](https://imgur.com/M2WAVRq.png)

## 🔗 Links

[![](https://dcbadge.vercel.app/api/server/NysD9gyx7R)](https://discord.gg/NysD9gyx7R)
