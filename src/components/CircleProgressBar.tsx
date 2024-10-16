interface ICircleProgressBarProps {
  percent: number
}

export default function CircleProgressBar({
  percent,
}: ICircleProgressBarProps) {
  return (
    <>
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
        <svg className="transform -rotate-90 w-7 h-7">
          <circle
            cx="14"
            cy="14"
            r="12"
            stroke="currentColor"
            stroke-width="4"
            fill="transparent"
            className="text-[#EDEDED]"
          />
          <circle
            cx="14"
            cy="14"
            r="12"
            stroke="currentColor"
            stroke-width="4"
            fill="transparent"
            stroke-dasharray={2 * Math.PI * 10}
            stroke-dashoffset={
              2 * Math.PI * 10 - (20 / 100) * (2 * Math.PI * 10)
            }
            className="text-[#0EA5E9]"
          />
        </svg>
        <span className="absolute text-xs text-[#0EA5E9] font-black">
          {percent}
        </span>
      </div>
    </>
  )
}
