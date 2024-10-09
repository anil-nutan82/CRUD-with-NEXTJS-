export default function ProductForm({ form, setForm, handleSubmit }) {
  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full p-2 border rounded"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        type="submit"
      >
        {form.id ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
