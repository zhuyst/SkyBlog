import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { useStoreSelector } from "@/store";

export default () => {
  const management = useStoreSelector<boolean>((state) => state.login.management);

  return (
    <div className="blog-navigation">
      <div className="navigation-title">
        <h2>博客分类</h2>
      </div>

      {
                management
                && (
                <Link href="/article/content/new/edit">
                  <Button>发布文章</Button>
                </Link>
                )
            }
    </div>
  );
};
