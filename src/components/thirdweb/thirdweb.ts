"use client";

// Do not import the components/hooks directly from the `thirdweb` package in server components
// export them from here and import in server components so that they are tagged with "use client" directive

export { getContract, resolveMethod } from "thirdweb";
export { defineChain } from "thirdweb/chains";
export {
	ConnectButton,
	MediaRenderer,
	ThirdwebProvider,
	useReadContract,
} from "thirdweb/react";
export { download, upload } from "thirdweb/storage";
