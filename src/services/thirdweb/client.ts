// import { env } from "@/env";
// import { createThirdwebClient } from "thirdweb";

// const clientId = env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
// const secretKey = env?.THIRDWEB_SECRET_KEY;

// if (!clientId) {
// 	throw new Error("Client ID not set");
// }

// export const tw_client = createThirdwebClient(
// 	secretKey ? { secretKey } : { clientId },
// );
import { env } from "@/env";
import { createThirdwebClient } from "thirdweb";

const clientId = env?.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = env?.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;

if (!clientId) {
	throw new Error("Client ID not set");
}

export const tw_client = createThirdwebClient(
	typeof window === "undefined" ? { secretKey } : { clientId },
);
