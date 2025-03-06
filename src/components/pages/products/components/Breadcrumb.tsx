import Image from "next/image";
import Link from "next/link";

interface IBreadcrumbProps {
  title: string;
  category: string;
}

const Breadcrumb = ({ title, category }: IBreadcrumbProps) => {
  return (
    <div className="text-[#999999] font-normal text-xs lg:text-sm">
      <Link href={"/products"} className=" inline-block">
        <span>製品</span>
      </Link>
      <Image
        className="inline-block mx-2"
        src={"/images/icons/right-arrow.svg"}
        width={16}
        height={16}
        alt="right arrow icon"
      />
      <Link href={`/products/${category}`}>
        <span>{category}</span>
      </Link>
      <Image
        className="inline-block mx-2"
        src={"/images/icons/right-arrow.svg"}
        width={16}
        height={16}
        alt="right arrow icon"
      />
      <span>{title}</span>
    </div>
  );
};

export default Breadcrumb;
