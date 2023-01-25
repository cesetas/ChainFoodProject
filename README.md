# Chain Food

This project was prepared for Patika Paribu Hub Practicum

### Object

To design a dApp serving for food orders with help of the transactions taking place on blockchain
This project is for the sellers who would like to post their food ads. and for the buyers who would like to order from these ads as well. There is a reward mechanism which supports the survival of the system. Sellers can get 10 CF token created for this project. Buyers who order from seller's ad can get 0.01 CF token as well. Buyers can like/dislike the add they order from in 10 days to be able to encourage sellers posting on the system to do their job better.

- [Demo video](https://www.loom.com/share/cde9f5c47b424c9a83551a45b9d71a53)
- [Testnet site](https://chainfood.vercel.app/)

---

# How It Works

- This is a full-stack project with two backend structure. The frontend built with Next.js and the ChainFood contract was deployed on Hardhat node. Recorded values are kept with Nextjs api in MongoDB database.
- TaiwindcCSS, Material UI and React-icons were used in frontend development.
  -Project is live at Polygon Mumbai testnet at the moment.

# Main Functions

## Create/post ad

<img src="/utils/webphotos/createform.png" width="800px" height="auto"/>
- With this three line form you can add your posts.
- First determine title and price in Wei.
- In order to post a photo an url shoul be provided.
- After posting the add 10 CF tokens will be obtained.

## Delete ad

<img src="/utils/webphotos/deletebutton.png" width="800px" height="auto"/>
-Only owner of the ad can detete his/her ad.
-Sold items can not be deleted.
-After deletion post owner loose his/her 10 CF tokens claimed before.

## Order

<img src="/utils/webphotos/orderbutton.png" width="800px" height="auto"/>
- Anyone can order any food with sending its specified price to the account of owner of the ad.
- After giving order buyer going to have 0.01 CF token from the account of owner of the ad.

## Like/Dislike ad

<img src="/utils/webphotos/likebutton.png" width="800px" height="auto"/>
- After giving an order a buyer can like or dislike the ad.
- Like/dislike period is 10 days after giving order.
- A user have right to like and dislike as many as the number of orders he/she gave.
- Like and dislike numbers are important for encouraging the sellers to post new ads and the buyers to order more food.

---

# How to Build the Project

- Clone the repository.
- After, to install all necessary packages run;

```
npm install
```

- to start app

```
npm run dev
```

<img src="/utils/webphotos/screenshot-wof.png" width="800px" height="auto"/>

- to deploy the smart contract to any testnet first create a .env file in the backend directory and put neccessary values inside.

example;

```
TEST_URL =
PRIVATE_KEY =

GOERLI_TEST_URL =
GOERLI_PRIVATE_KEY =
```

- To setup database (mongoDB); Copy your url from mongoDB and paste it to .env.local file as;

```
CONNECTION_URL =
```

- Load your project in any UI provider. This project was loaded to vercel.com. To setup UI domain name; write your UI domain name preference into the const value in "Food.js" file in components section and "index.js" file in pages section as shown;

```
const URL = https://chainfood.vercel.app/
```

- to deploy the smart contracts to the local node
- first start the hardhat local node;

```
npx hardhat node
```

- Then deploy the contract on localhost;

```
yarn hardhat run --network localhost scripts/deploy.js
```

- Copy and write the deployed contract address to the const value in "Food.js" file in components section and "index.js" file in pages section as shown;

```
const contractAddress = "0xbcD5ce1cCF6B1139bE5dbCfDaB15908Cd57B5D32";
```

- Import a few of the test accounts into Metamask for testing purposes.

<img src="/utils/webphotos/screenshot-wf.png" width="800px" height="auto"/>

---

# Project Resources

- [Patika.dev](https://www.patika.dev/tr)
- [Next.js](https://nextjs.org/docs/getting-started)
- [Ethersjs](https://docs.ethers.org/v5/)
- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.13/)
- [Remix](https://remix.ethereum.org/)
- [OpenZeppelin](https://docs.openzeppelin.com/)
- [Polygon Testnet Faucet](https://faucet.polygon.technology/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)
- [React Icons](https://react-icons.github.io/react-icons)
