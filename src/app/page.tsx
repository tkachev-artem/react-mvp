import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 h-screen rounded-xl justify-between items-center">
      <div className="fixed top-24 left-5 right-5">
        <div className="flex items-center justify-center">
          <Image src="/images/Highlight/Happy.svg" alt="logo" width={145} height={161} />
        </div>

          <div className="flex flex-col gap-5 mt-10">
            <div className="flex items-center justify-end">
              <Image src="/images/Highlight/1.png" alt="1" width={320} height={30} />
            </div>

            <div className="flex items-center justify-start">
              <Image src="/images/Highlight/2.png" alt="2" width={300} height={30} />
            </div>
          </div>
      </div>

      <div className="fixed bottom-5 left-5 right-5">

        <div className="flex w-full flex-col gap-5">
          <div className="flex justify-center items-center">
          <Image src="/images/Highlight/Arrow15.svg" alt="arrow" width={241} height={151} />
          </div>

          <div>
          <Link href="/start">
            <button className="w-full inline-flex justify-center items-center py-4 rounded-xl border-2 border-solid border-cyan-800">
              <p className="text-cyan-800 text-base font-semibold">сделать город ближе</p>
            </button>
          </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
