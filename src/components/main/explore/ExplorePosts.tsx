import React, { useEffect } from "react";
import Gallery from "./Gallery";
// import { explorePosts } from "../../../store/actions/exploreUsers";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchNotFollowingPosts } from "../../../utils/fetchingData";
import { SET_ERROR } from "../../../store/actions/actionTypes";

const ExplorePosts = () => {
  const dispatch = useDispatch();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("projects", fetchNotFollowingPosts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  if (error) {
    dispatch({
      type: SET_ERROR,
      payload: { error: error.message },
    });
  }

  return (
    <div className="explore-posts-wrapper">
      <p className="explore-users-text">Explore</p>
      {status !== "loading" ? (
        <InfiniteScroll
          dataLength={data.pages.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="mainfield-progress-wrapper">
              <CircularProgress size={20} />
            </div>
          }
        >
          {data.pages.map((page, i) => {
            return <Gallery {...{ posts: page.data }} key={i} />;
          })}
        </InfiniteScroll>
      ) : (
        // <div>
        //   {data.pages.map((page, i) => {
        //     return <Gallery {...{ posts: page.data }} key={i} />;
        //   })}
        //   <div>

        //     <button
        //       onClick={() => fetchNextPage()}
        //       // disabled={!hasNextPage || isFetchingNextPage}
        //     >
        //       {isFetchingNextPage
        //         ? "Loading more..."
        //         : hasNextPage
        //         ? "Load More"
        //         : "Nothing more to load"}
        //     </button>
        //   </div>
        //   <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        // </div>
        <div className="mainfield-progress-wrapper">
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  );
};

export default ExplorePosts;
