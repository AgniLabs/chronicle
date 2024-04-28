"use client";

import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";

export const wallets = [
	createWallet("io.metamask"),
	createWallet("com.coinbase.wallet"),
	walletConnect(),
	inAppWallet({
		auth: {
			options: ["email", "google", "apple", "facebook"],
		},
	}),
	createWallet("me.rainbow"),
];
