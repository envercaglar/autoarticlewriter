import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';

interface ContentPlan {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  status: 'draft' | 'scheduled' | 'published';
}

export function ContentPlanner() {
  const [plans, setPlans] = React.useState<ContentPlan[]>([]);
  const [showForm, setShowForm] = React.useState(false);

  const addPlan = (plan: ContentPlan) => {
    setPlans([...plans, plan]);
    setShowForm(false);
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          İçerik Planı
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Yeni Plan
        </button>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {plan.title}
              </h4>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {plan.category}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(plan.publishDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              plan.status === 'published' ? 'bg-green-100 text-green-800' :
              plan.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {plan.status === 'published' ? 'Yayında' :
               plan.status === 'scheduled' ? 'Planlandı' :
               'Taslak'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}