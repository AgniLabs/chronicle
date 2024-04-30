import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/types/nav";
import Link from "next/link";

interface MainNavProps {
	items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
	return (
		<div className="flex gap-6 md:gap-10">
			<Link href="/" className="flex items-center space-x-2">
				<Icons.chronicleLogo className="h-6 w-6" />
				<span className="inline-block font-bold">{siteConfig.name}</span>
			</Link>
			{/* {items?.length ? (
				<nav className="flex gap-6">
					{items?.map(
						(item, index) =>
							item.href && (
								<Link
									key={item.href}
									href={item.href as Route}
									className={cn(
										"flex items-center text-sm font-medium text-muted-foreground",
										item.disabled && "cursor-not-allowed opacity-80",
									)}
								>
									{item.title}
								</Link>
							),
					)}
				</nav>
			) : null} */}
		</div>
	);
}
