-- VOLTARE storefront schema (customer-facing).
-- Kept separate from the staff dashboard's `users` table: customers authenticate here.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS categories (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 slug TEXT NOT NULL UNIQUE,
 name TEXT NOT NULL,
 description TEXT,
 sort_order INTEGER NOT NULL DEFAULT0,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 sku TEXT NOT NULL UNIQUE,
 slug TEXT NOT NULL UNIQUE,
 name TEXT NOT NULL,
 brand TEXT NOT NULL,
 category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
 description TEXT NOT NULL DEFAULT '',
 price_cents INTEGER NOT NULL CHECK (price_cents >=0),
 compare_at_cents INTEGER CHECK (compare_at_cents >=0),
 stock INTEGER NOT NULL DEFAULT0 CHECK (stock >=0),
 rating NUMERIC(2,1) NOT NULL DEFAULT0,
 review_count INTEGER NOT NULL DEFAULT0,
 is_active BOOLEAN NOT NULL DEFAULT true,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_active_idx ON products(is_active);

CREATE TABLE IF NOT EXISTS product_images (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 url TEXT NOT NULL,
 alt TEXT NOT NULL DEFAULT '',
 position INTEGER NOT NULL DEFAULT0
);

CREATE TABLE IF NOT EXISTS product_specs (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 label TEXT NOT NULL,
 value TEXT NOT NULL,
 position INTEGER NOT NULL DEFAULT0
);

-- Customer accounts. Intentionally distinct from staff `users`.
CREATE TABLE IF NOT EXISTS customers (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 email TEXT NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 full_name TEXT NOT NULL,
 phone TEXT,
 tax_id TEXT, -- CPF
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customer_sessions (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 token_hash TEXT NOT NULL UNIQUE,
 user_agent TEXT,
 expires_at TIMESTAMPTZ NOT NULL,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS addresses (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 label TEXT NOT NULL DEFAULT 'Principal',
 recipient TEXT NOT NULL,
 postal_code TEXT NOT NULL,
 street TEXT NOT NULL,
 number TEXT NOT NULL,
 complement TEXT,
 district TEXT NOT NULL,
 city TEXT NOT NULL,
 state TEXT NOT NULL,
 is_default BOOLEAN NOT NULL DEFAULT false,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS carts (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
 status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','converted','abandoned')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
 product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 quantity INTEGER NOT NULL CHECK (quantity >0),
 UNIQUE (cart_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 order_number TEXT NOT NULL UNIQUE,
 customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','shipped','delivered','cancelled')),
 payment_method TEXT NOT NULL,
 subtotal_cents INTEGER NOT NULL,
 shipping_cents INTEGER NOT NULL DEFAULT0,
 total_cents INTEGER NOT NULL,
 shipping_address JSONB NOT NULL,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_customer_idx ON orders(customer_id);

CREATE TABLE IF NOT EXISTS order_items (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 product_id UUID REFERENCES products(id) ON DELETE SET NULL,
 name TEXT NOT NULL,
 sku TEXT NOT NULL,
 unit_price_cents INTEGER NOT NULL,
 quantity INTEGER NOT NULL
);
