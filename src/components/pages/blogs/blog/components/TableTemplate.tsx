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
    <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Section Header */}
      <div className="flex items-start mb-6 pb-6 border-b-2 border-gray-100">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
          📊
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
          {content.title}
        </h2>
      </div>

      {/* Top Description */}
      {content.topDescription && (
        <div className="mb-8">
          {content.topDescription.split("\n").map((paragraph, index) => (
            <p key={index}
              className="text-gray-700 leading-relaxed mb-4 text-base lg:text-lg"
              dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              {content.headers.map((header, index) => (
                <th key={index}
                  className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.rows.map(row => (
              <tr key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150">
                {row.columns.map((col, colIndex) => (
                  <td key={colIndex}
                    className="px-6 py-4 text-sm text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: col }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Description */}
      {content.bottomDescription && (
        <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg">
          {content.bottomDescription.split("\n").map((paragraph, index) => (
            <p key={index}
              className="text-gray-700 leading-relaxed text-base lg:text-lg"
              dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TableTemplate;