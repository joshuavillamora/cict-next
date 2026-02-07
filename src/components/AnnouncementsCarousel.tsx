"use client";

// [IMPORT] Standard
import Image from "next/image";
import Link from "next/link";

// [IMPORT] Hooks
import { useState, useEffect } from "react";

interface NewsArticle {
	id: number;
	imgSrc?: string;
	date: string;
	newsHeader: string;
}

interface AnnouncementsCarouselProps {
	articles: NewsArticle[];
}

export const AnnouncementsCarousel: React.FC<AnnouncementsCarouselProps> = ({ articles }) => {
	// States
	const [activeIndex, setActiveIndex] = useState(0);

	// [FUNCTION] Generate slug based on news header
	const generateSlug = (text: string) => {
	return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
	};

	// [EFFECT] Auto-slide carousel
	useEffect(() => {
		if (!articles.length) return;

		const interval = setInterval(() => {
			setActiveIndex((prev) =>
			prev === articles.length - 1 ? 0 : prev + 1
			);
		}, 5000);

		return () => clearInterval(interval);
	}, [articles.length]);

	const goToIndex = (index: number) => { setActiveIndex(index); };

	return (
	<>
		<div className="relative w-full">
			<div
				className="flex transition-transform duration-500 ease-in-out space-x-10 py-4"
				style={{
				transform: `translateX(calc(50% - ${activeIndex * (240 + 40) + 120}px))`,
				}}>
				{articles.map((article, index) => {
				const daysAgo = Math.floor(
					(new Date().getTime() - new Date(article.date).getTime()) /
					(1000 * 60 * 60 * 24)
				);

				return (
					<div
					key={article.id}
					className={`flex-none w-60 transition-transform duration-500 ${
						index === activeIndex ? "scale-110" : "scale-100"
					}`}>
						<div className="p-4 bg-white rounded-lg space-y-2">
							<p className="text-end text-xs font-minor text-[#4D4D4D] mb-4">
							{daysAgo} days ago
							</p>

							{article.imgSrc ? (
							<Image
								src={article.imgSrc}
								alt={article.newsHeader}
								className="aspect-[16/9] rounded-lg"
								width={240}
								height={135}
							/>
							) : (
							<div className="aspect-[16/9] bg-gray-300 rounded-lg" />
							)}

							<h3
							className="text-xl text-black font-bold leading-6"
							style={{ minHeight: "4.5rem" }}
							>
								{article.newsHeader}
							</h3>

							<Link href={`/news-announcements/news/${generateSlug(article.newsHeader)}`} className="text-xs font-minor font-semibold text-white tracking-wider mt-4 px-3 py-1 self-start bg-[var(--color-orange-dark)] border border-[var(--color-orange-dark)] rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--color-orange-dark)] hover:bg-white hover:border-[var(--color-orange-dark)]">
								Read More &nbsp;→
							</Link>
						</div>
					</div>
				);
				})}
			</div>
		</div>

		{/* Carousel Page Indicator */}
		<div className="flex justify-center mt-6 space-x-2">
		{articles.map((_, index) => (
			<button
			key={index}
			onClick={() => goToIndex(index)}
			className={`w-3 h-3 rounded-full ${
				index === activeIndex
				? "bg-[var(--color-orange-dark)]"
				: "bg-gray-300"
			}`}
			/>
		))}
		</div>
	</>
	);
};
