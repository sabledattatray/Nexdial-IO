"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";

export default function ImportLeadsModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ success: number; failed: number } | null>(null);

  const importMutation = useMutation({
    mutationFn: async (leadsList: any[]) => {
      const res = await fetch("/api/leads/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leads: leadsList }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to bulk import leads.");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      setResult({ success: data.count, failed: 0 });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMessage(null);
    }
  };

  const processCSV = async () => {
    if (!file) return;
    setErrorMessage(null);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length <= 1) {
        throw new Error("File appears to be empty or missing data rows.");
      }

      // Read headers
      const headers = lines[0]
        .toLowerCase()
        .split(",")
        .map((h) => h.trim());

      const leadsToUpload = [];
      let failedRows = 0;

      for (let i = 1; i < lines.length; i++) {
        const columns = lines[i]
          .split(",")
          .map((c) => c.trim().replace(/^"|"$/g, ""));

        // Match indexes
        const nameIdx = headers.findIndex((h) => h.includes("name"));
        const phoneIdx = headers.findIndex(
          (h) => h.includes("phone") || h.includes("number")
        );
        const emailIdx = headers.findIndex((h) => h.includes("email"));
        const sourceIdx = headers.findIndex((h) => h.includes("source"));

        const name = columns[nameIdx >= 0 ? nameIdx : 0];
        const phone = columns[phoneIdx >= 0 ? phoneIdx : 1];
        const email =
          emailIdx >= 0 && columns.length > emailIdx ? columns[emailIdx] : "";
        const sourceRaw =
          sourceIdx >= 0 && columns.length > sourceIdx ? columns[sourceIdx] : "CSV";

        // Skip rows without name or phone
        if (!name || !phone) {
          failedRows++;
          continue;
        }

        leadsToUpload.push({
          name,
          phone,
          email: email || null,
          source: sourceRaw,
          tags: ["CSV Import"],
        });
      }

      if (leadsToUpload.length === 0) {
        throw new Error("No valid lead records found in CSV file. Check column names.");
      }

      // Trigger mutation
      importMutation.mutate(leadsToUpload);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to process CSV file.");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A1628]">
          <h2 className="text-lg font-bold text-white">Import Leads (CSV)</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!result ? (
            <>
              <div
                className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#00C2FF]/50 transition-colors cursor-pointer bg-[#050A15]"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="w-10 h-10 text-[#00C2FF]" />
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Click to upload CSV file</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Headers should include: Name, Phone, Email (optional)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  onClick={onClose}
                  disabled={importMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processCSV}
                  disabled={!file || importMutation.isPending}
                  className="px-6 py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#0057D9]/20 transition-all flex items-center gap-2"
                >
                  {importMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {importMutation.isPending ? "Processing..." : "Import Leads"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Import Complete</h3>
              <p className="text-slate-400 mb-6">
                Successfully imported{" "}
                <span className="text-emerald-400 font-bold">{result.success}</span> leads.
              </p>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Close & View Inbox
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
