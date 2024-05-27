import { siteConfig } from "@/config/site";
import { tw_client } from "@/services/thirdweb/client";
import { polygonAmoy } from "thirdweb/chains";
import { ConnectButton } from "../thirdweb";
import { wallets } from "./wallets";

export default function CustomConnectButton() {
	return (
		<ConnectButton
			client={tw_client}
			wallets={wallets}
			theme={"dark"}
			connectModal={{
				size: "wide",
				title: siteConfig.name,
			}}
			appMetadata={{
				name: siteConfig.name,
				url: siteConfig.url,
				description: siteConfig.description,
				logoUrl: siteConfig.logoUrl,
			}}
			chain={polygonAmoy}
		/>
	);
}
