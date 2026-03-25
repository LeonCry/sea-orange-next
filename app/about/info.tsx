'use client';

import { useState } from 'react';

const AboutInfo = ({ infoPath }: { infoPath: string | null }) => {
    const [visible, setVisible] = useState(true);
    if (!visible || infoPath === null) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl ring-2">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-slate-900">INFO://</h2>
                </div>

                <p className="mb-2 text-sm text-slate-700">
                    {infoPath}
                </p>
                <div className="mt-4 text-right">
                    <button
                        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                        onClick={() => setVisible(false)}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutInfo;
