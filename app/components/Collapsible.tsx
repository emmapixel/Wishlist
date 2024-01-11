import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler, useCallback, useState } from "react";

type CollapsibleProps = {
    title: string;
    children: any;
  };

export const Collapsible = ({ title, children }: CollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const summaryClickHandler = useCallback<MouseEventHandler<HTMLElement>>((event) => { 
        event.preventDefault();
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <details open={isOpen} className="border-2 border-slate-400">
            <summary className="flex justify-between items-center space-x-4 bg-slate-300 p-2" tabIndex={0} onClick={summaryClickHandler} role="button">
                <h1 className="text-lg font-medium">{title}</h1>
                <span className="summary-icon">
                    <ChevronDownIcon className={`w-5 h-5 transition-transform ease-in ${isOpen ? '-rotate-180' : ''}`} />
                </span>
            </summary>
            <div className="flex flex-col space-y-4 p-2 bg-white">
                {children}
            </div>
        </details>
    )
};
