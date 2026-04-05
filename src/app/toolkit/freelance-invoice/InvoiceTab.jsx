"use client";

import React, { useState, useEffect } from "react";

export default function InvoiceTab() {
  // =========================
  // STATE PENGIRIM
  // =========================
  const [senderName, setSenderName] = useState("");
  const [senderRole, setSenderRole] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  // =========================
  // STATE KLIEN
  // =========================
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [amount, setAmount] = useState("");

  // =========================
  // LOAD DATA DARI LOCALSTORAGE
  // =========================
  useEffect(() => {
    const savedProfile = localStorage.getItem("mrr_profile_data");
    if (savedProfile) {
      const data = JSON.parse(savedProfile);

      setSenderName(data.myName || "");
      setSenderRole(data.myRole || "");
      setSenderEmail(data.myEmail || "");
      setSenderPhone(data.myPhone || "");
    }
  }, []);

  // =========================
  // AUTO SAVE KE LOCALSTORAGE
  // =========================
  useEffect(() => {
    const profileData = {
      myName: senderName,
      myRole: senderRole,
      myEmail: senderEmail,
      myPhone: senderPhone,
    };

    localStorage.setItem("mrr_profile_data", JSON.stringify(profileData));
  }, [senderName, senderRole, senderEmail, senderPhone]);

  // =========================
  // FORMAT RUPIAH
  // =========================
  const formatRupiah = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="space-y-10">

      {/* ========================= */}
      {/* DATA PENGIRIM */}
      {/* ========================= */}
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Data Pengirim</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Role / Jabatan"
            value={senderRole}
            onChange={(e) => setSenderRole(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="No HP"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* DATA KLIEN */}
      {/* ========================= */}
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Data Klien</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Klien"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Nama Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* ========================= */}
      {/* PEMBAYARAN */}
      {/* ========================= */}
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Pembayaran</h2>

        <input
          type="number"
          placeholder="Jumlah (Rp)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input w-full"
        />

        <p className="mt-3 text-cyan-400 font-bold">
          {formatRupiah(amount)}
        </p>
      </div>

      {/* ========================= */}
      {/* PREVIEW */}
      {/* ========================= */}
      <div className="bg-[#050B18] p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Preview Invoice</h2>

        <div className="text-sm space-y-2">
          <p><strong>Pengirim:</strong> {senderName}</p>
          <p><strong>Role:</strong> {senderRole}</p>
          <p><strong>Email:</strong> {senderEmail}</p>
          <p><strong>HP:</strong> {senderPhone}</p>

          <hr className="border-white/10 my-3"/>

          <p><strong>Klien:</strong> {clientName}</p>
          <p><strong>Project:</strong> {projectName}</p>
          <p><strong>Total:</strong> {formatRupiah(amount)}</p>
        </div>
      </div>

    </div>
  );
}