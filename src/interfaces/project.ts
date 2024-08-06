export type Project = {
  published: boolean;
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  tags: string[] | undefined;
};
