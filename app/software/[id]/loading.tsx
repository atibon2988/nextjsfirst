export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 animate-pulse">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 mb-6"></div>
      <div className="h-[400px] bg-slate-100 dark:bg-slate-800 rounded-[3rem] mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
      </div>
    </div>
  );
}