import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

type Img = { url: string; width: number; height: number };

export type Project = {
  id: string;
  title: string;
  slug: string;
  thumbnail: Img;
  gallery?: { fieldId: "image"; image: Img }[];
  description?: string;
  order?: number;
};

export type Profile = {
  siteTitleLines: string; // 改行区切り 例: ".-digital\nCristian Girotto\nartist-."
  email: string;
  behance?: string;
  facebook?: string;
  instagram?: string;
};

export const getProjects = async () =>
  (await client.getList<Project>({ endpoint: "projects", queries: { limit: 100, orders: "order" } })).contents;

export const getProject = async (slug: string) =>
  (await client.getList<Project>({ endpoint: "projects", queries: { filters: `slug[equals]${slug}`, limit: 1 } })).contents[0];

export const getProfile = () => client.getObject<Profile>({ endpoint: "profile" });
