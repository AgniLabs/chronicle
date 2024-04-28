import { env } from "@/env";
import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = env.NEXT_PUBLIC_NI_NFT_CLIENT_ID;

if (!clientId) {
	throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
	clientId: clientId,
});
