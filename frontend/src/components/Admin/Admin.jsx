import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const Admin = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 'manageStudents', 
      text: 'Manage Students', 
      icon: <GroupIcon className="w-6 h-6" />,
      path: '/admin/manage-students'
    },
    { 
      id: 'bulkUpload', 
      text: 'Bulk Upload', 
      icon:  <FileUploadIcon className="w-6 h-6" />,
      path: '/admin/add-student'
    },
    { 
      id: 'generateReport', 
      text: 'Generate Report', 
      icon: <ArticleIcon className="w-6 h-6" />,
      path: '/admin/bulk-upload'
    },
    { 
      id: 'generateNotImporved', 
      text: 'Not Improved Students Report', 
      icon: <AssignmentIndIcon className="w-6 h-6" />,
      path: '/admin/update-scores'
    }
  ];

  const handleMenuClick = (path, id) => {
    setSelectedSection(id);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8 text-indigo-900">Admin Dashboard</h1>
      
      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMenuClick(item.path, item.id)}
            className={`
              p-6 rounded-lg shadow-md cursor-pointer
              transition-all duration-200 transform hover:scale-105
              ${selectedSection === item.id ? 'bg-indigo-900 text-white' : 'bg-white hover:bg-indigo-50'}
            `}
          >
            <div className="flex items-center mb-4">
              <span className={`
                p-3 rounded-full mr-4
                ${selectedSection === item.id ? 'bg-indigo-800' : 'bg-indigo-100'}
              `}>
                {item.icon}
              </span>
              <h2 className="text-lg font-semibold">{item.text}</h2>
            </div>
            <p className={`text-sm ${selectedSection === item.id ? 'text-indigo-100' : 'text-gray-600'}`}>
              Click to manage {item.text.toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}  

export default Admin;
