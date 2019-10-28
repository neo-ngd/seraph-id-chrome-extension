import { SeraphIDIssuer } from "@sbc/seraph-id-sdk";
import {
  GOVERNMENT_SCRIPT_HASH,
  NEO_RPC_URL,
  NEOSCAN_URL,
  GOVERNMENT_ISSUER_PRIVATE_KEY,
  DID_NETWORK,
  PASSPORT_SCHEMA_NAME,
  AGENCY_SCRIPT_HASH,
  AGENCY_ISSUER_PRIVATE_KEY,
  ACCESS_KEY_SCHEMA_NAME
} from "./config";
import { v4 as uuid } from "uuid";

const schemaPassport = [
  "idNumber",
  "firstName",
  "secondName",
  "birthDate",
  "citizenship",
  "address"
];

const schemaKey = ["idNumber"];

export const createClaim = async (type, values, address) => {
  if (type === "passport") {
    const claim = await createSpecificClaim(
      GOVERNMENT_SCRIPT_HASH,
      PASSPORT_SCHEMA_NAME,
      GOVERNMENT_ISSUER_PRIVATE_KEY,
      schemaPassport,
      values,
      address
    );
    return claim;
  }
  const claim = await createSpecificClaim(
    AGENCY_SCRIPT_HASH,
    ACCESS_KEY_SCHEMA_NAME,
    AGENCY_ISSUER_PRIVATE_KEY,
    schemaKey,
    values,
    address
  );
  return claim;
};

export const createSpecificClaim = async (
  scriptHash,
  schemaName,
  issuerKeys,
  schema,
  values,
  address
) => {
  const issuer = new SeraphIDIssuer(
    scriptHash,
    NEO_RPC_URL,
    NEOSCAN_URL,
    DID_NETWORK
  );
  issuer
    .registerNewSchema(schemaName, schema, true, issuerKeys)
    .then(r => {
      console.log(r);
    })
    .catch(err => console.error("registerNewSchema ERR: ", err));

  const claim = issuer.createClaim(
    uuid(),
    schemaName,
    values,
    `did:neoid:priv:${address}`
  );
  issuer
    .issueClaim(claim, issuerKeys)
    .then(r => console.log("res", r))
    .catch(e => console.log("err", e));

  return claim;
};
