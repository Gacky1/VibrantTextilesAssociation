-- Run this file first and allow it to commit before the stakeholder upgrade.
-- PostgreSQL requires new enum values to be committed before they are used.
alter type public.app_role add value if not exists 'state_stakeholder';

