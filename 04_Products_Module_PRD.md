# 04_Products_Module_PRD.md

# Product Module PRD & Technical Specification

## Objective

Build a **production-ready, database-driven Product Management Module**
for the new Galcare website.

The module must support: - Dynamic product listing - Product detail
pages - CMS/Admin management - Search & filtering - SEO-friendly URLs -
Future scalability

## Design Inspiration

Draw visual inspiration from: -
https://pharmaceutical-company-website.vercel.app/ (clean cards,
spacing, homepage feel) - Accredo (navigation & healthcare UX) - Colgate
(product storytelling) - Zydus USA (pharma presentation) - ZS
(enterprise polish)

**Keep Galcare's Green + White branding intact.**

------------------------------------------------------------------------

# User Flow

Home → Featured Products → Products → Filters/Search → Product Details →
Download Brochure → Send Inquiry

------------------------------------------------------------------------

# Products Page

## Hero

-   Large search bar
-   Green accent
-   Breadcrumbs

## Filters

-   Division
-   Category
-   Dosage Form
-   Generic Name
-   Brand
-   Featured
-   New Arrivals

## Grid

Responsive cards with: - Product image - Brand name - Generic name -
Division badge - Dosage form - View Details CTA

Hover: - Elevation - Shadow - Green border - Image zoom

------------------------------------------------------------------------

# Product Detail Page

-   Gallery
-   Brand Name
-   Generic Name
-   Strength
-   Dosage Form
-   Division
-   Description
-   Composition
-   Indications
-   Storage
-   Packaging
-   Downloads
-   Inquiry Form
-   Related Products

------------------------------------------------------------------------

# Database Schema

## products

-   id
-   slug
-   brand_name
-   generic_name
-   division_id
-   category_id
-   dosage_form
-   strength
-   description
-   composition
-   packaging
-   storage
-   featured
-   status
-   created_at
-   updated_at

## divisions

-   Neuropsychiatric
-   Dermatology
-   Third Party Manufacturing

## categories

-   Tablets
-   Capsules
-   Syrups
-   Creams
-   Gels
-   Injections

## product_images

-   id
-   product_id
-   image_url
-   is_primary

## downloads

-   id
-   product_id
-   brochure
-   technical_sheet

------------------------------------------------------------------------

# Admin CMS

Admin can: - Add/Edit/Delete Products - Upload Images - Upload PDFs -
Manage Categories - Manage Divisions - Toggle Featured - Draft/Publish -
SEO metadata

------------------------------------------------------------------------

# API

GET /api/products GET /api/products/:slug POST /api/products PUT
/api/products/:id DELETE /api/products/:id

------------------------------------------------------------------------

# Tech Stack

Frontend: - Next.js - React - Tailwind CSS - Framer Motion

Backend: - NestJS (preferred) or Express

Database: - PostgreSQL + Prisma

Storage: - Cloudinary or AWS S3

CMS: - Payload CMS / Strapi

------------------------------------------------------------------------

# Future Features

-   AI Product Search
-   Doctor Portal
-   Distributor Login
-   Compare Products
-   Product Recommendations
-   Multi-language Support

------------------------------------------------------------------------

# Notes

Reuse the clean spacing and card layout ideas from the prototype:
https://pharmaceutical-company-website.vercel.app/

Do **not** copy the design directly. Use it only as inspiration.

Maintain Galcare's existing **Green + White** identity across all
product pages.
