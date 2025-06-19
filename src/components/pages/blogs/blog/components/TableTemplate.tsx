import React from "react";

interface TableContent {
  id: string;
  type: "table";
  title: string;
  topDescription: string;
  bottomDescription: string;
  headers: string[];
  rows: {
    id: string;
    columns: string[];
  }[];
}

interface ITableTemplate {
  content: TableContent;
}

const TableTemplate: React.FC<ITableTemplate> = ({ content }) => {
  return (
    <div className="border-t pt-5">
      <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">
        {content.title}
      </h2>

      {content.topDescription?.split("\n").map((item, index) => (
        <p
          key={index}
          className="font-normal text-base leading-8 my-5 text-black"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}

      <div className="overflow-x-auto my-10">
        <table className="w-full border border-black text-sm">
          <thead>
            <tr className="bg-white">
              {content.headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-black px-4 py-3 text-center text-base text-black"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.id}>
                {row.columns.map((col, i) => (
                  <td
                    key={i}
                    className="border border-black px-4 py-4 align-top text-left leading-relaxed font-normal text-black"
                    dangerouslySetInnerHTML={{ __html: col }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {content.bottomDescription?.split("\n").map((item, index) => (
        <p
          key={index}
          className="font-normal text-base leading-8 my-5 text-black"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </div>
  );
};

export default TableTemplate;
