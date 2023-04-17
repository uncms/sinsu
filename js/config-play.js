const PLAY_ADDRESS = "0x6Ae19472B53e9794a1971E0C47cC4E1c7CB55c3c";

const PLAY_ABI = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIDList",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "_direction",
        type: "uint256",
      },
    ],
    name: "batchDeploy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_direction",
        type: "uint256",
      },
    ],
    name: "deploy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_max",
        type: "uint256",
      },
    ],
    name: "setMaxDeploy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nft",
        type: "address",
      },
    ],
    name: "setNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setPlayEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
    ],
    name: "setPlayRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_status",
        type: "address",
      },
    ],
    name: "setStatusAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_direction",
        type: "uint256",
      },
    ],
    name: "setWinners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_direction",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
    ],
    name: "checkBeforeDeploy",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenID",
        type: "uint256",
      },
    ],
    name: "getDeployed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_direction",
        type: "uint256",
      },
    ],
    name: "getDeployedCount",
    outputs: [
      {
        internalType: "uint256[32]",
        name: "",
        type: "uint256[32]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_direction",
        type: "uint256",
      },
    ],
    name: "getDeployedStats",
    outputs: [
      {
        internalType: "uint256[128]",
        name: "",
        type: "uint256[128]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenID",
        type: "uint256",
      },
    ],
    name: "verifyWinner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
