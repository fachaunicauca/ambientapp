type TitleProps = {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <div className="inline-block">
            <h1 className="text-xl md:text-3xl font-semibold text-blue">
                {props.title}
            </h1>
            <div className="border-b-2 md:border-b-4 border-redLight w-2/3" />
        </div>
    )
}