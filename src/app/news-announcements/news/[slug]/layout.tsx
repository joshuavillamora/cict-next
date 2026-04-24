import type { Metadata } from "next";

interface NewsArticle {
    id: number;
    imgSrc?: string;
    date: string;
    newsHeader: string;
    content: string;
}

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

const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    
    const article = newsArticles.find(
        (a) => generateSlug(a.newsHeader) === slug
    );

    if (!article) {
        return {
            title: "Article Not Found | CICT",
            description: "The requested news article could not be found.",
        };
    }

    const metaDescription = article.content.substring(0, 160) + "...";

    return {
        title: `${article.newsHeader} | CICT`,
        description: metaDescription,
        alternates: {
            canonical: `/news/${slug}`, 
        },
        openGraph: {
            title: article.newsHeader,
            description: metaDescription,
            images: article.imgSrc ? [article.imgSrc] : [], 
        },
    };
}

export default function ArticleLayout({ children }: LayoutProps) {
    // This wraps the dynamic article page, applying the SEO generated above
    return <>{children}</>;
}