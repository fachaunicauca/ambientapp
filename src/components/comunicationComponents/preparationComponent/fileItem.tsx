import { FileText, Eye } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/navigation/tooltip";

interface FileItemProps {
    file: { name: string; type: string; url: string };
    onView: (file: { url: string; type: string }) => void;
}

export default function FileItem({ file, onView }: FileItemProps) {
    return (
        <li className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
                <FileText
                    size={30}
                    className="text-redLight"
                />
                <span className="font-bold">{file.name}</span>
            </div>
            <Tooltip>
                <TooltipTrigger>
                    <span className="cursor-pointer" onClick={() => onView(file)}> <Eye size={20} />
                    </span>
                </TooltipTrigger>
                <TooltipContent>Ver archivo</TooltipContent>
            </Tooltip>
        </li>
    );
}
