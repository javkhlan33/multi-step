export function SuccessMessage() {
  return (
    <div className="space-y-2 bg-white rounded-lg w-full max-w-[480px] p-8">
      <div className="flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pinecone-logo.svg"
          width={60}
          height={60}
          alt="pinecone-logo"
        />
      </div>
      <h2 className="text-[26px] text-[#202124] font-semibold">
        Амжилттай илгээлээ 🔥
      </h2>
      <p className="text-lg text-[#8E8E8E] font-normal">
        We&apos;ve received your submission. Thank you!
      </p>
    </div>
  );
}
