export default function MultiColorBar() {
    return (
        <div className="w-full h-[10px] flex">
            <div className="w-1/5 bg-redLight"></div>
            <div className="w-1/5 bg-error"></div>
            <div className="w-1/5 bg-yellow-400"></div>
            <div className="w-1/5 bg-tertiary"></div>
            <div className="w-1/5 bg-purple-900"></div>
        </div>
    );
}