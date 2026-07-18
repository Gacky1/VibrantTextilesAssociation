export const previewMarketplaceCategories = [
  { id: 'preview-sarees', name: 'Sarees', slug: 'sarees', sort_order: 1 },
  { id: 'preview-fabrics', name: 'Fabrics', slug: 'fabrics', sort_order: 2 },
  { id: 'preview-handloom', name: 'Handloom Products', slug: 'handloom-products', sort_order: 3 },
];

export const previewMarketplaceProducts = [
  { id: 'preview-banarasi', name: 'Banarasi Silk Brocade', slug: 'banarasi-silk-brocade', short_description: 'Handwoven silk brocade with traditional zari motifs from a verified weaving collective.', full_description: 'Premium Banarasi silk brocade for boutiques, designers and export buyers.', status: 'published', pricing_type: 'on_request', minimum_order_quantity: 10, moq_unit: 'pieces', lead_time_days: 30, sample_available: true, customization_available: true, gi_tagged: true, origin_state: 'Uttar Pradesh', primary_image_url: '/assets/textiles/banarasi_silk.png', marketplace_categories: { name: 'Sarees', slug: 'sarees' }, industry_members: { organization_name: 'VTA Preview Supplier', slug: 'vta-preview-supplier', verification_status: 'verified' }, marketplace_product_specifications: [], marketplace_product_images: [], marketplace_product_documents: [] },
  { id: 'preview-kalamkari', name: 'Hand-Painted Kalamkari Fabric', slug: 'hand-painted-kalamkari-fabric', short_description: 'Natural-dyed cotton Kalamkari fabric for apparel, interiors and design collections.', full_description: 'Artisan-produced Kalamkari cotton using hand-drawn detailing and natural dye processes.', status: 'published', pricing_type: 'range', indicative_price_min: 850, indicative_price_max: 1400, price_unit: 'metre', minimum_order_quantity: 25, moq_unit: 'metres', lead_time_days: 21, sample_available: true, customization_available: true, gi_tagged: false, origin_state: 'Andhra Pradesh', primary_image_url: '/assets/textiles/kalamkari_fabric.png', marketplace_categories: { name: 'Fabrics', slug: 'fabrics' }, industry_members: { organization_name: 'VTA Preview Supplier', slug: 'vta-preview-supplier', verification_status: 'verified' }, marketplace_product_specifications: [], marketplace_product_images: [], marketplace_product_documents: [] },
];

export const previewMarketplaceSupplier = {
  id: 'preview-supplier',
  organization_name: 'VTA Preview Supplier',
  slug: 'vta-preview-supplier',
  short_description: 'A preview of how verified VTA suppliers will appear after marketplace onboarding.',
  full_description: 'This development profile demonstrates supplier capabilities, verification signals and associated marketplace products. Deploy the marketplace migration and enable the schema readiness flag to replace it with live member data.',
  verification_status: 'verified',
  is_active: true,
  organization_type: 'Manufacturer and artisan collective',
  city: 'Varanasi',
  state: 'Uttar Pradesh',
  country: 'India',
  year_established: 1988,
  product_categories: ['Sarees', 'Fabrics', 'Handloom Products'],
  materials: ['Silk', 'Cotton'],
  techniques: ['Brocade weaving', 'Kalamkari'],
  certifications: ['VTA Verified'],
  manufacturing_capabilities: ['Handloom weaving', 'Natural dyeing', 'Custom design development'],
  is_exporter: true,
};
