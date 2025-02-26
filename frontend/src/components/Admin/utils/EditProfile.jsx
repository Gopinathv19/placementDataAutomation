import { useState, useEffect } from "react";
import axios from "axios";

const EditStudent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch student details on search
    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const fetchStudent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/cse/v1/students/search`, {
                    params: { q: searchTerm }
                });
                setSearchResults(response.data||[]); // Convert object to array for mapping
            } catch (err) {
                console.error("Search error:", err);
                setError("Student not found!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudent();
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleResultClick = (student) => {
        setSelectedStudent(student);
        setSearchTerm(student.universityNo); // Set input field
        setSearchResults([]); // Hide results
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedStudent) {
            alert("Please select a student to edit.");
            return;
        }

        try {
            await axios.put(`/cse/v1/admin/update/${selectedStudent.universityNo}`, selectedStudent);
            alert("Student updated successfully!");
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update student.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <input
                type="text"
                placeholder="Enter University Number"
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={handleSearchChange}
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
                <form className="space-y-4 mt-4" onSubmit={handleUpdate}>
                    <input type="text" name="name" value={selectedStudent.name} onChange={handleInputChange} placeholder="Name" className="w-full p-2 border rounded" />
                    <input type="text" name="className" value={selectedStudent.className} onChange={handleInputChange} placeholder="Class Name" className="w-full p-2 border rounded" />
                    <input type="text" name="rollNo" value={selectedStudent.rollNo} onChange={handleInputChange} placeholder="Roll No" className="w-full p-2 border rounded" />
                    <input type="text" name="gender" value={selectedStudent.gender} onChange={handleInputChange} placeholder="Gender" className="w-full p-2 border rounded" />
                    <input type="text" name="leetcodeUsername" value={selectedStudent.leetcodeUsername} onChange={handleInputChange} placeholder="LeetCode Username" className="w-full p-2 border rounded" />

                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Update Student</button>
                </form>
            )}
        </div>
    );
};

export default EditStudent;
