const specsData = [
  { label: "買取日", value: "2024-10-19" },
  { label: "商品名", value: "高速旋盤" },
  { label: "メーカー名", value: "大和製作所" },
  { label: "型番", value: "DMSD型" },
  { label: "買取方法", value: "出張買取" },
  { label: "買取地域", value: "神奈川県" },
  {
    label: "買取金額",
    value: "お電話・LINE・メールで\nお気軽にお問い合わせください。",
  },
];

const SpecsTable = () => {
  return (
    <table className="w-full">
      <tbody>
        {specsData.map((spec, index) => (
          <tr key={index} className="border-b-[1px] border-[#C9C9C9]">
            <th className="w-[30%] text-[14px] p-4 text-left bg-[#E0E0E0]">
              {spec.label}
            </th>
            <td className="p-4 text-[14px]">
              {spec.value.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i !== spec.value.split("\n").length - 1 && <br />}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpecsTable;
