/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function InfiniteScroll({ children, fetchMore, hasNextPage }) {
  const loader = useRef(null);

  useEffect(() => {
    const element = loader.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchMore();
      }
    });
    if (element) observer.observe(element);

    return () => observer.unobserve(element);
  }, [fetchMore, hasNextPage]);
  return (
    <div>
      {children}
      <div ref={loader} className="h-2"></div>
    </div>
  );
}

export default InfiniteScroll;
