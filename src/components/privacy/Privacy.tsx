import React from 'react';
import { B2, H2, H4, H5 } from '@components/shared/Typography';

import './privacy.css';

const Privacy: React.FC = () => (
  <div className="py-20 mt-4 md:mt-16 mx-auto max-w-4xl text-light privacy-content px-3">
    <H2 className="mb-1">Privacy Policy</H2>
    <B2 className="mb-6" color="text-gray-soft">
      Updated July 30, 2020
    </B2>
    <B2>
      Lighthouse Financial Technologies, Inc. (“Lighthouse”) is an apartment rental site that provides cash back rental
      rewards for paying rent on time each month. Our Privacy Policy (“Privacy Policy”) is designed to help you
      understand how we collect, use and share your personal information and to assist you in exercising the privacy
      rights available to you.
    </B2>

    <section>
      <H4>SCOPE</H4>
      <B2>
        This Privacy Policy applies to personal information processed by us in our business, including on our websites,
        mobile applications, and other online or offline offerings (collectively, the “Services”).
      </B2>
    </section>

    <section>
      <H4>1. PERSONAL INFORMATION WE COLLECT.</H4>
      <B2>
        The categories of personal information we collect depend on whether you are a customer, user, applicant or
        visitor, and the requirements of applicable law.
      </B2>

      <section>
        <H5>Information You Provide to Us.</H5>
        <B2>
          <strong>Account Creation.</strong> When you create a user account, we collect your name, email address, phone
          number, username, and password.
        </B2>
        <B2>
          <strong>Apartment Application Process</strong>. If you apply for an apartment, we may collect additional
          information, including the date of your move, the apartment unit that you are interested in, and your interest
          in additional products or services that we may provide.
        </B2>
        <B2>
          <strong>Brokerage Account Information.</strong> If you sign up to our brokerage account services, we collect
          certain information including but not limited to, information to set up your account including your date of
          birth, occupation, income, and social security number, information related to your current bank accounts,
          including transaction information and account balance, and information related to your creditworthiness.
        </B2>
        <B2>
          <strong>Financial Information.</strong> In order to provide the Services, we work with Plaid to get
          information from the financial institutions and other financial service providers that maintain your financial
          accounts. This information includes, but is not limited to, account information, information about your
          account balances (including current and available balances), payment amounts and dates, information about
          account transactions, including amount, date, type, quantity, price, and a description of the transaction, and
          other information.
        </B2>
        <B2>
          The data collected via Plaid from your financial accounts may include information from all your sub-accounts
          (e.g., checking, savings, and credit card) accessible through a single set of account credentials.
        </B2>
        <B2>
          Please note that this Privacy Policy does not govern Plaid’s processing of your information. For details on
          Plaid’s processing of your information, please read{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-brand hover:underline"
            href="https://plaid.com/legal/#end-user-privacy-policy">
            Plaid’s End User Privacy Policy
          </a>
          .
        </B2>
        <B2>
          <strong>Referral Program</strong>. When you participate in our referral program, you will be asked to create
          an account, and provide your financial account credentials in order to process your referral bonus payments.
        </B2>
        <B2>
          <strong>Your Communications with Us</strong>. We collect personal information from you such as name, email
          address, phone number, or mailing address when you request information about our Services, request access to
          our Services in your city, register for our newsletter or loyalty program, request customer or technical
          support, apply for a job or otherwise communicate with us.
        </B2>
        <B2>
          <strong>Surveys</strong>. We may contact you to participate in surveys. If you decide to participate, you may
          be asked to provide certain information which may include personal information.
        </B2>
        <B2>
          <strong>Social Media Content</strong>. We may offer forums, blogs, or social media pages. Any content you
          provide on these channels will be considered “public” and is not subject to privacy protections.
        </B2>
        <B2>
          <strong>Registration for Sweepstakes or Contests</strong>. We may run sweepstakes and contests. Contact
          information you provide may be used to reach you about the sweepstakes or contest and for other promotional,
          marketing and business purposes, if permitted by law. In some jurisdictions, we are required to publicly share
          information of winners.
        </B2>
      </section>

      <section>
        <H5>Information Collected Automatically or From Others.</H5>
        <B2>
          <strong>Automatic Data Collection</strong>. We may collect certain information automatically when you use the
          Services. This information may include your Internet protocol (IP) address, user settings, MAC address, cookie
          identifiers, mobile carrier, mobile advertising and other unique identifiers, details about your browser,
          operating system or device, location information, Internet service provider, pages that you visit before,
          during and after using the Services, information about the links you click, and other information about how
          you use the Services. Information we collect may be associated with accounts and other devices.
        </B2>
        <B2>
          In addition, we may automatically collect data regarding your use of our Services, such as the types of
          content you interact with and the frequency and duration of your activities. We may combine your information
          with information that other people provide when they use our Services, including information about you when
          they tag you.
        </B2>
        <B2>
          <strong>Precise Geolocation Data</strong>. We may collect precise geolocation data when you use our Services,
          which helps us offer more relevant apartment listings and improve our Services. Your location can be
          determined with varying degrees of accuracy by:
        </B2>
        <ul>
          <li>
            <B2>GPS</B2>
          </li>
          <li>
            <B2>
              <a
                className="text-brand hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://policies.google.com/privacy?hl=en-US#footnote-ip">
                IP address
              </a>
            </B2>
          </li>
          <li>
            <B2>
              <a
                className="text-brand hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://policies.google.com/privacy?hl=en-US#footnote-sensor-data">
                Sensor data from your device
              </a>
            </B2>
          </li>
          <li>
            <B2>
              <a
                className="text-brand hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://policies.google.com/privacy?hl=en-US#footnote-near-device">
                Information about things near your device
              </a>
              , such as Wi-Fi access points, cell towers, and Bluetooth-enabled devices
            </B2>
          </li>
        </ul>
        <B2>
          The types of location information we collect may vary depending, in part, on your device and app settings. For
          example, you can{' '}
          <a
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://support.google.com/accounts?p=privpol_location&amp;hl=en_US">
            turn your Android device’s location on or off
          </a>{' '}
          using the device’s settings app.
        </B2>
        <B2>
          <strong>
            Cookies, Pixel Tags/Web Beacons, Analytics Information, and Interest-Based Advertising technologies
          </strong>
          . We, as well as third parties that provide content, advertising, or other functionality on the Services, may
          use cookies, pixel tags, local storage, and other technologies (“Technologies”) to automatically collect
          information through the Services. Technologies are essentially small data files placed on your computer,
          tablet, mobile phone, or other devices that allow us and our partners to record certain pieces of information
          whenever you visit or interact with our Services.
        </B2>
        <ul>
          <li>
            <B2>
              <strong>Cookies</strong>. Cookies are small text files placed in visitors’ computer browsers to store
              their preferences. Most browsers allow you to block and delete cookies. However, if you do that, the
              Services may not work properly.
            </B2>
          </li>
          <li className="mt-2">
            <B2>
              <strong>Pixel Tags/Web Beacons</strong>. A pixel tag (also known as a web beacon) is a piece of code
              embedded in the Services that collects information about users’ engagement on that web page. The use of a
              pixel allows us to record, for example, that a user has visited a particular web page or clicked on a
              particular advertisement.
            </B2>
          </li>
        </ul>
        <B2>
          <strong>Analytics</strong>. We may also use Google Analytics and other service providers to collect
          information regarding visitor behavior and visitor demographics on our Services. For more information about
          Google Analytics, please visit{' '}
          <a
            className="text-brand hover:underline"
            target="_blank"
            href="https://www.google.com/policies/privacy/partners/"
            rel="noopener noreferrer">
            www.google.com/policies/privacy/partners
          </a>
          . You can opt out of Google’s collection and processing of data generated by your use of the Services by going
          to{' '}
          <a
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://tools.google.com/dlpage/gaoptout">
            https://tools.google.com/dlpage/gaoptout
          </a>
          .
        </B2>
        <B2>
          We may also use Facebook Pixel to collect information regarding your interaction with our Facebook and online
          advertisements. For more information about Facebook Pixel, please visit{' '}
          <a
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/business/help/742478679120153?id=1205376682832142">
            https://www.facebook.com/business/help
          </a>
          . You can change your Facebook ad settings by following the steps outlined here:{' '}
          <a
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/help/568137493302217">
            https://www.facebook.com/help
          </a>
        </B2>
        <B2>
          <strong>Information from Other Sources.</strong> We may obtain information about you from other sources,
          including through third party services and organizations to supplement information provided by you. For
          example, if you access our Services through a third-party application, such as an app store, , we may collect
          information about you from that third-party application that you have made public via your privacy settings.
          Information we collect through these services may include your name, your user identification number, your
          username, location, gender, birth date, email, profile picture, and your contacts stored in that service. This
          supplemental information allows us to verify information that you have provided to us and to enhance our
          ability to provide you with information about our business, products, and Services.
        </B2>
      </section>
    </section>

    <section>
      <H4>2. HOW WE USE YOUR INFORMATION.</H4>
      <B2>We use your information for a variety of business purposes, including to:</B2>
      <B2 style={{ marginBottom: '0.5rem' }}>
        <strong>Fulfil our contract with you and provide you with our Services, such as:</strong>
      </B2>
      <ul>
        <li>
          <B2>Managing your information and accounts;</B2>
        </li>
        <li>
          <B2>Providing access to certain areas, functionalities, and features of our Services;</B2>
        </li>
        <li>
          <B2>Connecting you with apartment owners who participate in our Services;</B2>
        </li>
        <li>
          <B2>Providing brokerage account services;</B2>
        </li>
        <li>
          <B2>Communicating with you about your account, activities on our Services and policy changes;</B2>
        </li>
        <li>
          <B2>Undertaking activities to verify or maintain the quality or safety of a service or device;</B2>
        </li>
        <li>
          <B2>Processing your financial information and other payment methods for products or Services purchased;</B2>
        </li>
        <li>
          <B2>Providing advertising, analytics and marketing services;</B2>
        </li>
        <li>
          <B2>
            Providing Services on behalf of our customers, such as maintaining or servicing accounts, providing customer
            service, and verifying customer information;
          </B2>
        </li>
        <li>
          <B2>Processing employment applications;</B2>
        </li>
        <li>
          <B2>Processing apartment applications and transactions; and</B2>
        </li>
        <li>
          <B2>Allowing you to register for events.</B2>
        </li>
      </ul>

      <B2 style={{ marginBottom: '0.5rem' }}>
        <strong>Analyze and improve our Services pursuant to our legitimate interest, such as:</strong>
      </B2>
      <ul>
        <li>
          <B2>
            Detecting security incidents, protecting against malicious, deceptive, fraudulent or illegal activity, and
            prosecuting those responsible for that activity;
          </B2>
        </li>
        <li>
          <B2>
            Measuring interest and engagement in our Services and short-term, transient use, such as contextual
            customization of ads;
          </B2>
        </li>
        <li>
          <B2>Undertaking research for technological development and demonstration;</B2>
        </li>
        <li>
          <B2>
            Researching and developing products, services, marketing or security procedures to improve their
            performance, resilience, reliability or efficiency;
          </B2>
        </li>
        <li>
          <B2>Improving, upgrading or enhancing our Services or device [or those of our Providers];</B2>
        </li>
        <li>
          <B2>Developing new products and Services;</B2>
        </li>
        <li>
          <B2>Ensuring internal quality control;</B2>
        </li>
        <li>
          <B2>Verifying your identity and preventing fraud;</B2>
        </li>
        <li>
          <B2>Debugging to identify and repair errors that impair existing intended functionality;</B2>
        </li>
        <li>
          <B2>Enforcing our terms and policies; and</B2>
        </li>
        <li>
          <B2>
            Complying with our legal obligations, protecting your vital interest, or as may be required for the public
            good.
          </B2>
        </li>
      </ul>

      <B2 style={{ marginBottom: '0.5rem' }}>
        <strong>Provide you with additional content and Services, such as</strong>:
      </B2>
      <ul>
        <li>
          <B2>
            Furnishing you with customized materials about offers, products, and Services that may be of interest,
            including new content or Services;
          </B2>
        </li>
        <li>
          <B2>Auditing relating to interactions, transactions and other compliance activities; and</B2>
        </li>
        <li>
          <B2>
            Other purposes you consent to, are notified of, or are disclosed when you provide personal information.
          </B2>
        </li>
      </ul>

      <B2>
        <strong>De-identified and Aggregated Information Use.</strong> We may use personal information and other data
        about you to create de-identified and aggregated information, such as de-identified demographic information,
        de-identified location information, information about the computer or device from which you access our Services,
        or other analyses we create.
      </B2>
      <B2>
        <strong>Share Content with Friends or Colleagues.</strong> Our Services may offer various tools and
        functionalities. For example, we may allow you to provide information about your friends through our referral
        services. Our referral services may allow you to forward or share certain content with a friend or colleague,
        such as an email inviting your friend to use our Services.
      </B2>
      <B2>
        <strong>How We Use Automatic Collection Technologies.</strong> We, as well as third parties that provide
        content, advertising, or other functionality on the Services, may use cookies, pixel tags, local storage, and
        other technologies to automatically collect information through the Services. Our uses of these Technologies
        fall into the following general categories:
      </B2>
      <ul>
        <li>
          <B2>
            <strong>Operationally Necessary</strong>. This includes Technologies that allow you access to our Services,
            applications, and tools that are required to identify irregular site behavior, prevent fraudulent activity
            and improve security or that allow you to make use of our functionality;
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            <strong>Performance Related</strong>. We may use Technologies to assess the performance of our Services,
            including as part of our analytic practices to help us understand how our visitors use the Services;
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            <strong>Functionality Related</strong>. We may use Technologies that allow us to offer you enhanced
            functionality when accessing or using our Services. This may include identifying you when you sign into our
            Services or keeping track of your specified preferences, interests, or past items viewed;
          </B2>
        </li>
        <li className="mt-2">
          <B2>
            <strong>Advertising or Targeting Related</strong>. We may use first party or third-party Technologies to
            deliver content, including ads relevant to your interests, on our Services or on third party sites.
          </B2>
        </li>
      </ul>
      <B2>
        <strong>Cross-Device Tracking</strong>. Your browsing activity may be tracked across different websites and
        different devices or apps. For example, we may attempt to match your browsing activity on your mobile device
        with your browsing activity on your laptop. To do this our technology partners may share data, such as your
        browsing patterns, geo-location and device identifiers, and will match the information of the browser and
        devices that appear to be used by the same person.
      </B2>
      <B2>
        <strong>Notice Regarding Third Party Websites, Social Media Platforms and Software Development Kits.</strong>{' '}
        The Services may contain links to other websites, and other websites may reference or link to our website or
        other Services. These other websites are not controlled by us. We encourage our users to read the privacy
        policies of each website and application with which they interact. We do not endorse, screen or approve and are
        not responsible for the privacy practices or content of such other websites or applications. Visiting these
        other websites or applications is at your own risk.
      </B2>
      <B2>
        Our Services may include publicly accessible blogs, forums, social media pages, and private messaging features.
        By using such Services, you assume the risk that the personal information provided by you may be viewed and used
        by third parties for any number of purposes. In addition, social media buttons such as Facebook and Twitter
        (that might include widgets such as the “share this” button or other interactive mini-programs) may be on our
        site. These features may collect your IP address, which page you are visiting on our site, and may set a cookie
        to enable the feature to function properly. These social media features are either hosted by a third party or
        hosted directly on our site. Your interactions with these features apart from your visit to our site are
        governed by the privacy policy of the company providing it.
      </B2>
      <B2>
        We may use third party APIs and software development kits (“SDKs”) as part of the functionality of our Services.
        APIs and SDKs may allow third parties including analytics and advertising partners to collect your personal
        information for various purposes including to provide analytics services and content that is more relevant to
        you. For more information about our use of APIs and SDKs, please contact us as set forth below.
      </B2>
    </section>

    <section>
      <H4>3. DISCLOSING YOUR INFORMATION TO THIRD PARTIES.</H4>
      <B2>
        Except as provided below, we do not sell or disclose your personal information. We have not sold consumers’
        personal information in the preceding 12 months. We have disclosed the following categories of personal
        information about consumers for a business purpose in the past 12 months.
      </B2>
      <B2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand font-normal hover:underline"
          href="https://www.notion.so/71764a75eb38466884f3650edb81c9d2">
          Disclosure
        </a>
      </B2>
      <B2>
        <strong>Service Providers.</strong>
        We may share any personal information we collect about you with our third- party service providers. The
        categories of service providers (processors) to whom we entrust personal information include: IT and related
        services; information and services; payment providers; customer service providers; and vendors to support the
        provision of the Services.
      </B2>
      <B2>
        We use Plaid to link your bank account and payment information through our Services. We may share certain
        personal information with Plaid including your phone number, email address, and log in information to verify
        your identity before linking your bank account information through our Services. We encourage you to review
        Plaid’s{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
          href="https://plaid.com/legal/#end-user-privacy-policy.">
          privacy policy
        </a>{' '}
        to learn about their privacy practices.
      </B2>
      <B2>
        <strong>Business Partners.</strong> We may provide personal information to business partners with whom we
        jointly offer products or services. In such cases, our business partner’s name will appear along with ours.
      </B2>
      <B2>
        <strong>Affiliates.</strong> We may share personal information with our affiliated companies.
      </B2>
      <B2>
        <strong>Advertising Partners.</strong> Through our Services, we may allow third party advertising partners to
        set Technologies and other tracking tools to collect information regarding your activities and your device
        (e.g., your IP address, mobile identifiers, page(s) visited, location, time of day). We may also combine and
        share such information and other information (such as demographic information and past purchase history) with
        third party advertising partners. These advertising partners may use this information (and similar information
        collected from other websites) for purposes of delivering targeted advertisements to you when you visit third
        party websites within their networks. This practice is commonly referred to as “interest-based advertising” or
        “online behavioral advertising. We may allow access to other data collected by the Services to share information
        that may be useful, relevant, valuable or otherwise of interest to you. If you prefer not to share your personal
        information with third party advertising partners, you may follow the instructions below.
      </B2>
      <B2>
        <strong>Disclosures to Protect Us or Others.</strong> We may access, preserve, and disclose any information we
        store associated with you to external parties if we, in good faith, believe doing so is required or appropriate
        to: comply with law enforcement or national security requests and legal process, such as a court order or
        subpoena; protect your, our or others’ rights, property, or safety; enforce our policies or contracts; collect
        amounts owed to us; or assist with an investigation or prosecution of suspected or actual illegal activity.
      </B2>
      <B2>
        <strong>Disclosure in the Event of Merger, Sale, or Other Asset Transfers.</strong>
        If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership,
        purchase or sale of assets, or transition of service to another provider, then your information may be sold or
        transferred as part of such a transaction, as permitted by law and/or contract.
      </B2>
      <B2>
        You agree that all information processed by us may be transferred, processed, and stored anywhere in the world,
        including but not limited to, the United States or other countries, which may have data protection laws that are
        different from the laws where you live. We have taken appropriate safeguards to require that your personal
        information will remain protected and require our third-party service providers and partners to have appropriate
        safeguards as well. Further details can be provided upon request.
      </B2>
    </section>

    <section>
      <H4>4. YOUR CHOICES.</H4>
      <section>
        <H5 style={{ marginTop: '1rem' }}>General.</H5>
        <B2>
          You have certain choices about your personal information. Where you have consented to the processing of your
          personal information, you may withdraw that consent at any time and prevent further processing by contacting
          us as described below. Even if you opt out, we may still collect and use non-personal information regarding
          your activities on our Services and for other legal purposes as described above.
        </B2>
      </section>

      <section>
        <H5>Email and Telephone Communications.</H5>
        <B2>
          If you receive an unwanted email from us, you can use the unsubscribe link found at the bottom of the email to
          opt out of receiving future emails. Note that you will continue to receive transaction-related emails
          regarding products or Services you have requested. We may also send you certain non-promotional communications
          regarding us and our Services, and you will not be able to opt out of those communications (e.g.,
          communications regarding the Services or updates to our Terms or this Privacy Policy).
        </B2>
        <B2>
          We process requests to be placed on do-not-mail, do-not-phone and do-not-contact lists as required by
          applicable law.
        </B2>
      </section>

      <section>
        <H5>Mobile Devices.</H5>
        <B2>
          We may send you push notifications through our mobile application. You may at any time opt- out from receiving
          these types of communications by changing the settings on your mobile device. We may also collect
          location-based information if you use our mobile applications. You may opt-out of this collection by changing
          the settings on your mobile device.
        </B2>
      </section>

      <section>
        <H5>“Do Not Track.”</H5>
        <B2>
          Do Not Track (“DNT”) is a privacy preference that users can set in certain web browsers. Please note that we
          do not respond to or honor DNT signals or similar mechanisms transmitted by web browsers.
        </B2>
      </section>

      <section>
        <H5>Cookies and Interest-Based Advertising.</H5>
        <B2>
          You may stop or restrict the placement of Technologies on your device or remove them by adjusting your
          preferences as your browser or device permits. The online advertising industry also provides websites from
          which you may opt out of receiving targeted ads from data partners and other advertising partners that
          participate in self-regulatory programs. You can access these and learn more about targeted advertising and
          consumer choice and privacy, at{' '}
          <a
            className="text-brand hover:underline"
            href="http://www.networkadvertising.org/managing/opt_out.asp"
            target="_blank"
            rel="noopener noreferrer">
            www.networkadvertising.org/managing/opt_out.asp
          </a>
          ,{' '}
          <a
            className="text-brand hover:underline"
            href="https://www.youronlinechoices.eu/"
            target="_blank"
            rel="noopener noreferrer">
            https://www.youronlinechoices.eu
          </a>
          ,{' '}
          <a
            className="text-brand hover:underline"
            href="https://youradchoices.ca/choices/"
            target="_blank"
            rel="noopener noreferrer">
            https://youradchoices.ca/choices
          </a>
          , and{' '}
          <a
            className="text-brand hover:underline"
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer">
            www.aboutads.info/choices
          </a>
          . To separately make choices for mobile apps on a mobile device, you can download DAA’s AppChoices application
          from your device’s app store. Alternatively, for some devices you may use your device’s platform controls in
          your settings to exercise choice.
        </B2>
        <B2>
          Please note you must separately opt out in each browser and on each device. Advertisements on third party
          websites that contain the AdChoices link may have been directed to you based on information collected by
          advertising partners over time and across websites. These advertisements provide a mechanism to opt out of the
          advertising partners’ use of this information for interest-based advertising purposes.
        </B2>
      </section>

      <section>
        <H5>Your Privacy Rights.</H5>
        <B2>In accordance with applicable law, you may have the right to:</B2>
        <B2>
          <strong>Access to/Portability of Personal Data</strong> about you consistent with legal requirements. In
          addition, you may have the right in some cases to receive or have your electronic Personal Data transferred to
          another party.
        </B2>
        <B2>
          <strong>Request Correction</strong> of your personal information where it is inaccurate or incomplete. In some
          cases, we may provide self-service tools that enable you to update your personal information or we may refer
          you to the controller of your personal information who is able to make the correction.
        </B2>
        <B2>
          <strong>Request Deletion</strong> of your personal information, subject to certain exceptions prescribed by
          law.
        </B2>
        <B2>
          <strong>Request restriction of or object to</strong> processing of your personal information, including the
          right to opt in or opt out of the sale of your Personal Data to third parties, if applicable, where such
          requests are permitted by law.
        </B2>
        <B2>
          If you would like to exercise any of these rights, please contact us as set forth below. We will process such
          requests in accordance with applicable laws. To protect your privacy, we will take steps to verify your
          identity before fulfilling your request.
        </B2>
      </section>
    </section>

    <section>
      <H4>5. DATA RETENTION.</H4>
      <B2>
        We store the personal information we receive as described in this Privacy Policy for as long as you use our
        Services or as necessary to fulfill the purpose(s) for which it was collected, provide our Services, resolve
        disputes, establish legal defenses, conduct audits, pursue legitimate business purposes, enforce our agreements,
        and comply with applicable laws.
      </B2>
    </section>

    <section>
      <H4>6. SECURITY OF YOUR INFORMATION.</H4>
      <B2>
        We take steps to ensure that your information is treated securely and in accordance with this Privacy Policy.
        Unfortunately, no system is 100% secure, and we cannot ensure or warrant the security of any information you
        provide to us. To the fullest extent permitted by applicable law, we do not accept liability for unintentional
        disclosure.
      </B2>
      <B2>
        By using the Services or providing personal information to us, you agree that we may communicate with you
        electronically regarding security, privacy, and administrative issues relating to your use of the Services. If
        we learn of a security system’s breach, we may attempt to notify you electronically by posting a notice on the
        Services, by mail or by sending an e-mail to you.
      </B2>
    </section>

    <section>
      <H4>7. CHILDREN’S INFORMATION.</H4>
      <B2>
        The Services are not directed to children under 17 (or other age as required by local law), and we do not
        knowingly collect personal information from children. If you learn that your child has provided us with personal
        information without your consent, you may contact us as set forth below. If we learn that we have collected any
        personal information in violation of applicable law, we will promptly take steps to delete such information and
        terminate the child’s account.
      </B2>
    </section>

    <section>
      <H4>8. OTHER PROVISIONS.</H4>
      <section>
        <H5 style={{ marginTop: '1rem' }}>SUPERVISORY AUTHORITY.</H5>
        <B2>
          If you are located in the European Economic Area or the UK, you have the right to lodge a complaint with a
          supervisory authority if you believe our processing of your personal information violates applicable law.
        </B2>
      </section>

      <section>
        <H5>CHANGES TO OUR PRIVACY POLICY.</H5>
        <B2>
          We may revise this Privacy Policy from time to time in our sole discretion. If there are any material changes
          to this Privacy Policy, we will notify you as required by applicable law. You understand and agree that you
          will be deemed to have accepted the updated Privacy Policy if you continue to use the Services after the new
          Privacy Policy takes effect.
        </B2>
      </section>

      <section>
        <H5>CONTACT US.</H5>
        <B2>
          If you have any questions about our privacy practices or this Privacy Policy, or if you wish to submit a
          request to exercise your rights as detailed in this Privacy Policy, please contact us at:
        </B2>
        <div className="contact-info">
          <p className="text-gray-soft">
            Lighthouse, Inc.
            <br />
            Matt See
            <br />
            4626 N 16th Street, Apt 1105
            <br />
            Phoenix, AZ 85016
            <br />
            <a href="mailto:privacy@lighthouse.app" className="text-gray-soft">
              privacy@lighthouse.app
            </a>
          </p>
        </div>
      </section>
    </section>
  </div>
);

export default Privacy;
