import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { IBaseProps } from "@/define/common";
import { getProjectStar } from "@/action-creator/github";
import { getAccessCount } from "@/action-creator/log/accessLog";
import { useStoreSelector } from "@/store";
import { SKY_BLOG_URL } from "@/config";

export default (props: IBaseProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectStar());
    dispatch(getAccessCount());
  }, [dispatch]);

  const count = useStoreSelector<number>((state) => state.accessLog.count);
  const star = useStoreSelector<number>((state) => state.github.star);

  return (
    <footer className={props.className}>
      <p>
        网页访问次数：
        {count}
      </p>
      <p>
        Powered&nbsp;by&nbsp;
        <a href={SKY_BLOG_URL} target="_blank" rel="noopener noreferrer">SkyBlog</a>
        &nbsp;
        <a href={SKY_BLOG_URL} target="_blank" rel="noopener noreferrer">
          <Button size="sm">
            Star&nbsp;&nbsp;
            {star}
          </Button>
        </a>
      </p>
    </footer>
  );
};
