export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination mt-3'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link' style={currentPage === number ? { backgroundColor: "#d7d9d7" } : {}}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
