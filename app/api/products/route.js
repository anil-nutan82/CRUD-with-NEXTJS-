import { db } from '../../../lib/db';

// GET all products
export async function GET() {
  try {
    const [products] = await db.query('SELECT * FROM products');
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
  }
}

// POST to create a new product
export async function POST(req) {
  const { name, description, price } = await req.json();
  try {
    const result = await db.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
    return new Response(JSON.stringify({ message: 'Product created successfully', result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create product' }), { status: 500 });
  }
}

// PUT to update an existing product
export async function PUT(req) {
  const { id, name, description, price } = await req.json();
  try {
    const result = await db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
    return new Response(JSON.stringify({ message: 'Product updated successfully', result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
  }
}

// DELETE to remove a product
export async function DELETE(req) {
  const { id } = await req.json();
  try {
    const result = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return new Response(JSON.stringify({ message: 'Product deleted successfully', result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
  }
}
