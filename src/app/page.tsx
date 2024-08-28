import { GenerateChapter } from "../../actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={GenerateChapter}>
        <button>
          Generate chapter for a story about a horse.
        </button>
      </form>
    </main>
  );
}
