import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Connect from "./Connect";

const Navbar = () => {
  const [accountAddress, setAccountAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccountAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("install metamask");
    }

    setIsConnected(!isConnected);
  };

  return (
    <>
      <div className="relative flex justify-between items-center bg-blue-900  shadow-2xl p-2 py-4">
        <div className="cursor-pointer hover:scale-110 text-lg text-white font-semibold ml-7">
          <Link href="/">CHAIN FOOD</Link>
        </div>
        <div className="hidden md:block">
          <ul className=" flex">
            <li className=" flex justify-center text-lg text-white ml-2 p-1.5 bg-blue-900 hover:bg-blue-600 hover:text-yellow-200 rounded-full ">
              <Link href="/">Home</Link>
            </li>
            <li className=" flex justify-center text-lg text-white ml-2 p-1.5 bg-blue-900 hover:bg-blue-600 hover:text-yellow-200 rounded-full ">
              <Link href="/about">About</Link>
            </li>

            <li className=" flex justify-center text-lg text-white ml-2 px-4 bg-blue-900 hover:bg-blue-600 hover:text-yellow-200 rounded-full ">
              <Connect
                accountAddress={accountAddress}
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                handleConnect={handleConnect}
              />
            </li>
          </ul>
        </div>
        {isMenuOpen ? (
          <div className="block md:hidden mr-4 text-white cursor-pointer">
            <MenuIcon
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
          </div>
        ) : (
          <>
            <div className="block md:hidden mr-4 text-white cursor-pointer">
              <MenuIcon
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              />
            </div>
            <div className="absolute top-14 p-2 right-0 w-160  bg-blue-900 z-30 block z-4 md:hidden rounded-sm">
              {/* <ConnectButton /> */}
              <li className="justify-center text-lg text-white shadow-2xl  mr-1 px-4 p-1 bg-blue-900 hover:bg-blue-600 hover:text-yellow-200 rounded-full  m-1 block z-4 md:hidden">
                <Connect
                  accountAddress={accountAddress}
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                  handleConnect={handleConnect}
                />
              </li>
              <li className="justify-center text-lg text-white shadow-2xl  mr-1 p-1 bg-blue-900 hover:bg-blue-600 hover:text-yellow-200 rounded-full  m-1 block z-4 md:hidden">
                <Link href="/">Home</Link>
              </li>
              <li className="justify-center text-lg text-white shadow-2xl  mr-1 p-1 bg-blue-900 hover:bg-blue-600 hover:text-yellow-200 rounded-full  m-1 block z-4 md:hidden">
                <Link href="/about">About</Link>
              </li>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
