import { useEffect, useRef } from "react";

const useInfiniteScroll = (nextUrl, isLoading, onLoadMore) => {
  const observerRef = useRef();
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (isLoading || !nextUrl) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextUrl) {
        onLoadMore();
      }
    });

    observerRef.current = observer;

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, nextUrl, onLoadMore]);

  return lastElementRef;
};

export default useInfiniteScroll;
