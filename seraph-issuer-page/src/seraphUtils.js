import { SeraphIDIssuer } from "@sbc/seraph-id-sdk";
import {
  GOVERNMENT_SCRIPT_HASH,
  NEO_RPC_URL,
  NEOSCAN_URL,
  GOVERNMENT_ISSUER_PRIVATE_KEY,
  DID_NETWORK,
  PASSPORT_SCHEMA_NAME
} from "./config";
import { v4 as uuid } from 'uuid';

export const createClaim = async (values, address) => {
  const issuer = new SeraphIDIssuer(
    GOVERNMENT_SCRIPT_HASH,
    NEO_RPC_URL,
    NEOSCAN_URL,
    DID_NETWORK
  );

  issuer
    .registerNewSchema(
      PASSPORT_SCHEMA_NAME,
      [
        "idNumber",
        "firstName",
        "secondName",
        "birthDate",
        "gender",
        "citizenship",
        "address"
      ],
      true,
      GOVERNMENT_ISSUER_PRIVATE_KEY
    )
    .then(r => {
      console.log(r);
    })
    .catch(err => console.error("registerNewSchema ERR: ", err));

  const claim = issuer.createClaim(
    uuid(),
    PASSPORT_SCHEMA_NAME,
    values,
    `did:neoid:priv:${address}`
  );
  issuer
    .issueClaim(claim, GOVERNMENT_ISSUER_PRIVATE_KEY)
    .then(r => console.log("res", r))
    .catch(e => console.log("err", e));

  return claim;
};
