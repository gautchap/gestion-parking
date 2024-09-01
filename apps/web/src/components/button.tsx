import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-blue-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-300/80 hover:text-slate-600/80 focus-visible:outline-none"
        >
            {children}
        </button>
    );
}
