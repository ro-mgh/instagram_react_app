import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "./post/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { fetchPosts } from "../../../utils/fetchingData";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const PostsFetching = () => {
  const dispatch = useDispatch();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("mainPosts", fetchPosts, {
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

  if (data) {
    console.log(data);
  }

  return (
    <div className="posts-wrapper">
      {/* {!isLoading ? (
        data ? (
          //   data.map((post) => {
          //     return <Post {...post} key={post.id} />;
          //   })
          <div>post</div>
        ) : null */}

      {status !== "loading" ? (
        data ? (
          <InfiniteScroll
            dataLength={data.pages ? data.pages.length : 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="mainfield-progress-wrapper">
                <CircularProgress size={20} />
              </div>
            }
          >
            {data.pages.map((page) => {
              return page.data.map((post) => {
                return <Post {...post} key={post.id} />;
              });
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

export default PostsFetching;
