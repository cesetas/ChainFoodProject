import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppContext from "../components/AppContext";
// import styles from "../styles/Home.module.css";
import Food from "../components/Food";
import CreateForm from "../components/CreateForm";
import { ethers } from "ethers";
import abiJSon from "../abi/ChainFood.json";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const initialvalues = {
  title: "",
  price: "",
  photo: "",
  likes: 0,
  dislikes: 0,
};
const initialAmount = "";
// const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractAddress = "0xbcD5ce1cCF6B1139bE5dbCfDaB15908Cd57B5D32";

const URL = "https://chainfood.vercel.app/";
// const URL = "http://localhost:3000/";

export default function Home({ data }) {
  const [apiData, setApiData] = useState([]);
  const [values, setValues] = useState(initialvalues);
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [token, setToken] = useState("");
  const [foodId, setFoodId] = useState("");
  const [isCreated, setIsCreated] = useState(true);
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sendAmount, setSendAmount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setApiData(data);
    setIsRefreshing(false);
  }, [data]);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  const postFood = async () => {
    const newvalues = {
      owner,
      title,
      price,
      photo,
      token,
      foodId,
      likes: 0,
      dislikes: 0,
    };

    const res = await fetch(`${URL}api/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newvalues),
    });

    if (res.status < 300) {
      refreshData();
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, [10000]);
  };

  const createFood = async () => {
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

      const tx = await chainFoodContract.create(
        values.title,
        values.price,
        options
      );

      setTitle(values.title);
      setPhoto(values.photo);
      chainFoodContract.on("FoodCreated", async (id, owner, price, token) => {
        setOwner(owner);
        setPrice(price.toString());
        setToken(token.toString());
        setFoodId(id.toString());
        setIsCreated(false);
      });
      await tx.wait(2);
      setIsWaiting(false);
    } catch (error) {
      setErrorMessage(error.message.substring(108, 249));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, [10000]);
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    if (!isCreated) {
      postFood();
    }
  }, [foodId]);

  return (
    <>
      <Head>
        <title>Chain Food</title>
        <meta name="description" content="Generated by setas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" className="rounded-xl " />
      </Head>
      {isSubmitting ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">New food was added succesfully</Alert>
        </Stack>
      ) : (
        <div></div>
      )}
      {isDeleted ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Post deleted</Alert>
        </Stack>
      ) : (
        <div></div>
      )}
      {isError && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      )}
      <div className="">
        {apiData ? (
          <div className="flex justify-center justify-items-center content-center items-center h-400 flex-wrap ">
            {apiData.map((item) => (
              <div
                key={item._id}
                className="mt-4 justify-center basis-1/1 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 "
              >
                <Food
                  id={item.foodId}
                  pageId={item._id}
                  title={item.title}
                  price={item.price}
                  token={item.token}
                  owner={item.owner}
                  photo={item.photo}
                  frontLikes={item.likes}
                  frontDislikes={item.dislikes}
                  sendAmount={sendAmount}
                  setSendAmount={setSendAmount}
                  initialAmount={initialAmount}
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                  setErrorMessage={setErrorMessage}
                  setIsError={setIsError}
                  setIsWaiting={setIsWaiting}
                  isWaiting={isWaiting}
                />
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {isRefreshing ? (
          <div className="text-xl md:text-2xl  xl:text-3xl flex justify-center content-center items-center bg-cyan-100 rounded-xl h-full font-bold text-cyan-900 border border-blue-200 p-3 ">
            New food is adding
          </div>
        ) : (
          <div></div>
        )}

        <div className="bg-white sticky bottom-20 md:sticky md:bottom-0 flex flex-col justify-start p-4 my-8 mb-4 h-80 border-2 rounded-xl ">
          {isError && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
          )}
          <CreateForm
            values={values}
            setValues={setValues}
            initialvalues={initialvalues}
            isCreated={isCreated}
            createFood={createFood}
            price={price}
            owner={owner}
            foodId={foodId}
            token={token}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${URL}api/posts`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: data };
}
