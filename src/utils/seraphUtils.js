var seraphId = require("@sbc/seraph-id-sdk");

export async function createWallet() {
  return await new seraphId.SeraphIDWallet({ name: "MyWallet" });
}
