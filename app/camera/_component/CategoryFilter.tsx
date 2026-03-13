'use client';
import { Close, Check, Bloom } from '@icon-park/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const COLORS: [number, number, number][] = [
    [239, 68, 68],
    [249, 115, 22],
    [234, 179, 8],
    [34, 197, 94],
    [20, 184, 166],
    [6, 182, 212],
    [59, 130, 246],
    [99, 102, 241],
    [168, 85, 247],
    [236, 72, 153],
    [244, 63, 94],
    [16, 185, 129],
];

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onApply: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onApply }: CategoryFilterProps) => {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(selectedCategory);
    const allCategories = ['全部', ...categories];

    const handleOpen = () => {
        setPending(selectedCategory);
        setOpen(true);
    };

    const handleConfirm = () => {
        setOpen(false);
        onApply(pending);
    };

    const handleBackdropClick = () => {
        setOpen(false);
        setPending(selectedCategory);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="fixed top-[155px] left-5 flex items-center gap-1.5 px-8 py-1.5 bg-white rounded text-[#8B8D9B] text-xs border-[#E5E7EB] border-dotted border-2 select-none"
            >
                <Bloom theme="outline" size="16" fill="#8B8D9B" />
                <span>CATE:</span>
                <span className="max-w-[80px] truncate font-bold text-[#8890ff]">
                    {selectedCategory || '全部'}
                </span>
            </button>

            {open && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleBackdropClick}
                    />

                    <div className="relative z-10 w-[88vw] max-w-sm bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 pt-3">
                        <div className="grid grid-cols-4 gap-2">
                            {allCategories.map((cat, i) => {
                                const [r, g, b] = COLORS[i % COLORS.length];
                                const val = cat === '全部' ? '' : cat;
                                const isSelected = pending === val;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setPending(val)}
                                        className="aspect-square rounded-lg text-white text-xs font-semibold transition-all active:scale-95 select-none p-1"
                                        style={{
                                            backgroundColor: `rgba(${r},${g},${b},${isSelected ? 0.6 : 0.2})`,
                                            WebkitTextStroke: '0.1px #000',
                                            textShadow: '0 1px 1px rgba(0,0,0,0.9)',
                                            boxShadow: isSelected ? '0 0 0 1.5px #ffffff' : 'none',
                                        }}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-4">
                            <button
                                onClick={handleBackdropClick}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 border border-white/25 text-white active:scale-90 transition-transform"
                                aria-label="取消"
                            >
                                <Close theme="outline" size="20" fill="#ffffff" strokeWidth={3} />
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 border border-white/25 text-white active:scale-90 transition-transform"
                                aria-label="应用"
                            >
                                <Check theme="outline" size="20" fill="#ffffff" strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default CategoryFilter;
