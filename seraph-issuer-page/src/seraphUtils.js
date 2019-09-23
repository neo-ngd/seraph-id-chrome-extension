import { SeraphIDIssuer } from "@sbc/seraph-id-sdk";
import { GOVERNMENT_SCRIPT_HASH, NEO_RPC_URL, NEOSCAN_URL } from "./config";

export const createClaim = () => {
  const address = window.seraphID.getAddress();
  const issuer = new SeraphIDIssuer(
    GOVERNMENT_SCRIPT_HASH,
    NEO_RPC_URL,
    NEOSCAN_URL
  );
  issuer.registerNewSchema("Passport", ["firstName", "lastName", "age"], true);
  var claim = issuer.createClaim(
    Math.floor(Math.random() * (10000 - 0) + 0),
    "Passport",
    { firstName: "John", lastName: "Doe", age: 26 },
    "did:neoid:priv:".concat(address)
  );
  return claim;
};
