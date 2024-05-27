"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "@/hooks/useRouter";
import { tw_client } from "@/services/thirdweb/client";
import { NFT_COLLECTION } from "@/services/thirdweb/contracts";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import type { NFT } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";
import type { DirectListing } from "thirdweb/extensions/marketplace";
import { MediaRenderer } from "thirdweb/react";

type Props = {
	tokenId: bigint;
	nft?: NFT;
	directListing?: DirectListing;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	auctionListing?: any;
	overrideOnclickBehavior?: (nft: NFT) => void;
};

export default function NFTComponent({
	tokenId,
	directListing,
	auctionListing,
	overrideOnclickBehavior,
	...props
}: Props) {
	const router = useRouter();
	const [nft, setNFT] = useState(props.nft);

	useEffect(() => {
		if (nft?.id !== tokenId) {
			getNFT({
				contract: NFT_COLLECTION,
				tokenId: tokenId,
				includeOwner: true,
			}).then((nft) => {
				setNFT(nft);
			});
		}
	}, [tokenId, nft?.id]);

	if (!nft) {
		return <LoadingNFTComponent />;
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg flex flex-col w-full h-[350px] bg-white/[.04] justify-stretch border overflow-hidden border-white/10 rounded-lg"
			onClick={
				overrideOnclickBehavior
					? // biome-ignore lint/style/noNonNullAssertion: <explanation>
						() => overrideOnclickBehavior(nft!)
					: () => {
							NProgress.start();
							router.push(
								`/token/${NFT_COLLECTION.address}/${tokenId.toString()}`,
							);
						}
			}
		>
			<div className="relative w-full h-64 bg-white/[.04] flex items-center justify-center overflow-hidden">
				{nft.metadata.image && (
					<MediaRenderer
						src={nft.metadata.image}
						client={tw_client}
						className="object-cover object-center h-full w-full"
					/>
				)}
			</div>
			<div className="flex items-center justify-between flex-1 w-full px-3">
				<div className="flex flex-col justify-center py-3">
					<p className="max-w-full overflow-hidden text-lg text-white break-words">
						{nft.metadata.name}
					</p>
					<p className="text-sm font-semibold text-white/60">
						#{nft.id.toString()}
					</p>
				</div>

				{(directListing || auctionListing) && (
					<div className="flex flex-col items-end justify-center">
						<p className="max-w-full mb-1 overflow-hidden font-medium break-words text-white/60">
							Price
						</p>
						<p className="max-w-full overflow-hidden text-white break-words">
							{directListing
								? `${directListing?.currencyValuePerToken.displayValue}${directListing?.currencyValuePerToken.symbol}`
								: `${auctionListing?.minimumBidCurrencyValue.displayValue}${auctionListing?.minimumBidCurrencyValue.symbol}`}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export function LoadingNFTComponent() {
	return (
		<div className="w-full h-[350px] rounded-lg">
			<Skeleton className="h-[250px] w-[250px]" />
		</div>
	);
}
