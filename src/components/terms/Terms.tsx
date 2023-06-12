import React from 'react';
import { B2, H2, H4, H5 } from '@components/shared/Typography';

import './terms.css';

const Terms: React.FC = () => (
  <div className="py-20 mt-4 md:mt-16 mx-auto max-w-4xl text-light terms-content px-3">
    <H2 className="mb-1">Terms of Service</H2>
    <B2 className="mb-6" color="text-gray-soft">
      Updated July 30, 2020
    </B2>
    <B2>
      Welcome to Lighthouse. Please read these terms of service (the “<strong>Agreement</strong>”) and our{' '}
      <a className="text-brand hover:underline" href="/privacy">
        Privacy Policy
      </a>{' '}
      (“<strong>Privacy Policy</strong>”) carefully because they govern your use of the services provided by Lighthouse
      Financial Technologies, Inc. (“<strong>Lighthouse</strong>”, “<strong>we</strong>”, “<strong>us</strong>” or “
      <strong>our</strong>”). Our provision of the services as described in this Agreement may be accessible through our
      website located at{' '}
      <a className="text-brand hover:underline" href="/">
        www.lighthouse.app
      </a>{' '}
      (the “<strong>Site</strong>”) and our mobile device application (“<strong>App</strong>”). This Agreement also
      governs your use of the Site and the App. To make this Agreement easier to read, the Site, the App and our
      services are collectively called the “<strong>Services</strong>”. You agree to be legally bound to this Agreement
      between you (“<strong>Customer</strong>”, “<strong>you</strong>”, or “<strong>your</strong>”) and Lighthouse.
    </B2>

    <section>
      <H4>1. Agreement to Terms.</H4>
      <B2>
        By using our Services, you agree to be bound by this Agreement. If you don’t agree to be bound by this
        Agreement, do not use the Services. If you are accessing and using the Services on behalf of a company (such as
        your employer) or other legal entity, you represent and warrant that you have the authority to bind that company
        or other legal entity to this Agreement. In that case, “you” and “your” will refer to that company or other
        legal entity.
      </B2>
    </section>

    <section>
      <H4>2. Privacy Policy.</H4>
      <B2>
        Please refer to our Privacy Policy for information on how we collect, use and disclose information from our
        users. You acknowledge and agree that your use of the Services is subject to our Privacy Policy.
      </B2>
      <B2>
        <strong>
          IMPORTANT NOTICE REGARDING ARBITRATION: WHEN YOU AGREE TO THE TERMS OF THIS AGREEMENT YOU ARE AGREEING (WITH
          LIMITED EXCEPTION) TO RESOLVE ANY DISPUTE BETWEEN YOU AND Lighthouse THROUGH BINDING, INDIVIDUAL ARBITRATION
          RATHER THAN IN COURT. PLEASE REVIEW CAREFULLY SECTION 19 “DISPUTE RESOLUTION” BELOW FOR DETAILS REGARDING
          ARBITRATION (INCLUDING THE PROCEDURE TO OPT OUT OF ARBITRATION).
        </strong>
      </B2>
    </section>

    <section>
      <H4>3. Changes to Terms or Services.</H4>
      <B2>
        We may update this Agreement at any time, in our sole discretion. If we do so, we’ll let you know either by
        posting the updated Agreement on the Site or the App or through other communications. It’s important that you
        review the Agreement whenever we update them or you use the Services. If you continue to use the Services after
        we have posted updated Agreement, you are agreeing to be bound by the updated Agreement. If you don’t agree to
        be bound by the updated Agreement, then, except as otherwise provided in Section 19(e) “Effect of Changes on
        Arbitration,” you may not use the Services anymore. Because our Services are evolving over time we may change or
        discontinue all or any part of the Services, at any time and without notice, at our sole discretion.
      </B2>
    </section>

    <section>
      <H4>4. Who May Use the Services?</H4>
      <B2>
        <strong>(a) Eligibility.</strong> You may use the Services only if you are residents of the United States and
        are 18 years or older capable of forming a binding contract with Lighthouse and are not barred from using the
        Services under applicable law.
      </B2>
      <B2>
        <strong>(b) Account.</strong> If you want to use certain features of the Services you’ll have to create an
        account (“<strong>Account</strong>”). It’s important that you provide us with accurate, complete and up-to-date
        information for your Account and you agree to update such information to keep it accurate, complete and
        up-to-date. If you do not, we might have to suspend or terminate your Account. You agree that you will not
        disclose your Account password to anyone and you will notify us immediately of any unauthorized use of your
        Account. You are responsible for all activities that occur under your Account, whether or not you know about
        them
      </B2>
    </section>

    <section>
      <H4>5. Services.</H4>
      <B2>
        <strong>(a) Services.</strong> As part of our Services, we operate an online platform which facilitates, among
        other things, access to residential rental properties, landlord interaction and the redemption of rewards that
        our customers may earn by renting properties through the Services and taking other reward-generating actions
        (such as paying rent). The Services may be updated from time to time by Lighthouse without notice to you.
        Detailed rewards program information including rules for reward earning and redemption are available through the
        Services available at (the “<strong>Rules</strong>”).
      </B2>
      <B2>
        <strong>(b) Rewards and Redemption.</strong> After you rent a residential property through the Services, some
        landlords may (but will not always) pay a fixed amount (the “<strong>Reward</strong>”) to you and will use a
        third-party payment providers to hold and facilitate the distribution of the Reward to you. You can redeem the
        Reward over time in accordance with the Rules. Rewards earned through the Services are non-negotiable and can
        only be redeemed, either in whole or in part, as reduction to your monthly rent payment. You may only receive
        Rewards if you pay your rent in accordance with the terms of your lease. If you fail to do that for a given
        month, you will not receive the Rewards for that month. You acknowledge that Rewards may not be brokered,
        bartered, pledged, gifted, sold, or otherwise transferred, other than expressly agreed by us in writing or
        otherwise provided for in this Agreement, and any receipt or use of Rewards in violation of this Agreement will
        render such Rewards void. Rewards are not capable of being combined or transferred to any other type of
        promotion or award. If you terminate your lease early, you will not be able to redeem or otherwise obtain the
        balance of the Reward in any way.
      </B2>
      <B2>
        <strong>(c) Disclaimer.</strong> YOU ACKNOWLEDGE THAT YOU MAY NOT EARN ANY REWARDS IF LANDLORDS DO NOT MAKE
        LANDLORD CONTRIBUTION AFTER THE PLACEMENT OF YOUR RENTAL PROPERTY AND THAT WE HAVE NO CONTROL OVER WHETHER
        LANDLORD WILL MAKE SUCH REWARD.
      </B2>
      <B2>
        <strong>(d) Third-Party Payment Providers.</strong> We may use one or more third-party payment providers for
        holding and paying out the Reward when redeemed by you in accordance with this Agreement. We may use the
        following third-party providers to provide the services to you:
      </B2>
      <ul>
        <li>
          <B2>
            Stripe, Inc. (“<strong>Stripe</strong>”) as a third-party payment provider may charge a processing fee each
            time it processes a payment. Please review Stripe’s terms of service available at{' '}
            <a
              href="https://stripe.com/us/legal"
              className="text-brand hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              https://stripe.com/us/legal
            </a>{' '}
            to understand how Stripe processes payments, and Stripe’s privacy policy available at{' '}
            <a
              href="https://stripe.com/us/privacy"
              className="text-brand hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              https://stripe.com/us/privacy
            </a>{' '}
            to understand Stripe’s privacy practices.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            Plaid Technologies, Inc. (“<strong>Plaid</strong>”) to gather your data from financial institutions. By
            using the Services, you grant Lighthouse and Plaid the right, power, and authority to act on your behalf to
            access and transmit your personal and financial information from the relevant financial institution to our
            platform and the applicable landlord, and you agree to your personal and financial information being
            transferred, stored and processed by Plaid in accordance with Plaid’s terms and privacy policy available{' '}
            <a
              href="https://plaid.com/legal/"
              className="text-brand hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              here
            </a>
            .
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            You expressly authorize Lighthouse’s service provider, Dwolla, Inc. (“<strong>Dwolla</strong>”) to originate
            credit transfers to your financial institution account. You authorize us to collect and share with Dwolla
            your personal information including full name, email address and financial information, and you are
            responsible for the accuracy and completeness of that data. Dwolla’s Privacy Policy is available{' '}
            <a
              href="https://www.dwolla.com/legal/privacy/"
              className="text-brand hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              here
            </a>
            .
          </B2>
        </li>
      </ul>
      <B2>
        <strong>(e) Use of Landlord Materials.</strong> With respect to the residential listing information that we may
        make available through the Services (the “<strong>Landlord Materials</strong>”), you acknowledge that you may
        only use or reproduce such information for your personal and non-commercial use, for the sole purpose of
        viewing, considering suitability of and applying to the rental properties (collectively, the “
        <strong>Permitted Purpose</strong>”). For greater certainty: (i) you may not use or reproduce any Landlord
        Material for any purpose other than for the Permitted Purpose; and (ii) you may not modify, create derivative
        works based upon or distribute any Landlord Material.
      </B2>
    </section>

    <section>
      <H4>6. Taxes.</H4>
      <B2>
        Customer shall be responsible for all sales, use and excise taxes, and any other similar taxes, duties and
        charges of any kind imposed by any federal, state or local governmental entity on any amounts payable by
        Customer hereunder.
      </B2>
    </section>

    <section>
      <H4>7. Customer’s Obligations.</H4>
      <B2 style={{ marginBottom: '0.5rem' }}>
        <strong>(a)</strong> Customer shall:
      </B2>
      <div className="pl-3 mb-4">
        <B2 style={{ marginBottom: '0.5rem' }}>
          <strong>(i)</strong> ensure that only Customer including its authorized personnel, may use the Services;
        </B2>
        <B2 style={{ marginBottom: '0.5rem' }}>
          <strong>(ii)</strong> cooperate with Lighthouse in all matters relating to the Services and provide such
          access to Customer&#39;s properties, and such accommodations as may reasonably be requested by Lighthouse, for
          the purposes of performing the Services;
        </B2>
        <B2 style={{ marginBottom: '0.5rem' }}>
          <strong>(iii)</strong> respond promptly to any Lighthouse request to provide direction, information,
          approvals, authorizations or decisions that are reasonably necessary for Lighthouse to perform Services in
          accordance with the requirements of this Agreement;
        </B2>
        <B2 style={{ marginBottom: '0.5rem' }}>
          <strong>(iv)</strong> provide such Customer Materials as Lighthouse may reasonably request to carry out the
          Services in a timely manner and ensure that such Customer Materials are complete and accurate in all material
          respects; and
        </B2>
        <B2>
          <strong>(v)</strong> obtain and maintain all necessary licenses and consents and comply with all applicable
          laws in relation to Customer’s use of the Services before the date on which the Services are to start.
        </B2>
      </div>
      <B2>
        <strong>(b)</strong> If Lighthouse’s performance of its obligations under this Agreement is prevented or delayed
        by any act or omission of Customer or its agents, subcontractors, consultants or employees, Lighthouse shall not
        be deemed in breach of its obligations under this Agreement or otherwise liable for any costs, charges or losses
        sustained or incurred by Customer, in each case, to the extent arising directly or indirectly from such
        prevention or delay.
      </B2>
    </section>

    <section>
      <H4>8. Feedback.</H4>
      <B2>
        We welcome feedback, comments and suggestions for improvements to the Services (“<strong>Feedback</strong>”).
        You grant to us a non-exclusive, transferable, worldwide, perpetual, irrevocable, fully-paid, royalty-free
        license, with the right to sublicense, under any and all intellectual property rights that you own or control to
        use, copy, modify, create derivative works based upon and otherwise exploit the Feedback for any purpose.
      </B2>
    </section>

    <section>
      <H4>9. Ownership, License, Responsibility and Removal.</H4>
      <B2>
        <strong>(a) Definitions.</strong> For purposes of this Agreement: (i) “<strong>Materials</strong>” means works
        of authorship of any kind, text, graphics, images, music, software, audio, video, and information or other
        materials; (ii) “<strong>Lighthouse Materials</strong>” means Materials are posted, generated, provided or
        otherwise delivered to Customer, including Materials made available to Customer and other customers of
        Lighthouse through the Services. Landlord Materials form part of the Lighthouse Materials; (iii) “
        <strong>Customer Materials</strong>” means any Materials that you provide to Lighthouse to be made available
        through the Services; and (iv) “<strong>Intellectual Property Rights</strong>” means copyrights, patents, patent
        disclosures and inventions (whether patentable or not), trademarks service marks, trade secrets, know-how and
        other confidential information, trade dress, trade names, logos, corporate names and domain names, together with
        all of the goodwill associated therewith, derivative works and all other rights.
      </B2>
      <B2>
        <strong>(b) Lighthouse Ownership.</strong> Lighthouse does not claim any ownership rights in any Customer
        Material and nothing in this Agreement will be deemed to restrict any rights that you may have to use and
        exploit your Customer Materials. Subject to the foregoing and except for the license granted to Customer
        hereunder: (i) Lighthouse and its licensors exclusively own all right, title and interest in and to the Services
        and Lighthouse Materials, including all associated Intellectual Property Rights; and (ii) Without limiting
        Section 5(e), Lighthouse grants you a non-exclusive, limited, royalty-free, worldwide, non-sublicensable right
        and license to, during the Term, use the Lighthouse Materials solely in connection with Customer’s permitted use
        of the Services and solely for Customer’s personal and non-commercial purposes. You acknowledge that the
        Services and Lighthouse Materials are protected by copyright, trademark, and other laws of the United States and
        foreign countries. You agree not to remove, alter or obscure any copyright, trademark, service mark or other
        proprietary rights notices incorporated in or accompanying the Services or Lighthouse Materials.
      </B2>
      <B2>
        <strong>(c) Removal of Customer Materials.</strong> If applicable, you can remove your Customer Materials by
        specifically deleting it. However, in certain instances, some of your Customer Materials (such as posts or
        comments you make) may not be completely removed and copies of your Customer Materials may continue to exist on
        the Services. We are not responsible or liable for the removal or deletion of (or the failure or inability to
        remove or delete) any of your Customer Materials.
      </B2>
      <B2>
        <strong>(d) Rights in Customer Materials.</strong> By making any Customer Materials available to Lighthouse or
        through the Services, you hereby grant to Lighthouse a non-exclusive, transferable, perpetual, worldwide,
        royalty-free license, with the right to sublicense, to use, copy, modify, create derivative works based upon,
        distribute, publicly display, and publicly perform your Customer Materials in connection with: (i) operating and
        providing the Services to you; and (ii) use any Customer Materials for any purposes, including for improving
        Lighthouse’s product, services, methods and processes.
      </B2>
      <B2 className="mt-4">
        <strong>(e) Your Responsibility for Customer Materials.</strong> You are solely responsible for all your
        Customer Materials. You represent and warrant that you own all your Customer Materials or you have all rights
        that are necessary to grant us the license rights in your Customer Materials under this Agreement. You also
        represent and warrant that neither your Customer Materials, nor your use and provision of your Customer
        Materials to be made available through the Services, nor any use of your Customer Materials by Lighthouse on or
        through the Services will infringe, misappropriate or violate a third party’s intellectual property rights, or
        rights of publicity or privacy, or result in the violation of any applicable law or regulation. In the event
        that the Customer Materials contain private or personal matters concerning any individual person, you represent
        and warranty that such disclosure of Customer Materials by Customer to Lighthouse complies with all applicable
        privacy legislations.
      </B2>
    </section>

    <section>
      <H4>10. Rights and Terms for App.</H4>
      <B2>
        If and when available, and subject to your compliance with this Agreement, Lighthouse grants to you a limited
        non-exclusive, non-transferable license, with no right to sublicense, to download and install a copy of the App
        on a mobile device or computer that you own or control and to run such copy of the App solely for your own
        personal non-commercial purposes. You may not copy the App, except for making a reasonable number of copies for
        backup or archival purposes. Except as expressly permitted in this Agreement, you may not: (i) copy, modify or
        create derivative works based on the App; (ii) distribute, transfer, sublicense, lease, lend or rent the App to
        any third party; (iii) reverse engineer, decompile or disassemble the App; or (iv) make the functionality of the
        App available to multiple users through any means. Lighthouse reserves all rights in and to the App not
        expressly granted to you under this Agreement.
      </B2>
      <B2>
        <strong>(a) Accessing App from App Store.</strong> The following terms apply to any App accessed through or
        downloaded from any app store or distribution platform (like the Apple App Store or Google Play) where the App
        may now or in the future be made available (each an “<strong>App Provider</strong>”). You acknowledge and agree
        that:
      </B2>
      <ul>
        <li>
          <B2>
            This Agreement is concluded between you and Lighthouse, and not with the App Provider, and Lighthouse (not
            the App Provider), is solely responsible for the App.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            The App Provider has no obligation to furnish any maintenance and support services with respect to the App.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            In the event of any failure of the App to conform to any applicable warranty, you may notify the App
            Provider, and the App Provider will refund the purchase price for the App to you (if applicable) and, to the
            maximum extent permitted by applicable law, the App Provider will have no other warranty obligation
            whatsoever with respect to the App. Any other claims, losses, liabilities, damages, costs or expenses
            attributable to any failure to conform to any warranty will be the sole responsibility of Lighthouse.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            The App Provider is not responsible for addressing any claims you have or any claims of any third party
            relating to the App or your possession and use of the App, including, but not limited to: (i) product
            liability claims; (ii) any claim that the App fails to conform to any applicable legal or regulatory
            requirement; and (iii) claims arising under consumer protection or similar legislation.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            In the event of any third-party claim that the App or your possession and use of that App infringes that
            third party’s intellectual property rights, Lighthouse will be solely responsible for the investigation,
            defense, settlement and discharge of any such intellectual property infringement claim to the extent
            required by this Agreement.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            The App Provider, and its subsidiaries, are third-party beneficiaries of this Agreement as related to your
            license to the App, and that, upon your acceptance of the terms of this Agreement, the App Provider will
            have the right (and will be deemed to have accepted the right) to enforce this Agreement as related to your
            license of the App against you as a third-party beneficiary thereof.
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government
            embargo, or that has been designated by the U.S. Government as a terrorist-supporting country; and (ii) you
            are not listed on any U.S. Government list of prohibited or restricted parties.
          </B2>
        </li>
        <li className="mt-2">
          <B2>You must also comply with all applicable third-party terms of service when using the App.</B2>
        </li>
      </ul>
    </section>

    <section>
      <H4>11. General Prohibitions and Lighthouse’s Enforcement Rights.</H4>
      <B2>You agree not to do any of the following:</B2>
      <B2>
        <strong>(a)</strong> Provide, post, upload, publish, submit, or transmit any Customer Material that: (i)
        infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights
        or other intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages any
        conduct that would violate, any applicable law or regulation or would give rise to civil liability; (iii) is
        fraudulent, false, misleading or deceptive; (iv) is defamatory, obscene, pornographic, vulgar or offensive; (v)
        promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group; (vi) is
        violent or threatening or promotes violence or actions that are threatening to any person or entity; or (vii)
        promotes illegal or harmful activities or substances;
      </B2>
      <B2>
        <strong>(b)</strong> Use, display, mirror or frame the Services or any individual element within the Services,
        Lighthouse’s name, any Lighthouse trademark, logo or other proprietary information, or the layout and design of
        any page or form contained on a page, without Lighthouse’s express written consent;
      </B2>
      <B2>
        <strong>(c)</strong> Access, tamper with, or use non-public areas of the Services, Lighthouse’s computer
        systems, or the technical delivery systems of Lighthouse’s providers;
      </B2>
      <B2>
        <strong>(d)</strong> Attempt to probe, scan or test the vulnerability of any Lighthouse system or network or
        breach any security or authentication measures;
      </B2>
      <B2>
        <strong>(e)</strong> Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any
        technological measure implemented by Lighthouse or any of Lighthouse’s providers or any other third party
        (including another user) to protect the Services or Lighthouse Materials;
      </B2>
      <B2>
        <strong>(f)</strong> Attempt to access or search the Services or download Materials from the Services through
        the use of any engine, software, tool, agent, device or mechanism (including spiders, robots, crawlers, data
        mining tools or the like) other than the software and/or search agents provided by Lighthouse or other generally
        available third-party web browsers;
      </B2>
      <B2>
        <strong>(g)</strong> Send any unsolicited or unauthorized advertising, promotional materials, email, junk mail,
        spam, chain letters or other form of solicitation;
      </B2>
      <B2>
        <strong>(h)</strong> Use any meta tags or other hidden text or metadata utilizing a Lighthouse trademark, logo
        URL or product name without Lighthouse’s express written consent;
      </B2>
      <B2>
        <strong>(i)</strong> Use the Services or Lighthouse Materials, or any portion thereof, for any commercial
        purpose or for the benefit of any third party or in any manner not permitted by this Agreement;
      </B2>
      <B2>
        <strong>(j)</strong> Attempt to decipher, decompile, disassemble or reverse engineer any of the software used to
        provide the Services or Lighthouse Materials;
      </B2>
      <B2>
        <strong>(k)</strong> Interfere with, or attempt to interfere with, the access of any user, host or network,
        including, without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing the Services;
      </B2>
      <B2>
        <strong>(l)</strong> Collect or store any personally identifiable information from the Services from other users
        of the Services without their express permission;
      </B2>
      <B2>
        <strong>(m)</strong> Impersonate or misrepresent your affiliation with any person or entity;
      </B2>
      <B2>
        <strong>(n)</strong> Violate any applicable law or regulation; or
      </B2>
      <B2>
        <strong>(o)</strong> Encourage or enable any other individual to do any of the foregoing.
      </B2>
      <B2>
        Although we’re not obligated to monitor access to or use of the Services or Customer Materials or to review or
        edit any Customer Materials, we have the right to do so for the purpose of operating the Services, to ensure
        compliance with this Agreement and to comply with applicable law or other legal requirements. We reserve the
        right, but are not obligated, to remove or disable access to any Services or Customer Materials, at any time and
        without notice, including, but not limited to, if we, at our sole discretion, consider any Customer Material to
        be objectionable or in violation of this Agreement. We have the right to investigate violations of this
        Agreement or conduct that affects the Services. We may also consult and cooperate with law enforcement
        authorities to prosecute users who violate the law.
      </B2>
    </section>

    <section>
      <H4>12. DMCA/Copyright Policy.</H4>
      <B2>
        Lighthouse respects copyright law and expects its users to do the same. It is Lighthouse’s policy to terminate
        in appropriate circumstances Account holders who repeatedly infringe or are believed to be repeatedly infringing
        the rights of copyright holders. Please see Lighthouse’s Copyright and IP Policy at www.lighthouse.app/privacy,
        for further information.
      </B2>
    </section>

    <section>
      <H4>13. Links to Third-Party Websites or Resources.</H4>
      <B2>
        The Services (including the App) may contain links to third-party websites or resources. We provide these links
        only as a convenience and are not responsible for the content, products or services on or available from those
        websites or resources or links displayed on such websites. You acknowledge sole responsibility for and assume
        all risk arising from, your use of any third-party websites or resources.
      </B2>
    </section>

    <section>
      <H4>14. Term and Termination.</H4>
      <B2>
        <strong>(a)</strong> This Agreement shall begin on Customer’s use of or access to the Services and shall remain
        in effect for as long as Customer continues to use the Services, unless terminated earlier in accordance with
        this Section (the “<strong>Term</strong>”).
      </B2>
      <B2>
        <strong>(b)</strong> We may terminate your access to and use of the Services, at our sole discretion, at any
        time and without notice to you. You may cancel your Account at any time by sending an email to us at
        hello@lighthouse.app. Upon any termination, discontinuation or cancellation of the Services or your Account, the
        following Sections will survive: 1, 3, 4, 5, 8, 9, 11, 14(c), 15 and 18 to 21.
      </B2>
      <B2>
        <strong>(c)</strong> Upon termination or expiration of this Agreement, Customer shall promptly return to
        Lighthouse or destroy (in accordance with Lighthouse’s instructions) all Confidential Information of Lighthouse,
        the applicable Lighthouse Materials, and all copies and portions thereof, in all forms and types of media. Upon
        expiration or termination of this Agreement, all licenses granted under the Agreement shall terminate and
        Customer must immediately cease to use any Lighthouse Materials any other information or material provided by
        Lighthouse hereunder. Customer shall pay Lighthouse for any unpaid fees for Services already performed and any
        other unpaid costs incurred by Lighthouse up to the expiration or termination.
      </B2>
    </section>

    <section>
      <H4>15. Warranty Disclaimers.</H4>
      <B2>
        THE SERVICES (INCLUDING ALL LIGHTHOUSE MATERIALS) ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND. WITHOUT
        LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, QUIET ENJOYMENT AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR
        USAGE OF TRADE. We make no warranty that the Services will meet your requirements or be available on an
        uninterrupted, secure, or error-free basis. We make no warranty regarding the quality, accuracy, timeliness,
        truthfulness, completeness or reliability of any Service or Lighthouse Material.
      </B2>
    </section>

    <section>
      <H4>16. Indemnity.</H4>
      <B2>
        You will indemnify and hold harmless Lighthouse and its affiliates, and their respective officers, directors,
        employees and agents, from and against any claims, disputes, demands, liabilities, damages, losses, and costs
        and expenses, including, without limitation, reasonable legal and accounting fees arising out of or in any way
        connected with (i) your access to or use of the Services or Lighthouse Materials, (ii) your Customer Materials,
        or (iii) your violation of this Agreement.
      </B2>
    </section>

    <section>
      <H4>17. Limitation of Liability.</H4>
      <B2>
        <strong>(a)</strong> NEITHER LIGHTHOUSE NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE
        SERVICES OR LIGHTHOUSE MATERIALS WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES,
        OR DAMAGES FOR LOST PROFITS, LOST REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR GOODWILL,
        SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE SERVICES OF ANY KIND ARISING
        OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR FROM THE USE OF OR INABILITY TO USE THE SERVICES OR LIGHTHOUSE
        MATERIALS, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER
        LEGAL THEORY, AND WHETHER OR NOT LIGHTHOUSE OR ANY OTHER PARTY HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH
        DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE. SOME
        JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO
        THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
      </B2>
      <B2>
        <strong>(b)</strong> SUBJECT TO THE FOREGOING, IN NO EVENT WILL LIGHTHOUSE’S TOTAL LIABILITY ARISING OUT OF OR
        IN CONNECTION WITH THIS AGREEMENT OR FROM THE USE OF OR INABILITY TO USE THE SERVICES OR THE LIGHTHOUSE
        MATERIALS EXCEED THE GREATER OF (I) THE AMOUNTS YOU HAVE PAID TO LIGHTHOUSE FOR USE OF THE SERVICES; AND (II)
        ONE HUNDRED DOLLARS.
      </B2>
      <B2>
        <strong>(c)</strong> THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE
        BASIS OF THE BARGAIN BETWEEN LIGHTHOUSE AND YOU.
      </B2>
    </section>

    <section>
      <H4>18. Governing Law and Forum Choice.</H4>
      <B2>
        This Agreement and any action related thereto will be governed by the Federal Arbitration Act, federal
        arbitration law, and the laws of the State of California, without regard to its conflict of laws provisions.
        Except as otherwise expressly set forth in Section 19 “Dispute Resolution,” the exclusive jurisdiction for all
        Disputes (defined below) that you and Lighthouse are not required to arbitrate will be the state and federal
        courts located in the Northern District of California, and you and Lighthouse each waive any objection to
        jurisdiction and venue in such courts.
      </B2>
    </section>

    <section>
      <H4>19. Dispute Resolution.</H4>
      <B2>
        <strong>(a) Mandatory Arbitration of Disputes.</strong> You and Lighthouse each agrees that any dispute, claim
        or controversy arising out of or relating to this Agreement or the breach, termination, enforcement,
        interpretation or validity thereof or the use of the Services or Lighthouse Materials (collectively, “
        <strong>Disputes</strong>”) will be resolved{' '}
        <strong>
          solely by binding, individual arbitration and not in a class, representative or consolidated action or
          proceeding
        </strong>
        . You and Lighthouse agree that the <em>U.S. Federal Arbitration Act</em>
        governs the interpretation and enforcement of this Agreement, and that you and Lighthouse are each waiving the
        right to a trial by jury or to participate in a class action. This arbitration provision shall survive
        termination of this Agreement.
      </B2>
      <B2>
        <strong>(b) Exceptions and Opt-out.</strong> As limited exceptions to Section 19(a) above: (i) you may seek to
        resolve a Dispute in small claims court if it qualifies; and (ii) we each retain the right to seek injunctive or
        other equitable relief from a court to prevent (or enjoin) the infringement or misappropriation of our
        intellectual property rights. In addition,{' '}
        <strong>you will retain the right to opt out of arbitration entirely and litigate any Dispute</strong> if you
        provide us with written notice of your desire to do so by email at hello@lighthouse.app or by regular mail at 33
        Tehama St. Apt. 30e San Francisco, CA 94105 within thirty (30) days following the date you first agree to this
        this Agreement.
      </B2>
      <B2>
        <strong>(c) Conducting Arbitration and Arbitration Rules.</strong> The arbitration will be conducted by the
        American Arbitration Association (“<strong>AAA</strong>”) under its Consumer Arbitration Rules (the “
        <strong>AAA Rules</strong>”) then in effect, except as modified by this Agreement. The AAA Rules are available
        at{' '}
        <a href="http://www.adr.org/" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
          www.adr.org
        </a>{' '}
        or by calling 1-800-778-7879. A party who wishes to start arbitration must submit a written Demand for
        Arbitration to AAA and give notice to the other party as specified in the AAA Rules. The AAA provides a form
        Demand for Arbitration at{' '}
        <a
          href="http://www.adr.org/aaa/ShowPDF?doc=ADRSTG_004175"
          className="text-brand hover:underline"
          target="_blank"
          rel="noopener noreferrer">
          www.adr.org
        </a>
        .
      </B2>
      <B2>
        If your claim is for U.S. $10,000 or less, you may choose whether the arbitration will be conducted solely on
        the basis of documents submitted to the arbitrator, through a telephonic or video-conference hearing, or by an
        in-person hearing as established by the AAA Rules. If your claim exceeds U.S. $10,000, the right to a hearing
        will be determined by the AAA Rules. Any arbitration hearings will take place in the county (or parish) where
        you live, unless we both agree to a different location. The parties agree that the arbitrator shall have
        exclusive authority to decide all issues relating to the interpretation, applicability, enforceability and scope
        of this arbitration agreement.
      </B2>
      <B2>
        <strong>(d) Arbitration Costs.</strong> Payment of all filing, administration and arbitrator fees will be
        governed by the AAA Rules. We’ll pay for all filing, administration and arbitrator fees and expenses if your
        Dispute is for less than $10,000, unless the arbitrator finds your Dispute frivolous. If we prevail in
        arbitration we’ll pay all of our attorneys’ fees and costs and won’t seek to recover them from you. If you
        prevail in arbitration you will entitled to an award of attorneys’ fees and expenses to the extent provided
        under applicable law.
      </B2>
      <B2>
        <strong>
          (e) Class Action Waiver. YOU AND Lighthouse AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR
          ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
          PROCEEDING.
        </strong>{' '}
        Further, if the parties’ dispute is resolved through arbitration, the arbitrator may not consolidate another
        person’s claims with your claims, and may not otherwise preside over any form of a representative or class
        proceeding. If this specific provision is found to be unenforceable, then the entirety of this Dispute
        Resolution section shall be null and void.
      </B2>
      <B2>
        <strong>(f) Effect of Changes on Arbitration.</strong> Notwithstanding the provisions of Section 3 “Changes to
        Terms or Services” above, if Lighthouse changes any of the terms of this Section 19 “Dispute Resolution” after
        the date you first accepted this Agreement (or accepted any subsequent changes to this Agreement), you may
        reject any such change by sending us written notice (including by email to hello@lighthouse.app) within thirty
        (30) days of the date such change became effective, as indicated in the “Last Updated” date above or in the date
        of Lighthouse’s email to you notifying you of such change. By rejecting any change, you are agreeing that you
        will arbitrate any Dispute between you and Lighthouse in accordance with the terms of this Section 19 “Dispute
        Resolution” as of the date you first accepted this Agreement (or accepted any subsequent changes to this
        Agreement).
      </B2>
      <B2>
        <strong>(g) Severability.</strong> With the exception of any of the provisions in Section 19(e) of this
        Agreement (“Class Action Waiver”), if an arbitrator or court of competent jurisdiction decides that any part of
        this Agreement is invalid or unenforceable, the other parts of this Agreement will still apply.
      </B2>
    </section>

    <section>
      <H4>20. Confidential Information.</H4>
      <B2>
        All non-public, confidential or proprietary information of Lighthouse, including, but not limited to, trade
        secrets, technology, information pertaining to business operations and strategies, and information pertaining to
        customers, pricing, and marketing (collectively, “<strong>Confidential Information</strong>”), disclosed to
        Customer, whether disclosed orally or disclosed or accessed in written, electronic or other form or media, and
        whether or not marked, designated or otherwise identified as “confidential,” in connection with this Agreement
        is confidential, and shall not be disclosed by Customer without Lighthouse’s prior written consent. Confidential
        Information does not include information that is: (i) in the public domain; (ii) known to Customer at the time
        of disclosure; or (iii) rightfully obtained by Customer on a non-confidential basis from a third party.
        Lighthouse shall be entitled to injunctive relief for any violation of this Section. Customer agrees to use
        Lighthouse’s Confidential Information only to make use of the Services.
      </B2>
    </section>

    <section>
      <H4>21. General Terms.</H4>
      <B2>
        <strong>(a) Entire Agreement.</strong> This Agreement constitutes the entire and exclusive understanding and
        agreement between Lighthouse and you regarding the Services, and this Agreement supersedes and replaces any and
        all prior oral or written understandings or agreements between Lighthouse and you regarding the Services. If any
        provision of this Agreement is held invalid or unenforceable by an arbitrator or a court of competent
        jurisdiction, that provision will be enforced to the maximum extent permissible and the other provisions of this
        Agreement will remain in full force and effect. You may not assign or transfer this Agreement, by operation of
        law or otherwise, without Lighthouse’s prior written consent. Any attempt by you to assign or transfer this
        Agreement, without such consent, will be null. Lighthouse may freely assign or transfer this Agreement without
        restriction. Subject to the foregoing, this Agreement will bind and inure to the benefit of the parties, their
        successors and permitted assigns.
      </B2>
      <B2>
        <strong>(b) Notices.</strong> Any notices or other communications provided by Lighthouse under this Agreement,
        including those regarding modifications to this Agreement, will be given: (i) via email; or (ii) by posting to
        the Services. For notices made by e-mail, the date of receipt will be deemed the date on which such notice is
        transmitted.
      </B2>
      <B2>
        <strong>(c) Waiver of Rights.</strong> Lighthouse’s failure to enforce any right or provision of this Agreement
        will not be considered a waiver of such right or provision. The waiver of any such right or provision will be
        effective only if in writing and signed by a duly authorized representative of Lighthouse. Except as expressly
        set forth in this Agreement, the exercise by either party of any of its remedies under this Agreement will be
        without prejudice to its other remedies under this Agreement or otherwise.
      </B2>
      <B2>
        <strong>(d) Force Majeure.</strong> Lighthouse shall not be liable or responsible to Customer, nor be deemed to
        have defaulted or breached this Agreement, for any failure or delay in fulfilling or performing any term of this
        Agreement when and to the extent such failure or delay is caused by or results from acts or circumstances beyond
        the reasonable control of Lighthouse including, without limitation, acts of God, flood, fire, earthquake,
        explosion, governmental actions, war, invasion or hostilities (whether war is declared or not), terrorist
        threats or acts, riot, or other civil unrest, national emergency, revolution, insurrection, epidemic, lock-outs,
        strikes or other labor disputes (whether or not relating to either party&#39;s workforce), or restraints or
        delays affecting carriers or inability or delay in obtaining supplies of adequate or suitable materials,
        materials or telecommunication breakdown or power outage.
      </B2>
    </section>

    <section>
      <H4>22. Contact Information.</H4>
      <B2>
        If you have any questions about this Agreement or the Services, please contact Lighthouse at{' '}
        <a className="text-brand hover:underline" href="mailto:hello@lighthouse.app">
          hello@lighthouse.app
        </a>
        .
      </B2>
    </section>
  </div>
);

export default Terms;
