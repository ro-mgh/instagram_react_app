import React from "react";
import Gallery from "./Gallery";
import { useDispatch } from "react-redux";
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
  } = useInfiniteQuery("explorePosts", fetchNotFollowingPosts, {
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

  if (!data) {
    console.log(useInfiniteQuery);
  }

  return (
    <div className="explore-posts-wrapper">
      <p className="explore-users-text">Explore</p>
      {status !== "loading" ? (
        data ? (
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
        ) : null
      ) : (
        <div className="mainfield-progress-wrapper">
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  );
};

export default ExplorePosts;
