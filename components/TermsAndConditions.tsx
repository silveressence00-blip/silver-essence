import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#178B8D' : i % 3 === 1 ? '#d4a574' : '#C0C0C0',
              boxShadow: `0 0 10px ${i % 3 === 0 ? '#178B8D' : i % 3 === 1 ? '#d4a574' : '#C0C0C0'}`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-8 py-20 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 mb-12 px-6 py-3 rounded-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(23, 139, 141, 0.2), rgba(192, 192, 192, 0.1))',
            border: '1px solid rgba(23, 139, 141, 0.3)',
            color: '#178B8D',
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="tracking-wider">BACK TO STORE</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mb-6"
          >
            <FileText 
              className="w-16 h-16"
              style={{
                color: '#178B8D',
                filter: 'drop-shadow(0 0 20px #178B8D) drop-shadow(0 0 40px #C0C0C0)',
              }}
            />
          </motion.div>

          <h1 
            className="text-6xl tracking-widest mb-6"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #178B8D 30%, #C0C0C0 60%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))',
            }}
          >
            TERMS & CONDITIONS
          </h1>
          <p className="text-xl tracking-wide" style={{ color: '#E0E0E0' }}>
            Please Read Our Terms Carefully
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div 
            className="p-10 rounded-3xl border-2 backdrop-blur-xl"
            style={{
              background: 'rgba(15, 15, 20, 0.95)',
              borderColor: 'rgba(23, 139, 141, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#E0E0E0' }}>
                <strong style={{ color: '#178B8D' }}>Last Updated:</strong> November 7, 2025
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    Welcome to Silver Essence. This Website is owned and operated by WHJ Arch Way Enterprises LLC.
                  </p>
                  <p className="text-lg leading-relaxed mt-4" style={{ color: '#C0C0C0' }}>
                    By accessing or using any part of the Website or purchasing any Products, you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg" style={{ color: '#C0C0C0' }}>
                    <li><strong>Agreement:</strong> By placing an order with us, you warrant that you are at least 18 years old or are visiting the site under the supervision of a parent or guardian.</li>
                    <li><strong>Modification:</strong> We reserve the right to update, change, or replace any part of these Terms by posting updates and changes to our Website. Your continued use of or access to the Website following the posting of any changes constitutes acceptance of those changes.</li>
                    <li><strong>Refusal of Service:</strong> We reserve the right to refuse service to anyone for any reason at any time.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    2. Product Information
                  </h2>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg" style={{ color: '#C0C0C0' }}>
                    <li><strong>Product Descriptions:</strong> We make every effort to display as accurately as possible the colors, features, specifications, and details of the silver jewelry products available on the Website.</li>
                    <li><strong>Variations:</strong> We do not guarantee that the colors, texture, or size will be completely accurate or free of error, as silver jewelry is often hand-finished and the products are natural (e.g., gemstones, natural silver characteristics). Minor variations are inherent in our products.</li>
                    <li><strong>Pricing:</strong> All prices are subject to change without notice at any time before the contract of sale is concluded.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    3. Ordering and Payment
                  </h2>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg" style={{ color: '#C0C0C0' }}>
                    <li><strong>Ordering Process:</strong> The display of products on the Website constitutes an invitation to treat. When you place an order, you are making an offer to purchase the goods. Our acceptance of your order, and the creation of a legally binding contract, occurs when we send you an email confirmation stating that your order has been shipped.</li>
                    <li><strong>Payment Terms:</strong> We accept various payment methods, including Visa, Mastercard, PayPal and COD. You warrant that any payment method used is yours and that you have sufficient funds to cover the purchase price.</li>
                    <li><strong>Cancellation:</strong> We reserve the right to refuse or cancel any order. If we cancel an order after you have paid, the payment will be fully refunded to your original payment method.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    4. Shipping and Delivery
                  </h2>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg" style={{ color: '#C0C0C0' }}>
                    <li><strong>Shipping & Risk of Loss:</strong> This section works in conjunction with our separate Shipping Policy. The risk of loss and title for all products purchased passes to you upon our delivery to the shipping carrier.</li>
                    <li><strong>Liability:</strong> We are not responsible for lost, stolen, or damaged packages after they are handed to the postal carrier.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    5. Returns and Exchanges
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    <strong>Policy Agreement:</strong> All returns and exchanges are governed by our Returns & Exchanges Policy. By making a purchase, you agree to abide by the terms set forth in that policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    6. Warranty
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    <strong>Limited Warranty:</strong> Our jewelry is sold with a limited warranty against manufacturing defects for 60 days from the date of delivery.
                  </p>
                  <p className="text-lg leading-relaxed mt-4" style={{ color: '#C0C0C0' }}>
                    <strong>Exclusions:</strong> This warranty specifically excludes:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg" style={{ color: '#C0C0C0' }}>
                    <li>Tarnish (which is a natural process for silver).</li>
                    <li>Damage resulting from misuse, accidental damage, or failure to follow the care instructions provided.</li>
                    <li>General wear and tear (e.g., bent rings, broken chains).</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl mb-4 tracking-wide" style={{ color: '#ffffff' }}>
                    7. Contact Information
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#C0C0C0' }}>
                    For questions regarding these Terms and Conditions, please contact us:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li style={{ color: '#178B8D' }}>
                      Email: sliveressence00@gmail.com
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[2px] w-96 mx-auto my-20 relative"
          style={{
            background: 'linear-gradient(90deg, transparent, #178B8D, #ffffff, #178B8D, transparent)',
            boxShadow: '0 0 20px rgba(23, 139, 141, 0.5)',
          }}
        >
          {[0, 50, 100].map((pos) => (
            <motion.div
              key={pos}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                left: `${pos}%`,
                background: pos === 50 ? '#d4a574' : '#178B8D',
                boxShadow: `0 0 10px ${pos === 50 ? '#d4a574' : '#178B8D'}`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: pos * 0.01,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
