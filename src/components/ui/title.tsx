type TitleProps = {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <>
            <h1 className="text-3xl font-semibold text-blue">
                {props.title}
            </h1>
            <div className="border-b-4 border-redLight w-20" />
        </>
    )
}