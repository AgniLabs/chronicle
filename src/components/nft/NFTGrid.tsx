"use client";
import type { NFT as NFTType } from "thirdweb";
import type { DirectListing } from "thirdweb/extensions/marketplace";
import NFT, { LoadingNFTComponent } from "./NFT";

type Props = {
	nftData: {
		tokenId: bigint;
		nft?: NFTType;
		directListing?: DirectListing;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		auctionListing?: any;
	}[];
	overrideOnclickBehavior?: (nft: NFTType) => void;
	emptyText?: string;
};

export default function NFTGrid({
	nftData,
	overrideOnclickBehavior,
	emptyText = "No NFTs found for this collection.",
}: Props) {
	if (nftData && nftData.length > 0) {
		return (
			<div className="grid justify-start grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{nftData.map((nft) => (
					<NFT
						key={nft.tokenId}
						{...nft}
						overrideOnclickBehavior={overrideOnclickBehavior}
					/>
				))}
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-[500px]">
			<p className="max-w-lg text-lg font-semibold text-center text-white/60">
				{emptyText}
			</p>
		</div>
	);
}

export function NFTGridLoading() {
	return (
		<div
			className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			key={"NFTGridLoading"}
		>
			{[...Array(20)].map((n) => (
				<LoadingNFTComponent key={n} />
			))}
		</div>
	);
}
