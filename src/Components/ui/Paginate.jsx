import { ChevronsLeftIcon, ChevronsRightIcon } from "@animateicons/react/lucide";

export default function Paginate({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  if (totalPages === 1) {
    pageNumbers.push(1);
  } else if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 4) {
      pageNumbers.push(1, 2, 3, 4, "...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // dekat akhir → 1 ... total-3 total-2 total-1 total
      pageNumbers.push(1, "...");
      pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // di tengah → 1 ... current-1 current current+1 ... total
      pageNumbers.push(1, "...");
      pageNumbers.push(currentPage - 1, currentPage);
      pageNumbers.push("...", totalPages);
    }
  }

  return (
    <div className="w-full pt-3 flex justify-end">
      <div className={`flex items-center justify-between ${totalPages > 5 ? 'w-72' : totalPages === 5 ? 'w-66' : totalPages === 4 ? '' :  totalPages > 1 ? `w-${totalPages * 16}` : 'hidden' } px-5 bg-white cursor-pointer shadow border border-gray-200 rounded-full gap-x-1`}>
        <button className="disabled:text-gray-400"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronsLeftIcon size={28} />
        </button>

        <div className="flex flex-1 text-lg font-medium text-center">
          {pageNumbers.map((num, idx) =>
            num === "..." ? (
              <div key={idx} className="w-5 py-1.5">...</div>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(num)}
                className={`w-8 py-2 lg:py-1.5 hover:bg-gray-100 ${
                  currentPage === num
                    ? "border border-orange-400 bg-gray-100 rounded-md"
                    : ""
                }`}
              >
                {num}
              </button>
            )
          )}
        </div>

        <button className="disabled:text-gray-400"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronsRightIcon size={28} />
        </button>
      </div>
    </div>
  );
}
