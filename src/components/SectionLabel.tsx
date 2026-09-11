type Props = {
  index?: string
  label: string
}

export function SectionLabel({ index, label }: Props) {
  return (
    <div className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.28em] text-mute uppercase">
      {index ? <span className="text-accent">{index}</span> : null}
      <span>{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
