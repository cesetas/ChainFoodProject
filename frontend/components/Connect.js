import React from "react";

const Connect = ({ accountAddress, isConnected, handleConnect }) => {
  const handleClick = () => {
    handleConnect();
  };

  return (
    <>
      {isConnected ? (
        <button>
          {accountAddress.substring(0, 6) +
            "..." +
            accountAddress.substring(36, 42)}
        </button>
      ) : (
        <button onClick={handleClick}>Connect</button>
      )}
    </>
  );
};

export default Connect;
