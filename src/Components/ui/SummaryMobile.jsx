export default function SummaryMobile({ header, isi, color }) {
    return (
        <div className={`shadow flex flex-col justify-center rounded-lg px-4 py-2 ${color}`}>
            <div className="">{header}</div>
            <div className="text-xl font-bold">{isi}</div>
        </div>
    )
}