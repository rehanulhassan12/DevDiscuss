
export default function BottomButtonGradient() {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover/btn:opacity-100" />
      <span className="absolute inset-x-0 -bottom-1 mx-auto h-[2px] w-3/5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 blur-md transition-all duration-500 ease-in-out group-hover/btn:opacity-100" />
    </>
  );
}
