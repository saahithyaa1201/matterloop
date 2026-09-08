import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — MatterLoop" },
      {
        name: "description",
        content: "Read the MatterLoop terms and conditions for using the website and services.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
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
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: August 31, 2026</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/90">
            Please read these terms and conditions carefully before using Our Service.
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
            For the purposes of these Terms and Conditions:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
            <li>
              <strong>Affiliate</strong> means an entity that controls, is controlled by, or is under
              common control with a party, where &quot;control&quot; means ownership of 50% or more of
              the shares, equity interest or other securities entitled to vote for election of
              directors or other managing authority.
            </li>
            <li>
              <strong>Country/State</strong> refers to: Florida, United States
            </li>
            <li>
              <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;,
              &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions) refers to MatterLoop.
            </li>
            <li>
              <strong>Device</strong> means any device that can access the Service such as a computer,
              a cell phone or a digital tablet.
            </li>
            <li>
              <strong>Service</strong> refers to the Website.
            </li>
            <li>
              <strong>Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means these
              Terms and Conditions, including any documents expressly incorporated by reference, which
              govern Your access to and use of the Service and form the entire agreement between You
              and the Company regarding the Service.
            </li>
            <li>
              <strong>Third-Party Social Media Service</strong> means any services or content
              (including data, information, products or services) provided by a third party that is
              displayed, included, made available, or linked to through the Service.
            </li>
            <li>
              <strong>Website</strong> refers to MatterLoop, accessible from
              <a href="https://matterloop.net/" target="_blank" rel="noreferrer">
                matterloop.net
              </a>
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Service, or the company,
              or other legal entity on behalf of which such individual is accessing or using the
              Service, as applicable.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Acknowledgment</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            These are the Terms and Conditions governing the use of this Service and the agreement
            between You and the Company. These Terms and Conditions set out the rights and obligations
            of all users regarding the use of the Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Your access to and use of the Service is conditioned on Your acceptance of and compliance
            with these Terms and Conditions. These Terms and Conditions apply to all visitors, users
            and others who access or use the Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            By accessing or using the Service You agree to be bound by these Terms and Conditions. If
            You disagree with any part of these Terms and Conditions then You may not access the
            Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            You represent that you are over the age of 18. The Company does not permit those under 18
            to use the Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Your access to and use of the Service is also subject to Our Privacy Policy, which
            describes how We collect, use, and disclose personal information. Please read Our Privacy
            Policy carefully before using Our Service.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Links to Other Websites</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Our Service may contain links to third-party websites or services that are not owned or
            controlled by the Company.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Company has no control over, and assumes no responsibility for, the content, privacy
            policies, or practices of any third-party websites or services. You further acknowledge and
            agree that the Company shall not be responsible or liable, directly or indirectly, for any
            damage or loss caused or alleged to be caused by or in connection with the use of or
            reliance on any such content, goods or services available on or through any such websites or
            services.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We strongly advise You to read the terms and conditions and privacy policies of any
            third-party websites or services that You visit.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Links from a Third-Party Social Media Service</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Service may display, include, make available, or link to content or services provided by
            a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or
            controlled by the Company, and the Company does not endorse or assume responsibility for any
            Third-Party Social Media Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            You acknowledge and agree that the Company shall not be responsible or liable, directly or
            indirectly, for any damage or loss caused or alleged to be caused by or in connection with
            Your access to or use of any Third-Party Social Media Service, including any content,
            goods, or services made available through them. Your use of any Third-Party Social Media
            Service is governed by that Third-Party Social Media Service&apos;s terms and privacy
            policies.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Termination</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We may terminate or suspend Your access immediately, without prior notice or liability, for
            any reason whatsoever, including without limitation if You breach these Terms and
            Conditions.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Upon termination, Your right to use the Service will cease immediately.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Limitation of Liability</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Notwithstanding any damages that You might incur, the entire liability of the Company and
            any of its suppliers under any provision of these Terms and Your exclusive remedy for all
            of the foregoing shall be limited to the amount actually paid by You through the Service or
            100 USD if You haven&apos;t purchased anything through the Service.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            To the maximum extent permitted by applicable law, in no event shall the Company or its
            suppliers be liable for any special, incidental, indirect, or consequential damages
            whatsoever (including, but not limited to, damages for loss of profits, loss of data or
            other information, for business interruption, for personal injury, loss of privacy arising
            out of or in any way related to the use of or inability to use the Service, third-party
            software and/or third-party hardware used with the Service, or otherwise in connection with
            any provision of these Terms), even if the Company or any supplier has been advised of the
            possibility of such damages and even if the remedy fails of its essential purpose.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Some states do not allow the exclusion of implied warranties or limitation of liability for
            incidental or consequential damages, which means that some of the above limitations may not
            apply. In these states, each party&apos;s liability will be limited to the greatest extent
            permitted by law.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all
            faults and defects without warranty of any kind. To the maximum extent permitted under
            applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and
            their respective licensors and service providers, expressly disclaims all warranties,
            whether express, implied, statutory or otherwise, with respect to the Service, including
            all implied warranties of merchantability, fitness for a particular purpose, title and
            non-infringement, and warranties that may arise out of course of dealing, course of
            performance, usage or trade practice.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Without limiting the foregoing, neither the Company nor any of the company&apos;s provider
            makes any representation or warranty of any kind, express or implied: (i) as to the
            operation or availability of the Service, or the information, content, and materials or
            products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii)
            as to the accuracy, reliability, or currency of any information or content provided through
            the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on
            behalf of the Company are free of viruses, scripts, trojan horses, worms, malware,
            timebombs or other harmful components.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Some jurisdictions do not allow the exclusion of certain types of warranties or limits on
            applicable statutory rights of a consumer, so some or all of the above exclusions and
            limitations may not apply to You. But in such a case the exclusions and limitations set
            forth in this section shall be applied to the greatest extent enforceable under applicable
            law.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Governing Law</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            The laws of the Country/State, excluding its conflicts of law rules, shall govern these
            Terms and Your use of the Service. Your use of the Application may also be subject to other
            local, state, national, or international laws.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Disputes Resolution</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If You have any concern or dispute about the Service, You agree to first try to resolve the
            dispute informally by contacting the Company.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">For European Union (EU) Users</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If You are a European Union consumer, you will benefit from any mandatory provisions of the
            law of the country in which You are resident.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">United States Legal Compliance</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            You represent and warrant that (i) You are not located in a country that is subject to the
            United States government embargo, or that has been designated by the United States
            government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any
            United States government list of prohibited or restricted parties.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Severability and Waiver</h2>
          <h3 className="mt-6 text-xl font-semibold text-foreground">Severability</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If any provision of these Terms is held to be unenforceable or invalid, such provision will
            be changed and interpreted to accomplish the objectives of such provision to the greatest
            extent possible under applicable law and the remaining provisions will continue in full
            force and effect.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">Waiver</h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            Except as provided herein, the failure to exercise a right or to require performance of an
            obligation under these Terms shall not affect a party&apos;s ability to exercise such right
            or require such performance at any time thereafter nor shall the waiver of a breach
            constitute a waiver of any subsequent breach.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Translation Interpretation</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            These Terms and Conditions may have been translated if We have made them available to You on
            our Service. You agree that the original English text shall prevail in the case of a
            dispute.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Changes to These Terms and Conditions</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time.
            If a revision is material We will make reasonable efforts to provide at least 30 days'
            notice prior to any new terms taking effect. What constitutes a material change will be
            determined at Our sole discretion.
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            By continuing to access or use Our Service after those revisions become effective, You agree
            to be bound by the revised terms. If You do not agree to the new terms, in whole or in
            part, please stop using the Service.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#75553c]">Contact Us</h2>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            If you have any questions about these Terms and Conditions, You can contact us:
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
