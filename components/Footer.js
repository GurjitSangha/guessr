export default function Footer() {
  return (
    <div className="fixed left-0 bottom-0 w-full align-middle bg-white">
      <div className="flex text-sm justify-center gap-5 bottom-0">
        <span>
          <a
            className="underline"
            href="https://github.com/GurjitSangha/guessreddit"
          >
            Github
          </a>
        </span>
        <span>
          Inspired by the{" "}
          <a className="underline" href="https://youtu.be/3h73GXpHmqw?t=2531">
            Funhaus Podcast
          </a>
        </span>
      </div>
    </div>
  );
}
