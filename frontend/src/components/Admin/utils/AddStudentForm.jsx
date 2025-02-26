import { useState } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
    const [studentData, setStudentData] = useState({
        universityNo: '',
        className: 'A',
        rollNo: '',
        name: '',
        gender: 'Male',
        leetcodeUsername: '',
        batch : ''
    });



    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // University Number validation
        if (!studentData.universityNo) {
            newErrors.universityNo = 'University number cannot be null';
        } else if (!/^\d{12}$/.test(String(studentData.universityNo))) {
            newErrors.universityNo = 'University Number must be 12 digits';
        }

        // Name validation
        if (!studentData.name || studentData.name.trim().isEmpty) {
            newErrors.name = 'Name cannot be empty';
        }

        // Roll Number validation
        if (!studentData.rollNo || studentData.rollNo.trim().isEmpty) {
            newErrors.rollNo = 'Roll No cannot be empty';
        } else if (!/^\d{2}L?CSE[ABC]\d{2}$/.test(studentData.rollNo)) {
            newErrors.rollNo = 'Roll Number format is incorrect';
        }

        // Class Name validation
        if (!studentData.className || studentData.className.trim().isEmpty) {
            newErrors.className = 'Class name cannot be empty';
        }

        // Batch validation
        if (!studentData.batch) {
            newErrors.batch = 'Batch cannot be null';
        }

        // LeetCode Username validation (frontend specific)
        if (!studentData.leetcodeUsername.trim()) {
            newErrors.leetcodeUsername = 'LeetCode Username is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const formattedData = {
                    ...studentData,
                    universityNo: Number(studentData.universityNo),
                    batch: Number(studentData.batch)
                };
                const response = await axios.post('/cse/v1/admin/upload', formattedData);
                alert('Student added successfully!');
            } catch (error) {
                alert('Error uploading the student details: ' + error.message);
            }
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={studentData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">University Number</label>
                    <input
                        type="text"
                        name="universityNo"
                        value={studentData.universityNo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.universityNo && <p className="text-red-500 text-sm">{errors.universityNo}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Class Name</label>
                    <select
                        name="className"
                        value={studentData.className}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Roll Number</label>
                    <input
                        type="text"
                        name="rollNo"
                        value={studentData.rollNo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                        name="gender"
                        value={studentData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">LeetCode Username</label>
                    <input
                        type="text"
                        name="leetcodeUsername"
                        value={studentData.leetcodeUsername}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.leetcodeUsername && <p className="text-red-500 text-sm">{errors.leetcodeUsername}</p>}
                </div>

                <div>
                    <label className='block text-sm font-medium'>Batch</label>
                    <select
                    name="batch"
                    value={studentData.batch}
                        onChange={handleChange}
                        className='w-full p-2 border rounded-lg'
                    ><option value=""></option>
                    {Array.from({length: 10}, (_, i) => {
            const startYear = 2022 + i;
            const endYear = startYear + 4;
            return (
                <option key={endYear} value={endYear}>
                    {startYear}-{endYear}
                </option>
            );
        })}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddStudentForm;
