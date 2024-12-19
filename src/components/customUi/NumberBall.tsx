type NumberBallProps =  {
    number : number | undefined | null;
    className? : string;
}

export default function NumberBall ({number, className = ""} : Readonly<NumberBallProps>) {
    return (
        <div className={`text-sm rounded-full w-6 h-6 bg-primary text-center flex align-middle items-center justify-center ${className}`}>
            {number ?? "?"}
        </div>
    )
}