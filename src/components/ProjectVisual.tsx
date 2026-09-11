type Props = {
  accent?: string
  title: string
  index: string
}

export function ProjectVisual({ accent = '#e4c7a0', title, index }: Props) {
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] border border-line bg-[#121214]"
      aria-hidden
    >
      <div
        className="absolute -top-24 -right-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: accent }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
      <div className="absolute inset-6 rounded-xl border border-white/8 bg-black/25 p-4 backdrop-blur-[2px]">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-3 h-2 flex-1 rounded-full bg-white/8" />
        </div>
        <div className="grid h-[calc(100%-1.5rem)] grid-cols-12 gap-3">
          <div className="col-span-3 space-y-2">
            <div className="h-16 rounded-lg bg-white/6" />
            <div className="h-8 rounded-lg bg-white/5" />
            <div className="h-8 rounded-lg bg-white/5" />
            <div className="h-24 rounded-lg" style={{ background: `${accent}22` }} />
          </div>
          <div className="col-span-9 space-y-3">
            <div className="flex h-10 items-center justify-between rounded-lg bg-white/6 px-3">
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {title}
              </span>
              <span className="text-[10px] text-white/30">{index}</span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-3">
              <div className="h-28 rounded-lg bg-white/5" />
              <div className="h-28 rounded-lg bg-white/8" />
              <div className="h-28 rounded-lg" style={{ background: `${accent}18` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
