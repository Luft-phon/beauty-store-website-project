import React, { useState } from 'react';
import { Service } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Save, Edit2, Upload, Plus } from 'lucide-react';

interface AdminDashboardProps {
  services: Service[];
  onUpdateService: (updatedService: Service) => void;
}

const MOCK_DATA = [
  { name: 'Jan', bookings: 40 },
  { name: 'Feb', bookings: 30 },
  { name: 'Mar', bookings: 55 },
  { name: 'Apr', bookings: 80 },
  { name: 'May', bookings: 65 },
  { name: 'Jun', bookings: 95 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ services, onUpdateService }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');

  if (!auth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-stone-200 max-w-md w-full text-center">
          <h2 className="font-serif text-2xl mb-6">Owner Login</h2>
          <input
            type="password"
            placeholder="Enter Password (try 'admin')"
            className="w-full p-3 border border-stone-300 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (password === 'admin') setAuth(true);
              else alert('Incorrect password');
            }}
            className="w-full bg-stone-900 text-white py-3 rounded hover:bg-gold-500 transition"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditPrice(service.price);
  };

  const saveEdit = (service: Service) => {
    onUpdateService({ ...service, price: editPrice });
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl mb-8 text-stone-900">Management Dashboard</h1>
      
      {/* Charts Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 mb-12">
        <h3 className="text-lg font-bold mb-6 uppercase tracking-widest text-stone-500">Monthly Bookings Overview</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#78716c" fontSize={12} />
              <YAxis stroke="#78716c" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderColor: '#e7e5e4' }} 
                itemStyle={{ color: '#D4AF37' }}
              />
              <Bar dataKey="bookings" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Management */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase tracking-widest text-stone-500">Service Pricing & Content</h3>
          <button className="flex items-center space-x-2 bg-stone-900 text-white px-4 py-2 rounded hover:bg-gold-500 transition text-sm">
            <Plus size={16} /> <span>Add Service</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Service Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {services.map(service => (
                <tr key={service.id} className="hover:bg-stone-50/50">
                  <td className="p-4">
                    <div className="relative w-12 h-12 group cursor-pointer">
                        <img src={service.image} alt={service.name} className="w-12 h-12 rounded object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition">
                            <Upload size={14} className="text-white" />
                        </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-stone-800">{service.name}</td>
                  <td className="p-4 text-stone-500 text-sm">{service.category}</td>
                  <td className="p-4 font-bold text-gold-700">
                    {editingId === service.id ? (
                      <input 
                        type="number" 
                        value={editPrice} 
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-24 p-1 border border-stone-300 rounded"
                      />
                    ) : (
                      `$${service.price}`
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === service.id ? (
                      <button onClick={() => saveEdit(service)} className="text-green-600 hover:bg-green-50 p-2 rounded">
                        <Save size={18} />
                      </button>
                    ) : (
                      <button onClick={() => startEdit(service)} className="text-stone-400 hover:text-stone-900 p-2 rounded">
                        <Edit2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-center text-stone-400 text-sm">
        <p>Annual Domain Fee: $10 | One-time Service Fee: $750 (Paid)</p>
      </div>
    </div>
  );
};

export default AdminDashboard;