interface ICircleProgressBarProps {
  value: number
}

export default function CircleProgressBar({ value }: ICircleProgressBarProps) {
  return (
    <>
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
        <svg className="transform -rotate-90 w-7 h-7">
          <circle
            cx="14"
            cy="14"
            r="12"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-[#EDEDED]"
          />
          <circle
            cx="14"
            cy="14"
            r="12"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 10}
            strokeDashoffset={
              2 * Math.PI * 10 - (value / 100) * (2 * Math.PI * 10)
            }
            className="text-[#0EA5E9]"
          />
        </svg>
        <span className="absolute text-xs text-[#0EA5E9] font-black m-0 p-0 leading-none">
          {value}
        </span>
      </div>
    </>
  )
}
