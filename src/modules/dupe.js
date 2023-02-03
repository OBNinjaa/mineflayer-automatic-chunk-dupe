const mineflayer = require("mineflayer");
const { Vec3 } = require("vec3");
const colors = require("colors");

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  bot.on("spawn", async () => {
    async function spreadBooks() {
      const chestPos = new Vec3(-208, 4, 55);
      const chest = await bot.openContainer(bot.blockAt(chestPos));
      await chest.withdraw(387, 0, 16);
      await chest.withdraw(387, 0, 11);

      bot.simpleClick.leftMouse(28);
      for (let i = 0; i < 20 - 1; i++) {
        await bot.simpleClick.rightMouse(i);
      }
      bot.simpleClick.rightMouse(11);
      bot.simpleClick.leftMouse(27);
      for (let i = 11; i < 27 - 1; i++) {
        await bot.simpleClick.rightMouse(i);
      }
      bot.simpleClick.rightMouse(26);
      chest.close();
      console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Books have been spread`.white}`, colors.yellow(`(1/3)`));
    }

    await spreadBooks();

    class block {
      constructor(x, y, z) {
        this.locationX = x;
        this.locationY = y;
        this.locationZ = z;
      }
    }

    const blocks = [
      new block(-210, 4, 55),
      new block(-211, 4, 55),
      new block(-212, 4, 55),
      // The coordinates of the repeaters which we destroy so that the items can leave the chunk
    ];

    function breakRedstone(x, y, z) {
      bot._client.write("block_dig", {
        status: 0,
        location: {
          x: x,
          y: y,
          z: z,
        },
        face: 1,
      });
    }

    blocks.forEach((block) => {
      breakRedstone(block.locationX, block.locationY, block.locationZ);
    });

    console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Repeaters have been broken`.white}`, colors.yellow(`(2/3)`));
    console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Waiting for the items to leave the chunk`.grey}`, colors.yellow(`(40 seconds)`));
  });

  setTimeout(() => {
    console.log(`[${new Date().toLocaleTimeString().cyan}] ${`Items from the chests have been removed`.white}`, colors.yellow(`leaving... (3/3)\n`));
    bot.quit();
  }, 40 * 1000);
};
