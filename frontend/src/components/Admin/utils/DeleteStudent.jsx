import { useState, useEffect } from "react";
import axios from "axios";

const DeleteStudent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/cse/v1/students/search`, {
                    params: { q: searchTerm }
                });
                setSearchResults(response.data || []);
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to fetch search results');
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleResultClick = (student) => {
        setSelectedStudent(student);
        setSearchResults([]);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!selectedStudent) {
            alert("Please select a student to delete.");
            return;
        }

        try {
            await axios.delete(`/cse/v1/admin/delete/${selectedStudent.universityNo}`);
            alert("Student deleted successfully!");
            setSelectedStudent(null);
            setSearchTerm("");
            setSearchResults([]);
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete student.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Delete Student</h2>
            <form className="space-y-4" onSubmit={handleDelete}>
                <input
                    type="text"
                    placeholder="University Number"
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    required
                />
                {isLoading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {searchResults.length > 0 && (
                    <div className="border rounded-md overflow-hidden">
                        {searchResults.map((result) => (
                            <div
                                key={result.universityNo}
                                className="px-4 py-3 cursor-pointer hover:bg-gray-700 border-b border-gray-700"
                                onClick={() => handleResultClick(result)}
                            >
                                <div className="font-medium text-white mb-1">{result.name}</div>
                                <div className="text-sm text-gray-400 flex gap-2 items-center">
                                    <span>Roll No: {result.rollNo}</span>
                                    <span>•</span>
                                    <span>University No: {result.universityNo}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedStudent && (
                    <div className="p-4 border border-red-500 rounded bg-gray-800 text-white">
                        <p>Selected Student: {selectedStudent.name}</p>
                        <p>University No: {selectedStudent.universityNo}</p>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete Student
                </button>
            </form>
        </div>
    );
};

export default DeleteStudent;
