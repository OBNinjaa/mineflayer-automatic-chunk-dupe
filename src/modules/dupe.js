const mineflayer = require("mineflayer");
const { Vec3 } = require("vec3");
const colors = require("colors");

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.on("spawn", async () => {
    const bookID = bot.registry.itemsByName["written_book"].id;

    async function spreadBooks() {
      // The X, Y, and Z coordinates of the chest that contains x16 & x11 written books
      const chestPos = new Vec3(893, 4, 2094);
      const chest = await bot.openContainer(bot.blockAt(chestPos));
      await chest.withdraw(bookID, 0, 16);
      await chest.withdraw(bookID, 0, 11);

      bot.simpleClick.leftMouse(28);
      for (let i = 0; i < 20 - 1; i++) {
        await bot.simpleClick.rightMouse(i);
      }

      bot.simpleClick.rightMouse(11);
      bot.simpleClick.leftMouse(27);
      for (let i = 11; i < 28 - 1; i++) {
        await bot.simpleClick.rightMouse(i);
      }

      chest.close();
      console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Books have been spread`.white}`, colors.yellow(`(1/3)`));
    }

    await spreadBooks();

    // The X, Y, and Z coordinates of the repeaters which we destroy so that the items can leave the chunk
    const blocks = [
      [891, 4, 2094],
      [890, 4, 2094],
    ];

    async function breakRedstone(block) {
      bot.dig(block, "ignore").catch((e) => {
        return;
      });
    }

    blocks.forEach((coords) => {
      const repeater = bot.blockAt(new Vec3(...coords));
      breakRedstone(repeater);
    });

    console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Repeaters have been broken`.white}`, colors.yellow(`(2/3)`));
    console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Waiting for the items to leave the chunk`.grey}`, colors.yellow(`(40 seconds)`));
  });

  setTimeout(() => {
    console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Items from the chests have been removed`.white}`, colors.yellow(`leaving... (3/3)\n`));
    bot.quit();
  }, 40 * 1000);
};
