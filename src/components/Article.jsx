function readTimeLabel(minutes) {
  const isLongRead = minutes >= 30;
  const emoji = isLongRead ? "🍱" : "☕️";
  const increment = isLongRead ? 10 : 5;

  return `${emoji.repeat(Math.ceil(minutes / increment))} ${minutes} min read`;
}

function Article({ title, date = "January 1, 1970", preview, minutes }) {
  return (
    <article>
      <h3>{title}</h3>
      <small>{date}</small>
      {minutes ? <span className="read-time">{readTimeLabel(minutes)}</span> : null}
      <p>{preview}</p>
    </article>
  );
}

export default Article;
