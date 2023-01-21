import { ethers } from "ethers";
import { useState } from "react";

const useConnection = () => {
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState("");

  const connect = async () => {
    if (!window.ethereum) {
      alert("install metamask");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setSigner(signer);
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    connect,
    provider,
    signer,
    address,
  };
};

export default useConnection;
