'use client';
import { Printer } from 'lucide-react';
export default function PrintCV({ label }: { label: string }) { return <button type="button" className="career-print" onClick={() => window.print()}><Printer size={16} />{label}</button>; }
