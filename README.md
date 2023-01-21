# Chain Food
This project was prepared for Patika Paribu Hub Practicum

### Object
To design a dApp serving for food orders with help of the transactions taking place on blockchain
This project is for users who would like to post their food ads. andf for costumers who would like to order from these ads as well. There is a reward mechanism which supports the survival of the system. Users can get 10 CF token created for this project. Costumers who order from user's ad can get 0.01 CF token as well.  Costumers can like/dislike the add they order from in 10 days to be able to encourage users posting on the system to do their job better.

- [Demo video](https://www.loom.com/share/cde9f5c47b424c9a83551a45b9d71a53)
- [Testnet site](https://)

---

# How It Works

- This is a full-stack project with two backend structure. The frontend built with Next.js and the ChainFood contract was deployed on Hardhat node. Recorded values are kept with Nextjs api and MongoDB database.
- TaiwindcCSS, Material UI and React-icons were used in frontend development.


# Main Functions

## Create/post ad
<img src="/utils/webphotos/createform.png" width="800px" height="auto"/>
- With this three line form you can add your posts
- Firs give your title and then determine your price in Wei
- In order to post a picture a photo url shoul be provided
- After posting you can claim your 10 CF tokens.

  

## Delete ad
<img src="/utils/webphotos/deletebutton.png" width="800px" height="auto"/>
-Only owner of the ad can detete his/her ad
-If anyone ordered the ad before owner can not delete the food ad.
-After deletion post owner loose his/her 10 CF tokens claimed before.

## Order
<img src="/utils/webphotos/orderbutton.png" width="800px" height="auto"/>
- Anyone can order any food with sending its specified price to owner of the add.
- After giving order costumer going to have 0.01 CF token from the owner of add.

## Like/Dislike ad
<img src="/utils/webphotos/likebutton.png" width="800px" height="auto"/>
- After giving an order a costumer can like or dislike the ad.
- Like/dislike period is 10 days after giving order.
- A user have right to like and dislike as many as the number of orders he/she gave.
- Like and dislike numbers are important for encouraging the users to post new ads and the costumers to order the food.


---

# How to Build the Project

- Clone the repository.
- After, to install all necessary packages run;

```
yarn
```

- to start a local node;

```
yarn dev
```

<img src="/utils/webphotos/screenshot-wof.png" width="800px" height="auto"/>

- to deploy the smart contracts to the local node first create a .env.local file and put neccessary inputs.

- To setup database (mongoDB); Copy your url from mongoDB and paste it to .env.local file as;

```
CONNECTION_URL =
```

- Load your project in any UI provider. This project was loaded to vercel.com. To setup UI domain name; write your UI domain name preference into the .env.local file as shown;

```
NEXT_PUBLIC_DOMAIN_LOC = https://zknews-testnet.vercel.app/
```

- To deploy the contract on testnet;

```
yarn hardhat run scripts/deploy.js --network testnet
```

- Copy and write the deployed contract address to .env.local file.

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

