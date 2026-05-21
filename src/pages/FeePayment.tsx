import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const FeePayment = () => (
  <Layout>
    <PageBanner title="Fee Payment" subtitle="Secure Online Payment Portal" />

    <div className="container py-12 max-w-6xl mx-auto space-y-14">

      {/* Hero */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-red-600">
          Pay Fees Easily & Securely
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Mewat Engineering College offers a fast, secure and transparent fee payment system.
          Students can pay college and hostel fees online using UPI, Net Banking or Cards.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid md:grid-cols-4 gap-5 text-center">
        {[
          ["🔐","100% Secure","Encrypted Payment"],
          ["⏰","24/7 Access","Anytime Payment"],
          ["📄","Instant Receipt","Download Anytime"],
          ["💳","Multiple Modes","UPI / Card / Netbanking"]
        ].map((x,i)=>(
          <div key={i} className="p-5 bg-white border border-red-100 rounded-xl shadow hover:shadow-xl transition">
            <div className="text-2xl mb-2">{x[0]}</div>
            <h3 className="font-bold text-red-600">{x[1]}</h3>
            <p className="text-sm text-gray-600">{x[2]}</p>
          </div>
        ))}
      </div>

      {/* College Account */}
      <div className="p-7 bg-gradient-to-r from-red-100 via-white to-red-50 border border-red-100 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-red-600 mb-3">
          College Fee Payment
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Pay tuition fees, examination fees, and other academic charges through this portal.
          Ensure you enter correct details before payment.
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Accounts Department</strong></p>
            <p>📞 +91-9588356609</p>
            <p>📧 accounts@mecw.ac.in</p>
          </div>

          <div>
            <p><strong>Finance Head</strong></p>
            <p>Mr. Accounts Officer</p>
            <p>📞 +91-9990112185</p>
          </div>
        </div>
      </div>

      {/* Hostel Section */}
      <div className="p-7 bg-white border border-red-100 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-red-600 mb-3">
          Hostel Fee Payment
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Hostel fee includes accommodation, mess and maintenance charges.
          Students must pay before due date to avoid penalties.
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Hostel Office</strong></p>
            <p>📞 +91-9897342786</p>
            <p>📧 hostel@mecw.ac.in</p>
          </div>

          <div>
            <p><strong>Hostel Warden</strong></p>
            <p>Mr. Hostel Incharge</p>
            <p>📞 +91-9812437896</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-7 bg-red-50 border border-red-100 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          Payment Methods Available
        </h3>

        <div className="grid md:grid-cols-3 gap-5">
          {["UPI Payment","Debit/Credit Card","Net Banking"].map((x,i)=>(
            <div key={i} className="p-5 bg-white border border-red-100 rounded-xl text-center shadow hover:shadow-lg">
              💳 {x}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="p-7 bg-white border border-red-100 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          How to Pay Fees
        </h3>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>1. Select College or Hostel Fee</li>
          <li>2. Click Pay Now</li>
          <li>3. Scan QR Code or choose payment method</li>
          <li>4. Enter amount and confirm</li>
          <li>5. Save receipt after successful payment</li>
        </ul>
      </div>

      {/* Payment Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-xl text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            College Fee Payment
          </h3>

          <div className="h-44 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            QR Code (College)
          </div>

          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Pay Now
          </button>
        </div>

        <div className="p-6 bg-white border border-red-100 rounded-2xl shadow hover:shadow-xl text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            Hostel Fee Payment
          </h3>

          <div className="h-44 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            QR Code (Hostel)
          </div>

          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Pay Now
          </button>
        </div>

      </div>

      {/* FAQ */}
      <div className="p-7 bg-white border border-red-100 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <p><strong>Q: Is online payment safe?</strong><br/>Yes, all transactions are encrypted and secure.</p>
          <p><strong>Q: Will I get receipt?</strong><br/>Yes, instantly after payment.</p>
          <p><strong>Q: Can I pay in installments?</strong><br/>Depends on college policy.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="p-7 bg-gradient-to-r from-red-600 to-red-500 text-white text-center rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-2">Need Assistance?</h3>
        <p className="text-sm opacity-90 mb-2">
          Contact accounts department for help with payments
        </p>
        <p>📞 +91-9588356609</p>
        <p>📧 accounts@mecw.ac.in</p>
      </div>

    </div>
  </Layout>
);

export default FeePayment;