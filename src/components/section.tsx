'use client';

import { ReactNode, Children } from 'react';
import { useState } from 'react';

interface SectionProps {
    children: ReactNode;
    vertical: boolean;
    horizontal: boolean;
}

const Section = ({ children, vertical, horizontal }: SectionProps) => {
    const [hasVertical] = useState<boolean>(Boolean(vertical));
    const [hasHorizontal] = useState<boolean>(Boolean(horizontal));
    
    if (hasVertical) {
        return (
            <div className="w-full flex flex-col gap-5">
                {children}
            </div>
        )
    }

    if (hasHorizontal) {
        const childrenCount = Children.count(children);
        
        if (childrenCount > 3) {
           
            return (
                <div className="grid w-full grid-cols-3 gap-5">
                    {children}
                </div>
            )
        } else if (childrenCount > 1) {
            
            return (
                <div className="grid w-full grid-cols-2 gap-5">
                    {children}
                </div>
            )
        } else {
           
            return (
                <div className="flex w-full items-start gap-5">
                    {children}
                </div>
            )
        }
    }
    
    // Дефолтный рендер, если ни vertical, ни horizontal не указаны
    return (
        <div className="w-full">
            {children}
        </div>
    )
}

export default Section;