import Link from "next/link";
import { DEFAULT_AUTHOR, getAuthor } from "../lib/authors";
import { formatDate } from "../lib/format";

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Byline({ authorSlug = DEFAULT_AUTHOR, date }) {
  const author = getAuthor(authorSlug) || getAuthor(DEFAULT_AUTHOR);

  return (
    <div className="byline">
      <span className="byline-mark" aria-hidden="true">{initials(author.name)}</span>
      <div>
        <Link href={`/autor/${author.slug}/`}>{author.name}</Link>
        <span>{author.role}{date ? " · " : ""}{date ? <time dateTime={date}>{formatDate(date)}</time> : null}</span>
      </div>
    </div>
  );
}
