import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abiJSon from "../abi/ChainFood.json";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractAddress = "0xbcD5ce1cCF6B1139bE5dbCfDaB15908Cd57B5D32";

//change URL according its use
const URL = "https://chainfood.vercel.app/";
// const URL = "http://localhost:3000/";

const Food = ({
  title,
  price,
  photo,
  pageId,
  id,
  token,
  frontLikes,
  frontDislikes,
  isDeleted,
  setIsDeleted,
  setErrorMessage,
  setIsError,
  setIsWaiting,
  isWaiting,
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [tokennn, setTokennn] = useState(token);
  const [isLikeStateChanged, setIsLikeStateChanged] = useState(false);
  const [isDislikeStateChanged, setIsDislikeStateChanged] = useState(false);
  const [mongoId, setMongoId] = useState("");
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState(undefined);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    connect();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    await setIsWaiting(true);
    console.log(event.target.id, event.target.name);
    await deletePost(event.target.id, event.target.name);
  };

  const handleOrder = async (event) => {
    event.preventDefault();
    await setIsWaiting(true);
    orderFood(event.target.id);
  };

  const handleLike = async (event) => {
    event.preventDefault();
    await setIsWaiting(true);
    setMongoId(event.target.name);
    likeFood(event.target.id, event.target.name);
  };

  const handleDislike = async (event) => {
    event.preventDefault();
    await setIsWaiting(true);
    setMongoId(event.target.name);
    dislikeFood(event.target.id, event.target.name);
  };

  const deletePost = async (postid, id) => {
    await connect();
    const chainFoodContract = new ethers.Contract(
      contractAddress,
      abiJSon.abi,
      signer
    );
    let tx;
    try {
      tx = await chainFoodContract.deleteFood(postid);
      if (tx) {
        try {
          const res = await fetch(`${URL}api/posts/${id}`, {
            method: "Delete",
          });
          if (res.status < 300) {
            refreshData();
            setIsDeleted(true);
            setTimeout(() => {
              setIsDeleted(false);
            }, [10000]);
          }
          setIsWaiting(false);
        } catch (error) {
          console.log(error);
          setErrorMessage(error.message.substring(150, 249));
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, [10000]);
          setIsWaiting(false);
        }
      }
      await tx.wait(2);
      setIsWaiting(false);
    } catch (error) {
      console.log(error.message.substring(150, 249));
      setErrorMessage(error.message.substring(150, 249));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, [10000]);
      setIsWaiting(false);
    }

    chainFoodContract.on("Deleted", (postid) => {
      console.log("Deleted id :" + postid);
    });
    if (tx) {
      try {
        const res = await fetch(`${URL}api/posts/${id}`, {
          method: "Delete",
        });
        if (res.status < 300) {
          refreshData();
          setIsDeleted(true);
          setTimeout(() => {
            setIsDeleted(false);
          }, [10000]);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message.substring(150, 249));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, [10000]);
      }
    }
  };

  const orderFood = async (id) => {
    await connect();
    try {
      const chainFoodContract = new ethers.Contract(
        contractAddress,
        abiJSon.abi,
        signer
      );
      const foodPrice = await chainFoodContract.getPrice(id);
      const options = {
        value: foodPrice,
        gasLimit: 500000,
      };

      const tx = await chainFoodContract.orderFood(parseInt(id), options);

      chainFoodContract.on("Ordered", async (id, buyer, orderAmount, token) => {
        console.log(id, buyer, orderAmount);
        setTokennn(token.toString());
        const tokenAmount = await chainFoodContract.balanceOf(buyer);
        console.log(tokenAmount);
      });
      await tx.wait(2);
      setIsWaiting(false);
    } catch (error) {
      setErrorMessage(error.message.substring(150, 249));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, [10000]);
      setIsWaiting(false);
    }
  };

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
      setSigner(signer);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message.substring(0, 100));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, [10000]);
    }
  };

  const likeFood = async (id, mongoid) => {
    // setMongoId(mongoid);
    setIsLikeStateChanged(false);

    await connect();
    try {
      const chainFoodContract = new ethers.Contract(
        contractAddress,
        abiJSon.abi,
        signer
      );

      const options = {
        gasLimit: 500000,
      };
      const tx = await chainFoodContract.like(id, options);

      chainFoodContract.on("Liked", (id, likeAmount) => {
        console.log("id :" + id);
        setLikes(likeAmount);
        setIsLikeStateChanged(true);
      });
      await tx.wait(2);
      setIsWaiting(false);
    } catch (error) {
      setErrorMessage(error.message.substring(105, 249));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, [10000]);
      setIsWaiting(false);
    }
  };

  const dislikeFood = async (id, mongoid) => {
    setIsDislikeStateChanged(false);
    await connect();
    try {
      const chainFoodContract = new ethers.Contract(
        contractAddress,
        abiJSon.abi,
        signer
      );

      const options = {
        gasLimit: 500000,
      };
      const tx = await chainFoodContract.dislike(id, options);

      chainFoodContract.on("Disliked", (id, dislikeAmount) => {
        console.log("id :" + id);
        setDislikes(dislikeAmount);
        setIsDislikeStateChanged(true);
      });
      await tx.wait(2);
      setIsWaiting(false);
    } catch (error) {
      setErrorMessage(error.message.substring(105, 249));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, [10000]);
      setIsWaiting(false);
    }
  };

  const postFoodLikes = async () => {
    console.log("postlikes mongoId" + mongoId);
    const res = await fetch(`${URL}api/posts/${mongoId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes }),
    });
    setMongoId("");

    if (res.status < 300) {
      refreshData();
    }
  };

  const postFoodDislikes = async () => {
    console.log("postdislikes mongoId" + mongoId);
    const res = await fetch(`${URL}api/posts/${mongoId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dislikes: dislikes }),
    });
    setMongoId("");

    if (res.status < 300) {
      refreshData();
    }
  };

  useEffect(() => {
    if (isLikeStateChanged) {
      postFoodLikes();
      setIsLikeStateChanged(false);
    }
  }, [likes]);

  useEffect(() => {
    if (isDislikeStateChanged) {
      postFoodDislikes();
      setIsDislikeStateChanged(false);
    }
  }, [dislikes]);

  return (
    <>
      <div className="text-sm md:text-lg  xl:text-xl drop-shadow-2xl m-4 flex min-w-fit flex-col w-3/4 sm:w-2/3 md:w-2/4 lg:w-2/5 border-2 bg-cyan-100 border-blue-200 hover:scale-105 hover:ease-in hover:delay-200 rounded-xl p-2 my-2">
        <img
          src={photo ? photo : "/avatar.jpeg"}
          alt=""
          className="w-1/1 h-80 rounded-xl"
        />

        <div className="flex justify-between font-bold text-cyan-100 border border-blue-200 mt-1 rounded-lg px-2 bg-cyan-600">
          <h2>Meal Id:</h2>
          <h2>{id}</h2>
        </div>
        <div className="flex justify-between font-bold text-cyan-100 border border-blue-200 mt-1 rounded-lg px-2 bg-cyan-600">
          <h2>Meal Title:</h2>
          <h2>{title}</h2>
        </div>
        <div className="flex justify-between font-bold text-cyan-100 border border-blue-200 mt-1 rounded-lg px-2 bg-cyan-600">
          <h2>Meal Price:</h2>
          <h2>{price / 10 ** 18} ETH </h2>
        </div>

        <form action="">
          <div className="flex justify-between items-center font-bold text-cyan-100 border border-blue-200 mt-1 rounded-lg px-2 bg-cyan-600">
            <label className="w-full" htmlFor="">
              Token Amount :
            </label>

            <h2>{tokennn / 10 ** 18} CF</h2>
          </div>
          <button
            id={id}
            name={pageId}
            onClick={handleOrder}
            className="w-full p-2 bg-gradient-to-tr from-black to-cyan-600 text-white hover:bg-gradient-to-tl from-black to-cyan-600 hover:-translate-y-0.5 rounded-xl mt-2"
          >
            Order
          </button>
          <div className="flex justify-between">
            <button
              id={id}
              name={pageId}
              onClick={handleLike}
              className="flex justify-around w-1/2 text-sm mr-2 py-1 bg-gradient-to-tr from-black to-cyan-600 text-white hover:bg-gradient-to-tl from-black to-cyan-600 hover:-translate-y-0.5 rounded-lg mt-2"
            >
              <span className="text-white text-lg font-bold">
                <FaRegThumbsUp />
              </span>
              <span className="ml-2 text-white text-md font-bold">
                {frontLikes}
              </span>
            </button>

            <button
              id={id}
              name={pageId}
              onClick={handleDislike}
              className="flex  justify-around w-1/2 text-sm ml-2 py-1 bg-gradient-to-tr from-red-600 to-black text-white hover:bg-gradient-to-tl from-red-600 to-black hover:-translate-y-0.5 rounded-lg mt-2"
            >
              <span className="text-red-300 text-lg font-bold">
                <FaRegThumbsDown />
              </span>

              <span className="ml-2 text-red-300 text-md font-bold">
                {frontDislikes}
              </span>
            </button>

            <button
              id={id}
              name={pageId}
              onClick={handleDelete}
              className="flex  justify-around w-1/2 text-sm ml-2 py-1 bg-gradient-to-tl from-red-800 to-black text-white hover:bg-gradient-to-tl from-red-800 to-black hover:-translate-y-0.5 rounded-lg mt-2"
            >
              <span className="text-red-300 text-lg font-bold">
                <AiTwotoneDelete />
              </span>
            </button>
          </div>
        </form>
      </div>
      {isLikeStateChanged ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">You liked/disliked succesfully</Alert>
        </Stack>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Food;
