import { handleGetImage } from "@/services/handle-get-image/handle-get-image";

export default {
	async scheduled(
		controller: ScheduledController,
		env: CloudflareEnv,
		ctx: ExecutionContext,
	) {
		console.log("Running scheduled task...");
		await handleGetCronImage(env);
	},
};

async function handleGetCronImage(env: CloudflareEnv) {
	console.log("Running handle get image ...");
	await handleGetImage();
}
