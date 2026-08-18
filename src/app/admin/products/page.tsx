"use client";

import { useEffect, useState, useRef } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  imageUrl: string | null;
  available: boolean;
  sortOrder: number;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  available: boolean;
  sortOrder: number;
}

const emptyForm: FormData = {
  name: "",
  description: "",
  category: "cakes",
  price: 1000,
  imageUrl: "",
  available: true,
  sortOrder: 0,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description || "",
      category: p.category,
      price: p.price,
      imageUrl: p.imageUrl || "",
      available: p.available,
      sortOrder: p.sortOrder,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      sortOrder: Number(form.sortOrder),
      imageUrl: form.imageUrl || null,
    };

    if (editing) {
      await fetch(`/api/admin/products/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setShowModal(false);
    fetchProducts();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const toggleAvailability = async (p: Product) => {
    await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !p.available }),
    });
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={openCreate}
          className="bg-fuchsia text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-fuchsia-dark"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Product</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                        No img
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{p.name}</p>
                      {p.description && <p className="text-gray-500 text-xs truncate max-w-[200px]">{p.description}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{p.category}</td>
                <td className="px-4 py-3 font-semibold">₦{p.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleAvailability(p)}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {p.available ? "Available" : "Unavailable"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(p)} className="text-gray-500 hover:text-fuchsia">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-lg">{editing ? "Edit Product" : "New Product"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="flex gap-3">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex-1 border rounded-lg px-3 py-2"
                >
                  <option value="cakes">Cakes</option>
                  <option value="food">Food</option>
                </select>
                <input
                  type="number"
                  placeholder="Price (NGN)"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="flex-1 border rounded-lg px-3 py-2"
                />
              </div>
              <input
                type="number"
                placeholder="Sort order"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
              />

              {/* Image upload */}
              <div>
                <p className="text-sm font-medium mb-1">Product Image</p>
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="Preview" className="w-20 h-20 rounded object-cover mb-2" />
                )}
                <UploadButton
                  endpoint="productImage"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    if (res?.[0]?.url) {
                      setForm({ ...form, imageUrl: res[0].url });
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload failed: ${error.message}`);
                  }}
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Available for order</span>
              </label>
            </div>
            <div className="flex gap-3 p-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="flex-1 bg-fuchsia text-white py-2 rounded-lg font-medium hover:bg-fuchsia-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
