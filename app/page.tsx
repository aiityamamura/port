import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/microcms";

export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className="grid">
      {projects.map((p, i) => (
        <Link key={p.id} href={`/projects/${p.slug}`} className="tile" aria-label={p.title}>
          <Image
            src={p.thumbnail.url}
            alt={p.title}
            width={p.thumbnail.width}
            height={p.thumbnail.height}
            sizes="(max-width:560px) 100vw, (max-width:1000px) 50vw, 25vw"
            priority={i < 4}
          />
        </Link>
      ))}
    </div>
  );
}
