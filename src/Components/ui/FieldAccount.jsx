export default function FieldAccount({ header, isi }) {

    return (
        <div className="gap-y-1 flex flex-col">
            <div className="font-medium">{header}</div>
            <div className="border border-gray-300 py-1.5 pl-2 rounded-lg">{isi}</div>
        </div>
  );
}