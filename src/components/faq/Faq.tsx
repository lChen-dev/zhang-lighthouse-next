import React from 'react';

import FaqContainer from '@components/shared/Faq/FaqContainer';
import { H1 } from '@components/shared/Typography';
import { FAQItem } from '@components/shared/Faq/FaqComponent';

const Faq: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: 'Do you raise the price of rent so you can offer cash back to renters?',
      answer: (
        <>
          <b className="text-gray-soft">Absolutely Not. </b>
          <span className="text-gray-soft">
            We provide cash back to renters by sharing what we earn from placing renters in apartments. Other rental
            sites keep those earnings entirely to themselves. There’s nothing wrong with that, but we realized we could
            do it different—better, even—by changing how people rent and save.
          </span>
        </>
      ),
    },
    {
      question: 'How much cash back do I get?',
      answer:
        'Cash back amounts vary depending on which apartment you rent. Monthly cash back ranges from $25 per month, up to $100 per month. You’ll receive your monthly cash reward for the duration of the lease. For monthly amounts less than $25 per month, we offer a lump sum payment, up to $300.',
    },
    {
      question: 'How do I receive the cash?',
      answer: (
        <>
          We provide you an option to connect you bank account on your{' '}
          <a href="/account" className="text-brand hover:underline">
            Account
          </a>{' '}
          page. We use Plaid to get a secure token, which allows us to send you a direct ACH transfer to your account
          through Dwolla.
        </>
      ),
    },
    {
      question: 'What if I see the same apartment for a different price on a different site?',
      answer:
        'No worries. You pay whatever rent that the apartment building is asking. The apartments we work with generally have consistent and transparent prices, that are also non-negotiable.',
    },
    {
      question: 'Who can participate with Lighthouse?',
      answer: `Any renter is able to participate with Lighthouse as long as the application is accepted by the apartment. Lighthouse primarily works with large apartment complexes. Although we do sometimes offer cash back on shorter term leases, our bread and butter is for 12+ month leases.

        Lighthouse is also able to help renters that have had broken leases or are working to repair their credit. However, keep in mind, these factors make it harder to be accepted by apartments. We have a database of apartments that are more accommodating.`,
    },
  ];
  return (
    <div className="w-full placcent block m-auto justify-start content-center py-20 mt-10 bg-white">
      <div className="md:w-8/12 w-full max-w-5xl block m-auto justify-center content-center">
        <H1 className="pt-0 md:pt-16 pb-8">Frequently asked questions</H1>
        <FaqContainer faqs={faqs} />
      </div>
    </div>
  );
};

export default Faq;
