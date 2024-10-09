'use client';  
import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import Modal from '../components/Modal';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', description: '', price: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Load products when the component mounts
  }, []);

  // Handle form submission for creating or updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      // Update product
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      // Create product
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ id: '', name: '', description: '', price: '' }); // Reset form
    fetchProducts(); // Refresh products after creation or update
    setIsModalOpen(false); // Close modal
  };

  // Handle edit action
  const handleEdit = (product) => {
    setForm({ id: product.id, name: product.name, description: product.description, price: product.price });
    setIsModalOpen(true); // Open modal for editing
  };

  // Handle delete action
  const handleDelete = async (id) => {
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchProducts(); // Refresh products after deletion
  };

  // Open modal for adding product
  const openModal = () => {
    setForm({ id: '', name: '', description: '', price: '' }); // Reset form
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product CRUD</h1>

      <button
        className="bg-green-500 text-white p-2 rounded mb-4"
        onClick={openModal}
      >
        Add Product
      </button>

      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal for Create/Update Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

