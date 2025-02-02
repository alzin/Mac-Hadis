import Image from "next/image";

const PointerIcon = () => {
    return (
        <Image src={"/images/icons/poninter.svg"} className="absolute top-2 -right-2 z-10 hidden lg:block" alt="poninter" width={41} height={60} />
    )
};

export default PointerIcon;
