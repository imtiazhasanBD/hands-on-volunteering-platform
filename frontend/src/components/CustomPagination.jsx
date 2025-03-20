import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  const CustomPagination = ({ totalPages, filters, handlePageChange }) => {
    return (
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
              className={
                filters.page === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
  
          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={filters.page === page}
                className={
                  filters.page === page
                    ? "bg-violet-700 text-white hover:bg-violet-800"
                    : "hover:bg-gray-300"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(totalPages, filters.page + 1))
              }
              className={
                filters.page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default CustomPagination;