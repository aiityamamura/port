import { getProfile } from "@/lib/microcms";

export const revalidate = 3600;

export default async function Contact() {
  const p = await getProfile();
  return (
    <section className="detail">
      <h1>Contact</h1>
      <p><a href={`mailto:${p.email}`}>{p.email}</a></p>
    </section>
  );
}
