import React from "react";
import BaseButton from "../components/Buttons/BaseButton";
import { setWallet } from "../utils/storage";
import { createWallet } from "../utils/seraphUtils";

export default function CreateWallet() {
  async function createAndSetWallet() {
    setWallet(createWallet());
  }

  return (
    <BaseButton
      handleClick={createAndSetWallet}
      text={"Create a Wallet"}
      variant="contained"
    />
  );
}
