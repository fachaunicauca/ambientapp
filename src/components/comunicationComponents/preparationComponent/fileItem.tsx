import { FileText, Eye, Trash } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/navigation/tooltip";
import { Badge } from "@/components/ui/typography/badge";

interface FileItemProps {
    file: { name: string; url: string; type: string };
    onView: (file: { url: string }) => void;
    onDelete?: (file: { name: string }) => void;
    deleteButton?: React.ReactNode; // botón de eliminación personalizado (como un modal)
}

export default function FileItem({ file, onView, onDelete, deleteButton }: FileItemProps) {
    return (
        <li className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 min-w-0">
                <FileText size={30} className="text-Blue" />
                <div className="flex items-center gap-2 mb-1 min-w-0 max-w-[140px] sm:max-w-full">
                    <h3 className="font-medium text-blue truncate max-w-full text-xs sm:text-base">
                        {file.name}
                    </h3>
                    <Badge className="bg-blue text-white hover:text-blue flex-shrink-0 text-xs sm:text-sm px-2 py-0.5">
                        {file.type.toUpperCase()}
                    </Badge>
                </div>
            </div>
            <div className="flex items-center">
                <Tooltip>
                    <TooltipTrigger>
                        <span className="cursor-pointer" onClick={() => onView(file)}>
                            <Eye size={20} />
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>Ver archivo</TooltipContent>
                </Tooltip>
                <span className="ml-2">
                    {deleteButton ? (
                        deleteButton
                    ) : onDelete ? (
                        <Tooltip>
                            <TooltipTrigger>
                                <span className="cursor-pointer" onClick={() => onDelete(file)}>
                                    <Trash size={20} />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar archivo</TooltipContent>
                        </Tooltip>
                    ) : null}
                </span>
            </div>
        </li>
    );
}
