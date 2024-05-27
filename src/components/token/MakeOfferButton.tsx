"use client";
import { MARKETPLACE } from "@/services/thirdweb/contracts";
import toastStyle from "@/util/toastConfig";
import { useState } from "react";
import toast from "react-hot-toast";
import {
	type DirectListing,
	type EnglishAuction,
	bidInAuction,
	makeOffer,
} from "thirdweb/extensions/marketplace";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

export default function MakeOfferButton({
	auctionListing,
	directListing,
}: {
	auctionListing?: EnglishAuction;
	directListing?: DirectListing;
}) {
	const account = useActiveAccount();
	const [bid, setBid] = useState("0");

	return (
		<div className="flex flex-col">
			<input
				className="block w-full px-4 py-3 mb-4 text-base bg-transparent border border-white rounded-lg box-shadow-md"
				type="number"
				step={0.000001}
				value={bid}
				onChange={(e) => setBid(e.target.value)}
			/>
			<TransactionButton
				disabled={
					account?.address === auctionListing?.creatorAddress ||
					account?.address === directListing?.creatorAddress ||
					(!directListing && !auctionListing)
				}
				transaction={() => {
					if (!account) throw new Error("No account");
					if (auctionListing) {
						return bidInAuction({
							contract: MARKETPLACE,
							auctionId: auctionListing.id,
							bidAmount: bid,
						});
						// biome-ignore lint/style/noUselessElse: <explanation>
					} else if (directListing) {
						return makeOffer({
							contract: MARKETPLACE,
							assetContractAddress: directListing.assetContractAddress,
							tokenId: directListing.tokenId,
							currencyContractAddress: directListing.currencyContractAddress,
							totalOffer: bid,
							offerExpiresAt: new Date(
								Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
							),
						});
						// biome-ignore lint/style/noUselessElse: <explanation>
					} else {
						throw new Error("No valid listing found for this NFT");
					}
				}}
				onTransactionSent={() => {
					toast.loading("Making offer...", {
						id: "buy",
						style: toastStyle,
						position: "bottom-center",
					});
				}}
				onError={(error) => {
					toast("Offer Failed!", {
						icon: "❌",
						id: "buy",
						style: toastStyle,
						position: "bottom-center",
					});
				}}
				onTransactionConfirmed={(txResult) => {
					toast("Offer Placed Successfully!", {
						icon: "🥳",
						id: "buy",
						style: toastStyle,
						position: "bottom-center",
					});
				}}
			>
				Make Offer
			</TransactionButton>
		</div>
	);
}
