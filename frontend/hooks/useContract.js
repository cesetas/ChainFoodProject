import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { provider, signer } from "./useConnection";

const useContract = (contractAddress, abi) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    setContract(contract);
  }, []);

  return {
    contract,
  };
};

export default useContract;
