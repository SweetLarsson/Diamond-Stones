import React from 'react';
import { Modal } from '../common/Modal';
import { Shield, Lock, HeartHandshake, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Beneficiary Safeguarding & Privacy Policy"
      subtitle="Safeguarding dignity, personal safety, and data confidentiality"
      maxWidth="xl"
    >
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-[#243247]">
        <div className="p-4 rounded-2xl bg-[#E7F7EF] border border-[#10A66A]/30 flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#0B6B45] shrink-0 mt-0.5" />
          <p className="text-xs text-[#0B6B45]">
            <strong>Our Safeguarding Mandate:</strong> Diamond Stones operates under the fundamental principle that human dignity, confidentiality, and physical safety must never be compromised. We enforce rigorous safeguarding standards for every individual we serve.
          </p>
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#102C57] flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[#2563EB]" />
            1. Protection of Women in Distress (DS-WIDI)
          </h4>
          <p className="text-[#66758A]">
            Diamond Stones Women in Distress Initiative (DS-WIDI) supports women experiencing domestic abuse, sexual violence, early forced marriage, widowhood crises, abandonment, and social stigma. We never publish names, identifiable photographs, home addresses, or confidential details of survivors without explicit informed consent. All survivor assistance is routed through confidential human caseworkers.
          </p>
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#102C57] flex items-center gap-2 mb-2">
            <EyeOff className="w-4 h-4 text-[#0B6B45]" />
            2. Dignified Representation & Photography Consent
          </h4>
          <p className="text-[#66758A]">
            We prohibit exploitative imagery. Photographs and case narratives published on our platform depict volunteers, community outreaches, or dignified activities where express consent has been granted. We refrain from sensationalizing distress or displaying vulnerable individuals in compromised states.
          </p>
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#102C57] flex items-center gap-2 mb-2">
            <HeartHandshake className="w-4 h-4 text-[#2563EB]" />
            3. Data Minimization & Enquiry Handling
          </h4>
          <p className="text-[#66758A]">
            Our website collects only necessary contact details (name, email, phone) to respond to enquiries, volunteer submissions, and partnership requests. We do not sell, rent, or share personal data with commercial third parties. If you seek assistance regarding abuse or urgent distress, we urge you to contact our team directly via telephone at <a href="tel:08037727388" className="font-bold text-[#0B6B45] underline">08037727388</a> for confidential attention.
          </p>
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#102C57] mb-2">
            4. Child Safeguarding in Orphanage & School Outreaches
          </h4>
          <p className="text-[#66758A]">
            In compliance with child welfare standards, team members participating in orphanage visitations undergo operational briefing. Minors are protected from unapproved publicity, and all interventions prioritize the best interests of the child.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 text-xs text-[#66758A]">
          <p>
            For privacy inquiries or safeguarding concerns, please contact our secretariat at{' '}
            <a href="mailto:ireneneky21@gmail.com" className="font-bold text-[#102C57] underline">
              ireneneky21@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </Modal>
  );
};
