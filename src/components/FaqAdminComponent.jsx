import { useState } from "react";

const FAQCrudTable = () => {
  const [faqData, setFaqData] = useState([
    { id: 1, question: "What is CMH (Creative Music Hub) and how does it work?", status: "active" },
    { id: 2, question: "Do I need musical expertise to use CMH?", status: "inactive" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");

  // Add a new FAQ
  const addFAQ = () => {
    if (newQuestion.trim() === "") return;
    setFaqData([
      ...faqData,
      { id: faqData.length + 1, question: newQuestion, status: "inactive" },
    ]);
    setNewQuestion("");
  };

  // Edit the status of an FAQ
  const toggleStatus = (id) => {
    const updatedFaqData = faqData.map((faq) =>
      faq.id === id ? { ...faq, status: faq.status === "active" ? "inactive" : "active" } : faq
    );
    setFaqData(updatedFaqData);
  };

  // Delete an FAQ
  const deleteFAQ = (id) => {
    setFaqData(faqData.filter((faq) => faq.id !== id));
  };

  return (
    <div className="faq-crud-table p-4">
      <h2 className="text-xl font-bold mb-4">FAQ Management</h2>
      
      {/* Input for adding a new question */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Add a new FAQ question"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={addFAQ}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </div>

      {/* FAQ Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Question</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqData.map((faq) => (
            <tr key={faq.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">{faq.id}</td>
              <td className="border border-gray-300 px-4 py-2">{faq.question}</td>
              <td className="border border-gray-300 px-4 py-2 text-center capitalize">{faq.status}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => toggleStatus(faq.id)}
                  className={`px-2 py-1 rounded mr-2 ${
                    faq.status === "active"
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {faq.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => deleteFAQ(faq.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FAQCrudTable;
