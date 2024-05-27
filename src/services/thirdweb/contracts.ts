import { env } from "@/env";
// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { tw_client } from "./client";

export const NETWORK = polygonAmoy;

// 2. The address of the marketplace V3 smart contract.
const MARKETPLACE_ADDRESS = env.NEXT_PUBLIC_MKT_CONTRACT;
export const MARKETPLACE = getContract({
	address: MARKETPLACE_ADDRESS,
	client: tw_client,
	chain: NETWORK,
});

// 3. The address of your NFT collection smart contract.
const NFT_COLLECTION_ADDRESS = env.NEXT_PUBLIC_NFT_CONTRACT;
export const NFT_COLLECTION = getContract({
	address: NFT_COLLECTION_ADDRESS,
	client: tw_client,
	chain: NETWORK,
});

// Set up the URL of where users can view transactions on
export const ETHERSCAN_URL = "https://amoy.polygonscan.com";
