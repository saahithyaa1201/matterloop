import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MatterLoop" },
      {
        name: "description",
        content: "Read MatterLoop's privacy policy covering data collection, cookies, usage and retention.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="mb-8 inline-flex items-center rounded-full border border-border bg-surface/70 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-[#75553c]/50 hover:text-[#75553c]"
        >
          ← Back to home
        </Link>

        <article className="prose prose-neutral max-w-none rounded-[28px] border border-border bg-surface/60 p-6 shadow-[0_18px_40px_rgba(117,85,60,0.06)] sm:p-8 lg:p-10">
          <h1 className="mt-0 text-4xl font-extrabold tracking-tight text-[#75553c] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: August 31, 2026</p>

          <p className="mt-6 text-base leading-relaxed text-foreground/90">
            This Privacy Policy describes Our policies and procedures on the collection, use and
            disclosure of Your information when You use the Service and tells You about Your privacy
            rights and how the law protects You.
          </p>

          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            We use Your Personal Data to provide and improve the Service. We collect, use, and
            disclose Your information as described in this Privacy Policy and, where required by
            applicable law, only where We have a valid legal basis to do so, including Your consent
            (where consent is required).
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Interpretation and Definitions</h2>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Interpretation</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The words whose initial letters are capitalized have meanings defined under the following
            conditions. The following definitions shall have the same meaning regardless of whether
            they appear in singular or in plural.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Definitions</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            For the purposes of this Privacy Policy:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>
              <strong>Account</strong> means a unique account created for You to access Our Service or
              parts of Our Service.
            </li>
            <li>
              <strong>Affiliate</strong> means an entity that controls, is controlled by, or is under
              common control with a party, where &quot;control&quot; means ownership of 50% or more of
              the shares, equity interest or other securities entitled to vote for election of
              directors or other managing authority.
            </li>
            <li>
              <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;,
              &quot;Us&quot; or &quot;Our&quot; in this Privacy Policy) refers to matterloop.net.
            </li>
            <li>
              <strong>Cookies</strong> are small files that are placed on Your computer, mobile device
              or any other device by a website, containing the details of Your browsing history on
              that website, among its many uses.
            </li>
            <li>
              <strong>Country/State</strong> refers to: Florida, United States.
            </li>
            <li>
              <strong>Device</strong> means any device that can access the Service, such as a computer,
              a cell phone or a digital tablet.
            </li>
            <li>
              <strong>Personal Data</strong> (or &quot;Personal Information&quot;) is any information that
              relates to an identified or identifiable individual. We use &quot;Personal Data&quot; and
              &quot;Personal Information&quot; interchangeably unless a law uses a specific term.
            </li>
            <li>
              <strong>Service</strong> refers to the Website.
            </li>
            <li>
              <strong>Service Provider</strong> means any natural or legal person who processes the data
              on behalf of the Company. It refers to third-party companies or individuals employed by
              the Company to facilitate the Service, to provide the Service on behalf of the Company,
              to perform services related to the Service or to assist the Company in analyzing how the
              Service is used.
            </li>
            <li>
              <strong>Usage Data</strong> refers to data collected automatically, either generated by
              the use of the Service or from the Service infrastructure itself (for example, the
              duration of a page visit).
            </li>
            <li>
              <strong>User</strong> means any individual who accesses or uses the Service.
            </li>
            <li>
              <strong>Website</strong> refers to matterloop.net, accessible from
              <a href="https://matterloop.net/" target="_blank" rel="noreferrer">
                https://matterloop.net/
              </a>
              .
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Service, or the company,
              or other legal entity on behalf of which such individual is accessing or using the
              Service, as applicable.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">
            Collecting and Using Your Personal Information
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Types of Data Collected</h3>

          <h4 className="mt-5 text-lg font-semibold text-foreground">Personal Data</h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            While using Our Service, We may ask You to provide Us with certain personally identifiable
            information that can be used to contact or identify You. Personally identifiable
            information may include, but is not limited to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>Email address</li>
            <li>First name and last name</li>
          </ul>

          <h4 className="mt-5 text-lg font-semibold text-foreground">Usage Data</h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Usage Data is collected automatically when using the Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Usage Data may include information such as Your Device&apos;s Internet Protocol address
            (e.g. IP address), browser type, browser version, the pages of Our Service that You visit,
            the time and date of Your visit, the time spent on those pages, unique device identifiers
            and other diagnostic data.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            When You access the Service by or through a mobile device, We may collect certain
            information automatically, including, but not limited to, the type of mobile device You
            use, Your mobile device&apos;s unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use, unique device identifiers
            and other diagnostic data.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We may also collect information that Your browser sends whenever You visit Our Service or
            when You access the Service by or through a mobile device.
          </p>

          <h4 className="mt-5 text-lg font-semibold text-foreground">
            Tracking Technologies and Cookies
          </h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We use tracking technologies (such as cookies) to track the activity and to improve Our
            Service. The technologies We use may include:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>
              <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your
              Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie
              is being sent.
            </li>
            <li>
              <strong>Web Beacons.</strong> Certain sections of Our Service may contain small
              electronic files known as web beacons that permit the Company to count users who have
              visited those pages and for other related website statistics.
            </li>
          </ul>

          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain
            on Your personal computer or mobile device when You go offline, while Session Cookies are
            deleted as soon as You close Your web browser.
          </p>

          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            Where required by law, We use non-essential cookies only with Your consent. You can
            withdraw or change Your consent at any time using Our cookie preferences tool (if
            available) or through Your browser/device settings.
          </p>

          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            We use both Session and Persistent Cookies for the purposes set out below:
          </p>

          <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-relaxed text-foreground/90">
            <li>
              <strong>Necessary / Essential Cookies</strong>
              <p className="mt-1">Type: Session Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies are essential to provide You with services available through the
                Website and to enable You to use some of its features.
              </p>
            </li>
            <li>
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>
              <p className="mt-1">Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies identify whether users have accepted the use of cookies.</p>
            </li>
            <li>
              <strong>Functionality Cookies</strong>
              <p className="mt-1">Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies allow Us to remember choices You make when You use the Website.
              </p>
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Use of Your Personal Data</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Company may use Personal Data for the following purposes:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>To provide and maintain Our Service, including to monitor the usage of Our Service.</li>
            <li>To manage Your Account.</li>
            <li>For the performance of a contract.</li>
            <li>To contact You.</li>
            <li>
              To provide You with news, special offers, and general information about other goods,
              services and events which We offer.
            </li>
            <li>To manage Your requests.</li>
            <li>For business transfers.</li>
            <li>
              For other purposes: We may use Your information for data analysis, identifying usage
              trends, determining the effectiveness of Our promotional campaigns, and evaluating and
              improving Our Service, products, services, marketing and Your experience.
            </li>
          </ul>

          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            We may share Your Personal Data in the following situations:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>With Service Providers.</li>
            <li>For business transfers.</li>
            <li>With Affiliates.</li>
            <li>With other users.</li>
            <li>With Your consent.</li>
          </ul>

          <h4 className="mt-5 text-lg font-semibold text-foreground">Text Messages Privacy Notice</h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            You have the option to receive text (SMS) messages from Us. If You opt in to text
            messages, We will send You updates, notifications, and other communications as described
            below.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            No mobile information will be shared with or sold to third parties or affiliates for
            marketing or promotional purposes.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Consent to receive text messages is not a condition of any purchase or use of Our Service.
            If You consent to receive SMS from Us, You agree to receive text messages from Us related
            to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>Customer care and support</li>
            <li>Account notifications</li>
            <li>Delivery notifications and updates</li>
            <li>Authentication messages</li>
            <li>Security alerts</li>
            <li>Marketing and promotional offers</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            Reply STOP to opt-out. Reply HELP for support. Message &amp; data rates may apply.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Retention of Your Personal Data</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Company will retain Your Personal Data only for as long as is necessary for the purposes
            set out in this Privacy Policy.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We may retain Personal Data beyond the periods stated above for different reasons:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>Legal obligation</li>
            <li>Legal claims</li>
            <li>Your explicit request</li>
            <li>Technical limitations</li>
          </ul>

          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            When retention periods expire, We securely delete or anonymize Personal Data according to
            the following procedures:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>Deletion: Personal Data is removed from Our systems.</li>
            <li>Backup retention: Residual copies may remain in encrypted backups.</li>
            <li>Anonymization: Data may be converted into anonymous statistical data.</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Transfer of Your Personal Data</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Your information, including Personal Data, is processed at the Company&apos;s operating
            offices and in any other places where the parties involved in the processing are located.
            This means that this information may be transferred to and maintained on computers located
            outside of Your state, province, country or other governmental jurisdiction.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Delete Your Personal Data</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            You have the right to delete or request that We assist in deleting the Personal Data that
            We have collected about You.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Our Service may give You the ability to delete certain information about You from within the
            Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Please note, however, that We may need to retain certain information when We have a legal
            obligation or lawful basis to do so.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-foreground">
            Disclosure of Your Personal Data
          </h3>

          <h4 className="mt-5 text-lg font-semibold text-foreground">Business Transactions</h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be
            transferred.
          </p>

          <h4 className="mt-5 text-lg font-semibold text-foreground">Law Enforcement</h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Under certain circumstances, the Company may disclose Your Personal Data if required to do
            so by law or in response to valid requests by public authorities.
          </p>

          <h4 className="mt-5 text-lg font-semibold text-foreground">Other Legal Requirements</h4>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Company may disclose Your Personal Data in the good-faith belief that such action is
            necessary to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of Users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Security of Your Personal Data</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The security of Your Personal Data is important to Us, but remember that no method of
            transmission over the Internet, or method of electronic storage, is 100% secure.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Children&apos;s and Minors&apos; Privacy</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Service is not directed to, and We do not knowingly collect Personal Information from,
            anyone under the age of 16.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If You are a parent or guardian and You believe Your child has provided Us with Personal
            Information, please contact Us.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Links to Other Websites</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Our Service may contain links to other websites that are not operated by Us. If You click
            on a third-party link, You will be directed to that third party&apos;s site.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Changes to this Privacy Policy</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We may update Our Privacy Policy from time to time. We will notify You of any changes by
            posting the new Privacy Policy on this page.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this
            Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Contact Us</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If You have any questions about this Privacy Policy, You can contact Us:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>
              By website:{" "}
              <a href="https://matterloop.net/" target="_blank" rel="noreferrer">
                https://matterloop.net/
              </a>
            </li>
            <li>By email: connect@matterloop.net</li>
            <li>By phone (Sri Lanka): +94771234531</li>
            <li>By phone (USA): +17019976600</li>
            <li>SL Address: No, 10 Deasonton Place, Colombo 00300</li>
            <li>USA Address: 16 Washington Mews, New York, NY 10003, USA</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
