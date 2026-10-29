import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CustomSelect } from '../common/CustomSelect';
import { storageService } from '../../services/storageService';
import { CheckCircle2, Send } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'General Humanitarian Relief',
}) => {
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    amountOrItems: '',
    purpose: defaultCategory,
    notes: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your full name and a valid email address.');
      return;
    }
    setErrorMsg('');

    // Save as volunteer / donor pledge in persistent storage
    storageService.addVolunteer({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || 'N/A',
      supportType: 'Donation & Financial Support',
      chapter: 'National / Central',
      skillsAndExpertise: `Pledge/Contribution: ${formData.amountOrItems} towards ${formData.purpose}`,
      availability: 'Immediate',
      notes: formData.notes,
    });

    setPledgeSubmitted(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Support Diamond Stones"
      subtitle="Transparent giving, tangible community transformation"
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Pledge or In-Kind Notification Form */}
        <div className="border border-slate-200 rounded-2xl p-6 bg-[#F7FAFC]">
          {pledgeSubmitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E7F7EF] text-[#0B6B45] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-[#102C57]">Thank You For Your Support</h4>
              <p className="text-xs sm:text-sm text-[#66758A] max-w-md mx-auto">
                Your support pledge has been logged with our Finance and Welfare secretariat. Our team will verify and send official acknowledgment to <span className="font-semibold text-[#102C57]">{formData.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => setPledgeSubmitted(false)}
                className="mt-2 text-xs font-bold text-[#0B6B45] underline hover:text-[#10A66A]"
              >
                Submit another pledge or support notice
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitPledge} className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-[#102C57]">
                  Notify Us of Your Donation or In-Kind Gift
                </h4>
              </div>

              {errorMsg && (
                <div className="p-3 text-xs rounded-xl bg-red-50 text-red-700 border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Grace Adeleke"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="grace@example.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234-80X-XXX-XXXX"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243247] mb-1">
                    Pledge Amount or Gift Items *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.amountOrItems}
                    onChange={(e) => setFormData({ ...formData, amountOrItems: e.target.value })}
                    placeholder="e.g. ₦50,000 or 10 Bags of Rice"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243247] mb-1">
                  Designated Programme
                </label>
                <CustomSelect
                  value={formData.purpose}
                  onChange={(val) => setFormData({ ...formData, purpose: val })}
                  options={[
                    'General Humanitarian Relief',
                    'Hospital Patient Bill Relief Fund',
                    'Feeding the Street & Flood Relief',
                    'D-STEP Skills Acquisition Kits',
                    'Orphanage Care & Children Welfare',
                    'Women in Distress Initiative (DS-WIDI)',
                  ]}
                  ariaLabel="Designated Programme"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243247] mb-1">
                  Transfer Reference / Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Date of transfer, transaction ref, or delivery logistics for materials..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B6B45] bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #0B6B45 0%, #10A66A 45%, #2563EB 100%)',
                }}
              >
                <Send className="w-4 h-4" />
                <span>Submit Support Notification</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};
