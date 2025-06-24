// frontend/src/pages/admin/ManageContactMessages.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { IContactMessage } from '../../types';
// Corrected import from 'react-icons/fa'
import { FaTrash, FaSyncAlt, FaEnvelopeOpen } from 'react-icons/fa'; 
import { format } from 'date-fns';

const ManageContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      // Note the endpoint for fetching messages from the admin API
      const response = await api.get<IContactMessage[]>('/admin/contact-messages/admin'); 
      // Sort by createdAt descending (most recent first)
      const sorted = response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMessages(sorted);
    } catch (err: any) {
      console.error('Error fetching contact messages:', err);
      setError(err.response?.data?.message || 'Failed to fetch contact messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        // Note the endpoint for deleting messages from the admin API
        await api.delete(`/admin/contact-messages/admin/${id}`); 
        setDeleteMessage('Message deleted successfully!');
        fetchMessages(); // Refresh list after deletion
      } catch (err: any) {
        console.error('Error deleting message:', err);
        setDeleteMessage(`Failed to delete message: ${err.response?.data?.message || err.message}`);
      } finally {
        setTimeout(() => setDeleteMessage(null), 3000); // Clear message after 3 seconds
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-text-dark text-center sm:text-left">Manage Contact Messages</h2>
        <button
          onClick={fetchMessages}
          className="bg-pastel-green text-text-dark py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-green-400 transition duration-300"
          title="Refresh Messages"
        >
          <FaSyncAlt className="mr-2" /> Refresh
        </button>
      </div>

      {deleteMessage && (
        <p className={`mb-4 text-center ${deleteMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {deleteMessage}
        </p>
      )}

      {loading ? (
        <div className="text-center py-4">Loading messages...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-4 text-gray-600">No contact messages received yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
          <table className="min-w-full bg-white">
            <thead className="bg-pastel-light-blue text-text-dark">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">Sender</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Subject</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Message</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Received At</th>
                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-6 text-gray-800">{message.name}</td>
                  <td className="py-4 px-6 text-gray-800">{message.email}</td>
                  <td className="py-4 px-6 text-gray-800">{message.subject || 'N/A'}</td>
                  <td className="py-4 px-6 text-gray-800 text-sm max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    {/* Display full message on click */}
                    <span title={message.message}>{message.message}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-sm">
                    {format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-3">
                       {/* This could open a detailed view modal */}
                      <button
                        onClick={() => alert(`Message from: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject || 'N/A'}\n\nMessage:\n${message.message}`)}
                        className="text-pastel-purple hover:text-purple-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                        title="View Full Message"
                      >
                        <FaEnvelopeOpen size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(message._id)}
                        className="text-red-500 hover:text-red-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                        title="Delete Message"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageContactMessages;