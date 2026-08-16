import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Official TEDxAchievers Hoodie',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Classic Logo T-Shirt',
    price: '$25.00',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Matte Black Coffee Mug',
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Premium Notebook & Pen Set',
    price: '$22.00',
    image: 'https://images.unsplash.com/photo-1531346878377-a541e4a113fb?q=80&w=600&auto=format&fit=crop'
  }
];

const DashboardShop = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">TEDx Shop</h1>
          <p className="text-gray-400">Exclusive merchandise for attendees. Pre-order now to pick up at the event.</p>
        </div>
        <button className="bg-[#1a1a1a] hover:bg-[#222] border border-white/20 text-white p-3 rounded-full transition-colors relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative"
          >
            {/* Card */}
            <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-4 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col h-full">
              
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-[#1a1a1a]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                    {product.tag}
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/70 hover:text-red-500 hover:bg-black/80 transition-colors">
                  <Heart size={16} />
                </button>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-white font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-red-400 font-mono text-sm">{product.price}</p>
                </div>
                
                <button className="w-full mt-4 bg-white/5 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_4px_14px_0_rgba(220,38,38,0.39)]">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardShop;
