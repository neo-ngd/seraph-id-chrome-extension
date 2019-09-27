import { SeraphIDIssuer } from "@sbc/seraph-id-sdk";
import {
  GOVERNMENT_SCRIPT_HASH,
  NEO_RPC_URL,
  NEOSCAN_URL,
  GOVERNMENT_ISSUER_PRIVATE_KEY
} from "./config";

export const createClaim = values => {
  const address = window.seraphID.getAddress();
  const issuer = new SeraphIDIssuer(
    GOVERNMENT_SCRIPT_HASH,
    NEO_RPC_URL,
    NEOSCAN_URL
  );
  issuer.registerNewSchema("Passport", ["firstName", "lastName", "age"], true);
  var claim = issuer.createClaim(
    "0e5edf34-0451-4eb5-9781-92a413fc6445",
    "Passport",
    values,
    "did:neoid:priv:".concat(address)
  );

  issuer
    .issueClaim(claim, GOVERNMENT_ISSUER_PRIVATE_KEY)
    .then(res => {
      return res;
    })
    .catch(e => e);
};
