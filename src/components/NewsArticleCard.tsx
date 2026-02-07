import Image from "next/image";
import Link from "next/link";

interface NewsArticleCardProps {
  imgSrc?: string;
  date: string;
  newsHeader: string;
}

const NewsArticleCard: React.FC<NewsArticleCardProps> = ({ imgSrc, date, newsHeader }) => {
    // [FUNCTION] Generate slug based on news header
    const generateSlug = (text: string) => {
        return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    };
    
    return (
        <div className="flex rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Image */}
            <div className="flex-1 relative">
                <Image
                src={imgSrc || "/placeholder.jpg"}
                alt={newsHeader}
                fill
                className="text-xs font-minor text-center flex justify-center items-center px-4 text-[#4D4D4D]bg-black/10 object-cover"
                priority
                />
            </div>

            {/* Content */}
            <div className="flex-1 py-4 px-6 flex flex-col justify-between">
                <div className="space-y-2">
                    <p className="text-xs font-minor text-[#4D4D4D]">{date}</p>
                    <h3 className="text-lg font-major font-bold">{newsHeader}</h3>
                </div>

                {/* Read More Button */}
                <Link href={`/news-announcements/news/${generateSlug(newsHeader)}`} className="text-xs font-minor font-semibold text-white tracking-wider mt-4 px-3 py-1 self-start bg-[var(--color-orange-dark)] border border-[var(--color-orange-dark)] rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--color-orange-dark)] hover:bg-white hover:border-[var(--color-orange-dark)]">
                Read More &nbsp;→
                </Link>
            </div>
        </div>
    );
};

export default NewsArticleCard;
