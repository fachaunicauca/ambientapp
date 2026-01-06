import TakeTestPaginationList from "@/components/communication-components/taketest-components/takeTestPaginationList";
import Title from "@/components/ui/typography/title";

export default function EvaluacionDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <Title title={"Evaluaciones"}></Title>
            </div>

            <TakeTestPaginationList />
        </div>
    );
}
