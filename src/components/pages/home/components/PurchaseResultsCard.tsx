interface IPurchaseResultsCard {
    data: {
        id: string,
        content: string,
        author: string,
        date: string
    }
}


const PurchaseResultsCard: React.FC<IPurchaseResultsCard> = ({ data }) => {
    return (
        <div className="p-6 bg-white rounded space-y-4">
            <p className="font-bold text-sm lg:text-base text-[#111111]" style={{ "lineHeight": "32px" }}>{data.content}</p>
            <div className="space-y-2 text-[#4F4537] font-normal flex flex-col">
                <span className="text-sm lg:text-base">{data.author}</span>
                <span className="text-xs lg:text-sm">{data.date}</span>
            </div>
        </div>
    )
};

export default PurchaseResultsCard;
