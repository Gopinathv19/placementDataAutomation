import PersonIcon from '@mui/icons-material/Person';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddStudentForm from './utils/AddStudentForm';
import { useState } from "react";
import { useEffect } from 'react';
import DeleteStudent from './utils/DeleteStudent';
import EditProfile from './utils/EditProfile';  

const Manage = () => {
    const [selectedSection, setSelectedSection] = useState(null); // null means no section is selected

    const handleMenuClick = (id) => {
        setSelectedSection(id);
    };

    const handleBackToMenu = () => {
        setSelectedSection(null); // Resets to the main menu
    };

    const [deleteStudent, setDeleteStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(() => {
        if(!searchTerm){
            setSearchTerm([]);
            return;
        }
        setIsLoading(true);
        setError(null);
        try{
            const response = axios.get(`/cse/v1/students/search`, {
                params: { q: searchTerm }
            });
            setSearchResults(response.data);
            
        }
        catch(err){
            console.error('Search error:', error);
            setError('Failed to fetch search results');
        }
        finally{
            setIsLoading(false);
        }
    },[searchTerm]);

    const handleSearchChange = (e) =>{
        setSearchTerm(e.target.value);
    }

    // Menu items with their corresponding views
    const menuItems = [
        { id: 'addStudent', text: 'Add Student', icon: <PersonIcon className="w-8 h-8" /> },
        { id: 'deleteStudent', text: 'Delete Student', icon: <GroupRemoveIcon className="w-8 h-8" /> },
        { id: 'editProfile', text: 'Edit Profile', icon: <EditIcon className="w-8 h-8" /> },
        { id: 'viewStudent', text: 'View Student Profile', icon: <PersonPinIcon className="w-8 h-8" /> }
    ];

    // Define views for each section
    const renderSection = () => {
        switch (selectedSection) {
            case 'addStudent':
                return (
                   <AddStudentForm />
                );
            case 'deleteStudent':
                return (
                       <DeleteStudent />
                );
            case 'editProfile':
                return (
                     <EditProfile />
                );
            case 'editEligibilitStatus':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Edit Eligibility Status</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="University Number" className="w-full p-2 border rounded" />
                            <select className="w-full p-2 border rounded">
                                <option>Eligible</option>
                                <option>Not Eligible</option>
                            </select>
                            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Update Status</button>
                        </form>
                    </div>
                );
            case 'viewStudent':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">View Student Profile</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="University Number" className="w-full p-2 border rounded" />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Profile</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            {/* Back button when a section is selected */}
            {selectedSection && (
                <button 
                    onClick={handleBackToMenu} 
                    className="flex items-center text-indigo-500 mb-4 hover:text-indigo-700"
                >
                    <ArrowBackIcon className="mr-2" /> Back to Menu
                </button>
            )}

            {/* Conditional Rendering */}
            {!selectedSection ? (
                <div>
                    <p className="text-2xl font-bold mb-6 text-center">Manage Students</p>
                    <div className="grid grid-cols-2 gap-6">
                        {menuItems.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                className={`p-6 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-md 
                                    transition-all duration-200 transform hover:scale-105
                                    ${selectedSection === item.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-indigo-200'}`}
                            >
                                <div className="mb-2">{item.icon}</div>
                                <span className="text-lg font-medium text-center">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">{renderSection()}</div>
            )}
        </div>
    );
};

export default Manage;
