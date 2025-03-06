import PurchaseCategoryCard from "./PurchaseCategoryCard";

interface ICategoryPurchaseResultsProps {
  categoryName: string;
}

const purchaseItems = [
  {
    title: "BIC TOOL★イオンシャワーブース★WX-700★  ★自動車板金 塗装",
    imageSrc: "/images/category/purchaseItems/item1.jpg",
  },
  {
    title: " BIC TOOL★イオンシャワーブース★WX-700★  ★自動車板金 塗装",
    imageSrc: "/images/category/purchaseItems/item2.jpg",
  },
  {
    title: " FuYo 芙蓉商事★サンドブラスト★SGW",
    imageSrc: "/images/category/purchaseItems/item3.jpg",
  },
  {
    title: "IYASAKA イヤサカ★CO_HCアナライザ★ALTAS-300★自動車 排気ガステスター",
    imageSrc: "/images/category/purchaseItems/item4.jpg",
  },
  {
    title:
      "IYASAKA イヤサカ★HESHBON ヘスボン★  ★ホイールバランサー★HW-103★24インチ対応",
    imageSrc: "/images/category/purchaseItems/item5.jpg",
  },
  {
    title:
      "KTC★チェスト&ローラーキャビネット★  ★SKX3206Y SKX3705Y★コーンウェルイエロー",
    imageSrc: "/images/category/purchaseItems/item6.jpg",
  },
  {
    title:
      "Snap-on スナップオン★工具箱 ツールキャビネット ロールキャブ★KRA4813D",
    imageSrc: "/images/category/purchaseItems/item7.jpg",
  },
  {
    title: "SPEEDY★キュアマックス★塗装乾燥機 ヒーター★N2C",
    imageSrc: "/images/category/purchaseItems/item8.jpg",
  },
  {
    title: "SUPER スーパーツール★ポータブル門型クレーン 伸縮式★PMC480BN",
    imageSrc: "/images/category/purchaseItems/item9.jpg",
  },
  {
    title: "YAMADA ヤマダ★オイルドレン★OD-700PG",
    imageSrc: "/images/category/purchaseItems/item10.jpg",
  },
  {
    title:
      "タイヤチェンジャー★ユーロスター★EU39NA★  ★TECO 36 S ti★サポートアーム付 UPH4(A28)★50Hz",
    imageSrc: "/images/category/purchaseItems/item11.jpg",
  },
  {
    title:
      "デンゲン★全自動フロンガス回収 再生 真空引き 充填装置★ ★エコマックス・ジュニアⅡ★CS-MRG-JrⅡ★取説 付属品付",
    imageSrc: "/images/category/purchaseItems/item12.jpg",
  },
  {
    title: "ヤシマ★スポット溶接機★YSI-24EZ-S★ ★バーコード対応★自動車板金",
    imageSrc: "/images/category/purchaseItems/item13.jpg",
  },
  {
    title: "岡常歯車製作所★オイルチェンジャー★AT-1",
    imageSrc: "/images/category/purchaseItems/item14.jpg",
  },
  {
    title: "ヤシマ★スポット溶接機★YSI-24EZ-S★バーコード対応★自動車板金",
    imageSrc: "/images/category/purchaseItems/item15.jpg",
  },
  {
    title: "不二製作所★ニューマブラスター★SFC-2★サンドブラスター",
    imageSrc: "/images/category/purchaseItems/item16.jpg",
  },
  {
    title:
      "長崎ジャッキ★エアーガレージジャッキ★手動 エア 兼用★NLA-1.8H★1.8トン",
    imageSrc: "/images/category/purchaseItems/item17.jpg",
  },
  {
    title:
      "長崎ジャッキ★ミッションリフト★ミッションジャッキ★ML-800★耐荷重450kg★自動車整備",
    imageSrc: "/images/category/purchaseItems/item18.jpg",
  },
  {
    title: "長崎ジャッキ★油圧プレス★HP300★15ton",
    imageSrc: "/images/category/purchaseItems/item19.jpg",
  },
  {
    title:
      "ALTIA アルティア★ホイールバランサー スマートロードX★NSR-X WS3251-4002★60Hz",
    imageSrc: "/images/category/purchaseItems/item20.jpg",
  },
  {
    title: "BANZAI バンザイ★ゲートリフト・スリムⅡ★GLY-40★  ★能力4t",
    imageSrc: "/images/category/purchaseItems/item21.jpg",
  },
  {
    title: "Bishamon ビシャモン スギヤス★門型 二柱リフト★  ★NSA30-N33H★3000kgs",
    imageSrc: "/images/category/purchaseItems/item22.jpg",
  },
  {
    title: "自動車板金★GLOBALJIG グローバルジグ★フレーム修正機 一式",
    imageSrc: "/images/category/purchaseItems/item23.jpg",
  },
  {
    title:
      "IYASAKA イヤサカ★HESHBON ヘスボン★  ★ダイモスタイヤチェンジャー★HJT-380★最大24インチ",
    imageSrc: "/images/category/purchaseItems/item24.jpg",
  },
  {
    title: "SUMOTO 洲本★高圧温水洗浄機★COMPACT BODY★COM-3",
    imageSrc: "/images/category/purchaseItems/item25.jpg",
  },
  {
    title: "フレーム修正機★タワー2基★オートポール★NAO-SU★自動車板金",
    imageSrc: "/images/category/purchaseItems/item26.jpg",
  },
  {
    title: "東亜工機★油圧プレス ショッププレス★15ton",
    imageSrc: "/images/category/purchaseItems/item27.jpg",
  },
  {
    title: "ARIMITSU 有光★温水洗浄機 HOT-CLEANER★AHC-3100 50Hz★洗浄ガン付",
    imageSrc: "/images/category/purchaseItems/item28.jpg",
  },
];

const CategoryPurchaseResults = ({
  categoryName,
}: ICategoryPurchaseResultsProps) => {
  return (
    <section className="relative py-[50px] md:py-[80px] lg:py-[120px] px-5 md:px-[50px] lg:px-[80px]">
      <h2 className="text-[30px] md:text-[50px] lg:text-[60px] leading-[45px] md:leading-[60px] lg:leading-[90px] font-black text-center font-noto bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent">
        {categoryName}
      </h2>
      <p className="mt-2 lg:mt-4 text-[20px] lg:text-[40px] leading-[30px] lg:leading-[60px] font-black text-center bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent">
        の買取実績
      </p>
      <div className="mt-[40px] md:mt-[45px] lg:mt-[50px] flex flex-wrap justify-between md:justify-center gap-[17px] lg:gap-8">
        {purchaseItems.map((item, index) => (
          <PurchaseCategoryCard
            key={index}
            title={item.title}
            image={item.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPurchaseResults;
