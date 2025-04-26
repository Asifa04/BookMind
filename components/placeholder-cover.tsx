interface PlaceholderCoverProps {
  title: string
  author: string
  className?: string
}

export function PlaceholderCover({ title, author, className }: PlaceholderCoverProps) {
  // Generate a consistent color based on the book title
  const getColorFromString = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = hash % 360
    return `hsl(${hue}, 70%, 80%)`
  }

  const backgroundColor = getColorFromString(title)

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center p-4 text-center ${className}`}
      style={{ backgroundColor }}
    >
      <div className="text-lg font-bold line-clamp-3">{title}</div>
      <div className="text-sm text-muted-foreground">{author}</div>
    </div>
  )
}
