// [IMPORT] Standard
import Image from "next/image";

interface NewsArticle {
	id: number;
	imgSrc?: string;
	date: string;
	newsHeader: string;
	content: string;
}

// Mock data (to be implemented /w Strapi)
const newsArticles: NewsArticle[] = [
	{
		id: 1,
		imgSrc: "",
		date: "02/01/2026",
		newsHeader: "WVSU-CICT Presents Tech Solutions at ICC 2025 in Taiwan",
		content: "Full content for ICC 2025 news goes here...",
	},
	{
		id: 2,
		imgSrc: "",
		date: "02/02/2026",
		newsHeader: "CICT Faculty Publishes AI Research Paper",
		content: "Full content for AI research news goes here...",
	},
	{
		id: 3,
		imgSrc: "",
		date: "02/03/2026",
		newsHeader: "New Student Projects Showcase 2026",
		content: "Full content for student projects news goes here...",
	},
];

// Utility to generate slug (same as in carousel)
const generateSlug = (text: string) =>
	text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

interface PageProps {
	params: { slug: string };
}

const NewsAnnouncements = ({ params }: PageProps) => {
	const { slug } = params;

	// Find news article that matches the slug
	const article = newsArticles.find(
		(a) => generateSlug(a.newsHeader) === slug
	);

	// If missing article, display placeholder content
	if (!article) {
		return <div>Article not found.</div>;
	}

	return (
		<div className="px-8 py-8">
			<h1 className="text-3xl font-bold mb-4">{article.newsHeader}</h1>
			<p className="text-sm text-gray-500 mb-6">{article.date}</p>
			{article.imgSrc ? (
				<Image
				src={article.imgSrc}
				alt={article.newsHeader}
				className="w-full max-w-xl mb-6 rounded-lg"
				/>
			) : null}
			<p className="text-base">{article.content}</p>
		</div>
	);
};

	export default NewsAnnouncements;
