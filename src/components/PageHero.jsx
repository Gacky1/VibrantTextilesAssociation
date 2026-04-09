/**
 * Reusable clean hero section for all inner pages.
 * @param {string} eyebrow - Small label above the title
 * @param {string} title - Main heading
 * @param {string} subtitle - Paragraph below title
 */
const PageHero = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="relative bg-gray-900 text-white py-24 lg:py-32 border-b border-gray-800">
      <div className="section-container">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow / Badge */}
          {eyebrow && (
            <div className="badge border-gray-700 bg-gray-800 text-primary-400">
              {eyebrow}
            </div>
          )}
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}

          <div className="w-16 h-1 bg-primary-600 rounded-full mt-8" />
        </div>
      </div>
    </div>
  );
};

export default PageHero;
