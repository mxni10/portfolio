import { Database, ShieldCheck, Terminal, Vote } from 'lucide-react'

type Props = {
  accent?: string
  title: string
  index: string
}

export function ProjectVisual({ accent = '#e4c7a0', title, index }: Props) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] border border-line bg-[#0e0e11] shadow-2xl transition-all duration-700"
      aria-hidden
    >
      {/* Ambient Radial Lighting */}
      <div
        className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full opacity-35 blur-[90px] transition-all duration-700 group-hover:opacity-55 group-hover:scale-110"
        style={{ background: accent }}
      />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full opacity-20 blur-[80px]" style={{ background: accent }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]" />

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(243,239,230,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,239,230,0.02)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Terminal / Architectural Dashboard Container */}
      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
            <span className="ml-3 flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-wider text-mute">
              <Terminal size={11} className="text-accent" />
              <span>core/system.api</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-paper/70 uppercase">
              NODE v22 · ONLINE
            </span>
          </div>
        </div>

        {/* Dashboard Architecture Grid */}
        <div className="my-auto grid grid-cols-12 gap-4 pt-4">
          {/* Schema & Role Entities Panel */}
          <div className="col-span-5 space-y-2.5">
            <div className="rounded-xl border border-white/[0.06] bg-black/40 p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-paper/80">
                  <Database size={12} className="text-accent" /> Relational Schema
                </span>
                <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-mono text-accent">
                  InnoDB
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5 font-mono text-[10px] text-mute">
                <div className="flex justify-between border-b border-white/[0.04] pb-1">
                  <span>elections.id</span>
                  <span className="text-accent/80">UUID PK</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] pb-1">
                  <span>ballots.voter_id</span>
                  <span className="text-paper/60">INDEX</span>
                </div>
                <div className="flex justify-between">
                  <span>tally.hash</span>
                  <span className="text-accent/80">SHA-256</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/40 px-3 py-2 text-[10px] text-mute backdrop-blur-md">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-accent" /> Role-Based Auth
              </span>
              <span className="font-mono text-accent">Active</span>
            </div>
          </div>

          {/* Active Flow / Live Aggregation Display */}
          <div className="col-span-7 flex flex-col justify-between rounded-xl border border-white/[0.06] bg-black/40 p-4 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.2em] text-mute uppercase">
                  Product Overview
                </span>
                <span className="font-mono text-[10px] text-accent">REF #{index}</span>
              </div>
              <h4 className="mt-2 font-display text-xl italic text-paper md:text-2xl">
                {title}
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-mute">
                Database-driven integrity with zero single points of failure.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.05]">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="flex items-center gap-1 text-mute">
                  <Vote size={11} className="text-accent" /> Real-time Tally Engine
                </span>
                <span className="text-accent font-semibold">100% Invariant</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: '84%', background: accent }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-[10px] font-mono text-mute">
          <span>SECURE PROTOCOL // 256-BIT</span>
          <span className="text-accent">PRODUCTION GRADE</span>
        </div>
      </div>
    </div>
  )
}
