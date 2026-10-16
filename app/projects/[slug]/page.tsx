import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/microcms";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();
  const images = p.gallery?.length ? p.gallery.map((g) => g.image) : [p.thumbnail];
  return (
    <article className="detail">
      <Link href="/" className="back">← Projects</Link>
      <h1>{p.title}</h1>
      {p.description && <p>{p.description}</p>}
      {images.map((img) => (
        <Image key={img.url} src={img.url} alt={p.title} width={img.width} height={img.height} sizes="(max-width:1100px) 100vw, 1100px" />
      ))}
    </article>
  );
}
