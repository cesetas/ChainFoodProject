//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChainFood is ERC20{
    //admin of the contract will ve deployer
    address public admin;
//initially we deploy our contract with 1.000.000 CF tokens
//admin will have all the token
    constructor() ERC20("Chain Food", "CF") {
        _mint(msg.sender, 1000000*10**18);
        admin = msg.sender;
    }



    //Each ad post will have these struct properties
    struct Food{
        uint id;
        address owner;
        string title;
        uint price;
        bool isSold;
        uint32 like;
        uint32 dislike;
        uint token;
    }

    event FoodCreated (uint indexed id, address indexed owner, uint price, uint token);
    event Deleted(uint id);
    event Ordered(uint id, address indexed buyer, uint orderAmount, uint token);
    event Withdrawn(uint id, uint amount);
    event Liked(uint indexed id, uint32 likeAmount);
    event Disliked(uint indexed id, uint32 dislikeAmount);

    uint public id;
    Food[] public allfoods;

    mapping (uint => Food) public foods; //this keeps add properties according to its id
    mapping (uint => mapping(address => uint)) public orderTime; // order time of each consumer for a specific food 
    mapping (uint => mapping(address => bool)) public isOrdered; // order status of each consumer for a specific food 
    mapping (uint => mapping(address => uint)) public orderAmount; // order amount of each consumer for a specific food 
    mapping (uint => mapping(address => uint)) public likeAmount; // like amount of each consumer for a specific food 
    mapping (uint => mapping(address => uint)) public dislikeAmount; // dislike amount of each consumer for a specific food 
    mapping (address => uint) public adsNumber; // number of ads for a specific adress

    function create(string memory _title, uint _price) external{
        // each address is able to publish max 5 ads
        require(adsNumber[msg.sender]<=5,"Number of ads exceeded");
        id += 1;
        foods[id]=Food(id,msg.sender, _title, _price,false,0,0,10*10**18);
        allfoods.push( foods[id]);
        adsNumber[msg.sender] += 1;
        _transfer(admin,msg.sender, 10*10**18); // each creater of ad will get 10 CF token from admin

        emit FoodCreated(id,msg.sender,_price,10*10**18);
    }

    function deleteFood (uint _id) external{
        Food memory food = foods[_id];
        require(food.owner == msg.sender, "You are not owner"); // only owner of the post can delete
        require (!food.isSold, "Sold item cant be deleted"); // only inactive ad can be deleted
        _burn(msg.sender, food.token); // after deleting the post owner of post loose tokens
        delete foods[_id];
        adsNumber[msg.sender] -= 1; //after deleting the post owner gets right of posting one more food
        emit Deleted(_id);
    }

    function orderFood(uint _id) payable external{
        Food storage food = foods[_id];
        require(food.id == _id, "Not exists");
        require(msg.value==food.price, "payment is insufficient");//amount to be sent should be equal the food price
        (bool success, ) = food.owner.call{value: msg.value}("");
        require(success, "Payment failed");
        //check token amount
        // send 0
        if(food.token>0){
            food.token -= 10*10**15;
            _transfer(food.owner,msg.sender, 10*10**15); // after order spender get 0.01 CF token from owner of the post      
        }
        //if all tokens are spent then owner gain one more posting right
        if(food.token==0){
            adsNumber[food.owner] -= 1;
        }
        
        food.isSold=true;
        isOrdered[_id][msg.sender] =true; //to keep order status to be able to like and dislike
        orderTime[_id][msg.sender]=block.timestamp; // to keep order time to be able to like and dislike
        orderAmount[_id][msg.sender] +=1; // to keep order amount
        uint newOrderAmount = orderAmount[_id][msg.sender];

        emit Ordered(_id, msg.sender, newOrderAmount, food.token);
    }

    function like(uint _id) external{
        Food storage food = foods[_id];
        require(isOrdered[_id][msg.sender], "Should order before");//after getting order 
        require(orderTime[_id][msg.sender]+10 days > block.timestamp, "Evaluation process done"); //in 10 days post can be liked
        require(orderAmount[_id][msg.sender] > likeAmount[_id][msg.sender], "You liked it before"); // number of like cant exceed order amount of spender
        likeAmount[_id][msg.sender] +=1;
        food.like +=1;

        emit Liked(_id, food.like);
    }
    function dislike(uint _id) external{
        Food storage food = foods[_id];
        require(isOrdered[_id][msg.sender], "Should order before");
        require(orderTime[_id][msg.sender]+10 days >= block.timestamp, "Evaluation process done");
        require(orderAmount[_id][msg.sender] > dislikeAmount[_id][msg.sender], "You disliked it before");
        dislikeAmount[_id][msg.sender] +=1;
        food.dislike +=1;

        emit Disliked(_id, food.dislike);
    }

    function getLastGivenId() external view returns(uint){
        return id;
    }
function getFood(uint _id) external view returns(Food memory){
    Food memory food = foods[_id];
        return food;
    }
function getPrice(uint _id) external view returns(uint){
    Food memory food = foods[_id];
        return food.price;
    }

}









//https://i4.hurimg.com/i/hurriyet/75/750x422/5a26473a2269a20b8ce8a321.jpg