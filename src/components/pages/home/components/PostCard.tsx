import Image from "next/image";
import Link from "next/link";

interface IPostCardProps {
  title: string;
  imageSrc: string;
  description: string;
  className?: string;
  date: string
}

const PostCard = ({
  title,
  imageSrc,
  description,
  date,
}: IPostCardProps) => {
  return (
    <Link href={`/blogs/${title}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{description}</p>

        {/* Read More Link */}
        <div className="mt-4 flex items-center text-red-600 font-semibold text-sm group-hover:gap-2 transition-all">
          <span>続きを読む</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
