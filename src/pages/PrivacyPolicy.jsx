import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-textile-linen font-sans text-gray-900">
      <Navbar />
      <PageHero
        eyebrow="Governance & Integrity"
        title="Privacy Policy"
        subtitle="How the Vibrant Textiles Association safeguards industry member data, artisan directory records, and buyer communications."
      />

      <div className="section-container py-24 max-w-4xl mx-auto">
        <div className="prose prose-slate lg:prose-lg max-w-none space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-rose-600 pl-4">
              1. Overview & Scope
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The Vibrant Textiles Association (<strong>VTA</strong>), established in 1998, connects traditional handloom and industrial textile clusters across India with international B2B buyers and commercial partners. This Privacy Policy details how we collect, store, and process personal and professional information across our <strong>Cluster Database</strong>, <strong>Market Place</strong>, and <strong>VTA Academy</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By accessing our platform, registering as an Industry Partner (Member), or submitting an RFQ as a Buyer, you consent to the data collection and usage practices described in this document.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-indigo-600 pl-4">
              2. Information We Collect
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To maintain the integrity of our verified B2B sourcing ecosystem, VTA collects different categories of information depending on your account role:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Buyers:</strong> Company name, authorized representative name, contact details (email, phone, country), and trade interest profiles.
              </li>
              <li>
                <strong>Industry Partners (Members):</strong> Official business name, manufacturing license, regional weaver cluster affiliations, GST/VAT/Tax ID registration, product catalogs, and verification documents.
              </li>
              <li>
                <strong>Sourcing Data:</strong> Request for Quotations (RFQs), formal price negotiations, product interest bookmarks, and messaging history exchanged within the Market Place.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-teal-600 pl-4">
              3. How We Use Your Data
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We process and use the gathered data strictly to facilitate authentic handicraft and industrial textile trade:
            </p>
            <div className="grid gap-6 sm:grid-cols-2 mt-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative">
                <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[14px]" />
                <h3 className="font-bold text-slate-900 mb-2">Trade Facilitation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Connecting buyer RFQs with verified weavers and mills matching the specific materials (e.g., Banarasi silk, organic cotton) and technique specifications.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative">
                <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[14px]" />
                <h3 className="font-bold text-slate-900 mb-2">Verification & Safety</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Reviewing supplier applications to prevent fraudulent listings and ensure GI-tagged (Geographical Indication) traditional textiles are authentic.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-rose-600 pl-4">
              4. Payment & Financial Data
            </h2>
            <p className="text-slate-600 leading-relaxed">
              VTA acts strictly as a trade facilitator. We do not process direct B2B payments, wire transfers, or credit card transactions on our servers. Financial invoices, shipping agreements, and final payments are negotiated and executed independently between the Buyer and the Industry Partner. Consequently, VTA does not store bank details or credit card information on this website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-indigo-600 pl-4">
              5. Data Security & Retention
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We employ strict industry-standard technical measures, including SSL encryption and role-based Supabase access controls, to safeguard database records. We retain your profile information for as long as your account is active. If you request account closure, we will delete or anonymize your credentials within 30 business days, excluding records required for legal audit trails or historical trade summaries.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 border-l-4 border-teal-600 pl-4">
              6. Updates & Contact
            </h2>
            <p className="text-slate-600 leading-relaxed">
              VTA reserves the right to modify this policy as regulatory frameworks in trade and privacy evolve. Significant updates will be announced via our newsletter and homepage.
            </p>
            <p className="text-slate-600 leading-relaxed">
              For any questions regarding your data rights or to request data deletion, please contact our Data Governance Officer at{' '}
              <a href="mailto:privacy@vibranttextiles.com" className="text-primary-600 font-bold hover:underline">
                privacy@vibranttextiles.com
              </a>.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200/80 text-center text-xs text-slate-400 font-semibold">
            Last Updated: July 2026 | Vibrant Textiles Association Governance Board
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
