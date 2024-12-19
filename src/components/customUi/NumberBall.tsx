type NumberBallProps =  {
    number : number | undefined | null;
    className? : string;
}

export default function NumberBall ({number, className = ""} : Readonly<NumberBallProps>) {
    return (
        <div className={`ml-2 mr-2 text-sm rounded-full w-7 h-7 bg-primary text-center flex align-middle items-center justify-center ${className}`}>
            {number ?? "?"}
        </div>
    )
}