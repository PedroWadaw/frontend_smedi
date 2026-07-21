export default function Summary({ header, isi, width }) {
    return (
        <div className={`p-3.5 rounded-lg shadow ${width}`}>
            <div className="">{header}</div>
            <div className="text-2xl font-bold truncate max-w-[320px]">{isi}</div>
        </div>
    )
}