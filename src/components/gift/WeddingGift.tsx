import React, { useState } from "react";
import { Check, Copy, CreditCard, Gift, MapPin, Package } from "lucide-react";
import { weddingData } from "../../data/weddingData";

export const WeddingGift: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const copyToClipboard = async (text: string, type: "bank" | "address", id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "bank" && id) {
        setCopiedBank(id);
        setTimeout(() => setCopiedBank(null), 3000);
      } else {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 3000);
      }
    } catch {
      // fallback
    }
  };

  const { bankAccounts, physicalGift } = weddingData.gifts;

  return (
    <section id="gift" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-stone-100">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 font-medium">
          Tanda Kasih
        </p>
        <h2
          className="text-4xl sm:text-5xl font-serif text-white tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Wedding Gift
        </h2>
        <p className="text-sm text-stone-300 font-light leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, fitur berikut dapat memudahkan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cashless / Bank Transfer Gift */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-950/80 border border-stone-800/80 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-800/80">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Transfer Digital</h3>
              <p className="text-xs text-stone-400">Amplop Digital / Bank Transfer</p>
            </div>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((account) => {
              const isCopied = copiedBank === account.accountNumber;
              return (
                <div
                  key={account.accountNumber}
                  className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 text-stone-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-stone-800 text-amber-300 border border-stone-700">
                      {account.bank}
                    </span>
                    <span className="text-xs text-stone-400">a.n {account.accountName}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-white tabular-nums">
                      {account.accountNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(account.accountNumber, "bank", account.accountNumber)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isCopied
                        ? "bg-emerald-500 text-stone-950 shadow-md"
                        : "bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700/80"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Nomor Rekening Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Physical Gift Delivery */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-950/80 border border-stone-800/80 backdrop-blur-md shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-800/80">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Kirim Kado Fisik</h3>
                <p className="text-xs text-stone-400">Pengiriman bingkisan langsung ke kediaman</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 text-stone-300 space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-stone-100 text-sm">{physicalGift.recipientName}</p>
                  <p className="text-stone-300">{physicalGift.phone}</p>
                  <p className="text-stone-300 pt-1">{physicalGift.address}</p>
                  <p className="text-stone-400">
                    {physicalGift.city}, {physicalGift.postalCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() =>
                copyToClipboard(
                  `${physicalGift.recipientName}\n${physicalGift.phone}\n${physicalGift.address}, ${physicalGift.city} ${physicalGift.postalCode}`,
                  "address"
                )
              }
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                copiedAddress
                  ? "bg-emerald-500 text-stone-950 shadow-md"
                  : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30"
              }`}
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Alamat Berhasil Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Alamat Penerima</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
