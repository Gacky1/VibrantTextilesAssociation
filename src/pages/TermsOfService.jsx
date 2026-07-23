import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-textile-linen font-sans text-gray-900">
      <Navbar />
      <PageHero
        eyebrow="Rules of Engagement"
        title="Terms of Service"
        subtitle="The binding rules and guidelines governing the use of the VTA Sourcing Hub, Cluster Database, and trade communication portals."
      />

      <div className="section-container py-24 max-w-4xl mx-auto">
        <div className="prose prose-slate lg:prose-lg max-w-none space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-rose-600 pl-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms of Service (<strong>"Terms"</strong>) constitute a binding agreement between you and the Vibrant Textiles Association (<strong>"VTA"</strong>). By registering an account, browsing the traditional textile Cluster Database, listing products, or initiating RFQs through the Sourcing Hub, you agree to comply with and be bound by these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-indigo-600 pl-4">
              2. Description of Platform Services
            </h2>
            <p className="text-slate-600 leading-relaxed">
              VTA provides a digital ecosystem divided into three primary services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Cluster Database:</strong> A public repository detailing Geographical Indication (GI) tagged textiles, weaving techniques, material compositions, and historical origin regions.
              </li>
              <li>
                <strong>Sourcing Hub:</strong> A B2B trade matching portal that enables buyers to discover suppliers, request quotations (RFQs), submit quotations, and exchange technical specifications.
              </li>
              <li>
                <strong>VTA Academy:</strong> Informative guidelines, educational resources, and skilling training programs for members.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-teal-600 pl-4">
              3. Registration & Verification Registry
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Access to transaction tools (RFQ submission and bidding) is restricted to verified entities:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                You must provide accurate, complete, and updated company profile documents during onboarding.
              </li>
              <li>
                VTA administrators audit profiles for compliance (e.g. verifying valid corporate status and handloom cooperative licenses). We reserve the right to deny or revoke access to any account that fails verification.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-rose-600 pl-4">
              4. Supplier Listing Code of Conduct
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To support traditional artisans and maintain marketplace trust, all listed products must comply with the following standards:
            </p>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 relative mt-4">
              <div className="absolute inset-1 border border-dashed border-slate-200/50 pointer-events-none rounded-[14px]" />
              <ul className="list-decimal pl-6 space-y-2.5 text-xs text-slate-600 font-medium">
                <li>
                  <strong>Authentic Labels:</strong> Handloom products, silk grades, and yarn counts must be accurately described. Misrepresenting powerloom products as handloom is grounds for immediate termination.
                </li>
                <li>
                  <strong>Geographical Indication (GI):</strong> Claiming regional tagging (e.g. Banarasi Silk, Pochampally Ikat) requires verifiable cluster origin documentation.
                </li>
                <li>
                  <strong>Intellectual Property:</strong> No listings should infringe on registered heritage patterns or third-party copyrights.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-indigo-600 pl-4">
              5. Role of VTA as a Facilitator
            </h2>
            <p className="text-slate-600 leading-relaxed">
              VTA acts solely as an intermediary to facilitate B2B communication. We are not a party to any contract, commercial agreement, quality dispute, or financial transaction between buyers and suppliers. 
            </p>
            <p className="text-slate-600 leading-relaxed font-bold text-slate-800">
              VTA makes no warranties regarding product quality, shipment delivery, or buyer solvency. All trade negotiations, payments, customs clearance, and delivery terms are executed at the sole risk and liability of the transacting parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-teal-600 pl-4">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To the maximum extent permitted by law, VTA and its directors, agents, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform, including product defects, transaction failures, or breach of offline contracts.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200/80 text-center text-xs text-slate-400 font-semibold">
            Last Updated: July 2026 | Vibrant Textiles Association Legal & Advisory Council
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
