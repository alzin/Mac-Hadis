import Card from "./Card";

interface ICardsProps {
  kinds: string[];
  merit: string[];
  tips: string[];
}

const Cards = ({ kinds, merit, tips }: ICardsProps) => {
  return (
    <section className="py-[50px] grid gap-6 px-4 md:px-8 lg:grid-cols-3 lg:px-[10%] mt-14">
      {/* Card 1: Kinds */}
      <Card title="種類" data={kinds} />

      {/* Card 2: Merit */}
      <Card title="メリット" data={merit} />

      {/* Card 3: Tips */}
      <Card title="選び方のポイント" data={tips} />
    </section>
  );
};

export default Cards;
