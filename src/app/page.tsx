import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Переходите в личный кабинет</h1>

      <button>
        <Link href="/main">Войти</Link>
      </button>
    </div>
  );
}
