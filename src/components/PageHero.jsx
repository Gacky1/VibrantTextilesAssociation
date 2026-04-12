/**
 * Reusable clean hero section for all inner pages.
 * @param {string} eyebrow - Small label above the title
 * @param {string} title - Main heading
 * @param {string} subtitle - Paragraph below title
 */
const PageHero = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="relative py-24 lg:py-32 overflow-hidden bg-indigo-950">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Eyebrow / Badge */}
          {eyebrow && (
            <div className="badge border-none bg-white/10 backdrop-blur-md text-primary-300">
              {eyebrow}
            </div>
          )}
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-indigo-100/70 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
              {subtitle}
            </p>
          )}

          <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-vibrant-orange rounded-full mt-10" />
        </div>
      </div>
    </div>
  );
};

export default PageHero;

