import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Paginate from "../../Components/ui/Paginate";
import { useMediaQuery } from "react-responsive";
import Fade from "../../Components/ui/Fade";

export default function History() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLow = useMediaQuery({ maxHeight: 800 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? (isLow ? 9 : 10) : 8;
  const { user } = useOutletContext();
  const transactions = user?.transactions || [];
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  
  useEffect(() => {
    if (transactions.length > 0) {
      setCurrentPage(totalPages);
    }
  }, [transactions, totalPages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={`font-mont max-lg:p-4 w-full flex flex-col items-center justify-center bg-gray-100 ${transactions.length === 0 ? 'h-full' : ''}`}>
      <div className="w-full">
        {transactions.length === 0 ? (
          <div className="text-center text-2xl font-medium py-6">
            Belum ada transaksi
          </div>
        ) : (
          <div className="bg-white divide-y divide-gray-400 shadow">
            {currentItems.map((trx) => (
              <Fade key={trx.id}>
                <div className="flex justify-between items-center py-1.5 px-4">
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <div className="text-[17px] lg:text-[19px] font-semibold text-orange-600">
                        Rp. {trx.amount?.toLocaleString('id-ID')}
                      </div>
                      <div className="max-lg:text-[14px] font-medium border border-gray-500 px-1 rounded">
                        - {trx.discount?.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div>
                      {new Date(trx.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "Asia/Jakarta"
                      })}{" "}
                      {new Date(trx.created_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Jakarta"
                      })}
                    </div>
                  </div>
                  <div className="text-[17px] lg:text-xl font-medium max-lg:truncate max-lg:max-w-[150px]">{trx.merchant.nama}</div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </div>


      {transactions.length > 0 && (
        <div className="w-full absolute max-lg:bottom-10 lg:bottom-12 right-6 ">
          <Fade>
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Fade>
        </div>
      )}

    </div>
  );
}