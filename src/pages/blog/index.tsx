import type { NextPage, GetStaticProps } from "next";
import Link from "next/link"

import type { Blog, Category } from "../../types/blog"
import { client } from "../../libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { Layout } from "../../components/layout";
import { Contents } from "../../components/content";
import styled from "styled-components";
import Image from "next/image";
import { pc, sp } from "../../styles/media";
import { Pagination } from "../../components/Pagination";

const DEFAULT_ICON = require('../../../public/image/my_icon.jpg')

const ContentsBox = styled.div`
  min-height: 100vh;
`

const BlogH2 = styled.h2`
  font-size: 2rem;
  color: #ffffff;
`

const BlogDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items:stretch;
`

const TitleBox = styled.div`
  padding: 0.5rem;
  display: inline-block;
  font-size: 1.5rem;
`

const BodyBox = styled.div`
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding: 0;
  ${pc`
    width: 20rem;
    -webkit-line-clamp: 2;
  `}
  ${sp`
    width:10rem;
    -webkit-line-clamp: 4;
  `}
`

const BlogUl = styled.ul`
  list-style: none;
  padding: 0;
`

const BlogLi = styled.li`
  margin-bottom: 2rem;
`

const BlogContent = styled.div`
  border: 0.25rem;
  border-radius: 1rem;
  border-style: none;
  background-color: #ffffff;
  display: inline-block;
  padding: 1rem;
  cursor: pointer;
`

const LabelBox = styled.div`
  text-align: left;
  margin-top: 0.5rem;
`

type Props = {
  blog: Blog[];
  totalCount: number;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: MicroCMSListResponse<Blog> = await client.get<MicroCMSListResponse<Blog>>({
    endpoint: "blog",
    queries: {
      limit: 5,
      offset: 0,
    }
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};

const BlogIndex: NextPage<Props> = ({ blog, totalCount }: Props) => {
  return(
    <>
      <Layout title="Blog">
        <Contents bgColor="#3e4cc9">
          <ContentsBox>
            <BlogH2>kaito071831 Blog</BlogH2>
            <div>
              <BlogUl>
                {blog.map((blog: Blog) => (
                  <BlogLi key={blog.id}>
                    <Link href={`/blog/${blog.id}`}>
                      <BlogContent>
                        <TitleBox>{blog.title}</TitleBox>
                        <BlogDiv>
                          <div>
                            <Image
                              src={blog.image ? blog.image.url : DEFAULT_ICON}
                              width={50}
                              height={50}
                              alt={blog.title}
                            />
                          </div>
                          <div>
                            <BodyBox>{blog.body?.replaceAll(/<[^>]+>/g, "")}</BodyBox>
                            <LabelBox>タグ: {blog.category && blog.category.map((cat: Category) => (cat.category)).join()}</LabelBox>
                          </div>
                        </BlogDiv>
                      </BlogContent>
                    </Link>
                  </BlogLi>
                ))}
              </BlogUl>
              <Pagination totalCount={totalCount} />
            </div>
          </ContentsBox>
        </Contents>
      </Layout>
    </>
  );
};

export default BlogIndex;
