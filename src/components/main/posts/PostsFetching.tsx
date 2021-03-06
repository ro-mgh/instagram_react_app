import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import Post from "./post/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchPosts } from "../../../utils/fetchingData";
import { SET_ERROR } from "../../../store/actions/actionTypes";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

//unknown posts for explore page
const PostsFetching: FunctionComponent = () => {
  const dispatch = useDispatch();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,

    status,
  } = useInfiniteQuery("mainPosts", fetchPosts, {
    getNextPageParam: (lastPage) => {
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
    <div className="posts-wrapper">
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
