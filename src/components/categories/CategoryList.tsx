import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { Category } from '../../types';
import CategoryItem from './CategoryItem';
import CategoryForm from './CategoryForm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const CategoryList: React.FC = () => {
  const { categories, deleteCategory } = useExpenses();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const handleAddClick = () => {
    setIsAddingCategory(true);
    setEditingCategory(null);
  };
  
  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setIsAddingCategory(false);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };
  
  const handleFormSubmit = () => {
    setIsAddingCategory(false);
    setEditingCategory(null);
  };
  
  const handleFormCancel = () => {
    setIsAddingCategory(false);
    setEditingCategory(null);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddClick}
          icon={<Plus size={16} />}
        >
          Add Category
        </Button>
      </CardHeader>
      <CardContent>
        {(isAddingCategory || editingCategory) && (
          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-medium mb-3">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h3>
            <CategoryForm 
              category={editingCategory || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        )}
        
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          {categories.length > 0 ? (
            categories.map(category => (
              <CategoryItem
                key={category.id}
                category={category}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No categories found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;