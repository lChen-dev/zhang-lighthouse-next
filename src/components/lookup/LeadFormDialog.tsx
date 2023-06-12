import React, { useState } from 'react';

import LeadForm, { BuildingLead } from '@components/lookup/LeadForm';
import Modal from '@components/shared/Modal';
import InquiryFlow from '@components/shared/inquiry-flow/InquiryFlow';
import { Property } from '@models/Property';

interface Props {
  lead: BuildingLead | null;
  onHide: () => void;
}

const LeadFormDialog: React.FC<Props> = ({ lead, onHide }: Props) => {
  const [success, setSuccess] = useState(false);

  if (!lead) return null;

  return (
    <Modal
      title={
        <div className={`${success && 'hidden'} block`}>
          <span>{lead.name}</span>
          <a className="text-green block" href={lead.website} target="_blank" rel="noopener noreferrer">
            Visit Site
          </a>
        </div>
      }
      show
      onHide={onHide}
    >
      <InquiryFlow
        property={
          {
            name: lead.name,
            cashback: lead.cashback,
            city: lead.city,
            address: lead.address,
            website: lead.website,
            propertyPhotos: [{ url: lead.image }],
            apts_id: lead.aptsId,
          } as Property
        }
      />
    </Modal>
  );
};

export default LeadFormDialog;
