import "../styles/globals.css";
import Layout from "../components/Layout";
import React, { useState } from "react";
import AppContext from "../components/AppContext";

export default function App({ Component, pageProps }) {
  // const [accountAddress, setAccountAddress] = useState("");
  // const [isConnected, setIsConnected] = useState(false);
  const [owner, setOwner] = useState("");
  const [foodId, setFoodId] = useState("");
  const [price, setPrice] = useState("");
  const [isCreated, setIsCreated] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <AppContext.Provider
      value={{
        owner,
        setOwner,
        foodId,
        setFoodId,
        price,
        setPrice,
        isCreated,
        setIsCreated,
        likes,
        setLikes,
        dislikes,
        setDislikes,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
