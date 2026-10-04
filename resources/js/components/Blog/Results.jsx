import React, { useEffect, useState } from "react";
import FilterPagination from "../../Reutilizables/Pagination/FilterPagination";
import PostCard from "./PostCard";
import PostsRest from "../../actions/PostsRest";
import ArrayJoin from "../../Utils/ArrayJoin";

const postsRest = new PostsRest();

const Results = ({ filter }) => {
  const [results, setResults] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filter2search = [
      ['name', 'contains', filter.search],
      ['summary', 'contains', filter.search],
    ];
    if (filter.category) {
      filter2search.push([
        'category_id', '=', filter.category
      ]);
    }

    postsRest.paginate({
      filter: ArrayJoin(filter2search, 'and'),
      requireTotalCount: true,
      skip: 12 * (currentPage - 1),
      sort: [{ selector: 'post_date', desc: filter.sortOrder == 'desc' }],
      take: 12,
    })
      .then(({ status, data, totalCount }) => {
        if (status != 200) return;
        setPages(Math.ceil(totalCount / 12));
        setResults(data);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [filter, currentPage]);

  return (
    <>
      <section className="px-[5%] pt-0 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((item, index) => (
          <PostCard key={item.id || index} {...item} firstImage />
        ))}
      </section>

      {!loading && results.length === 0 && (
        <div className="text-center py-16 text-gray-500 font-dmsans text-lg">
          No se encontraron publicaciones que coincidan con la búsqueda.
        </div>
      )}

      <div className="p-[5%]">
        <FilterPagination pages={pages} current={currentPage} setCurrent={setCurrentPage} />
      </div>
    </>
  );
};

export default Results;