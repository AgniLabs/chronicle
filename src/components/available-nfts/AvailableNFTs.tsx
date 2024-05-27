export const dynamic = "force-dynamic";
export const revalidate = 0;
import { MARKETPLACE, NFT_COLLECTION } from "@/services/thirdweb/contracts";
import { Suspense } from "react";
import ListingGrid from "../listing-grid/ListingGrid";
import { NFTGridLoading } from "../nft/NFTGrid";

export const AvailableNFTs = async () => {
	return (
		<div className="">
			<h1 className="text-4xl">Buy previous NFTs</h1>

			<div className="my-8">
				<Suspense fallback={<NFTGridLoading />}>
					<ListingGrid
						marketplace={MARKETPLACE}
						collection={NFT_COLLECTION}
						emptyText={
							"Looks like there are no listed NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
						}
					/>
				</Suspense>
			</div>
		</div>
	);
};
