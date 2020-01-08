import {getProjectStar} from "@/action/github";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store";
import { SKY_BLOG_URL } from "@/Constant";

interface IFooterProps {
  className?: string;
}

export default (props: IFooterProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectStar());
  }, []);

  const count = useStoreSelector<number>((state) => state.accessLog.count);
  const star = useStoreSelector<number>((state) => state.github.star);

  return (
    <footer className={props.className}>
      <p>
        网页访问次数：
        {count ? "加载中..." : count}
      </p>
      <p>
        Powered&nbsp;by&nbsp;
        <a href={SKY_BLOG_URL}>SkyBlog</a>
        &nbsp;
        <Button size="sm" href={SKY_BLOG_URL}>
          Star&nbsp;&nbsp;
          {star ? "" : star}
        </Button>
      </p>
    </footer>
  );
};
